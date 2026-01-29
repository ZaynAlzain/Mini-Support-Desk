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
      <Link to="/">← Back to tickets</Link>

      <h2 className="ticket-title">{ticket.title}</h2>

      <p className="ticket-description">
        {ticket.description || "No description provided."}
      </p>

      <div className="ticket-meta" style={{ marginBottom: "10px" }}>
        <span className={`badge status ${ticket.status}`}>
          {ticket.status.replace("_", " ").toUpperCase()}
        </span>

        <span className={`badge ${ticket.priority}`}>
          {ticket.priority.toUpperCase()}
        </span>
      </div>

      <p className="ticket-date">
        <strong>Created:</strong> {new Date(ticket.created_at).toLocaleString()}
      </p>

      <hr />

      <div className="comments-section">
        <h3>Comments</h3>
      </div>
      {comments.length === 0 ? (
        <p>No comments yet.</p>
      ) : (
        <ul>
          {comments.map((c) => (
            <li key={c.id}>
              <p className="comment-body">{c.content}</p>
              <br />
              <small>{new Date(c.created_at).toLocaleString()}</small>
            </li>
          ))}
        </ul>
      )}

      <form onSubmit={handleAddComment}>
        <textarea
          className="input"
          placeholder="Add a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />

        <button className="button primary" type="submit">
          Add Comment
        </button>
      </form>

      <hr />

      <Link to={`/tickets/${id}/edit`}>✏️ Edit Ticket</Link>
    </div>
  );
}

export default TicketDetail;
