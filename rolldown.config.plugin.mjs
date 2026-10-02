// Override with a plugin. A hook value takes priority over `package.json#sideEffects`.
export default {
  input: 'src/main.js',
  plugins: [
    {
      name: 'lib-index-side-effects',
      transform: {
        filter: { id: /node_modules[\\/]lib[\\/]index\.js$/ },
        handler() {
          return { moduleSideEffects: true };
        },
      },
    },
  ],
  output: { format: 'es' },
};
