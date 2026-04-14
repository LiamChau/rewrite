/**
 * Spotify Restrictions Patch
 * Patch connect-state device cluster restrictions
 */

let body = $response.body;

try {
  let obj = JSON.parse(body);

  function walk(target) {
    if (!target || typeof target !== "object") return;

    for (const key in target) {
      let val = target[key];

      // 所有 can_* 开放
      if (key.startsWith("can_")) {
        target[key] = true;
      }

      // 关键：清空所有限制字段
      if (
        key.includes("restriction") ||
        key.includes("disallow") ||
        key.includes("forbid")
      ) {
        if (Array.isArray(val)) {
          target[key] = [];
        } else if (typeof val === "object") {
          target[key] = {};
        } else if (typeof val === "boolean") {
          target[key] = false;
        }
      }

      // 强制关闭 shuffle
      if (key.includes("shuffle")) {
        target[key] = false;
      }

      // repeat context
      if (key === "repeat_mode") {
        target[key] = 2;
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
