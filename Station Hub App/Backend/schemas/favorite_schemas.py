from pydantic import BaseModel, validator


class FavoriteRequest(BaseModel):
    service_id: str
    tier: str

    @validator("tier")
    def valid_tier(cls, v):
        if v not in ("base", "premium"):
            raise ValueError("tier must be 'base' or 'premium'")
        return v