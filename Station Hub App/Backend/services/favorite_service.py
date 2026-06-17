from fastapi import HTTPException
from config.firebase import db
from datetime import datetime


async def add_favorite(service_id: str, tier: str, user_id: str) -> dict:
    service_doc = db.collection("services").document(service_id).get()
    if not service_doc.exists:
        raise HTTPException(status_code=404, detail="Service not found")

    fav_id = f"{user_id}_{service_id}_{tier}"
    db.collection("favorites").document(fav_id).set({
        "user_id": user_id,
        "service_id": service_id,
        "tier": tier,
        "created_at": datetime.utcnow().isoformat(),
    })
    return {"message": "Added to favorites"}


async def remove_favorite(service_id: str, tier: str, user_id: str) -> dict:
    fav_id = f"{user_id}_{service_id}_{tier}"
    db.collection("favorites").document(fav_id).delete()
    return {"message": "Removed from favorites"}


async def get_favorites(user_id: str) -> dict:
    docs = db.collection("favorites").where("user_id", "==", user_id).stream()
    fav_entries = [d.to_dict() for d in docs]

    results = []
    for entry in fav_entries:
        s_doc = db.collection("services").document(entry["service_id"]).get()
        if s_doc.exists:
            service_data = s_doc.to_dict()
            results.append({
                "id": s_doc.id,
                "tier": entry["tier"],
                **service_data,
            })

    return {"services": results}