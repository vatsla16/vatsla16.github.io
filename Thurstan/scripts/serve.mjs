import { createReadStream, existsSync, statSync } from "node:fs";
import { extname, join, normalize, resolve } from "node:path";
import { createServer } from "node:http";

const root = resolve(process.cwd());
const port = Number(process.env.PORT || process.argv[2] || 8020);
const host = process.env.HOST || "127.0.0.1";

const types = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".xml": "application/xml; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
  ".webp": "image/webp",
  ".png": "image/png",
  ".svg": "image/svg+xml"
};

function safePath(urlPath) {
  const decoded = decodeURIComponent(urlPath.split("?")[0]);
  const clean = normalize(decoded).replace(/^(\.\.[/\\])+/, "");
  return resolve(join(root, clean));
}

function sendFile(res, filePath, status = 200) {
  const type = types[extname(filePath)] || "application/octet-stream";
  res.writeHead(status, {
    "Content-Type": type,
    "X-Content-Type-Options": "nosniff"
  });
  createReadStream(filePath).pipe(res);
}

function resolveRequest(urlPath) {
  if (urlPath === "/" || urlPath === "") return join(root, "index.html");
  const filePath = safePath(urlPath);
  if (!filePath.startsWith(root)) return null;
  if (existsSync(filePath) && statSync(filePath).isDirectory()) {
    return join(filePath, "index.html");
  }
  return filePath;
}

createServer((req, res) => {
  const filePath = resolveRequest(req.url || "/");
  if (filePath && existsSync(filePath) && statSync(filePath).isFile()) {
    sendFile(res, filePath);
    return;
  }

  const notFound = join(root, "404.html");
  if (existsSync(notFound)) {
    sendFile(res, notFound, 404);
    return;
  }

  res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
  res.end("Not found");
}).listen(port, host, () => {
  console.log(`Serving ${root} at http://${host}:${port}/`);
});
