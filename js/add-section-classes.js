// Add a class to sections whose H2 contains certain words (works with accents and SPAs)
(function() {
  function applySectionClasses() {
    document.querySelectorAll('section').forEach(s => {
      const h2 = s.querySelector('h2');
      if (!h2) return;

      // Normalize to remove accents and compare lowercased text
      const txt = h2.textContent.trim()
        .toLowerCase()
        .normalize('NFD')                   // decompose accents
        .replace(/\p{Diacritic}/gu, '');   // remove diacritics (accents)

      // Match keywords (normalized form)
      if (/(travailons|interesse|pret|work)/.test(txt)) {
        s.classList.add('cta-section');
      }
    });
  }

  // Run once when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', applySectionClasses);
  } else {
    applySectionClasses();
  }

  // Re-apply on mutations (useful for SPAs that swap content)
  if (typeof MutationObserver !== 'undefined') {
    const observer = new MutationObserver(() => applySectionClasses());
    observer.observe(document.body, { childList: true, subtree: true });
  }
})();