'use client';

import { DiscussionEmbed } from 'disqus-react';

// 환경 변수에서 값을 가져와 사용
const disqusShortname = process.env.NEXT_PUBLIC_DISQUS_SHORTNAME;

const Disqus = ({ post }) => {
  // 불필요한 재선언 제거
  const disqusConfig = {
    url: `https://develop-blog-lac.vercel.app/${post.id}`,
    identifier: post.id,
    title: post.title,
  };

  // disqusShortname과 disqusConfig를 설정해 DiscussionEmbed를 렌더링
  return <DiscussionEmbed shortname={disqusShortname} config={disqusConfig} />;
};

export default Disqus;
