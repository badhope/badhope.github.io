from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.core.config import settings
from app.core.security import get_current_user_optional
from app.models.tool import AIConversation
from app.models.user import User
from app.schemas.ai import (
    ChatRequest, ChatResponse, ConversationCreate,
    ConversationResponse, ModelsResponse, ModelInfo
)

router = APIRouter()

AI_MODELS = [
    ModelInfo(id="gpt-4o", name="GPT-4o", provider="OpenAI"),
    ModelInfo(id="gpt-4o-mini", name="GPT-4o Mini", provider="OpenAI"),
    ModelInfo(id="deepseek-chat", name="DeepSeek Chat", provider="DeepSeek"),
    ModelInfo(id="qwen-plus", name="Qwen Plus", provider="Qwen"),
    ModelInfo(id="glm-4-flash", name="GLM-4 Flash", provider="Zhipu"),
]

MODEL_ENDPOINTS = {
    "gpt-4o": {"url": "https://api.openai.com/v1/chat/completions", "key": "OPENAI_API_KEY"},
    "gpt-4o-mini": {"url": "https://api.openai.com/v1/chat/completions", "key": "OPENAI_API_KEY"},
    "deepseek-chat": {"url": "https://api.deepseek.com/v1/chat/completions", "key": "DEEPSEEK_API_KEY"},
    "qwen-plus": {"url": "https://dashscope.aliyuncs.com/compatible-mode/v1/chat/completions", "key": "QWEN_API_KEY"},
    "glm-4-flash": {"url": "https://open.bigmodel.cn/api/paas/v4/chat/completions", "key": "ZHIPU_API_KEY"},
}


async def call_ai_model(model: str, messages: list, temperature: float = 0.7, max_tokens: int = 2000):
    if model not in MODEL_ENDPOINTS:
        raise HTTPException(status_code=400, detail=f"Unknown model: {model}")
    
    config = MODEL_ENDPOINTS[model]
    api_key = getattr(settings, config["key"], None)
    if not api_key:
        raise HTTPException(status_code=500, detail=f"API key for {model} not configured")
    
    import httpx
    headers = {"Authorization": f"Bearer {api_key}"}
    if model.startswith(("qwen", "glm")):
        headers["Authorization"] = api_key
    
    payload = {
        "model": model,
        "messages": messages,
        "temperature": temperature,
        "max_tokens": max_tokens
    }
    
    async with httpx.AsyncClient() as client:
        response = await client.post(
            config["url"],
            headers=headers,
            json=payload,
            timeout=60.0
        )
        response.raise_for_status()
        data = response.json()
        return data


@router.get("/models", response_model=ModelsResponse)
def get_models():
    return {"models": AI_MODELS}


@router.post("/chat", response_model=ChatResponse)
async def chat(
    request: ChatRequest,
    user: Optional[User] = Depends(get_current_user_optional)
):
    try:
        messages = [{"role": m.role, "content": m.content} for m in request.messages]
        result = await call_ai_model(
            model=request.model,
            messages=messages,
            temperature=request.temperature,
            max_tokens=request.max_tokens
        )
        content = result["choices"][0]["message"]["content"]
        return ChatResponse(
            content=content,
            model=request.model,
            usage=result.get("usage")
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/conversations", response_model=List[ConversationResponse])
def get_conversations(
    user: User = Depends(get_current_user_optional),
    db: Session = Depends(get_db)
):
    if not user:
        return []
    return db.query(AIConversation).filter(
        AIConversation.user_id == user.id
    ).order_by(AIConversation.updated_at.desc()).all()


@router.post("/conversations", response_model=ConversationResponse)
def create_conversation(
    conversation: ConversationCreate,
    user: User = Depends(get_current_user_optional),
    db: Session = Depends(get_db)
):
    new_conv = AIConversation(
        title=conversation.title,
        model=conversation.model,
        user_id=user.id if user else None,
        messages=[]
    )
    db.add(new_conv)
    db.commit()
    db.refresh(new_conv)
    return new_conv


@router.get("/conversations/{conv_id}", response_model=ConversationResponse)
def get_conversation(
    conv_id: str,
    user: User = Depends(get_current_user_optional),
    db: Session = Depends(get_db)
):
    conv = db.query(AIConversation).filter(AIConversation.id == conv_id).first()
    if not conv:
        raise HTTPException(status_code=404, detail="Conversation not found")
    if conv.user_id and conv.user_id != user.id:
        raise HTTPException(status_code=403, detail="Not authorized")
    return conv


@router.put("/conversations/{conv_id}", response_model=ConversationResponse)
def update_conversation(
    conv_id: str,
    messages: List[dict],
    user: User = Depends(get_current_user_optional),
    db: Session = Depends(get_db)
):
    conv = db.query(AIConversation).filter(AIConversation.id == conv_id).first()
    if not conv:
        raise HTTPException(status_code=404, detail="Conversation not found")
    if conv.user_id and conv.user_id != user.id:
        raise HTTPException(status_code=403, detail="Not authorized")
    conv.messages = messages
    db.commit()
    db.refresh(conv)
    return conv


@router.delete("/conversations/{conv_id}")
def delete_conversation(
    conv_id: str,
    user: User = Depends(get_current_user_optional),
    db: Session = Depends(get_db)
):
    conv = db.query(AIConversation).filter(AIConversation.id == conv_id).first()
    if not conv:
        raise HTTPException(status_code=404, detail="Conversation not found")
    if conv.user_id and conv.user_id != user.id:
        raise HTTPException(status_code=403, detail="Not authorized")
    db.delete(conv)
    db.commit()
    return {"message": "Conversation deleted"}
