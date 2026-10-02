# rolldown#11079: override `sideEffects` for one file of a dependency

`lib` declares `"sideEffects": ["./configure.js"]`. Its `index.js` does `import './configure.js'` and then re-exports `value`. By default, rolldown drops `configure.js` (webpack does the same).

This example keeps `configure.js` without an edit to `lib`. It marks `node_modules/lib/index.js` as side-effectful in one of two ways:

- `rolldown.config.rule.mjs`: a `treeshake.moduleSideEffects` rule. Modules that match no rule still use their `package.json#sideEffects`.
- `rolldown.config.plugin.mjs`: a `transform` hook that returns `{ moduleSideEffects: true }`. This form also works in Vite.

## Run

```sh
npm install
npm run verify
```

`verify.mjs` builds `src/main.js` with no override, with the rule, and with the plugin. It fails if `configure.js` is not dropped/kept as expected.

`lib` is installed from `pkg/lib-1.0.0.tgz` so that its module id contains `node_modules/lib/`, as in a real install. A `file:./pkg/lib` dependency becomes a symlink, and the id then resolves to `pkg/lib/index.js`. To change `lib`, edit `pkg/lib/`, then run `npm pack ./lib` in `pkg/` and `npm install`.
