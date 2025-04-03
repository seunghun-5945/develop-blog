import { IoMdMenu, IoIosSearch, IoIosMoon } from "react-icons/io";
import "./globals.css";
import Link from "next/link";
import Image from "next/image";
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
        <header className="w-full h-16 md:h-20 bg-gray-500 flex fixed top-0 left-0 items-center justify-between text-white px-4 z-10">
          <Link href="/">
            <h1 className="text-xl md:text-2xl">HoonyDev</h1>
          </Link>
          <div className="flex">
            <IoIosMoon className="text-white text-2xl cursor-pointer mr-4" />
            <IoIosSearch className="text-white text-2xl cursor-pointer mr-4" />
            <IoMdMenu className="text-2xl md:text-xl cursor-pointer" />
          </div>
        </header>

        {/* 메인 컨텐츠 영역 */}
        <main className="mt-16 md:mt-20">{children}</main>

        {/* 푸터 영역 */}
        <footer className="flex flex-col items-center bg-gray-500 text-white p-4 text-center gap-4">
          <p>©2025 HoonyDev</p>
          <div className="w-44 flex gap-2 justify-start">
            <img src="/icons/instagram.png" className="w-6" />
            <p className="text-white">@seunghun5945</p>
          </div>
          <div className="w-44 flex gap-2 justify-start">
            <img src="/icons/github-mark.png" className="w-6" />
            <p className="text-white">tmdgns5945</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
