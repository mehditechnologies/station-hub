from pydantic import BaseModel
from typing import Optional

class ShopInfoRequest(BaseModel):
    shop_name: Optional[str] = None
    address: Optional[str] = None
    phone: Optional[str] = None
    email: Optional[str] = None
    category: Optional[str] = None
    description: Optional[str] = None

class AvailabilityRequest(BaseModel):
    mon_fri_open: Optional[str] = None
    mon_fri_close: Optional[str] = None
    sat_open: Optional[str] = None
    sat_close: Optional[str] = None
    sun_off: Optional[bool] = None
    break_start: Optional[str] = None
    break_end: Optional[str] = None
    slot_duration: Optional[str] = None
    max_bookings: Optional[int] = None

class PaymentRequest(BaseModel):
    account_holder: Optional[str] = None
    bank_name: Optional[str] = None
    account_number: Optional[str] = None
    iban: Optional[str] = None

class ThemeRequest(BaseModel):
    theme: Optional[str] = None  # "light" or "dark"