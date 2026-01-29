import { useEffect, useState } from "react";
import api from "../api/api";

export function useTickets(params) {
  const [tickets, setTickets] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    api
      .get("/tickets", { params })
      .then((res) => {
        setTickets(res.data.items);
        setTotal(res.data.total);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [JSON.stringify(params)]);

  return { tickets, total, loading, setTickets };
}
