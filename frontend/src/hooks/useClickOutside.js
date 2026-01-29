import { useEffect } from "react";

export function useClickOutside(onOutsideClick) {
  useEffect(() => {
    function handleClick() {
      onOutsideClick();
    }

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [onOutsideClick]);
}
