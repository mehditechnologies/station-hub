import smtplib
import random
import string
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from dotenv import load_dotenv
import os

load_dotenv()

GMAIL_USER = os.getenv("GMAIL_USER")
GMAIL_APP_PASSWORD = os.getenv("GMAIL_APP_PASSWORD")


def generate_otp() -> str:
    return "".join(random.choices(string.digits, k=6))


def send_otp_email(to_email: str, otp: str) -> bool:
    try:
        msg = MIMEMultipart("alternative")
        msg["Subject"] = "Station Hub - Password Reset OTP"
        msg["From"] = GMAIL_USER
        msg["To"] = to_email

        html = f"""
        <html>
          <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 30px;">
            <div style="max-width: 400px; margin: auto; background: white; border-radius: 10px; padding: 30px;">
              <h2 style="color: #2c3e50;">Station Hub</h2>
              <p style="color: #555;">Use the OTP below to reset your password. It expires in <strong>10 minutes</strong>.</p>
              <div style="font-size: 36px; font-weight: bold; letter-spacing: 10px; color: #e74c3c; text-align: center; padding: 20px;">
                {otp}
              </div>
              <p style="color: #999; font-size: 12px;">If you did not request this, ignore this email.</p>
            </div>
          </body>
        </html>
        """

        msg.attach(MIMEText(html, "html"))

        with smtplib.SMTP_SSL("smtp.gmail.com", 465) as server:
            server.login(GMAIL_USER, GMAIL_APP_PASSWORD)
            server.sendmail(GMAIL_USER, to_email, msg.as_string())

        return True
    except Exception as e:
        print(f"Email error: {e}")
        return False
    


def send_booking_email(owner_email: str, booking: dict, station_name: str):
    try:
        msg = MIMEMultipart("alternative")
        msg["Subject"] = f"New Booking — {station_name}"
        msg["From"] = GMAIL_USER
        msg["To"] = owner_email

        html = f"""
        <div style="font-family: Arial, sans-serif; max-width: 500px; margin: 0 auto;">
            <div style="background: #f97316; padding: 20px; border-radius: 12px 12px 0 0;">
                <h2 style="color: white; margin: 0;">New Booking Received</h2>
            </div>
            <div style="background: #f9fafb; padding: 20px; border-radius: 0 0 12px 12px; border: 1px solid #e5e7eb;">
                <p style="color: #374151; font-size: 14px;">You have a new booking at <strong>{station_name}</strong>.</p>
                <table style="width: 100%; border-collapse: collapse; margin-top: 12px;">
                    <tr style="border-bottom: 1px solid #e5e7eb;">
                        <td style="padding: 8px 0; color: #6b7280; font-size: 13px;">From</td>
                        <td style="padding: 8px 0; color: #111827; font-size: 13px; font-weight: 600;">{booking.get("from_location", "")}</td>
                    </tr>
                    <tr style="border-bottom: 1px solid #e5e7eb;">
                        <td style="padding: 8px 0; color: #6b7280; font-size: 13px;">To</td>
                        <td style="padding: 8px 0; color: #111827; font-size: 13px; font-weight: 600;">{booking.get("to_location", "")}</td>
                    </tr>
                    <tr style="border-bottom: 1px solid #e5e7eb;">
                        <td style="padding: 8px 0; color: #6b7280; font-size: 13px;">Date</td>
                        <td style="padding: 8px 0; color: #111827; font-size: 13px; font-weight: 600;">{booking.get("travel_date", "")}</td>
                    </tr>
                    <tr style="border-bottom: 1px solid #e5e7eb;">
                        <td style="padding: 8px 0; color: #6b7280; font-size: 13px;">Time</td>
                        <td style="padding: 8px 0; color: #111827; font-size: 13px; font-weight: 600;">{booking.get("travel_time", "")}</td>
                    </tr>
                    <tr>
                        <td style="padding: 8px 0; color: #6b7280; font-size: 13px;">Seats</td>
                        <td style="padding: 8px 0; color: #111827; font-size: 13px; font-weight: 600;">{booking.get("seat_count", "")}</td>
                    </tr>
                </table>
                <p style="color: #9ca3af; font-size: 12px; margin-top: 16px;">This is an automated notification from StationHub.</p>
            </div>
        </div>
        """

        msg.attach(MIMEText(html, "html"))

        with smtplib.SMTP_SSL("smtp.gmail.com", 465) as server:
            server.login(GMAIL_USER, GMAIL_APP_PASSWORD)
            server.sendmail(GMAIL_USER, owner_email, msg.as_string())

    except Exception as e:
        print(f"Booking email failed: {e}")
