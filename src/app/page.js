import fs from "fs"; // 파일 시스템 모듈
import path from "path"; // 경로 처리 모듈
import matter from "gray-matter"; // Markdown 파일에서 메타데이터를 파싱하는 라이브러리
import Link from "next/link"; // 페이지 이동을 위한 Next.js 링크 컴포넌트

// 블로그 포스트 목록을 가져오는 함수
async function getPosts() {
  const postsDirectory = path.join(process.cwd(), "posts"); // 'posts' 폴더 경로 설정
  const filenames = fs.readdirSync(postsDirectory); // 폴더 내 파일 목록 가져오기

  const posts = filenames.map((filename) => {
    const filePath = path.join(postsDirectory, filename); // 각 파일의 전체 경로
    const fileContents = fs.readFileSync(filePath, "utf8"); // 파일 내용 읽기
    const { data } = matter(fileContents); // 메타데이터 추출

    return {
      id: filename.replace(/\.mdx?$/, ""), // 파일명에서 확장자 제거하여 ID 설정
      title: data.title, // 제목
      date: data.date, // 작성 날짜
      author: data.author, // 작성자
      category: data.category, // 카테고리
      preview: data.preview, // 미리보기 텍스트
    };
  });

  return posts;
}

// 홈 페이지 컴포넌트
export default async function Home() {
  const posts = await getPosts(); // 포스트 목록 가져오기

  return (
    <>
      {/* 배너 영역 */}
      <div className="flex-col md:flex-row w-full h-48 md:h-64 lg:h-80 flex items-center justify-center bg-orange-300">
        <img
          src="/Images/hoonydev.png"
          className="w-24 md:w-40 lg:w-60"
          alt="Hoonydev Logo"
        />
        <p className="mb-4 text-xl md:text-4xl lg:text-6xl font-bold text-white">
          훈이의 개발 블로그
        </p>
      </div>

      {/* 블로그 포스트 목록 */}
      {posts.map((post) => (
        <Link href={`/posts/${post.id}`} key={post.id}>
          <div className="flex flex-col border border-b-slate-100 p-4 cursor-pointer hover:bg-gray-100">
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
    </>
  );
}
