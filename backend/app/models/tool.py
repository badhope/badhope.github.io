import uuid
from datetime import datetime
from sqlalchemy import Column, String, DateTime, Boolean, Integer, JSON
from sqlalchemy.types import CHAR
from app.core.database import Base


class Tool(Base):
    __tablename__ = "tools"

    id = Column(CHAR(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    slug = Column(String(50), unique=True, nullable=False, index=True)
    name = Column(String(100), nullable=False)
    description = Column(String(500), nullable=False)
    category = Column(String(50), nullable=False)
    icon = Column(String(10), nullable=False)
    is_ai = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.utcnow)


class AIConversation(Base):
    __tablename__ = "ai_conversations"

    id = Column(CHAR(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    user_id = Column(CHAR(36), nullable=True)
    title = Column(String(200), default="New Conversation")
    model = Column(String(50), nullable=False)
    messages = Column(JSON, default=list)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
