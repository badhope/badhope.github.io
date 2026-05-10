import uuid
from datetime import datetime
from sqlalchemy import Column, String, DateTime, Integer, Boolean, Text, ForeignKey
from sqlalchemy.types import CHAR
from app.core.database import Base


class Category(Base):
    __tablename__ = "categories"

    id = Column(CHAR(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    name = Column(String(50), nullable=False)
    slug = Column(String(50), unique=True, nullable=False, index=True)
    icon = Column(String(10), nullable=False)
    order = Column(Integer, default=0)
    created_at = Column(DateTime, default=datetime.utcnow)


class Resource(Base):
    __tablename__ = "resources"

    id = Column(CHAR(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    url = Column(String(500), nullable=False)
    title = Column(String(200), nullable=False)
    description = Column(Text, nullable=True)
    icon = Column(String(500), nullable=True)
    category_id = Column(CHAR(36), ForeignKey("categories.id"), nullable=False)
    user_id = Column(CHAR(36), ForeignKey("users.id"), nullable=True)
    is_public = Column(Boolean, default=True)
    tags = Column(String(500), nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
