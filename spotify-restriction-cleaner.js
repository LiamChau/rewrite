/**
 * Spotify Restriction Cleaner
 */

let body = $response.body;

try {
  let obj = JSON.parse(body);

  function walk(target) {
    if (!target || typeof target !== "object") return;

    for (const key in target) {
      let val = target[key];

      if (key.startsWith("disallow_") && key.endsWith("_reasons")) {
        if (typeof val === "number") {
          target[key] = 0;
        } else if (Array.isArray(val)) {
          target[key] = [];
        } else if (typeof val === "string") {
          target[key] = "";
        } else if (typeof val === "object") {
          target[key] = {};
        }
      }

      // 同时开放 can_* 权限（辅助）
      if (key.startsWith("can_") && typeof val === "boolean") {
        target[key] = true;
      }

      // 强制关闭 shuffle 状态
      if (
        key === "shuffle" ||
        key === "shuffling_context" ||
        key === "is_shuffling"
      ) {
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