from fastapi import APIRouter, Depends
from middleware.auth_middleware import get_current_user
from schemas.favorite_schemas import FavoriteRequest
import services.favorite_service as favorite_service

router = APIRouter(prefix="/favorites", tags=["Favorites"])


@router.post("/")
async def add_favorite(body: FavoriteRequest, current_user: dict = Depends(get_current_user)):
    return await favorite_service.add_favorite(body.service_id, current_user["sub"])


@router.delete("/{service_id}")
async def remove_favorite(service_id: str, current_user: dict = Depends(get_current_user)):
    return await favorite_service.remove_favorite(service_id, current_user["sub"])


@router.get("/")
async def get_favorites(current_user: dict = Depends(get_current_user)):
    return await favorite_service.get_favorites(current_user["sub"])