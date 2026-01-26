import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../api/api";

function TicketDetail() {
  const { id } = useParams();
  const [ticket, setTicket] = useState(null);

  useEffect(() => {
    api.get(`/tickets/${id}`)
      .then(res => setTicket(res.data))
      .catch(err => console.error(err));
  }, [id]);

  if (!ticket) return <p>Loading ticket...</p>;

  return (
    <div>
      <h2>{ticket.title}</h2>
      <p>{ticket.description}</p>
      <p>Status: {ticket.status}</p>
      <p>Priority: {ticket.priority}</p>

      <Link to="/">⬅ Back</Link>
    </div>
  );
}

export default TicketDetail;
