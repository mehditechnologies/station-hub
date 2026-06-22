from pydantic import BaseModel
from typing import Optional


class BookingRequest(BaseModel):
    station_id: str
    travel_date: str
    travel_time: str
    vehicle_type: str
    vehicle_brand: str
    vehicle_number: str
    special_request: Optional[str] = ""
    service_id: Optional[str] = None
    tier: Optional[str] = None