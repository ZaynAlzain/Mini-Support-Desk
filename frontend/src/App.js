import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TicketsList from "./pages/TicketsList";
import TicketDetail from "./pages/TicketDetail";
import TicketForm from "./pages/TicketForm";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<TicketsList />} />
        <Route path="/tickets/:id" element={<TicketDetail />} />
        <Route path="/new" element={<TicketForm />} />
      </Routes>
    </Router>
  );
}

export default App;
