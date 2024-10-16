import mdx from '@next/mdx';

const withMDX = mdx({
  extension: /\.mdx?$/,
});

export default withMDX({
  pageExtensions: ['js', 'jsx', 'md', 'mdx'],
});
