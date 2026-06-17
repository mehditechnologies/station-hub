# from pydantic import BaseModel
# from typing import Optional, List


# class ServiceRequest(BaseModel):
#     name: str
#     price: float
#     duration: str
#     description: Optional[str] = ""
#     status: Optional[str] = "Active"
#     rating: Optional[float] = None
#     image_url: Optional[str] = None
#     station_ids: Optional[List[str]] = [] 


from pydantic import BaseModel, validator
from typing import Optional, List, Dict


class TierDetail(BaseModel):
    price: float
    duration: str


class ServiceRequest(BaseModel):
    name: str
    tiers: Dict[str, TierDetail]
    description: Optional[str] = ""
    status: Optional[str] = "Active"
    rating: Optional[float] = None
    image_url: Optional[str] = None
    station_ids: Optional[List[str]] = []

    @validator("tiers")
    def at_least_one_tier(cls, v):
        if not v:
            raise ValueError("At least one tier (base or premium) is required")
        allowed = {"base", "premium"}
        invalid = set(v.keys()) - allowed
        if invalid:
            raise ValueError(f"Invalid tier name(s): {', '.join(invalid)}")
        return v