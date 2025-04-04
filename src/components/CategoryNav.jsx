"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

// 버튼처럼 보이는 wrapper 컴포넌트
function CategoryButton({ children, href, isActive }) {
  return (
    <Link href={href}>
      <div
        className={`px-4 py-2 cursor-pointer ${
          isActive ? "bg-orange-400 text-white" : "bg-white text-black"
        } border border-gray-300 rounded-md shadow hover:bg-gray-100 transition`}
      >
        {children}
      </div>
    </Link>
  );
}

export default function CategoryNav({ className = "" }) {
  const pathname = usePathname();

  const categories = ["All", "React", "fastapi", "server", "history"];
  const selected = decodeURIComponent(pathname.split("/")[2] || "All");

  return (
    <nav className={`flex justify-center space-x-4 px-4 m-6 ${className}`}>
      {categories.map((cat) => {
        const isAll = cat === "All";
        const href = isAll ? "/" : `/category/${cat}`;
        return (
          <CategoryButton key={cat} href={href} isActive={selected === cat}>
            <span>{cat}</span>
          </CategoryButton>
        );
      })}
    </nav>
  );
}
