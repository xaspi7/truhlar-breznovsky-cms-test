/*
 * Webyss Admin: small, non-invasive helpers for the Decap editor.
 * Do NOT replace Decap's React state, inputs, save handlers or authentication.
 */
(() => {
  "use strict";

  const editorHash = hash => /^#\/(?:collections\/(?:gallery|services|home|about|contact)\/entries\/[^/?]+|edit\/(?:gallery|services|home|about|contact)\/[^/?]+)/.test(hash);
  const collectionHash = hash => /^#\/collections\/(?:gallery|services|home|about|contact)(?:\/entries)?\/?(?:\?.*)?$/.test(hash);
  const isGallery = () => window.matchMedia("(max-width: 820px)").matches &&
    /^#\/(?:collections\/gallery\/entries\/|edit\/gallery\/)/.test(location.hash);

  // Decap normally returns to an intermediate "Collections" page.
  // Redirect only after its own route changed (including unsaved-change prompts).
  let previousHash = location.hash;
  window.addEventListener("hashchange", () => {
    const hash = location.hash;
    if (editorHash(previousHash) && collectionHash(hash)) {
      location.replace("./home.html");
      return;
    }
    previousHash = hash;
    setupGalleryObserver();
  });

  const filePattern = /^\/(?:truhlar-breznovsky-cms-test\/)?images\/[A-Za-z0-9._\/%\-]+\.(?:png|jpe?g|webp|gif|avif)$/i;
  const prefix = "/truhlar-breznovsky-cms-test";
  let galleryObserver = null;
  let updateTimer = null;

  function addThumbnails() {
    updateTimer = null;
    if (!isGallery()) return;

    const root = document.getElementById("nc-root");
    if (!root) return;
    const lists = root.querySelectorAll('[class*="ListControl"]');
    for (const list of lists) {
      const walker = document.createTreeWalker(list, NodeFilter.SHOW_TEXT);
      let node;
      while ((node = walker.nextNode())) {
        const filenamePath = (node.nodeValue || "").trim();
        if (!filePattern.test(filenamePath)) continue;
        const el = node.parentElement;
        if (!el || el.childElementCount || el.closest('input, textarea, [contenteditable="true"], [role="textbox"]')) continue;
        if (el.dataset.webyssSource === filenamePath) continue;

        const absolute = filenamePath.startsWith(prefix + "/") ? filenamePath : prefix + filenamePath;
        const encoded = absolute.replace(/[()]/g, c => c === "(" ? "%28" : "%29");
        el.style.setProperty("--webyss-thumb", 'url("' + encoded + '")');
        el.dataset.webyssSource = filenamePath;
        el.dataset.webyssName = absolute.substring(absolute.lastIndexOf("/") + 1);
        el.classList.add("webyss-gallery-filename");
      }
    }
  }

  function scheduleGalleryUpdate() {
    if (!isGallery() || updateTimer !== null) return;
    updateTimer = window.setTimeout(addThumbnails, 180);
  }

  function setupGalleryObserver() {
    if (galleryObserver) {
      galleryObserver.disconnect();
      galleryObserver = null;
    }
    if (updateTimer !== null) {
      clearTimeout(updateTimer);
      updateTimer = null;
    }
    if (!isGallery()) return;
    const root = document.getElementById("nc-root");
    if (!root) return;

    // Watch only Decap's mounted app, not document.body and not characterData.
    galleryObserver = new MutationObserver(scheduleGalleryUpdate);
    galleryObserver.observe(root, { childList: true, subtree: true });
    scheduleGalleryUpdate();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", setupGalleryObserver, { once: true });
  } else {
    setupGalleryObserver();
  }

  // Decap initializes after this script; allow the gallery list to mount.
  window.setTimeout(setupGalleryObserver, 500);
  window.setTimeout(setupGalleryObserver, 1500);
})();
