from flask import Blueprint, request, jsonify
from models import db, Ticket
from datetime import datetime, timedelta

tickets_bp = Blueprint("tickets", __name__)


@tickets_bp.route("/api/tickets", methods=["GET"])
def get_tickets():
    query = Ticket.query

    # SEARCH
    q = request.args.get("q")
    if q:
        query = query.filter(
            Ticket.title.ilike(f"%{q}%") | Ticket.description.ilike(f"%{q}%")
        )

    # FILTERS
    status = request.args.get("status")
    if status:
        query = query.filter(Ticket.status == status)

    priority = request.args.get("priority")
    if priority:
        query = query.filter(Ticket.priority == priority)

    # SORTING
    sort = request.args.get("sort", "created_at")
    order = request.args.get("order", "desc")

    if sort not in ["created_at", "updated_at"]:
        sort = "created_at"

    column = getattr(Ticket, sort)

    if order == "asc":
        query = query.order_by(column.asc())
    else:
        query = query.order_by(column.desc())

    # OVERDUE FILTER
    overdue = request.args.get("overdue")

    if overdue == "true":
        cutoff = datetime.utcnow() - timedelta(hours=72)

        query = query.filter(Ticket.status != "resolved", Ticket.created_at < cutoff)

    # Pagination
    try:
        page = int(request.args.get("page", 1))
        limit = int(request.args.get("limit", 5))
    except ValueError:
        return {"error": "Invalid pagination parameters"}, 400
    total = query.count()
    tickets = query.offset((page - 1) * limit).limit(limit).all()

    cutoff = datetime.utcnow() - timedelta(hours=72)
    
    return {
        "items": [
            {
                "id": t.id,
                "title": t.title,
                "description": t.description,
                "status": t.status,
                "priority": t.priority,
                "created_at": t.created_at,
                "updated_at": t.updated_at,
                "overdue": (t.status != "resolved" and t.created_at < cutoff),
            }
            for t in tickets
        ],
        "page": page,
        "limit": limit,
        "total": total,
    }, 200


@tickets_bp.route("/api/tickets/<int:ticket_id>", methods=["GET"])
def get_ticket(ticket_id):
    ticket = Ticket.query.get(ticket_id)

    if not ticket:
        return {"error": "Ticket not found"}, 404

    return {
        "id": ticket.id,
        "title": ticket.title,
        "description": ticket.description,
        "status": ticket.status,
        "priority": ticket.priority,
        "created_at": ticket.created_at,
        "updated_at": ticket.updated_at,
    }, 200


@tickets_bp.route("/api/tickets/<int:ticket_id>", methods=["DELETE"])
def delete_ticket(ticket_id):
    ticket = Ticket.query.get(ticket_id)

    if not ticket:
        return {"error": "Ticket not found"}, 404

    db.session.delete(ticket)
    db.session.commit()

    return {"message": "Ticket deleted"}, 200


@tickets_bp.route("/api/tickets", methods=["POST"])
def create_ticket():
    data = request.json

    if not data or not data.get("title"):
        return {"error": "Title is required"}, 400

    ticket = Ticket(
        title=data["title"],
        description=data.get("description", ""),
        status=data.get("status", "open"),
        priority=data.get("priority", "medium"),
    )

    db.session.add(ticket)
    db.session.commit()

    return {"id": ticket.id, "message": "Ticket created"}, 201


@tickets_bp.route("/api/tickets/<int:ticket_id>", methods=["PUT"])
def update_ticket(ticket_id):
    ticket = Ticket.query.get(ticket_id)

    if not ticket:
        return {"error": "Ticket not found"}, 404

    data = request.json

    if not data:
        return {"error": "No data provided"}, 400

    # Update fields if present
    if "title" in data:
        ticket.title = data["title"]

    if "description" in data:
        ticket.description = data["description"]

    if "status" in data:
        ticket.status = data["status"]

    if "priority" in data:
        ticket.priority = data["priority"]

    # Update timestamp
    ticket.updated_at = datetime.utcnow()

    db.session.commit()

    return {"message": "Ticket updated", "id": ticket.id}, 200
