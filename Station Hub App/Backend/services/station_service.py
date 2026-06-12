
from fastapi import HTTPException
from config.firebase import db


async def get_all_stations() -> dict:
    docs = db.collection("stations").stream()
    stations = []
    for doc in docs:
        data = doc.to_dict()
        data["id"] = doc.id
        stations.append(data)
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
    doc_ref = db.collection("stations").add(data)
    return {"message": "Station added", "id": doc_ref[1].id}