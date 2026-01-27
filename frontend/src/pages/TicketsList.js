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
  const [openMenuId, setOpenMenuId] = useState(null);


 useEffect(() => {
  
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
  <div className="container">
    <h1>Tickets</h1>

    <Link to="/new" style={{ display: "inline-block", marginBottom: "10px" }}>
  ➕ Add Ticket
    </Link>
    <div className="filters">
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
    </div>

    {loading ? (
      <p>Loading tickets...</p>
    ) : tickets.length === 0 ? (
      <p>No tickets found</p>
    ) : (
     <ul className="ticket-list">
  {tickets.map(ticket => (
    <li className="ticket-item" key={ticket.id}>

      
      <div className="ticket-left">
        <Link to={`/tickets/${ticket.id}`}>
          {ticket.title}
        </Link>

        
        <span className={`badge status ${ticket.status}`}>
          {ticket.status.replace("_", " ").toUpperCase()}
        </span>

        
        {isOverdue(ticket) && (
          <span className="badge overdue">
            OVERDUE
          </span>
        )}

        
        <span className={`badge ${ticket.priority}`}>
          {ticket.priority.toUpperCase()}
        </span>
      </div>

      
      <div className="ticket-menu">
        <button
          className="menu-button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setOpenMenuId(openMenuId === ticket.id ? null : ticket.id);
          }}
        >
          ⋮
        </button>

        {openMenuId === ticket.id && (
          <div className="menu-dropdown">
            <Link to={`/tickets/${ticket.id}/edit`}>
              ✏️ Edit
            </Link>

            <Link to={`/tickets/${ticket.id}`}>
              💬 Add Comment
            </Link>

            <button
              className="menu-delete"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();

                if (window.confirm("Delete this ticket?")) {
                  api.delete(`/tickets/${ticket.id}`).then(() => {
                    setTickets(prev =>
                      prev.filter(t => t.id !== ticket.id)
                    );
                    setOpenMenuId(null);
                  });
                }
              }}
            >
              🗑️ Delete
            </button>
          </div>
        )}
      </div>

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
