/**
 * Spotify shuffle fix for Quantumult X
 * Enhanced request-header cleaner
 */

try {
  if (
    !$request ||
    !$request.headers ||
    typeof $request.headers !== "object"
  ) {
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
    if (key in headers) {
      delete headers[key];
    }
  }

  headers["Cache-Control"] = "no-cache";
  headers["Pragma"] = "no-cache";

  $done({ headers });
} catch (e) {
  $done({});
}