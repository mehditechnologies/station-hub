from fastapi import HTTPException
from config.firebase import db
from pydantic import BaseModel

DEFAULTS = {
    "shop_name": "",
    "address": "",
    "phone": "",
    "email": "",
    "category": "Car Wash & Detailing",
    "description": "",
    "mon_fri_open": "09:00",
    "mon_fri_close": "18:00",
    "sat_open": "10:00",
    "sat_close": "17:00",
    "sun_off": True,
    "break_start": "13:00",
    "break_end": "14:00",
    "slot_duration": "30 mins",
    "max_bookings": 10,
    "account_holder": "",
    "bank_name": "",
    "account_number": "",
    "iban": "",
    "theme": "light",
}

async def get_settings(user_id: str) -> dict:
    doc = db.collection("shop_settings").document(user_id).get()
    if not doc.exists:
        # Create default settings doc for this user
        db.collection("shop_settings").document(user_id).set(DEFAULTS)
        return {"settings": DEFAULTS}
    return {"settings": doc.to_dict()}

async def update_section(body: BaseModel, user_id: str) -> dict:
    ref = db.collection("shop_settings").document(user_id)
    if not ref.get().exists:
        db.collection("shop_settings").document(user_id).set(DEFAULTS)
    update_data = {k: v for k, v in body.model_dump().items() if v is not None}
    if not update_data:
        raise HTTPException(status_code=400, detail="No data provided")
    ref.update(update_data)
    return {"message": "Settings updated successfully"}