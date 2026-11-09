/* Webyss Admin — progressive gallery row enhancements.
 * Decap still owns all inputs, upload actions and saved data.
 * We only decorate existing filenames in collapsed gallery rows.
 */
(() => {
  "use strict";
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
