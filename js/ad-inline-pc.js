const adInlineDesktopQuery = window.matchMedia("(min-width: 1001px)");

const mountDesktopInlineAd = () => {
  if (!adInlineDesktopQuery.matches) {
    return;
  }

  document.querySelectorAll(".mainFooter").forEach((footer, footerIndex) => {
    if (footer.querySelector(".adInlineArea")) {
      return;
    }

    const adArea = document.createElement("section");
    adArea.className = "adInlineArea";
    adArea.setAttribute("aria-label", "広告");

    const caption = document.createElement("p");
    caption.className = "adInlineCaption";
    caption.textContent = "Advertisement";

    const slot = document.createElement("div");
    slot.className = "adInlineSlot";

    const adScript = document.createElement("script");
    adScript.src = "https://adm.shinobi.jp/s/5c3861c08c3b3fdb47503ed46bb27865";
    adScript.async = true;
    adScript.dataset.slot = `pc-inline-${footerIndex}`;

    slot.appendChild(adScript);
    adArea.append(caption, slot);
    footer.prepend(adArea);
  });
};

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", mountDesktopInlineAd, { once: true });
} else {
  mountDesktopInlineAd();
}
