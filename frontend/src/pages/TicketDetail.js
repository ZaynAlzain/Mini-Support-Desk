import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../api/api";
import "./TicketDetail.css";

function TicketDetail() {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const { id } = useParams();
  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get(`/tickets/${id}`).then((res) => {
      setTicket(res.data);
      setLoading(false);
    });

    api.get(`/tickets/${id}/comments`).then((res) => {
      setComments(res.data);
    });
  }, [id]);

  const handleAddComment = (e) => {
    e.preventDefault();

    if (!newComment.trim()) return;

    api
      .post(`/tickets/${id}/comments`, {
        content: newComment,
      })
      .then((res) => {
        setComments((prev) => [...prev, res.data]);
        setNewComment("");
      });
  };

  if (loading) return <p>Loading ticket...</p>;

  if (!ticket) return <p>Ticket not found</p>;

  return (
    <div className="container">
      <Link to="/" className="back-link">
        ← Back to tickets
      </Link>

      <div className="detail-card">
        <div className="detail-header">
          <div className="detail-badges">
            <span className={`badge status ${ticket.status}`}>
              {ticket.status.replace("_", " ")}
            </span>

            <span className={`badge ${ticket.priority}`}>
              {ticket.priority}
            </span>

            {ticket.overdue && (
              <span className="badge overdue">⏰ Overdue</span>
            )}
          </div>

          <Link to={`/tickets/${id}`} className="edit-button">
            ✏️ Edit
          </Link>
        </div>

        <h1 className="detail-title">{ticket.title}</h1>

        <div className="detail-dates">
          <span>
            📅 Created {new Date(ticket.created_at).toLocaleDateString()}
          </span>
          <span>
            🕒 Updated {new Date(ticket.updated_at).toLocaleDateString()}
          </span>
        </div>
      </div>

      <div className="detail-card">
        <h3>Description</h3>
        <p className="detail-description">
          {ticket.description || "No description provided."}
        </p>
      </div>

      <div className="detail-card">
        <h3>Comments ({comments.length})</h3>

        {comments.length === 0 ? (
          <p className="empty-text">No comments yet.</p>
        ) : (
          <div className="comments-list">
            {comments.map((c) => (
              <div key={c.id} className="comment-item">
                <div className="comment-header">
                  <strong>User</strong>
                  <span>{new Date(c.created_at).toLocaleString()}</span>
                </div>

                <p>{c.content}</p>
              </div>
            ))}
          </div>
        )}

        <form onSubmit={handleAddComment} className="comment-form">
          <textarea
            placeholder="Add a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />

          <button type="submit" className="button primary">
            ➤ Add Comment
          </button>
        </form>
      </div>
    </div>
  );
}

export default TicketDetail;
