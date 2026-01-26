import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/api";

function TicketsList() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/tickets")
      .then(res => {
        setTickets(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading tickets...</p>;

  return (
    <div>
      <h1>Tickets</h1>

      <Link to="/new">➕ New Ticket</Link>

      {tickets.length === 0 ? (
        <p>No tickets found</p>
      ) : (
        <ul>
          {tickets.map(ticket => (
            <li key={ticket.id}>
              <Link to={`/tickets/${ticket.id}`}>
                {ticket.title} ({ticket.status})
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default TicketsList;
