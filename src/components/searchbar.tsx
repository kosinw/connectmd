import styles from "styles/searchbar.module.css";
import Search from "vectors/search.svg";
import { useEffect, useRef, useState } from "react";

export function Searchbar() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [inFocus, setFocus] = useState(false);

  function handleKeyPress(event: KeyboardEvent) {
    const active = inputRef.current === document.activeElement;

    if (event.key === "/" && !active) {
      inputRef.current.focus();
      event.preventDefault();
    } else if (event.key === "Escape" && active) {
      inputRef.current.blur();
      event.preventDefault();
    }
  }

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress, false);

    return () => {
      document.removeEventListener("keydown", handleKeyPress, false);
    };
  }, []);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <div className="relative">
        <input
          onFocus={(e) => setFocus(true)}
          onBlur={(e) => setFocus(false)}
          className={styles.searchbar}
          ref={inputRef}
          placeholder='Search for content (Press "/" to focus)'
          type="text"
        />
        {!inFocus && (
          <div className="pointer-events-none absolute inset-y-0 left-0 pl-4 flex items-center">
            <Search className="fill-current pointer-events-none text-gray-600 w-5 h-5" />
          </div>
        )}
      </div>
    </form>
  );
}
