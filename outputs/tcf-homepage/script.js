const searchForm = document.querySelector(".site-search");
const searchInput = document.querySelector("#site-search-input");
const searchStatus = document.querySelector("#search-status");
const pageLang = document.documentElement.lang;
const isEnglish = pageLang.startsWith("en");
const isFrench = pageLang.startsWith("fr");
const contactDialog = document.querySelector(".contact-dialog");
const contactTriggers = document.querySelectorAll(".contact-trigger");
const dialogClose = document.querySelector(".dialog-close");
const parallaxItems = document.querySelectorAll(".parallax-slow, .parallax-fast");

if (parallaxItems.length && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  let ticking = false;
  const updateParallax = () => {
    const y = Math.min(window.scrollY, window.innerHeight);
    parallaxItems.forEach((item) => {
      const speed = item.classList.contains("parallax-fast") ? -0.08 : -0.045;
      item.style.transform = `translate3d(0, ${y * speed}px, 0)`;
    });
    ticking = false;
  };
  window.addEventListener(
    "scroll",
    () => {
      if (!ticking) {
        window.requestAnimationFrame(updateParallax);
        ticking = true;
      }
    },
    { passive: true },
  );
  updateParallax();
}

contactTriggers.forEach((trigger) => {
  trigger.addEventListener("click", () => {
    if (contactDialog?.showModal) {
      contactDialog.showModal();
    }
  });
});

dialogClose?.addEventListener("click", () => {
  contactDialog?.close();
});

contactDialog?.addEventListener("click", (event) => {
  if (event.target === contactDialog) {
    contactDialog.close();
  }
});

function clearSearchHit() {
  document.querySelectorAll(".search-hit").forEach((element) => {
    element.classList.remove("search-hit");
  });
}

function showSearchStatus(message) {
  if (!searchStatus) return;
  searchStatus.textContent = message;
  searchStatus.hidden = false;
}

searchForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  clearSearchHit();

  const query = searchInput.value.trim().toLowerCase();
  if (!query) {
    showSearchStatus(
      isFrench
        ? "Veuillez saisir un mot-clé."
        : isEnglish
          ? "Please enter a search term."
          : "請輸入要搜尋的內容。",
    );
    searchInput.focus();
    return;
  }

  const candidates = [...document.querySelectorAll("main section, main article")];
  const match = candidates.find((element) => element.textContent.toLowerCase().includes(query));

  if (!match) {
    showSearchStatus(
      isFrench
        ? `Aucun résultat pour « ${searchInput.value.trim()} ».`
        : isEnglish
        ? `No results found for "${searchInput.value.trim()}".`
        : `找不到「${searchInput.value.trim()}」相關內容。`,
    );
    return;
  }

  match.classList.add("search-hit");
  match.scrollIntoView({ behavior: "smooth", block: "start" });
  showSearchStatus(
    isFrench
      ? `Contenu trouvé pour « ${searchInput.value.trim()} ».`
      : isEnglish
      ? `Found content related to "${searchInput.value.trim()}".`
      : `已找到「${searchInput.value.trim()}」相關內容。`,
  );
});
