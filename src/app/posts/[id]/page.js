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
    <div className="w-full py-6 px-4">
      <h1 className="w-full text-4xl text-center font-bold mb-4 text-black">
        {postData.title}
      </h1>
      <hr />

      <div className="w-full max-w-[50vw] mx-auto px-20">
        <div className="flex mb-4 py-4 text-black">
          <div className="w-1/2">
            <span>{postData.date}</span>
            <span>{postData.author}</span>
            <span>{postData.category}</span>
          </div>
          <div className="w-1/2 flex justify-end text-2xl">
            <FaLink className="mr-3" />
            <RiKakaoTalkFill />
          </div>
        </div>

        {/* Markdown 변환 */}
        <div className="prose">
          <ReactMarkdown rehypePlugins={[rehypeRaw]}>
            {postData.content}
          </ReactMarkdown>
        </div>
      </div>

      <div className="pt-20">
        <Disqus post={postData} />
      </div>
    </div>
  );
}
