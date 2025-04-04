"use client";
import { useEffect, useState } from "react";
import { BsFillPeopleFill } from "react-icons/bs";

export default function VisitorCounter() {
  const [count, setCount] = useState(null);

  useEffect(() => {
    // 방문자 수 증가 요청
    fetch("/api/visitors", { method: "POST" });

    // 최신 방문자 수 받아오기
    fetch("/api/visitors")
      .then((res) => res.json())
      .then((data) => setCount(data?.count || 0))
      .catch(console.error);
  }, []);

  return (
    <div className="flex text-md mr-6 items-center">
      <BsFillPeopleFill /> :{" "}
      <strong>{count === null ? "로딩 중..." : `${count}명`}</strong>
    </div>
  );
}
