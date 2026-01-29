import { useEffect, useState, useCallback } from "react";
import api from "../api/api";

export function useTickets(params) {
  const [tickets, setTickets] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchTickets = useCallback(() => {
    setLoading(true);

    api
      .get("/tickets", { params })
      .then((res) => {
        setTickets(res.data.items);
        setTotal(res.data.total);
      })
      .finally(() => setLoading(false));
  }, [JSON.stringify(params)]);

  useEffect(() => {
    fetchTickets();
  }, [fetchTickets]);

  return {
    tickets,
    total,
    loading,
    setTickets,
    refetch: fetchTickets,
  };
}
