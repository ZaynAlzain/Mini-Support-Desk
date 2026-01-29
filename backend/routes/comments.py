from flask import Blueprint, request
from models import db, Comment, Ticket

comments_bp = Blueprint("comments", __name__)


@comments_bp.route("/api/tickets/<int:ticket_id>/comments", methods=["GET"])
def get_comments(ticket_id):
    comments = Comment.query.filter_by(ticket_id=ticket_id).all()

    return [
        {
            "id": c.id,
            "author_name": c.author_name,
            "content": c.body,
            "created_at": c.created_at,
        }
        for c in comments
    ], 200


@comments_bp.route("/api/tickets/<int:ticket_id>/comments", methods=["POST"])
def add_comment(ticket_id):
    ticket = Ticket.query.get(ticket_id)
    if not ticket:
        return {"error": "Ticket not found"}, 404

    data = request.json

    if not data or not data.get("content"):
        return {"error": "Comment content is required"}, 400

    comment = Comment(
        ticket_id=ticket_id,
        author_name=data.get("author_name", "Anonymous"),
        body=data["content"],  
    )

    db.session.add(comment)
    db.session.commit()

    return {
        "id": comment.id,
        "content": comment.body,
        "author_name": comment.author_name,
        "created_at": comment.created_at.isoformat(),
    }, 201
