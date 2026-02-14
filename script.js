// Active nav link highlight
(() => {
  const links = document.querySelectorAll(".nav-link");
  const path = location.pathname.split("/").pop() || "index.html";
  links.forEach(a => {
    const href = a.getAttribute("href");
    if (href === path) a.classList.add("active");
  });
})();

// Simple lightbox for any image with class="lightbox"
(() => {
  const lb = document.getElementById("lightbox");
  const lbImg = document.getElementById("lightboxImg");
  const lbCap = document.getElementById("lightboxCap");
  const lbClose = document.getElementById("lightboxClose");

  if (!lb || !lbImg || !lbCap || !lbClose) return;

  const open = (src, alt, cap) => {
    lbImg.src = src;
    lbImg.alt = alt || "";
    lbCap.textContent = cap || alt || "";
    lb.classList.add("open");
    lb.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  };

  const close = () => {
    lb.classList.remove("open");
    lb.setAttribute("aria-hidden", "true");
    lbImg.src = "";
    lbCap.textContent = "";
    document.body.style.overflow = "";
  };

  document.addEventListener("click", (e) => {
    const img = e.target.closest("img.lightbox");
    if (img) {
      const fig = img.closest("figure");
      const cap = fig ? fig.querySelector("figcaption")?.textContent : "";
      open(img.getAttribute("src"), img.getAttribute("alt"), cap);
    }
  });

  lbClose.addEventListener("click", (e) => {
    e.stopPropagation();
    close();
  });

  lb.addEventListener("click", () => close());

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") close();
  });
})();
