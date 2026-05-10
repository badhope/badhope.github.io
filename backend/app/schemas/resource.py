from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime


class CategoryBase(BaseModel):
    name: str
    slug: str
    icon: str


class CategoryResponse(CategoryBase):
    id: str
    order: int

    class Config:
        from_attributes = True


class ResourceBase(BaseModel):
    url: str
    title: str
    description: Optional[str] = None
    icon: Optional[str] = None
    category_id: str
    tags: Optional[List[str]] = []


class ResourceCreate(ResourceBase):
    is_public: bool = True


class ResourceUpdate(BaseModel):
    url: Optional[str] = None
    title: Optional[str] = None
    description: Optional[str] = None
    icon: Optional[str] = None
    category_id: Optional[str] = None
    is_public: Optional[bool] = None
    tags: Optional[List[str]] = None


class ResourceResponse(ResourceBase):
    id: str
    is_public: bool
    user_id: Optional[str] = None
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True
