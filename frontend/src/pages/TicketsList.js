import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/api";




function TicketsList() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [priority, setPriority] = useState("");
  const [sort, setSort] = useState("created_at");
  const [order, setOrder] = useState("desc");
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true); 
const [initialized, setInitialized] = useState(false);

 useEffect(() => {
  // Only show loading spinner on FIRST load
  if (!initialized) {
    setLoading(true);
  }

  api.get("/tickets", {
    params: {
      q: search || undefined,
      status: status || undefined,
      priority: priority || undefined,
      sort,
      order
    }
  })
    .then(res => {
      setTickets(res.data);
      setLoading(false);
      setInitialized(true);
    })
    .catch(() => {
      setLoading(false);
      setInitialized(true);
    });

}, [search, status, priority, sort, order, initialized]);


  if (loading) return <p>Loading tickets...</p>;

  return (
  <div>
    <h1>Tickets</h1>

    <Link to="/new" style={{ display: "inline-block", marginBottom: "10px" }}>
  ➕ Add Ticket
    </Link>
    
    <input
      placeholder="Search tickets..."
      value={search}
      onChange={e => setSearch(e.target.value)}
    />

    <select value={status} onChange={e => setStatus(e.target.value)}>
      <option value="">All Statuses</option>
      <option value="open">Open</option>
      <option value="in_progress">In Progress</option>
      <option value="resolved">Resolved</option>
    </select>

    <select value={priority} onChange={e => setPriority(e.target.value)}>
      <option value="">All Priorities</option>
      <option value="low">Low</option>
      <option value="medium">Medium</option>
      <option value="high">High</option>
    </select>

    <select value={sort} onChange={e => setSort(e.target.value)}>
      <option value="created_at">Created At</option>
      <option value="updated_at">Updated At</option>
    </select>

    <select value={order} onChange={e => setOrder(e.target.value)}>
      <option value="desc">Newest First</option>
      <option value="asc">Oldest First</option>
    </select>

    {loading ? (
      <p>Loading tickets...</p>
    ) : tickets.length === 0 ? (
      <p>No tickets found</p>
    ) : (
      <ul>
  {tickets.map(ticket => (
    <li key={ticket.id}>
      <Link to={`/tickets/${ticket.id}`}>
        {ticket.title} ({ticket.status})
      </Link>

      {/* OVERDUE BADGE — THIS GOES HERE */}
      {isOverdue(ticket) && (
        <span style={{ color: "red", marginLeft: "8px" }}>
          OVERDUE
        </span>
      )}

      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();

          if (window.confirm("Delete this ticket?")) {
            api.delete(`/tickets/${ticket.id}`)
              .then(() => {
                setTickets(prev =>
                  prev.filter(t => t.id !== ticket.id)
                );
              });
          }
        }}
        style={{ marginLeft: "10px" }}
      >
        Delete
      </button>
    </li>
  ))}
</ul>

    )}

    
    


  </div>
);

}

function isOverdue(ticket) {
  
  if (ticket.status === "resolved") return false;

  const createdAt = new Date(ticket.created_at);
  const now = new Date();

  const seventyTwoHours = 72 * 60 * 60 * 1000;
  return now - createdAt > seventyTwoHours;
}




export default TicketsList;
