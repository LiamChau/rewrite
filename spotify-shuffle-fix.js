/**
 * Spotify shuffle fix for Quantumult X
 * [rewrite_local]
 * ^https?://(api|spclient)\.spotify\.com/ url request-header spotify-shuffle-fix.js
 */

try {
  if (!$request || !$request.headers || typeof $request.headers !== "object") {
    $done({});
    return;
  }

  const method = ($request.method || "").toUpperCase();
  if (method !== "GET" && method !== "HEAD") {
    $done({});
    return;
  }

  let headers = $request.headers;

  const removeKeys = [
    "If-None-Match", "if-none-match",
    "If-Modified-Since", "if-modified-since",
  ];

  for (const key of removeKeys) {
    if (key in headers) delete headers[key];
  }

  headers["Cache-Control"] = "no-cache";
  headers["Pragma"] = "no-cache";

  $done({ headers });
} catch (e) {
  $done({});
}
