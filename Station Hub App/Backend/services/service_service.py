from fastapi import HTTPException
from config.firebase import db
from schemas.service_schemas import ServiceRequest
from datetime import datetime


async def get_all_services(user_id: str) -> dict:
    docs = db.collection("services").where("owner_id", "==", user_id).stream()
    services = [{"id": d.id, **d.to_dict()} for d in docs]
    services.sort(key=lambda x: x.get("created_at", ""), reverse=True)
    return {"services": services}


async def add_service(body: ServiceRequest, user_id: str) -> dict:
    data = body.dict()
    data["owner_id"] = user_id
    data["created_at"] = datetime.utcnow().isoformat()
    ref = db.collection("services").add(data)
    return {"message": "Service added", "service": {"id": ref[1].id, **data}}


async def update_service(service_id: str, body: ServiceRequest, user_id: str) -> dict:
    doc_ref = db.collection("services").document(service_id)
    doc = doc_ref.get()
    if not doc.exists:
        raise HTTPException(status_code=404, detail="Service not found")
    if doc.to_dict().get("owner_id") != user_id:
        raise HTTPException(status_code=403, detail="Access denied")
    data = body.dict()
    data["updated_at"] = datetime.utcnow().isoformat()
    doc_ref.update(data)
    return {"message": "Service updated", "service": {"id": service_id, **data}}


async def delete_service(service_id: str, user_id: str) -> dict:
    doc_ref = db.collection("services").document(service_id)
    doc = doc_ref.get()
    if not doc.exists:
        raise HTTPException(status_code=404, detail="Service not found")
    if doc.to_dict().get("owner_id") != user_id:
        raise HTTPException(status_code=403, detail="Access denied")
    doc_ref.delete()
    return {"message": "Service deleted"}