import { useEffect, useRef } from "react";

export function useEventListener(eventName, handler) {
  // Create a ref that stores handler
  const savedHandler = useRef(null);

  // Update ref.current value if handler changes.
  // This allows our effect below to always get latest handler ...
  // ... without us needing to pass it in effect deps array ...
  // ... and potentially cause effect to re-run every render.
  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  useEffect(
    () => {
      // Create event listener that calls handler function stored in ref
      const eventListener = (event) => savedHandler.current(event);

      // Add event listener
      document.addEventListener(eventName, eventListener);

      // Remove event listener on cleanup
      return () => {
        document.removeEventListener(eventName, eventListener);
      };
    },
    [eventName] // Re-run if eventName or element changes
  );
}
