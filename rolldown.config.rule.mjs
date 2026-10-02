// Override with a `treeshake.moduleSideEffects` rule.
// Modules that match no rule still use their `package.json#sideEffects`.
// Prefer this over the plugin: rolldown checks the rule in Rust, with no call into JavaScript.
export default {
  input: 'src/main.js',
  treeshake: {
    moduleSideEffects: [
      { test: /node_modules[\\/]lib[\\/]index\.js$/, sideEffects: true },
    ],
  },
  output: { format: 'es' },
};
