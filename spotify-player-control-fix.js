/**
 * Spotify Player Control-fix
 */

let body = $response.body;

try {
  let obj = JSON.parse(body);

  function deepPatch(target) {
    if (!target || typeof target !== "object") return;

    for (let key in target) {
      let val = target[key];

      // 所有 can_* 权限强制 true
      if (key.startsWith("can_")) {
        target[key] = true;
      }

      // 播放控制相关字段强制开放
      if (
        key.includes("skip") ||
        key.includes("seek") ||
        key.includes("repeat") ||
        key.includes("queue") ||
        key.includes("prev") ||
        key.includes("next")
      ) {
        if (typeof val === "boolean") {
          target[key] = true;
        }
      }

      // 强制关闭 shuffle
      if (
        key === "shuffle" ||
        key === "shuffling_context" ||
        key === "is_shuffling"
      ) {
        target[key] = false;
      }

      // repeat 默认开启上下文
      if (key === "repeat_mode") {
        target[key] = 2;
      }

      if (typeof target[key] === "object") {
        deepPatch(target[key]);
      }
    }
  }

  deepPatch(obj);

  $done({ body: JSON.stringify(obj) });
} catch (e) {
  $done({});
}
