from fastapi import APIRouter, Depends
from middleware.auth_middleware import get_current_user
from schemas.service_schemas import ServiceRequest
import services.service_service as service_service

router = APIRouter(prefix="/services", tags=["Services"])


@router.get("/")
async def get_services(current_user: dict = Depends(get_current_user)):
    return await service_service.get_all_services(current_user["sub"])


@router.post("/")
async def add_service(body: ServiceRequest, current_user: dict = Depends(get_current_user)):
    return await service_service.add_service(body, current_user["sub"])


@router.put("/{service_id}")
async def update_service(service_id: str, body: ServiceRequest, current_user: dict = Depends(get_current_user)):
    return await service_service.update_service(service_id, body, current_user["sub"])


@router.delete("/{service_id}")
async def delete_service(service_id: str, current_user: dict = Depends(get_current_user)):
    return await service_service.delete_service(service_id, current_user["sub"])