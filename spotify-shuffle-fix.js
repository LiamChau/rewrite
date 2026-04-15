/**
 * Spotify shuffle fix for Quantumult X
 */

try {
  let headers = {};

  if ($request && $request.headers && typeof $request.headers === "object") {
    headers = $request.headers;
  } else {
    $done({});
  }

  [
    "If-None-Match",
    "if-none-match",
    "ETag",
    "etag",
    "Cache-Control",
    "cache-control",
    "If-Modified-Since",
    "if-modified-since",
    "Pragma",
    "pragma"
  ].forEach(k => {
    try { delete headers[k]; } catch (e) {}
  });

  headers["Cache-Control"] = "no-cache";
  headers["Pragma"] = "no-cache";

  $done({ headers });
} catch (e) {
  $done({});
}