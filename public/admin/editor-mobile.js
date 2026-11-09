/* Webyss Admin — progressive gallery row enhancements.
 * Decap still owns all inputs, upload actions and saved data.
 * We only decorate existing filenames in collapsed gallery rows.
 */
(() => {
  "use strict";
  // Decap's own back arrow returns from a form to a redundant collection page.
  // After a *completed* route change, send that one-step-back action to our
  // Webyss dashboard. Listening to hashchange (rather than hijacking clicks)
  // preserves Decap's built-in unsaved-changes confirmation.
  const isEditor = hash => /^#\/(?:edit\/(?:gallery|services|home|about|contact)\/[^/?]+|collections\/(?:gallery|services|home|about|contact)\/entries\/[^/?]+)/.test(hash);
  const isCollectionList = hash => /^#\/collections\/(?:gallery|services|home|about|contact)(?:\/entries)?\/?(?:\?.*)?$/.test(hash);
  let previousEditorHash = window.location.hash;
  window.addEventListener("hashchange", () => {
    const nextHash = window.location.hash;
    if (isEditor(previousEditorHash) && isCollectionList(nextHash)) {
      window.location.replace("./home.html");
      return;
    }
    previousEditorHash = nextHash;
  });

  const mediaPrefix = "/truhlar-breznovsky-cms-test";
  const mobile = window.matchMedia("(max-width: 820px)");
  const galleryRoute = () => /\/(?:edit|collections)\/gallery(?:\/|$)/.test(window.location.hash);
  const filePattern = /^\/(?:truhlar-breznovsky-cms-test\/)?images\/[^\s"']+\.(?:png|jpe?g|webp|gif|avif)$/i;
  let scheduled = false;

  function enhanceGallery() {
    scheduled = false;
    if (!mobile.matches || !galleryRoute()) return;
    const root = document.getElementById("nc-root");
    if (!root) return;

    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    let textNode;
    while ((textNode = walker.nextNode())) {
      const path = (textNode.nodeValue || "").trim();
      if (!filePattern.test(path)) continue;
      const element = textNode.parentElement;
      if (!element || element.childElementCount !== 0) continue;
      if (element.closest("input, textarea, [contenteditable='true'], [role='textbox']")) continue;
      if (element.dataset.webyssSource === path) continue;

      const fullPath = path.startsWith(mediaPrefix + "/") ? path : mediaPrefix + path;
      const filename = fullPath.substring(fullPath.lastIndexOf("/") + 1);
      element.style.setProperty("--webyss-thumb", 'url("' + fullPath.replace(/"/g, "%22") + '")');
      element.dataset.webyssName = filename;
      element.dataset.webyssSource = path;
      element.classList.add("webyss-gallery-filename");
    }
  }

  function scheduleEnhancement() {
    if (scheduled) return;
    scheduled = true;
    window.requestAnimationFrame(enhanceGallery);
  }

  window.addEventListener("hashchange", scheduleEnhancement);
  window.addEventListener("resize", scheduleEnhancement, { passive: true });

  const observer = new MutationObserver(scheduleEnhancement);
  observer.observe(document.body, { childList: true, subtree: true, characterData: true });
  scheduleEnhancement();
})();
