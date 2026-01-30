import { useState, useMemo } from "react";

const SORT_OPTIONS = [
  { value: "created_desc", label: "Created • Newest" },
  { value: "created_asc", label: "Created • Oldest" },
  { value: "updated_desc", label: "Updated • Newest" },
  { value: "updated_asc", label: "Updated • Oldest" },
];

export function useSortMode(initial = "created_desc") {
  const [sortMode, setSortMode] = useState(initial);

  const { sortField, sortOrder, label } = useMemo(() => {
    const sortField = sortMode.startsWith("created")
      ? "created_at"
      : "updated_at";

    const sortOrder = sortMode.endsWith("asc") ? "asc" : "desc";

    const current = SORT_OPTIONS.find(o => o.value === sortMode);

    return {
      sortField,
      sortOrder,
      label: current?.label ?? "Created • Newest",
    };
  }, [sortMode]);

  return {
    sortMode,
    setSortMode, 
    sortField,
    sortOrder,
    label,
    options: SORT_OPTIONS,
  };
}
