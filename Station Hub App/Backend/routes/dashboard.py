from fastapi import APIRouter, Depends
from middleware.auth_middleware import get_current_user
import services.dashboard_service as dashboard_service

router = APIRouter(prefix="/dashboard", tags=["Dashboard"])

@router.get("/stats")
async def get_dashboard_stats(current_user: dict = Depends(get_current_user)):
    return await dashboard_service.get_dashboard_stats(current_user["sub"])