module.exports = {
  stories: ['../ext/**/*.stories.mdx', '../ext/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-a11y',
  ],
  framework: '@storybook/react',
  core: {
    builder: '@storybook/builder-webpack5',
    disableTelemetry: true,
  },
  webpackFinal: async (config) => {
    config.module.rules.push({
      test: /\.liquid$/,
      use: ['raw-loader'],
    });
    return config;
  },
};
