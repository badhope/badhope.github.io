from pydantic import BaseModel
from typing import Optional, List, Dict, Any
from datetime import datetime


class ToolResponse(BaseModel):
    id: str
    slug: str
    name: str
    description: str
    category: str
    icon: str
    is_ai: bool

    class Config:
        from_attributes = True


class QRGenerateRequest(BaseModel):
    content: str
    size: int = 200


class QRGenerateResponse(BaseModel):
    image: str


class QRReadRequest(BaseModel):
    image: str


class URLShortenRequest(BaseModel):
    url: str


class URLShortenResponse(BaseModel):
    short_url: str
    original_url: str


class JSONFormatRequest(BaseModel):
    json_str: str
    minify: bool = False


class Base64Request(BaseModel):
    text: str


class Base64Response(BaseModel):
    result: str


class PasswordGenerateRequest(BaseModel):
    length: int = 16
    include_numbers: bool = True
    include_special: bool = True


class PasswordGenerateResponse(BaseModel):
    password: str


class RegexTestRequest(BaseModel):
    pattern: str
    test_string: str


class RegexTestResponse(BaseModel):
    is_valid: bool
    matches: List[Dict[str, Any]] = []
    error: Optional[str] = None
