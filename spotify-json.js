/**
 * Spotify artist/album page iPad spoof
 * Improves artist hot tracks / album page playback
 */

console.log("Spotify artist/album iPad spoof");

let url = $request.url || "";

url = url.replace(/\.com:443/g, ".com");

url = url.replace(
  /([?&]platform=)iphone\b/,
  "$1ipad"
);

$done({ url });