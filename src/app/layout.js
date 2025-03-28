import { IoMdMenu, IoIosSearch } from "react-icons/io"; // 메뉴 아이콘과 검색 아이콘 가져오기
import "./globals.css"; // 전역 스타일 적용
import Link from "next/link";

// 웹사이트 메타데이터 설정
export const metadata = {
  title: "이승훈 개발 블로그", // 웹사이트 제목
  description: "개발 관련 블로그", // 웹사이트 설명
};

// 전체 레이아웃 컴포넌트
export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      {" "}
      {/* 한국어 지원 */}
      <body className="w-full flex flex-col bg-white">
        {" "}
        {/* 전체 페이지 레이아웃 */}
        {/* 헤더 영역 */}
        <header className="w-full h-16 md:h-20 bg-gray-800 flex fixed top-0 left-0 items-center justify-between text-white px-4 z-10">
          <Link href="/">
            <h1 className="text-xl md:text-2xl">이승훈 개발 블로그</h1>{" "}
          </Link>
          {/* 블로그 제목 */}
          <div className="flex">
            <IoIosSearch className="text-white text-2xl cursor-pointer mr-4" />{" "}
            {/* 검색 아이콘 */}
            <IoMdMenu className="text-2xl md:text-xl cursor-pointer" />{" "}
            {/* 메뉴 아이콘 */}
          </div>
        </header>
        {/* 메인 컨텐츠 영역 */}
        <main className="mt-16 md:mt-20">
          {" "}
          {/* 헤더 높이만큼 여백 추가 */}
          {children}
        </main>
        {/* 푸터 영역 */}
        <footer className="bg-gray-800 text-white p-4">
          <p>made by next.js deploy by vercel</p> {/* 푸터 내용 */}
        </footer>
      </body>
    </html>
  );
}
