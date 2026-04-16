/**
 * Spotify Smart Shuffle Killer
 * Prevent server AB bucket from re-enabling shuffle modes
 */

let body = $response.body;

try {
  let obj = JSON.parse(body);

  function walk(target) {
    if (!target || typeof target !== "object") return;

    for (const key in target) {
      let val = target[key];
      const lower = key.toLowerCase();

      if (
        lower.includes("smart_shuffle") ||
        lower.includes("shuffle_mode") ||
        lower.includes("default_play_mode") ||
        lower.includes("play_intent") ||
        lower.includes("fewer_repeats")
      ) {
        if (typeof val === "boolean") {
          target[key] = false;
        } else if (typeof val === "number") {
          target[key] = 0;
        } else if (typeof val === "string") {
          target[key] = "linear";
        }
      }

      if (
        lower === "shuffle" ||
        lower === "is_shuffling" ||
        lower === "shuffling_context"
      ) {
        target[key] = false;
      }

      if (typeof target[key] === "object") {
        walk(target[key]);
      }
    }
  }

  walk(obj);

  $done({ body: JSON.stringify(obj) });
} catch (e) {
  $done({});
}