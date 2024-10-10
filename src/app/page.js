import { IoMdMenu } from "react-icons/io";

const Home = () => {
  const test = [1,2,3,4,5]

  return (
    <div className="w-full flex flex-col bg-white">
      <header className="w-full h-16 md:h-20 bg-gray-800 flex fixed top-0 left-0 items-center justify-between text-white px-4">
        <h1 className="md:text-xl">이승훈 개발 블로그</h1>
        <IoMdMenu className="md:text-xl"/>
      </header>

      <div className="w-full h-48 md:h-64 lg:h-80 flex items-center justify-center bg-blue-600 mt-16 md:mt-20">
        <h1 className="text-xl sm:text-xl md:text-4xl lg:text-6xl font-bold">프론트엔드는 살아남을것이다 늘 그랫듯이</h1>
      </div>

      {test.map((item, index) => (
        <div className="h-40 flex flex-col border border-b-slate-100">
          <div className="w-full h-6 text-black">
            날짜 | 작성자 | 카테고리
          </div>
          <div className="w-full h-12">
            <h1 className="text-4xl text-black">[다시보기]</h1>
          </div>
          <div className="">
            <h2 className="text-2xl text-black">대충 내용이 들어 갈 것입니다 간략하게.</h2>
          </div>
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