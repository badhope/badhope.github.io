import uuid
from datetime import datetime
from sqlalchemy import Column, String, DateTime
from sqlalchemy.types import CHAR
from app.core.database import Base


class Blog(Base):
    __tablename__ = "blogs"

    id = Column(CHAR(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    title = Column(String(300), nullable=False)
    url = Column(String(500), nullable=False)
    source = Column(String(50), nullable=False)
    published_at = Column(DateTime, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
