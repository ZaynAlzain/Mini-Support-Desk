import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api/api";
import "./TicketForm.css";

function TicketForm() {
  const { id } = useParams(); // if exists → edit mode
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("medium");
  const [status, setStatus] = useState("open");
  const [loading, setLoading] = useState(false);

  const isEdit = Boolean(id);

  // Load ticket when editing
  useEffect(() => {
    if (isEdit) {
      setLoading(true);
      api
        .get(`/tickets/${id}`)
        .then((res) => {
          setTitle(res.data.title);
          setDescription(res.data.description || "");
          setPriority(res.data.priority);
          setStatus(res.data.status);
        })
        .finally(() => setLoading(false));
    }
  }, [id, isEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      title,
      description,
      priority,
      status,
    };

    if (isEdit) {
      api.put(`/tickets/${id}`, payload).then(() => navigate(`/tickets/${id}`));
    } else {
      api.post("/tickets", payload).then(() => navigate("/"));
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="ticket-form">
        <div className="form-header">
          <h2>{isEdit ? "Edit Ticket" : "Create New Ticket"}</h2>
          <p className="form-subtitle">
            Fill in the details to {isEdit ? "update" : "create"} a support
            ticket.
          </p>
        </div>

        <div className="form-group">
          <label>Title</label>
          <input
            className="input"
            placeholder="Enter ticket title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea
            className="textarea"
            placeholder="Describe the issue or request..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Priority</label>
            <select
              className="input"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

          <div className="form-group">
            <label>Status</label>
            <select
              className="input"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="open">Open</option>
              <option value="in_progress">In Progress</option>
              <option value="resolved">Resolved</option>
            </select>
          </div>
        </div>

        <div className="form-actions">
          <button
            type="button"
            className="button secondary"
            onClick={() => navigate(-1)}
          >
            Cancel
          </button>

          <button className="button primary" type="submit">
            {isEdit ? "Update Ticket" : "Create Ticket"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default TicketForm;
