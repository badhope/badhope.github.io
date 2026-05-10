import io
import base64
import json
import re
import uuid
import string
import random
from fastapi import APIRouter
from app.schemas.tool import (
    QRGenerateRequest, QRGenerateResponse,
    URLShortenRequest, URLShortenResponse,
    JSONFormatRequest,
    Base64Request, Base64Response,
    PasswordGenerateRequest, PasswordGenerateResponse,
    RegexTestRequest, RegexTestResponse,
)

router = APIRouter()

URL_MAP = {}


@router.post("/qr/generate", response_model=QRGenerateResponse)
async def generate_qr(request: QRGenerateRequest):
    try:
        import qrcode
        from PIL import Image
        qr = qrcode.QRCode(version=1, box_size=10, border=4)
        qr.add_data(request.content)
        qr.make(fit=True)
        img = qr.make_image(fill_color="black", back_color="white")
        img = img.resize((request.size, request.size))
        buffer = io.BytesIO()
        img.save(buffer, format="PNG")
        img_str = base64.b64encode(buffer.getvalue()).decode()
        return {"image": f"data:image/png;base64,{img_str}"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/json/format")
async def format_json(request: JSONFormatRequest):
    try:
        data = json.loads(request.json_str)
        if request.minify:
            result = json.dumps(data, separators=(',', ':'))
        else:
            result = json.dumps(data, indent=2, ensure_ascii=False)
        return {"result": result, "valid": True}
    except json.JSONDecodeError as e:
        return {"result": None, "valid": False, "error": str(e)}


@router.post("/base64/encode", response_model=Base64Response)
async def base64_encode(request: Base64Request):
    encoded = base64.b64encode(request.text.encode()).decode()
    return {"result": encoded}


@router.post("/base64/decode", response_model=Base64Response)
async def base64_decode(request: Base64Request):
    try:
        decoded = base64.b64decode(request.text.encode()).decode()
        return {"result": decoded}
    except Exception:
        raise HTTPException(status_code=400, detail="Invalid Base64 string")


@router.post("/password/generate", response_model=PasswordGenerateResponse)
async def generate_password(request: PasswordGenerateRequest):
    chars = string.ascii_letters
    if request.include_numbers:
        chars += string.digits
    if request.include_special:
        chars += string.punctuation
    password = ''.join(random.choice(chars) for _ in range(request.length))
    return {"password": password}


@router.post("/regex/test", response_model=RegexTestResponse)
async def test_regex(request: RegexTestRequest):
    try:
        pattern = re.compile(request.pattern)
        matches = []
        for match in pattern.finditer(request.test_string):
            matches.append({
                "match": match.group(),
                "start": match.start(),
                "end": match.end(),
                "groups": list(match.groups()) if match.groups() else []
            })
        return {"is_valid": True, "matches": matches}
    except re.error as e:
        return {"is_valid": False, "matches": [], "error": str(e)}


@router.post("/url/shorten", response_model=URLShortenResponse)
async def shorten_url(request: URLShortenRequest):
    short_id = str(uuid.uuid4())[:8]
    URL_MAP[short_id] = request.url
    return {
        "short_url": f"https://bhope.dev/s/{short_id}",
        "original_url": request.url
    }


@router.get("/url/resolve/{short_id}")
async def resolve_url(short_id: str):
    if short_id not in URL_MAP:
        raise HTTPException(status_code=404, detail="URL not found")
    return {"url": URL_MAP[short_id]}


from fastapi import HTTPException
