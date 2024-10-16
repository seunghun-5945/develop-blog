import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Link from 'next/link';

async function getPosts() {
  const postsDirectory = path.join(process.cwd(), 'posts');
  const filenames = fs.readdirSync(postsDirectory);
  const posts = filenames.map((filename) => {
    const filePath = path.join(postsDirectory, filename);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data } = matter(fileContents);
    return {
      id: filename.replace(/\.mdx?$/, ''),
      title: data.title,
      date: data.date,
      author: data.author,
      category: data.category,
      preview: data. preview
    };
  });
  return posts;
}

export default async function Home() {
  const posts = await getPosts();
  
  return (
    <>
      <div className="w-full h-48 md:h-64 lg:h-80 flex items-center justify-center bg-blue-600">
        <h1 className="text-xl sm:text-xl md:text-4xl lg:text-6xl font-bold text-white">배너 업데이트 예정</h1>
      </div>
      {posts.map((post) => (
        <Link href={`/posts/${post.id}`} key={post.id}>
          <div className="flex flex-col border border-b-slate-100 p-4 cursor-pointer hover:bg-gray-100">
            <div className="w-full h-10 flex items-start justify-start text-black">
              <div className=''>{post.date || '날짜'} {post.author || '작성자'}</div>
            </div>
            <div className="w-full">
              <h2 className="text-3xl text-black font-bold">{post.title || '[제목]'}</h2>
            </div>
            <div className="w-full h-auto flex items-start text-black mt-4 line-clamp-3">
              {post.preview}
            </div>
          </div>
        </Link>
      ))}
    </>
  );
}