const fs = require("fs");

/*
AWS Lambda allows writing ONLY in /tmp
This works both in Lambda and local dev
*/

const CACHE_FILE = "/tmp/scripts-cache.json";

/* ensure cache file exists */

function ensureCache() {

try{

if (!fs.existsSync(CACHE_FILE)) {
fs.writeFileSync(CACHE_FILE, JSON.stringify({}), "utf8");
}

}catch(err){

console.log("Cache initialization error:", err);

}

}

/* get entire cache */

function getCache() {

try{

ensureCache();

const data = fs.readFileSync(CACHE_FILE, "utf8");

return JSON.parse(data);

}catch(err){

console.log("Cache read error:", err);

return {};

}

}

/* save entire cache */

function saveCache(cache) {

try{

ensureCache();

fs.writeFileSync(
CACHE_FILE,
JSON.stringify(cache, null, 2),
"utf8"
);

}catch(err){

console.log("Cache write error:", err);

}

}

/* get specific script */

function getCachedScript(key) {

try{

const cache = getCache();

return cache[key] || null;

}catch(err){

console.log("Cache lookup error:", err);

return null;

}

}

/* store script */

function storeScript(key, data) {

try{

const cache = getCache();

cache[key] = data;

saveCache(cache);

}catch(err){

console.log("Cache store error:", err);

}

}

module.exports = {
getCachedScript,
storeScript
};