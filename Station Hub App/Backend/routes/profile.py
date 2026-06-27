from fastapi import APIRouter, Depends, UploadFile, File
from middleware.auth_middleware import get_current_user
from schemas.profile_schemas import UpdateProfileRequest, PrivacyAgreementRequest
import services.profile_service as profile_service

router = APIRouter(prefix="/profile", tags=["Profile"])


@router.get("/")
async def get_profile(current_user: dict = Depends(get_current_user)):
    return await profile_service.get_profile(current_user["sub"])


@router.put("/")
async def update_profile(body: UpdateProfileRequest, current_user: dict = Depends(get_current_user)):
    return await profile_service.update_profile(body, current_user["sub"])

@router.put("/privacy-agreement")
async def update_privacy_agreement(body: PrivacyAgreementRequest, current_user: dict = Depends(get_current_user)):
    return await profile_service.update_privacy_agreement(body.agreed, current_user["sub"])


@router.delete("/")
async def delete_account(current_user: dict = Depends(get_current_user)):
    return await profile_service.delete_account(current_user["sub"])


@router.post("/upload-avatar")
async def upload_avatar(file: UploadFile = File(...), current_user: dict = Depends(get_current_user)):
    return await profile_service.upload_avatar(file, current_user["sub"])