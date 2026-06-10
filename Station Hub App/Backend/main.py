from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import auth
from routes import profile
from routes import stations
from routes import bookings
from routes import settings
from routes import dashboard
from routes import services 

app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router)
app.include_router(profile.router)
app.include_router(stations.router)
app.include_router(bookings.router)
app.include_router(settings.router)
app.include_router(dashboard.router)
app.include_router(services.router) 


@app.get("/")
async def root():
    return {"message": "Station Hub API is running", "version": "1.0.0"}


@app.get("/health")
async def health():
    return {"status": "ok"}