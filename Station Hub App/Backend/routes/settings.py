from fastapi import APIRouter, Depends
from middleware.auth_middleware import get_current_user
from schemas.settings_schemas import ShopInfoRequest, AvailabilityRequest, PaymentRequest, ThemeRequest
import services.settings_service as settings_service

router = APIRouter(prefix="/settings", tags=["Settings"])

@router.get("/")
async def get_settings(current_user: dict = Depends(get_current_user)):
    return await settings_service.get_settings(current_user["sub"])

@router.put("/shop-info")
async def update_shop_info(body: ShopInfoRequest, current_user: dict = Depends(get_current_user)):
    return await settings_service.update_section(body, current_user["sub"])

@router.put("/availability")
async def update_availability(body: AvailabilityRequest, current_user: dict = Depends(get_current_user)):
    return await settings_service.update_section(body, current_user["sub"])

@router.put("/payment")
async def update_payment(body: PaymentRequest, current_user: dict = Depends(get_current_user)):
    return await settings_service.update_section(body, current_user["sub"])

@router.put("/theme")
async def update_theme(body: ThemeRequest, current_user: dict = Depends(get_current_user)):
    return await settings_service.update_section(body, current_user["sub"])