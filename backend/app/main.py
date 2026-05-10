from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.core.database import engine, Base
from app.models.user import User
from app.models.resource import Category, Resource
from app.models.tool import Tool, AIConversation
from app.models.blog import Blog

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION,
    description="Personal Hub API - Tools, Resources, AI",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def root():
    return {"message": "Welcome to BadHope's Hub API", "version": settings.VERSION}


@app.get("/health")
async def health():
    return {"status": "healthy"}


from app.routers import auth, tools, resources, ai, users, blogs

app.include_router(auth.router, prefix=f"{settings.API_PREFIX}/auth", tags=["auth"])
app.include_router(tools.router, prefix=f"{settings.API_PREFIX}/tools", tags=["tools"])
app.include_router(resources.router, prefix=f"{settings.API_PREFIX}/resources", tags=["resources"])
app.include_router(ai.router, prefix=f"{settings.API_PREFIX}/ai", tags=["ai"])
app.include_router(users.router, prefix=f"{settings.API_PREFIX}/users", tags=["users"])
app.include_router(blogs.router, prefix=f"{settings.API_PREFIX}/blogs", tags=["blogs"])
