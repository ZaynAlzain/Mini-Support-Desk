import { useDebounce } from "../hooks/useDebounce";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/api";
import "./TicketsList.css";



function TicketsList() {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 200);
  const [status, setStatus] = useState("");
  const [priority, setPriority] = useState("");
  const [sortMode, setSortMode] = useState("created_desc");
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true); 
  const [initialized, setInitialized] = useState(false);
  const [openMenuId, setOpenMenuId] = useState(null);
  const [overdueOnly, setOverdueOnly] = useState(false);
  const [page, setPage] = useState(1);
  const limit = 10;
  const [total, setTotal] = useState(0);


  const SORT_MODES = [
  "created_desc",
  "created_asc",
  "updated_desc",
  "updated_asc"
];

const cycleSortMode = () => {
  setSortMode(prev => {
    const index = SORT_MODES.indexOf(prev);
    return SORT_MODES[(index + 1) % SORT_MODES.length];
  });
};



 useEffect(() => {

  if (!initialized) {
    setLoading(true);
  }

const sortField =
  sortMode.startsWith("created") ? "created_at" : "updated_at";

const sortOrder =
  sortMode.endsWith("asc") ? "asc" : "desc";

api.get("/tickets", {
  params: {
    q: debouncedSearch || undefined,
    status: status || undefined,
    priority: priority || undefined,
    overdue: overdueOnly ? "true" : undefined,
    sort: sortField,
    order: sortOrder,
    page,
    limit
  }
})
    .then(res => {
      setTickets(res.data.items);
      setTotal(res.data.total);
      setLoading(false);
      setInitialized(true);
    })
    .catch(() => {
      setLoading(false);
      setInitialized(true);
    });

}, [debouncedSearch, status, priority, sortMode, overdueOnly , page, initialized]);

useEffect(() => {
  setPage(1);
}, [search, status, priority, overdueOnly, sortMode]);

const totalPages = Math.ceil(total / limit);


useEffect(() => {
  function handleClickOutside() {
    setOpenMenuId(null);
  }

  document.addEventListener("click", handleClickOutside);

  return () => {
    document.removeEventListener("click", handleClickOutside);
  };
}, []);

 const visibleTickets = tickets;

  if (loading) return <p>Loading tickets...</p>;

  return (
  <div className="container">
    <h1>Tickets</h1>

    <Link to="/new" style={{ display: "inline-block", marginBottom: "10px" }}>
      ➕ Add Ticket
    </Link>
    
  <div className="filters-bar">
    <div className="filters-left">
    <input
      placeholder="Search tickets..."
      value={search}
      onChange={e => setSearch(e.target.value)}
    />

    <select
        className={`filter-select ${status ? "active" : ""}`}
        value={status}
        onChange={(e) => setStatus(e.target.value)}
    >
      <option value="">All Statuses</option>
      <option value="open">Open</option>
      <option value="in_progress">In Progress</option>
      <option value="resolved">Resolved</option>
      </select>

    <select
        className={`filter-select ${priority ? "active" : ""}`}
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
    >
      <option value="">All Priorities</option>
      <option value="low">Low</option>
      <option value="medium">Medium</option>
      <option value="high">High</option>
    </select>

   <button
  className={`filter-select ${overdueOnly ? "active" : ""}`}
  onClick={() => setOverdueOnly(prev => !prev)}
>
  Overdue
</button>

    </div>


  <div className="filters-right">
     <span className="view-label">View:</span> 
   <button
  className="view-pill active"
  onClick={cycleSortMode}
  >
  {sortMode === "created_desc" && "Created • Newest ↓"}
  {sortMode === "created_asc" && "Created • Oldest ↑"}
  {sortMode === "updated_desc" && "Updated • Newest ↓"}
  {sortMode === "updated_asc" && "Updated • Oldest ↑"}
  </button>
  </div>

</div>
  <div className="active-filters">
    {status && (
      <span className="filter-chip">
        Status: {status.replace("_", " ")}
        <button onClick={() => setStatus("")}>×</button>
      </span>
    )}

    {priority && (
      <span className="filter-chip">
        Priority: {priority}
        <button onClick={() => setPriority("")}>×</button>
      </span>
    )}

    {search && (
      <span className="filter-chip">
        Search: "{search}"
        <button onClick={() => setSearch("")}>×</button>
      </span>
    )}

    {overdueOnly && (
     <span className="filter-chip">
       Overdue
      <button onClick={() => setOverdueOnly(false)}>×</button>
    </span>
)}
    
  </div>


    {loading ? (
      <p>Loading tickets...</p>
    ) : tickets.length === 0 ? (
      <p>No tickets found</p>
    ) : (
     <ul className="ticket-list">
    {visibleTickets.map(ticket => (

    <li className={`ticket-item ${
    openMenuId === ticket.id ? "menu-open" : ""
    }`} key={ticket.id}>

      
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
          <div className="menu-dropdown" onClick={(e) => e.stopPropagation()}>
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
                    setOpenMenuId(null);

  
                  if (tickets.length === 1 && page > 1) {
                     setPage(prev => prev - 1);
                      } else {
   
                   setInitialized(false);
                    }
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

 <div className="pagination">
  <button
    disabled={page === 1}
    onClick={() => setPage(p => p - 1)}
  >
    Previous
  </button>

  <span>
    Page {page} of {totalPages || 1}
  </span>

  <button
    disabled={page === totalPages}
    onClick={() => setPage(p => p + 1)}
  >
    Next
  </button>
</div>


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
