from pydantic import BaseModel
from typing import Optional, List, Dict, Any
from datetime import datetime


class Message(BaseModel):
    role: str
    content: str


class ChatRequest(BaseModel):
    model: str
    messages: List[Message]
    temperature: float = 0.7
    max_tokens: int = 2000


class ChatResponse(BaseModel):
    content: str
    model: str
    usage: Optional[Dict[str, Any]] = None


class ConversationBase(BaseModel):
    title: str = "New Conversation"
    model: str = "gpt-4o-mini"


class ConversationCreate(ConversationBase):
    pass


class ConversationResponse(ConversationBase):
    id: str
    user_id: Optional[str] = None
    messages: List[Dict[str, str]] = []
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True


class ModelInfo(BaseModel):
    id: str
    name: str
    provider: str


class ModelsResponse(BaseModel):
    models: List[ModelInfo]
