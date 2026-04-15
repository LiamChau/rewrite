/**
 * Spotify gabo telemetry blocker
 * Local fake 200 response
 * Stable version for Quantumult X
 */

console.log("Spotify gabo blocked locally");

$done({
  response: {
    status: 200,
    headers: {
      "cache-control": "no-cache",
      "content-type": "application/json",
      "date": new Date().toUTCString(),
      "strict-transport-security": "max-age=31536000",
      "x-content-type-options": "nosniff"
    },
    body: ""
  }
});