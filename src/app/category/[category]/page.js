import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Link from "next/link";
import CategoryNav from "@/components/CategoryNav";

export async function generateStaticParams() {
  const postsDir = path.join(process.cwd(), "posts");
  const files = fs.readdirSync(postsDir);

  const categories = files.map((filename) => {
    const fileContent = fs.readFileSync(path.join(postsDir, filename), "utf8");
    const { data } = matter(fileContent);
    return data.category;
  });

  const uniqueCategories = [...new Set(categories)];

  return uniqueCategories.map((category) => ({ category }));
}

export default async function CategoryPage({ params }) {
  const { category } = params;
  const postsDir = path.join(process.cwd(), "posts");
  const files = fs.readdirSync(postsDir);

  const posts = files
    .map((filename) => {
      const content = fs.readFileSync(path.join(postsDir, filename), "utf8");
      const { data } = matter(content);
      return {
        slug: filename.replace(/\.mdx?$/, ""),
        ...data,
      };
    })
    .filter((post) => post.category === category);

  return (
    <div>
      {/* 배너 */}
      <div className="flex flex-col md:flex-row md:gap-8 w-full h-48 md:h-64 lg:h-80 items-center justify-center bg-orange-300">
        <img
          src="/images/hoonydev.png"
          className="w-24 md:w-40 lg:w-60"
          alt="Hoonydev Logo"
        />
        <p className="mb-4 text-xl md:text-4xl p-3 lg:text-6xl font-bold text-white border-4">
          훈이의 개발 블로그
        </p>
      </div>

      <CategoryNav className="hidden md:flex" />

      <h1 className="text-2xl font-bold mb-4 px-4">{category} 카테고리</h1>

      <div className="">
        {posts.map((post) => (
          <Link key={post.slug} href={`/posts/${post.slug}`}>
            <div className="flex flex-col border border-b-slate-100 p-4 mb-4 cursor-pointer hover:bg-gray-100 transition">
              {/* 작성 날짜 및 작성자 */}
              <div className="w-full h-10 flex items-start justify-start text-black">
                <div>
                  {post.date || "날짜"} {post.author || "작성자"}
                </div>
              </div>
              {/* 포스트 제목 */}
              <div className="w-full">
                <h2 className="text-md md:text-3xl text-black font-bold">
                  {post.title || "[제목]"}
                </h2>
              </div>
              {/* 포스트 미리보기 */}
              <div className="w-full h-auto flex items-start text-black mt-4 line-clamp-3">
                {post.preview}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
