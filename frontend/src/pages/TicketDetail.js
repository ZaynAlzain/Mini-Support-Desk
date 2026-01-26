import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../api/api";

function TicketDetail() {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const { id } = useParams();
  const [ticket, setTicket] = useState(null);

  useEffect(() => {
    api.get(`/tickets/${id}`)
      .then(res => setTicket(res.data))
      .catch(err => console.error(err));

    api.get(`/tickets/${id}/comments`)
    .then(res => setComments(res.data));

  }, [id]);

  if (!ticket) return <p>Loading ticket...</p>;

  return (
    <div>
            <h3>Comments</h3>

          <Link to={`/tickets/${ticket.id}/edit`}>
          ✏️ Edit Ticket
          </Link>


      {comments.length === 0 ? (
        <p>No comments yet</p>
      ) : (
        <ul>
          {comments.map(c => (
            <li key={c.id}>
              <strong>{c.author_name}:</strong> {c.body}
            </li>
          ))}
        </ul>
      )}

          <form
      onSubmit={(e) => {
        e.preventDefault();

        api.post(`/tickets/${id}/comments`, {
          author_name: "User",
          body: newComment
        })
        .then(() => {
          setNewComment("");
          return api.get(`/tickets/${id}/comments`);
        })
        .then(res => setComments(res.data));
      }}
    >
      <input
        placeholder="Add comment..."
        value={newComment}
        onChange={e => setNewComment(e.target.value)}
      />
      <button type="submit">Add</button>
    </form>


      <Link to="/">⬅ Back</Link>
    </div>
  );
}

export default TicketDetail;
