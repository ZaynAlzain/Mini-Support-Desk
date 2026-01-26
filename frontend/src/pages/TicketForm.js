import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";

function TicketForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("medium");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    api.post("/tickets", {
      title,
      description,
      priority
    })
    .then(() => navigate("/"))
    .catch(err => console.error(err));
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create Ticket</h2>

      <input
        placeholder="Title"
        value={title}
        onChange={e => setTitle(e.target.value)}
        required
      />

      <textarea
        placeholder="Description"
        value={description}
        onChange={e => setDescription(e.target.value)}
      />

      <select
        value={priority}
        onChange={e => setPriority(e.target.value)}
      >
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>

      <button type="submit">Create</button>
    </form>
  );
}

export default TicketForm;
