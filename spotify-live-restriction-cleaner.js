/**
 * Spotify Live Restriction Cleaner
 * Re-clears dynamic track metadata restrictions
 * Prevents shuffle/prev from re-locking after some time
 */

let body = $response.body;

try {
  let obj = JSON.parse(body);

  function clean(target) {
    if (!target || typeof target !== "object") return;

    for (const key in target) {
      let val = target[key];

      if (key.startsWith("disallow_") && key.endsWith("_reasons")) {
        if (typeof val === "number") {
          target[key] = 0;
        } else if (Array.isArray(val)) {
          target[key] = [];
        } else {
          target[key] = {};
        }
      }

      if (key.startsWith("can_") && typeof val === "boolean") {
        target[key] = true;
      }

      if (
        key === "shuffle" ||
        key === "is_shuffling" ||
        key === "shuffling_context"
      ) {
        target[key] = false;
      }

      if (typeof target[key] === "object") {
        clean(target[key]);
      }
    }
  }

  clean(obj);

  $done({ body: JSON.stringify(obj) });
} catch (e) {
  $done({});
}