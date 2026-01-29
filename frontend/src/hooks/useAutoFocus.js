import { useEffect } from "react";

export function useAutoFocus(ref, deps = []) {
  useEffect(() => {
    if (ref.current) {
      ref.current.focus();
    }
  }, deps);
}
