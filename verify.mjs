import { rolldown, VERSION } from 'rolldown';
import ruleConfig from './rolldown.config.rule.mjs';
import pluginConfig from './rolldown.config.plugin.mjs';

const cases = [
  ['default', { input: 'src/main.js', output: { format: 'es' } }, false],
  ['rule', ruleConfig, true],
  ['plugin', pluginConfig, true],
];

console.log(`rolldown ${VERSION}\n`);
let failed = false;
for (const [label, { output, ...input }, expectKept] of cases) {
  const bundle = await rolldown(input);
  const { output: [chunk] } = await bundle.generate(output);
  const kept = chunk.code.includes('configured');
  const ok = kept === expectKept;
  failed ||= !ok;
  console.log(`--- ${label}: configure.js ${kept ? 'kept' : 'dropped'} ${ok ? 'OK' : 'UNEXPECTED'}`);
  console.log(chunk.code);
}
process.exit(failed ? 1 : 0);
