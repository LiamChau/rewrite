/**
 * Spotify shuffle fix for Quantumult X
 * Enhanced request-header cleaner

let headers = $request.headers || {};

// 清理所有常见缓存头
delete headers["If-None-Match"];
delete headers["if-none-match"];
delete headers["ETag"];
delete headers["etag"];
delete headers["Cache-Control"];
delete headers["cache-control"];
delete headers["If-Modified-Since"];
delete headers["if-modified-since"];

// 某些版本会缓存 customize 配置
headers["Cache-Control"] = "no-cache";
headers["Pragma"] = "no-cache";

$done({ headers });
