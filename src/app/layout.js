import { IoMdMenu, IoIosSearch } from "react-icons/io";
import "./globals.css";
import Link from "next/link";
import SystemStatus from "@/components/SystemStatus"; // 서버 상태 컴포넌트 추가

export const metadata = {
  title: "이승훈 개발 블로그",
  description: "개발 관련 블로그",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body className="w-full flex flex-col bg-white">
        {/* 헤더 영역 */}
        <header className="w-full h-16 md:h-20 bg-gray-800 flex fixed top-0 left-0 items-center justify-between text-white px-4 z-10">
          <Link href="/">
            <h1 className="text-xl md:text-2xl">이승훈 개발 블로그</h1>
          </Link>
          <div className="flex">
            <IoIosSearch className="text-white text-2xl cursor-pointer mr-4" />
            <IoMdMenu className="text-2xl md:text-xl cursor-pointer" />
          </div>
        </header>

        {/* 메인 컨텐츠 영역 */}
        <main className="mt-16 md:mt-20">{children}</main>

        {/* 푸터 영역 */}
        <footer className="bg-gray-800 text-white p-4 text-center">
          <p>made by next.js deploy by vercel</p>
          <SystemStatus /> {/* ✅ 서버 상태 표시 */}
        </footer>
      </body>
    </html>
  );
}
