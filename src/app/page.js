import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import { IoMdMenu } from "react-icons/io";
import { IoIosSearch } from "react-icons/io";
import "./globals.css";

const Home = async () => {
  // posts 폴더 경로 설정
  const postsDirectory = path.join(process.cwd(), 'posts');
  // posts 폴더의 모든 파일 이름 읽기
  const fileNames = fs.readdirSync(postsDirectory);

  // 각 파일의 내용을 읽고 마크다운 변환
  const allPosts = fileNames.map((fileName) => {
    const filePath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(filePath, 'utf-8');
    const { content, data } = matter(fileContents); // frontmatter와 content 분리
    const processedContent = remark().use(html).processSync(content); // 마크다운을 HTML로 변환
    const contentHtml = processedContent.toString();
    
    return {
      fileName,
      contentHtml,  // 변환된 HTML
      ...data // frontmatter 정보 (title, date 등)
    };
  });

  return (
    <div className="w-full flex flex-col bg-white">
      <header className="w-full h-16 md:h-20 bg-gray-800 flex fixed top-0 left-0 items-center justify-between text-white px-4">
        <h1 className="text-xl md:text-xl">이승훈 개발 블로그</h1>
        <div className="flex">
          <IoIosSearch className="text-white text-2xl" />
          <IoMdMenu className="text-2xl md:text-xl" />
        </div>
      </header>

      <div className="w-full h-48 md:h-64 lg:h-80 flex items-center justify-center bg-blue-600 mt-16 md:mt-20">
        <h1 className="text-xl sm:text-xl md:text-4xl lg:text-6xl font-bold text-white">프론트엔드는 살아남을것이다 늘 그랫듯이</h1>
      </div>

      {allPosts.map((post, index) => (
        <div key={index} className="flex flex-col border border-b-slate-100 p-4">
          <div className="w-full h-10 flex items-start justify-start text-black">
            {post.date || '날짜'}  {post.author || '작성자'}  {post.category || '카테고리'}
          </div>
          <div className="w-full">
            <h1 className="text-3xl text-black font-bold">{post.title || '[제목]'}</h1>
          </div>
          <div className="w-full h-auto flex items-start text-black mt-4" dangerouslySetInnerHTML={{ __html: post.contentHtml }} />
        </div>
      ))}

      <footer className="bg-gray-800 text-white p-4">
        <p>made by next.js deploy by vercel</p>
      </footer>
    </div>
  );
};

/*
container 속성: 고정된 최대 너비를 설정해주고 브라우저 크기에 따라 sm, md, lg, xl에 맞게 너비가 자동 조정됨
mx-auto 속성: margin-left, margin-right 를 자동으로 설정해, 중앙에 정렬해쥼
*/

export default Home;
