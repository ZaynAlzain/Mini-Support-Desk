import { useState, useEffect, useRef } from "react";
import {
  useTickets,
  useSortMode,
  useClickOutside,
  useDebounce,
  useAutoFocus,
} from "../hooks";

import { Link } from "react-router-dom";
import api from "../api/api";
import "./TicketsList.css";

function TicketsList() {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 200);
  const [status, setStatus] = useState("");
  const [priority, setPriority] = useState("");
  const [openMenuId, setOpenMenuId] = useState(null);
  const [overdueOnly, setOverdueOnly] = useState(false);
  const [page, setPage] = useState(1);
  const limit = 10;
  const searchInputRef = useRef(null);

  const { sortField, sortOrder, label, cycleSortMode } = useSortMode();

  useEffect(() => {
    setPage(1);
  }, [search, status, priority, overdueOnly]);

  const { tickets, total, loading, setTickets, refetch } = useTickets({
    q: debouncedSearch || undefined,
    status: status || undefined,
    priority: priority || undefined,
    overdue: overdueOnly ? "true" : undefined,
    sort: sortField,
    order: sortOrder,
    page,
    limit,
  });

  const totalPages = Math.ceil(total / limit);

  useAutoFocus(searchInputRef, [debouncedSearch]);

  useClickOutside(() => setOpenMenuId(null));

  const visibleTickets = tickets;

  return (
    <div className="container">

      <div className="page-header">
        <div>
          <h1>Tickets</h1>
          <p className="page-subtitle">Manage and track support requests</p>
        </div>

        <Link to="/new" className="primary-button">
          + New Ticket
        </Link>
      </div>

      <div className="filters-bar">
        <div className="filters-left">
          <span className="filters-label">Filters:</span>
          <div className="search-wrapper">
            <input
              ref={searchInputRef}
              className="search-input"
              placeholder="Search tickets..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          

          <select
            className="filter-select"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="">All Status</option>
            <option value="open">Open</option>
            <option value="in_progress">In Progress</option>
            <option value="resolved">Resolved</option>
          </select>

          <select
            className="filter-select"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="">All Priority</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>

          <select
            className="filter-select"
            value={overdueOnly ? "overdue" : ""}
            onChange={(e) => setOverdueOnly(e.target.value === "overdue")}
          >
            <option value="">All Tickets</option>
            <option value="overdue">Overdue</option>
          </select>
        </div>

        <div className="filters-right">
          <span className="sort-label">Sort by:</span>
          <button className="sort-button" onClick={cycleSortMode}>
            {label}
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
            Search: "{search}"<button onClick={() => setSearch("")}>×</button>
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
        <div className="ticket-table">
          <div className="ticket-header">
            <span>Title</span>
            <span>Status</span>
            <span>Priority</span>
            <span>Created</span>
            <span>Actions</span>
          </div>

          {visibleTickets.map((ticket) => (
            <div
              className={`ticket-row ${openMenuId === ticket.id ? "menu-open" : ""}`}
              key={ticket.id}
            >
              <div className="ticket-title-cell">
                <Link to={`/tickets/${ticket.id}`} className="ticket-title">
                  {ticket.title}
                </Link>

                {ticket.overdue && (
                  <span className="badge overdue">⏰ Overdue</span>
                )}
              </div>

              <span className={`badge status ${ticket.status}`}>
                {ticket.status.replace("_", " ")}
              </span>

              <span className={`badge ${ticket.priority}`}>
                {ticket.priority}
              </span>

              <span className="ticket-date">
                {new Date(ticket.created_at).toLocaleDateString()}
              </span>

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
                  <div
                    className="menu-dropdown"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Link to={`/tickets/${ticket.id}/edit`}>✏️ Edit</Link>
                    <Link to={`/tickets/${ticket.id}`}>💬 Add Comment</Link>

                    <button
                      className="menu-delete"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();

                        if (window.confirm("Delete this ticket?")) {
                          api.delete(`/tickets/${ticket.id}`).then(() => {
                            setOpenMenuId(null);

                            setTickets((prev) =>
                              prev.filter((t) => t.id !== ticket.id),
                            );

                            refetch();

                            if (tickets.length === 1 && page > 1) {
                              setPage((prev) => prev - 1);
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
            </div>
          ))}
        </div>
      )}

      <div className="pagination">
        <button disabled={page === 1} onClick={() => setPage((p) => p - 1)}>
          Previous
        </button>

        <span>
          Page {page} of {totalPages || 1}
        </span>

        <button
          disabled={page === totalPages}
          onClick={() => setPage((p) => p + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default TicketsList;
