import fs from "fs";

const CACHE_FILE = "backend/cache/scripts.json";

// get entire cache
export function getCache() {

  const data = fs.readFileSync(CACHE_FILE, "utf8");

  return JSON.parse(data);

}

// save entire cache
export function saveCache(cache) {

  fs.writeFileSync(
    CACHE_FILE,
    JSON.stringify(cache, null, 2)
  );

}

// get specific script
export function getCachedScript(key) {

  const cache = getCache();

  return cache[key] || null;

}

// store script
export function storeScript(key, data) {

  const cache = getCache();

  cache[key] = data;

  saveCache(cache);

}

