"use client";

import { useEffect, useState } from "react";

export default function SystemStatus() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("/api/status")
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((err) => console.error("Error fetching data:", err));
  }, []);

  return (
    <div className="text-sm text-gray-500 mt-4">
      {data ? (
        <p>
          🔋 {data.battery} | 🔥 {data.temperature}
        </p>
      ) : (
        <p>📡 상태 불러오는 중...</p>
      )}
    </div>
  );
}
