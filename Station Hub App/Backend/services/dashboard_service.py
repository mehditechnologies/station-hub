from fastapi import HTTPException
from config.firebase import db
from datetime import datetime


async def get_dashboard_stats(user_id: str) -> dict:
    # ── Fetch all collections ──────────────────────────────
    bookings_docs = list(db.collection("bookings").stream())
    stations_docs = list(db.collection("stations").stream())
    users_docs    = list(db.collection("users").stream())

    bookings = [{"id": d.id, **d.to_dict()} for d in bookings_docs]
    today    = datetime.utcnow().strftime("%Y-%m-%d")

    # ── Stats ──────────────────────────────────────────────
    total_bookings  = len(bookings)
    total_stations  = len(stations_docs)
    total_users     = len(users_docs)

    todays_earnings = sum(
        float(b.get("price", 0) or 0)
        for b in bookings
        if b.get("status") == "completed"
        and str(b.get("travel_date", "")).startswith(today)
    )

    # ── Pending bookings ───────────────────────────────────
    pending_bookings = [
        _fmt(b) for b in bookings
        if b.get("status") == "pending"
    ]

    # ── Confirmed bookings ─────────────────────────────────
    confirmed_bookings = [
        _fmt(b) for b in bookings
        if b.get("status") == "confirmed"
    ]

    # ── Recent 10 bookings ─────────────────────────────────
    sorted_bookings = sorted(
        bookings,
        key=lambda b: b.get("created_at", ""),
        reverse=True
    )
    recent_bookings = [_fmt(b) for b in sorted_bookings[:10]]

    return {
        "stats": {
            "total_bookings":  total_bookings,
            "total_stations":  total_stations,
            "total_users":     total_users,
            "todays_earnings": todays_earnings,
        },
        "pending_bookings":   pending_bookings,
        "confirmed_bookings": confirmed_bookings,
        "recent_bookings":    recent_bookings,
    }


async def update_booking_status(booking_id: str, status: str) -> dict:
    allowed = {"confirmed", "rejected", "completed", "cancelled"}
    if status not in allowed:
        raise HTTPException(status_code=400, detail=f"Invalid status. Must be one of: {allowed}")

    doc_ref = db.collection("bookings").document(booking_id)
    doc = doc_ref.get()

    if not doc.exists:
        raise HTTPException(status_code=404, detail="Booking not found")

    doc_ref.update({"status": status})
    return {"message": f"Booking marked as {status}", "booking_id": booking_id}


def _fmt(b: dict) -> dict:
    return {
        "id":            b.get("id", ""),
        "user_name":     b.get("user_name", "Unknown"),
        "service_id":    b.get("service_id", ""),
        "from_location": b.get("from_location", ""),
        "to_location":   b.get("to_location", ""),
        "travel_date":   b.get("travel_date", ""),
        "travel_time":   b.get("travel_time", ""),
        "price":         float(b.get("price", 0) or 0),
        "car":           b.get("car", ""),
        "status":        b.get("status", ""),
        "created_at":    b.get("created_at", ""),
    }