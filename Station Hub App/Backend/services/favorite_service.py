from fastapi import HTTPException
from config.firebase import db
from datetime import datetime


async def add_favorite(service_id: str, user_id: str) -> dict:
    service_doc = db.collection("services").document(service_id).get()
    if not service_doc.exists:
        raise HTTPException(status_code=404, detail="Service not found")

    fav_id = f"{user_id}_{service_id}"
    db.collection("favorites").document(fav_id).set({
        "user_id": user_id,
        "service_id": service_id,
        "created_at": datetime.utcnow().isoformat(),
    })
    return {"message": "Added to favorites"}


async def remove_favorite(service_id: str, user_id: str) -> dict:
    fav_id = f"{user_id}_{service_id}"
    db.collection("favorites").document(fav_id).delete()
    return {"message": "Removed from favorites"}


async def get_favorites(user_id: str) -> dict:
    docs = db.collection("favorites").where("user_id", "==", user_id).stream()
    fav_service_ids = [d.to_dict()["service_id"] for d in docs]

    services = []
    for sid in fav_service_ids:
        s_doc = db.collection("services").document(sid).get()
        if s_doc.exists:
            services.append({"id": s_doc.id, **s_doc.to_dict()})

    return {"services": services}