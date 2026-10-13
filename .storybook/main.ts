import { fileURLToPath } from 'node:url';
import type { StorybookConfig } from '@storybook/html-vite';

const config: StorybookConfig = {
  stories: [
      '../src/**/*.mdx',
      '../src/**/*.stories.@(js|mjs|cjs)'
    ],
  addons: ['@storybook/addon-docs'],
  framework: {
    name: '@storybook/html-vite',
    options: {},
  },
  // 폰트는 Google Fonts에서 받으므로(preview-head.html) src/fonts는 제공하지 않는다.
  // 없는 폴더를 지정하면 Storybook 빌드가 실패한다.
  staticDirs: [{ from: '../src/images', to: '/images' }],
  // SCSS 파셜의 url('../images/...')은 Gulp 출력(dist/css) 기준 경로다.
  // Vite는 이를 src/scss 기준 'images/...'로 바꿔 찾지 못하므로 src/images로 연결한다.
  viteFinal: async (viteConfig) => {
    const alias = viteConfig.resolve?.alias;
    const imagesAlias = {
      find: /^images\//,
      replacement: fileURLToPath(new URL('../src/images/', import.meta.url)),
    };
    viteConfig.resolve = {
      ...viteConfig.resolve,
      alias: Array.isArray(alias)
        ? [...alias, imagesAlias]
        : [
            ...Object.entries(alias ?? {}).map(([find, replacement]) => ({
              find,
              replacement,
            })),
            imagesAlias,
          ],
    };
    return viteConfig;
  },
};

export default config;
