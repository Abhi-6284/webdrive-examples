import React, { useEffect, useRef } from "react";
import { WebDrive } from "webdrive";
import "webdrive/styles.css";

export default function App() {
  const tourRef = useRef<WebDrive | null>(null);

  useEffect(() => {
    tourRef.current = new WebDrive({
      id: "react-vite-tour",
      steps: [
        {
          element: "#vite-header",
          title: "Vite + React Integration",
          description: "Declarative UI tours in modern React 18+ applications.",
          position: "bottom",
        },
        {
          element: "#vite-counter",
          title: "Interactive State",
          description: "WebDrive highlights elements cleanly during React re-renders.",
          position: "top",
        },
      ],
      showProgress: true,
      animate: true,
    });

    return () => {
      tourRef.current?.destroy();
    };
  }, []);

  const [count, setCount] = React.useState(0);

  return (
    <div style={{ fontFamily: "sans-serif", padding: "40px", maxWidth: "600px", margin: "auto" }}>
      <header id="vite-header">
        <h1>React + Vite WebDrive Example</h1>
        <p>Framework-agnostic tour library in React.</p>
      </header>

      <div style={{ marginTop: "30px", display: "flex", gap: "12px" }}>
        <button
          onClick={() => tourRef.current?.start()}
          style={{ padding: "10px 16px", background: "#2563eb", color: "#fff", border: "none", borderRadius: "6px", cursor: "pointer" }}
        >
          Start React Tour
        </button>

        <button
          id="vite-counter"
          onClick={() => setCount((c) => c + 1)}
          style={{ padding: "10px 16px", border: "1px solid #ccc", background: "#fff", borderRadius: "6px", cursor: "pointer" }}
        >
          Count is {count}
        </button>
      </div>
    </div>
  );
}
