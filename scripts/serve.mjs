import { createReadStream, existsSync, statSync } from 'node:fs';
import { createServer } from 'node:http';
import { extname, join, normalize, resolve } from 'node:path';

const distDir = resolve(process.cwd(), 'dist');
const port = Number(process.argv.find((arg) => arg === '--port') ? process.argv[process.argv.indexOf('--port') + 1] : process.env.PORT ?? 4321);

const contentTypes = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.webp': 'image/webp',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.txt': 'text/plain; charset=utf-8',
};

function resolveFile(pathname) {
  const safePath = normalize(pathname).replace(/^([/\\])+/, '');
  const candidate = resolve(distDir, safePath);

  if (candidate !== distDir && !candidate.startsWith(distDir + '/')) {
    return null;
  }

  if (existsSync(candidate) && statSync(candidate).isFile()) {
    return candidate;
  }

  const indexFile = join(candidate, 'index.html');

  if (existsSync(indexFile) && statSync(indexFile).isFile()) {
    return indexFile;
  }

  return null;
}

createServer((request, response) => {
  const pathname = decodeURIComponent(new URL(request.url ?? '/', 'http://localhost').pathname);
  const file = resolveFile(pathname);

  if (!file) {
    const notFound = resolve(distDir, '404.html');

    if (existsSync(notFound)) {
      response.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
      createReadStream(notFound).pipe(response);
      return;
    }

    response.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    response.end('Not found');
    return;
  }

  const type = contentTypes[extname(file)] ?? 'application/octet-stream';
  response.writeHead(200, { 'Content-Type': type });
  createReadStream(file).pipe(response);
}).listen(port, '127.0.0.1', () => {
  process.stdout.write(`Serving dist at http://127.0.0.1:${port}\n`);
});
