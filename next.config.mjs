import withMDX from '@next/mdx';
import remarkBreaks from 'remark-breaks';

const config = withMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [remarkBreaks],
  },
});

export default {
  ...config,
  pageExtensions: ['js', 'jsx', 'md', 'mdx'],
};
