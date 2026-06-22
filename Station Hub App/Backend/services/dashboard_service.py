from fastapi import HTTPException
from config.firebase import db
from datetime import datetime


async def get_dashboard_stats(user_id: str) -> dict:
    # ── Fetch only this owner's stations ──────────────────
    stations_docs = list(db.collection("stations").where("owner_id", "==", user_id).stream())
    station_ids = [d.id for d in stations_docs]
    station_names = {d.id: d.to_dict().get("name", "") for d in stations_docs}

    # ── Fetch only bookings for this owner's stations ─────
    if station_ids:
        bookings_docs = []
        # Firestore 'in' query supports max 30 items at a time
        for i in range(0, len(station_ids), 30):
            chunk = station_ids[i:i+30]
            docs = list(db.collection("bookings").where("station_id", "in", chunk).stream())
            bookings_docs.extend(docs)
    else:
        bookings_docs = []

    # ── Fetch all users (for count) ────────────────────────
    users_docs = list(db.collection("users").stream())

    bookings = [{"id": d.id, **d.to_dict()} for d in bookings_docs]
    today = datetime.utcnow().strftime("%Y-%m-%d")

    # ── Stats ──────────────────────────────────────────────
    total_bookings = len(bookings)
    total_stations = len(stations_docs)
    total_users    = len(users_docs)

    todays_earnings = sum(
        _get_price(b)
        for b in bookings
        if b.get("status") == "completed"
        and str(b.get("travel_date", "")).startswith(today)
    )

    # ── Pending bookings ───────────────────────────────────
    pending_bookings = [
        _fmt(b, station_names) for b in bookings
        if b.get("status") == "pending"
    ]

    # ── Confirmed bookings ─────────────────────────────────
    confirmed_bookings = [
        _fmt(b, station_names) for b in bookings
        if b.get("status") == "confirmed"
    ]

    # ── Recent 10 bookings ─────────────────────────────────
    sorted_bookings = sorted(
        bookings,
        key=lambda b: b.get("created_at", ""),
        reverse=True
    )
    recent_bookings = [_fmt(b, station_names) for b in sorted_bookings[:10]]

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


def _get_price(b: dict) -> float:
    service_id = b.get("service_id")
    tier = b.get("tier")
    if not service_id or not tier:
        return 0.0
    service_doc = db.collection("services").document(service_id).get()
    if not service_doc.exists:
        return 0.0
    tiers = service_doc.to_dict().get("tiers", {})
    tier_data = tiers.get(tier)
    if not tier_data:
        return 0.0
    return float(tier_data.get("price", 0) or 0)


def _fmt(b: dict, station_names: dict) -> dict:
    user_name = "Unknown"
    user_profile_image = ""
    user_id = b.get("user_id")
    if user_id:
        user_doc = db.collection("users").document(user_id).get()
        if user_doc.exists:
            user_data = user_doc.to_dict()
            user_name = user_data.get("full_name", "Unknown")
            user_profile_image = user_data.get("profile_image", "")

    service_name = ""
    service_id = b.get("service_id")
    if service_id:
        service_doc = db.collection("services").document(service_id).get()
        if service_doc.exists:
            service_name = service_doc.to_dict().get("name", "")

    return {
        "id":             b.get("id", ""),
        "user_name":      user_name,
        "user_profile_image": user_profile_image,
        "service_id":     service_id or "",
        "service_name":   service_name,
        "station_name":   station_names.get(b.get("station_id", ""), ""),
        "tier":           b.get("tier", ""),
        "travel_date":    b.get("travel_date", ""),
        "travel_time":    b.get("travel_time", ""),
        "vehicle_type":   b.get("vehicle_type", ""),
        "vehicle_brand":  b.get("vehicle_brand", ""),
        "vehicle_number": b.get("vehicle_number", ""),
        "special_request": b.get("special_request", ""),
        "price":          _get_price(b),
        "status":         b.get("status", ""),
        "created_at":     b.get("created_at", ""),
    }