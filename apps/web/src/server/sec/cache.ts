import { createHash } from "crypto";
import { promises as fs } from "fs";
import path from "path";

const CACHE_ROOT = path.join(process.cwd(), ".sec-cache");

const getCachePath = (namespace: string, key: string, extension: string) => {
  const hash = createHash("sha1").update(key).digest("hex");
  return path.join(CACHE_ROOT, namespace, `${hash}.${extension}`);
};

const ensureDir = async (dir: string) => {
  await fs.mkdir(dir, { recursive: true });
};

export async function readCache(
  namespace: string,
  key: string,
  maxAgeMs: number
) {
  const filePath = getCachePath(namespace, key, namespace === "json" ? "json" : "html");
  try {
    const stat = await fs.stat(filePath);
    const age = Date.now() - stat.mtimeMs;
    if (age > maxAgeMs) {
      return null;
    }
    const content = await fs.readFile(filePath, "utf8");
    return { content, path: filePath };
  } catch {
    return null;
  }
}

export async function writeCache(
  namespace: string,
  key: string,
  content: string
) {
  const dir = path.join(CACHE_ROOT, namespace);
  await ensureDir(dir);
  const filePath = getCachePath(namespace, key, namespace === "json" ? "json" : "html");
  await fs.writeFile(filePath, content, "utf8");
  return filePath;
}
