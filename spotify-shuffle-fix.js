/**
 * Spotify shuffle fix for Quantumult X
 * Enhanced request-header cleaner
 */

try {
  if (!$request || !$request.headers) {
    $done({});
    return;
  }

  let headers = $request.headers;

  const removeKeys = [
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
  ];

  for (const key of removeKeys) {
    try {
      delete headers[key];
    } catch (e) {}
  }

  headers["Cache-Control"] = "no-cache";
  headers["Pragma"] = "no-cache";

  $done({ headers });
} catch (e) {
  $done({});
}

