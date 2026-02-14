// Keeps navigation highlighting consistent even if the browser caches older pages.
(function () {
  const file = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav a").forEach(a => {
    const href = a.getAttribute("href");
    if (href === file) a.classList.add("active");
    else a.classList.remove("active");
  });
})();
