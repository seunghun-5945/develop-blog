import { IoMdMenu, IoIosSearch } from "react-icons/io";
import './globals.css';

export const metadata = {
  title: '이승훈 개발 블로그',
  description: '개발 관련 블로그',
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body className="w-full flex flex-col bg-white">
        <header className="w-full h-16 md:h-20 bg-gray-800 flex fixed top-0 left-0 items-center justify-between text-white px-4 z-10">
          <h1 className="text-xl md:text-2xl">이승훈 개발 블로그</h1>
          <div className="flex">
            <IoIosSearch className="text-white text-2xl cursor-pointer mr-4" />
            <IoMdMenu className="text-2xl md:text-xl cursor-pointer" />
          </div>
        </header>
        <main className="mt-16 md:mt-20">
          {children}
        </main>
        <footer className="bg-gray-800 text-white p-4">
          <p>made by next.js deploy by vercel</p>
        </footer>
      </body>
    </html>
  );
}