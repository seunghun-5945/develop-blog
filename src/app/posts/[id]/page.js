import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { FaLink } from "react-icons/fa";
import { RiKakaoTalkFill } from "react-icons/ri";
import Disqus from "../[id]/components/Disqus";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw"; // HTML도 렌더링할 수 있도록 설정

export async function generateStaticParams() {
  const postsDirectory = path.join(process.cwd(), "posts");
  const filenames = fs.readdirSync(postsDirectory);

  return filenames.map((filename) => ({
    id: filename.replace(/\.mdx?$/, ""),
  }));
}

async function getPostData(id) {
  const postsDirectory = path.join(process.cwd(), "posts");
  const fullPath = path.join(postsDirectory, `${id}.mdx`);
  const fileContents = fs.readFileSync(fullPath, "utf8");

  const { data, content } = matter(fileContents);

  return {
    id,
    title: data.title,
    date: data.date,
    author: data.author,
    category: data.category,
    content,
  };
}

export default async function Post({ params }) {
  const { id } = params;
  const postData = await getPostData(id);

  return (
    <div className="w-full py-6 md:px-4 flex flex-col items-center">
      {/* 포스트 제목 */}
      <h1 className="text-2xl md:text-4xl text-center font-bold mb-4 text-black">
        {postData.title}
      </h1>

      {/* 포스트 박스 전체 */}
      <div className="flex flex-col items-center w-full">
        {/* 작성일 작성자 공유하기 메뉴바 */}
        <div className="w-full px-4 md:px-0 md:w-2/5 flex justify-between text-black">
          <div className="w-1/2 flex justify-start text-md">
            {/* 날짜 */}
            <span>{postData.date}</span>
            {/* 작성자 */}
            <span>{postData.author}</span>
            {/* 카테고리 */}
            <span>{postData.category}</span>
          </div>

          {/* 공유하기 아이콘 바 */}
          <div className="w-1/2 flex justify-end items-center text-2xl">
            <FaLink className="mr-3" />
            <RiKakaoTalkFill />
          </div>
        </div>

        <hr className="w-full border-t-2 border-gray-300 my-4" />

        {/* Markdown 변환 */}
        <div className="flex flex-col px-6 md:px-0 md:w-2/3 py-10 mx-auto text-black prose">
          <ReactMarkdown rehypePlugins={[rehypeRaw]}>
            {postData.content}
          </ReactMarkdown>
        </div>
      </div>

      <div className="w-full">
        <Disqus post={postData} />
      </div>
    </div>
  );
}
