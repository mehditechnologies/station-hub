from pydantic import BaseModel


class FavoriteRequest(BaseModel):
    service_id: str