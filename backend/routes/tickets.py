from flask import Blueprint, request, jsonify
from models import db, Ticket
from datetime import datetime

tickets_bp = Blueprint("tickets", __name__)

@tickets_bp.route("/api/tickets", methods=["GET"])
def get_tickets():
    tickets = Ticket.query.all()

    result = []
    for t in tickets:
        result.append({
            "id": t.id,
            "title": t.title,
            "description": t.description,
            "status": t.status,
            "priority": t.priority,
            "created_at": t.created_at,
            "updated_at": t.updated_at
        })

    return jsonify(result), 200


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
        "updated_at": ticket.updated_at
    }, 200

@tickets_bp.route("/api/tickets", methods=["POST"])
def create_ticket():
    data = request.json

    if not data or not data.get("title"):
        return {"error": "Title is required"}, 400

    ticket = Ticket(
        title=data["title"],
        description=data.get("description", ""),
        status=data.get("status", "open"),
        priority=data.get("priority", "medium")
    )

    db.session.add(ticket)
    db.session.commit()

    return {"message": "Ticket created", "id": ticket.id}, 201

@tickets_bp.route("/api/tickets/<int:ticket_id>", methods=["PUT"])
def update_ticket(ticket_id):
    ticket = Ticket.query.get(ticket_id)

    if not ticket:
        return {"error": "Ticket not found"}, 404

    data = request.json

    ticket.title = data.get("title", ticket.title)
    ticket.description = data.get("description", ticket.description)
    ticket.status = data.get("status", ticket.status)
    ticket.priority = data.get("priority", ticket.priority)
    ticket.updated_at = datetime.utcnow()

    db.session.commit()

    return {"message": "Ticket updated"}, 200

@tickets_bp.route("/api/tickets/<int:ticket_id>", methods=["DELETE"])
def delete_ticket(ticket_id):
    ticket = Ticket.query.get(ticket_id)

    if not ticket:
        return {"error": "Ticket not found"}, 404

    db.session.delete(ticket)
    db.session.commit()

    return {"message": "Ticket deleted"}, 200
