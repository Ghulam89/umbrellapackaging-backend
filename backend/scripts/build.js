import { build } from 'esbuild';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const backendRoot = path.resolve(__dirname, '..');
const pkgPath = path.resolve(backendRoot, 'package.json');
const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'));
const deps = Object.keys(pkg.dependencies || {});
const builtins = [
  'fs',
  'path',
  'url',
  'os',
  'cluster',
  'net',
  'dns'
];
const externals = Array.from(new Set([...builtins, ...deps, 'vite', 'sirv', 'compression']));

await build({
  entryPoints: [path.resolve(backendRoot, 'app.js')],
  outfile: path.resolve(backendRoot, 'dist/server.js'),
  bundle: true,
  platform: 'node',
  format: 'esm',
  target: ['node18'],
  sourcemap: true,
  minify: false,
  external: externals,
  logLevel: 'info'
});
