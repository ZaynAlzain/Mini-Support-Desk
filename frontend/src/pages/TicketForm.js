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
      <form onSubmit={handleSubmit}>
        <h2>{isEdit ? "Edit Ticket" : "Create Ticket"}</h2>

        <input
          className="input"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <textarea
          className="input"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <select
          className="input"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>

        <select
          className="input"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="open">Open</option>
          <option value="in_progress">In Progress</option>
          <option value="resolved">Resolved</option>
        </select>

        <button className="button primary" type="submit">
          {isEdit ? "Update Ticket" : "Create Ticket"}
        </button>
      </form>
    </div>
  );
}

export default TicketForm;
