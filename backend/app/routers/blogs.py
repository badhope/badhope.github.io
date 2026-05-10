from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
import httpx
from app.core.database import get_db
from app.models.blog import Blog

router = APIRouter()

RSS_SOURCES = {
    "csdn": "https://blog.csdn.net/weixin_56622231/rss/list",
    "juejin": "https://rsshub.app/juejin/user/2350111542479753"
}


@router.get("/")
async def get_blogs(source: Optional[str] = None, limit: int = 10):
    blogs = []
    sources = [source] if source else list(RSS_SOURCES.keys())
    
    for src in sources:
        if src == "csdn":
            try:
                async with httpx.AsyncClient() as client:
                    response = await client.get(
                        RSS_SOURCES[src],
                        timeout=10.0,
                        headers={"User-Agent": "Mozilla/5.0"}
                    )
                    if response.status_code == 200:
                        import xml.etree.ElementTree as ET
                        root = ET.fromstring(response.text)
                        channel = root.find("channel")
                        if channel is not None:
                            for item in channel.findall("item")[:limit]:
                                title = item.findtext("title", "")
                                link = item.findtext("link", "")
                                pub_date = item.findtext("pubDate", "")
                                blogs.append({
                                    "title": title,
                                    "url": link,
                                    "source": "CSDN",
                                    "published_at": pub_date
                                })
            except Exception:
                pass
        
        elif src == "juejin":
            try:
                async with httpx.AsyncClient() as client:
                    response = await client.get(
                        RSS_SOURCES[src],
                        timeout=10.0
                    )
                    if response.status_code == 200:
                        import xml.etree.ElementTree as ET
                        root = ET.fromstring(response.text)
                        channel = root.find("channel")
                        if channel is not None:
                            for item in channel.findall("item")[:limit]:
                                title = item.findtext("title", "")
                                link = item.findtext("link", "")
                                pub_date = item.findtext("pubDate", "")
                                blogs.append({
                                    "title": title,
                                    "url": link,
                                    "source": "掘金",
                                    "published_at": pub_date
                                })
            except Exception:
                pass
    
    return blogs[:limit]
