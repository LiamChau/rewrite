/**
 * Spotify Player Capability Fix
 * for Quantumult X
 */

let body = $response.body;

try {
  let obj = JSON.parse(body);

  function deepFix(target) {
    if (!target || typeof target !== "object") return;

    for (let key in target) {
      const val = target[key];

      // 强制播放器控制权限
      if (
        key.includes("skip") ||
        key.includes("seek") ||
        key.includes("shuffle") ||
        key.includes("repeat") ||
        key.includes("play")
      ) {
        if (typeof val === "boolean") {
          target[key] = true;
        }
      }

      if (typeof val === "object") deepFix(val);
    }
  }

  deepFix(obj);

  $done({ body: JSON.stringify(obj) });
} catch (e) {
  $done({});
}
