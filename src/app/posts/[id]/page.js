import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import remarkGfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';
import rehypeRaw from 'rehype-raw';
import rehypeStringify from 'rehype-stringify';
import { FaLink } from "react-icons/fa";
import { RiKakaoTalkFill } from "react-icons/ri";
import Disqus from '../[id]/components/Disqus';

export async function generateStaticParams() {
  const postsDirectory = path.join(process.cwd(), 'posts');
  const filenames = fs.readdirSync(postsDirectory);
  return filenames.map(filename => ({
    id: filename.replace(/\.mdx?$/, '')
  }));
}

async function getPostData(id) {
  const postsDirectory = path.join(process.cwd(), 'posts');
  const fullPath = path.join(postsDirectory, `${id}.mdx`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  const preview = data.preview || '';

  // 공통 마크다운 처리 함수
  const processMarkdown = async (markdown) => {
    const processed = await remark()
      .use(remarkGfm)
      .use(remarkRehype, { allowDangerousHtml: true })
      .use(rehypeRaw)
      .use(rehypeStringify)
      .process(markdown);
    return processed.toString();
  };

  // 미리보기 HTML 생성
  const previewHtml = await processMarkdown(preview);

  // 전체 내용 HTML 생성
  const contentHtml = await processMarkdown(content);

  return {
    id,
    title: data.title,
    previewHtml,
    date: data.date,
    author: data.author,
    category: data.category,
    contentHtml
  };
}

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
          <RiKakaoTalkFill className='text-yellow-300'/>
        </div>
      </div>
      <div className="prose pt-10" dangerouslySetInnerHTML={{ __html: postData.previewHtml }} />
      <div className="prose pt-10 flex flex-col border border-red-500" dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      <div className='pt-8'>
        <Disqus post={postData} />
      </div>
    </div>
  );
}