
export default {
  entry: 'index.tsx',
  plugins: [
    require.resolve('react-static-plugin-typescript'),
    require.resolve('react-static-plugin-styled-components'),
    require.resolve('react-static-plugin-sitemap'),
  ],
  paths: {
    buildArtifacts: 'tmp/artifacts',
  },
};
