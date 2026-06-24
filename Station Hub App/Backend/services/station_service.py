
from fastapi import HTTPException
from config.firebase import db
from datetime import datetime


async def get_all_stations() -> dict:
    docs = db.collection("stations").stream()
    stations = []
    for doc in docs:
        data = doc.to_dict()
        data["id"] = doc.id
        stations.append(data)
    return {"stations": stations}

async def get_public_stations() -> dict:
    docs = db.collection("stations").where("status", "==", "Active").stream()
    stations = []
    for doc in docs:
        data = doc.to_dict()
        data["id"] = doc.id
        stations.append(data)
    stations.sort(key=lambda x: x.get("created_at", ""), reverse=True)
    return {"stations": stations}


async def search_stations(q: str) -> dict:
    docs = db.collection("stations").stream()
    results = []
    for doc in docs:
        data = doc.to_dict()
        data["id"] = doc.id
        name = data.get("name", "").lower()
        if q.lower() in name:
            results.append(data)
    return {"stations": results}


async def get_station_by_id(station_id: str) -> dict:
    doc = db.collection("stations").document(station_id).get()
    if not doc.exists:
        raise HTTPException(status_code=404, detail="Station not found")
    data = doc.to_dict()
    data["id"] = doc.id
    return {"station": data}


async def add_station(body) -> dict:
    data = body.model_dump()
    data["created_at"] = datetime.utcnow().isoformat()
    doc_ref = db.collection("stations").add(data)
    return {"message": "Station added", "id": doc_ref[1].id}

async def rate_station(station_id: str, user_id: str, rating: int) -> dict:
    if rating < 1 or rating > 5:
        raise HTTPException(status_code=400, detail="Rating must be between 1 and 5")

    doc_ref = db.collection("stations").document(station_id)
    doc = doc_ref.get()
    if not doc.exists:
        raise HTTPException(status_code=404, detail="Station not found")

    data = doc.to_dict()
    ratings = data.get("ratings", {})
    
    # save user's rating
    ratings[user_id] = rating

    # recalculate average
    avg = round(sum(ratings.values()) / len(ratings), 1)
    count = len(ratings)

    doc_ref.update({
        f"ratings.{user_id}": rating,
        "avg_rating": avg,
        "rating_count": count,
    })

    return {"avg_rating": avg, "rating_count": count, "user_rating": rating}