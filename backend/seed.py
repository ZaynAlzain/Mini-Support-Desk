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
            created_at=now - timedelta(days=5),
        ),
        Ticket(
            title="Dashboard loading slowly",
            description="Performance issue on dashboard page",
            status="in_progress",
            priority="medium",
            created_at=now - timedelta(days=4),
        ),
        Ticket(
            title="Typo on homepage",
            description="Minor spelling issue in hero section",
            status="open",
            priority="low",
            created_at=now - timedelta(hours=2),
        ),
        Ticket(
            title="Password reset email not sent",
            description="Email service not responding",
            status="resolved",
            priority="high",
            created_at=now - timedelta(days=2),
        ),
        Ticket(
            title="Profile picture upload fails",
            description="Image upload returns server error",
            status="open",
            priority="medium",
            created_at=now - timedelta(days=2),
        ),
        Ticket(
            title="Mobile layout broken",
            description="UI overlaps on small screens",
            status="in_progress",
            priority="high",
            created_at=now - timedelta(days=1),
        ),
        Ticket(
            title="Search returns no results",
            description="Search API does not match keywords correctly",
            status="open",
            priority="high",
            created_at=now - timedelta(days=1),
        ),
        Ticket(
            title="Notifications delayed",
            description="Push notifications arrive minutes late",
            status="resolved",
            priority="medium",
            created_at=now - timedelta(days=2),
        ),
        Ticket(
            title="Settings page crashes",
            description="500 error when accessing settings",
            status="open",
            priority="high",
            created_at=now - timedelta(days=7),
        ),
        Ticket(
            title="Dark mode request",
            description="User requested dark mode feature",
            status="open",
            priority="low",
            created_at=now - timedelta(hours=1),
        ),
        Ticket(
            title="API timeout on reports",
            description="Reports API times out under load",
            status="in_progress",
            priority="high",
            created_at=now - timedelta(days=8),
        ),
        Ticket(
            title="Email verification broken",
            description="Verification links expired too early",
            status="open",
            priority="medium",
            created_at=now - timedelta(days=2),
        ),
        Ticket(
            title="Avatar alignment off",
            description="User avatar slightly misaligned",
            status="resolved",
            priority="low",
            created_at=now - timedelta(days=2),
        ),
        Ticket(
            title="Payments page blank",
            description="Payments page shows white screen",
            status="in_progress",
            priority="high",
            created_at=now - timedelta(days=2),
        ),
        Ticket(
            title="User role permissions wrong",
            description="Admins missing edit permissions",
            status="open",
            priority="high",
            created_at=now - timedelta(days=1),
        ),
        Ticket(
            title="Export CSV broken",
            description="CSV export contains malformed data",
            status="open",
            priority="medium",
            created_at=now - timedelta(days=1),
        ),
        Ticket(
            title="Loading spinner stuck",
            description="Spinner never disappears",
            status="resolved",
            priority="medium",
            created_at=now - timedelta(days=12),
        ),
        Ticket(
            title="Remember me not working",
            description="Session expires too fast",
            status="open",
            priority="low",
            created_at=now - timedelta(days=1),
        ),
        Ticket(
            title="Two-factor auth error",
            description="2FA code rejected incorrectly",
            status="in_progress",
            priority="high",
            created_at=now - timedelta(days=5),
        ),
        Ticket(
            title="Broken link in footer",
            description="Privacy policy link 404s",
            status="resolved",
            priority="low",
            created_at=now - timedelta(days=14),
        ),
        Ticket(
            title="User search slow",
            description="Search delay when many users exist",
            status="open",
            priority="medium",
            created_at=now - timedelta(days=6),
        ),
        Ticket(
            title="Charts not rendering",
            description="Graphs fail in Safari browser",
            status="in_progress",
            priority="high",
            created_at=now - timedelta(days=1),
        ),
        Ticket(
            title="Language switch resets state",
            description="Switching language logs user out",
            status="open",
            priority="high",
            created_at=now - timedelta(days=9),
        ),
        Ticket(
            title="Session logout randomly",
            description="User logged out without warning",
            status="open",
            priority="medium",
            created_at=now - timedelta(days=2),
        ),
        Ticket(
            title="Accessibility contrast issue",
            description="Text contrast fails WCAG guidelines",
            status="open",
            priority="low",
            created_at=now - timedelta(hours=67),
        ),
    ]

    db.session.add_all(tickets)
    db.session.commit()

    print(f"✅ Seeded {len(tickets)} tickets")


if __name__ == "__main__":
    with app.app_context():
        seed_tickets()
