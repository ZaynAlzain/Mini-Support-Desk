from flask import Blueprint, request
from models import db, Comment, Ticket

comments_bp = Blueprint("comments", __name__)

@comments_bp.route("/api/tickets/<int:ticket_id>/comments", methods=["GET"])
def get_comments(ticket_id):
    comments = Comment.query.filter_by(ticket_id=ticket_id).all()

    return [{
        "id": c.id,
        "author_name": c.author_name,
        "body": c.body,
        "created_at": c.created_at
    } for c in comments], 200

@comments_bp.route("/api/tickets/<int:ticket_id>/comments", methods=["POST"])
def add_comment(ticket_id):
    ticket = Ticket.query.get(ticket_id)
    if not ticket:
        return {"error": "Ticket not found"}, 404

    data = request.json

    comment = Comment(
        ticket_id=ticket_id,
        author_name=data.get("author_name", "Anonymous"),
        body=data.get("body", "")
    )

    db.session.add(comment)
    db.session.commit()

    return {"message": "Comment added"}, 201
