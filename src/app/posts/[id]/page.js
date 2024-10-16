import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { FaLink } from "react-icons/fa";
import { RiKakaoTalkFill } from "react-icons/ri";
import Disqus from '../[id]/components/Disqus'; // Disqus 컴포넌트 경로

// 동적 라우트 생성을 위한 함수
export async function generateStaticParams() {
  const postsDirectory = path.join(process.cwd(), 'posts');
  const filenames = fs.readdirSync(postsDirectory);

  return filenames.map(filename => ({
    id: filename.replace(/\.mdx?$/, '')
  }));
}

// 특정 포스트 데이터를 가져오는 함수
async function getPostData(id) {
  const postsDirectory = path.join(process.cwd(), 'posts');
  const fullPath = path.join(postsDirectory, `${id}.mdx`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

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

// 페이지 컴포넌트
export default async function Post({ params }) {
  const { id } = params;
  const postData = await getPostData(id);

  return (
    <div className='w-full py-6 px-4'>
      <h1 className="w-full text-3xl text-center font-bold mb-4">{postData.title}</h1>
      <hr />
      <div className="flex mb-4 py-4 text-gray-600">
        <div className='w-1/2'>
          <span>{postData.date}</span>
          <span> {postData.author}</span>
          <span> {postData.category}</span>
        </div>
        <div className='w-1/2 flex justify-end text-2xl'>
          <FaLink className='mr-3' />
          <RiKakaoTalkFill />
        </div>
      </div>
      <div className="prose" dangerouslySetInnerHTML={{ __html: postData.content }} />

      {/* 댓글 기능 추가 */}
      <Disqus post={postData} />
    </div>
  );
}
