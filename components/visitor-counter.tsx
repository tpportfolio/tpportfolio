"use client";

import { useEffect, useState } from "react";

export default function VisitorCounter() {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    async function update() {
      try {
        const res = await fetch("/api/visits", { method: "POST" });
        if (!res.ok) {
          console.error("VisitorCounter fetch error:", res.status);
          return;
        }

        const data = await res.json();
        if (typeof data.count === "number") {
          setCount(data.count);
        }
      } catch (err) {
        console.error("VisitorCounter error:", err);
      }
    }

    update();
  }, []);

  return (
    <span>
      ACCESS_COUNT:{String(count ?? 0).padStart(5, "0")}
    </span>
  );
}
