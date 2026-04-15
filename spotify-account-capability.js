/**
 * Spotify account capability
 */

let body = $response.body;

try {
  let obj = JSON.parse(body);

  function patch(target) {
    if (!target || typeof target !== "object") return;

    for (const key in target) {
      let val = target[key];

      if (
        key === "is_premium" ||
        key === "premium" ||
        key === "isPremium"
      ) {
        target[key] = true;
      }

      if (
        key === "account_type" ||
        key === "product" ||
        key === "product_state"
      ) {
        target[key] = "premium";
      }

      if (key.startsWith("can_") && typeof val === "boolean") {
        target[key] = true;
      }

      if (key.startsWith("disallow_") && key.endsWith("_reasons")) {
        if (Array.isArray(val)) target[key] = [];
        else if (typeof val === "number") target[key] = 0;
        else target[key] = {};
      }

      if (
        key === "shuffle" ||
        key === "is_shuffling" ||
        key === "shuffling_context"
      ) {
        target[key] = false;
      }

      if (key === "repeat_mode") {
        target[key] = 2;
      }

      if (typeof target[key] === "object") {
        patch(target[key]);
      }
    }
  }

  patch(obj);

  $done({ body: JSON.stringify(obj) });
} catch (e) {
  $done({});
}