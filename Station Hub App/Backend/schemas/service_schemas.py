from pydantic import BaseModel
from typing import Optional


class ServiceRequest(BaseModel):
    name: str
    price: float
    duration: str
    description: Optional[str] = ""
    status: Optional[str] = "Active"
    rating: Optional[float] = None
    image_url: Optional[str] = None