from datetime import datetime, timedelta

from app import app
from models import db, Ticket

def seed_tickets():
    print("Seeding database...")

    # Clear existing tickets
    Ticket.query.delete()
    db.session.commit()

    now = datetime.utcnow()

    tickets = [
        Ticket(
            title="Login not working",
            description="User cannot log in with correct credentials",
            status="open",
            priority="high",
            created_at=now - timedelta(days=5)  
        ),
        Ticket(
            title="Dashboard loading slowly",
            description="Performance issue on dashboard",
            status="in_progress",
            priority="medium",
            created_at=now - timedelta(days=4)  
        ),
        Ticket(
            title="Typo on homepage",
            description="Minor spelling issue",
            status="open",
            priority="low",
            created_at=now - timedelta(hours=5)
        ),
        Ticket(
            title="Password reset email not sent",
            description="Email service not responding",
            status="resolved",
            priority="high",
            created_at=now - timedelta(days=10)
        ),
        Ticket(
            title="Profile picture upload fails",
            description="Image upload returns error",
            status="open",
            priority="medium",
            created_at=now - timedelta(days=2)
        ),
        Ticket(
            title="Mobile layout broken",
            description="UI overlaps on mobile screens",
            status="in_progress",
            priority="high",
            created_at=now - timedelta(days=1)
        ),
        Ticket(
            title="Search returns no results",
            description="Search API not matching keywords",
            status="open",
            priority="high",
            created_at=now - timedelta(days=6)  # OVERDUE
        ),
        Ticket(
            title="Notifications delayed",
            description="Push notifications arrive late",
            status="resolved",
            priority="medium",
            created_at=now - timedelta(days=3)
        ),
        Ticket(
            title="Settings page crashes",
            description="500 error when opening settings",
            status="open",
            priority="high",
            created_at=now - timedelta(days=7)  # OVERDUE
        ),
        Ticket(
            title="Dark mode request",
            description="User asked for dark mode feature",
            status="open",
            priority="low",
            created_at=now - timedelta(hours=1)
        ),
    ]

    db.session.add_all(tickets)
    db.session.commit()

    print(f"✅ Seeded {len(tickets)} tickets")

if __name__ == "__main__":
    with app.app_context():
        seed_tickets()
