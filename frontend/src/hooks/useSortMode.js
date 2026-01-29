import { useState, useMemo } from "react";

const SORT_MODES = [
  "created_desc",
  "created_asc",
  "updated_desc",
  "updated_asc",
];

export function useSortMode(initial = "created_desc") {
  const [sortMode, setSortMode] = useState(initial);

  const cycleSortMode = () => {
    setSortMode((prev) => {
      const index = SORT_MODES.indexOf(prev);
      return SORT_MODES[(index + 1) % SORT_MODES.length];
    });
  };

  const { sortField, sortOrder, label } = useMemo(() => {
    const sortField = sortMode.startsWith("created")
      ? "created_at"
      : "updated_at";

    const sortOrder = sortMode.endsWith("asc") ? "asc" : "desc";

    const labelMap = {
      created_desc: "Created • Newest ↓",
      created_asc: "Created • Oldest ↑",
      updated_desc: "Updated • Newest ↓",
      updated_asc: "Updated • Oldest ↑",
    };

    return { sortField, sortOrder, label: labelMap[sortMode] };
  }, [sortMode]);

  return {
    sortMode,
    cycleSortMode,
    sortField,
    sortOrder,
    label,
  };
}
