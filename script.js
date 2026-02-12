function copyCall() {
  const el = document.getElementById("theCall");
  if (!el) return;

  const text = el.innerText.trim();
  navigator.clipboard.writeText(text).then(() => {
    const btn = document.getElementById("copyBtn");
    if (!btn) return;
    const old = btn.textContent;
    btn.textContent = "Copied!";
    setTimeout(() => (btn.textContent = old), 1200);
  }).catch(() => {
    alert("Copy isn’t available here. You can highlight the paragraph and copy manually.");
  });
}

/* Posts (local demo thread) */
const STORAGE_KEY = "woe_posts_v1";

function loadPosts(){
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]"); }
  catch { return []; }
}
function savePosts(posts){
  localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
}
function escapeHtml(str){
  return (str || "").replace(/[&<>"']/g, (m) => ({
    "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"
  }[m]));
}

function renderPosts(){
  const grid = document.getElementById("postGrid");
  if (!grid) return;

  const posts = loadPosts();
  if (posts.length === 0){
    grid.innerHTML = `
      <div class="quote-card" style="grid-column: span 12;">
        <p class="q">No posts yet. Add one above to start the thread.</p>
      </div>
    `;
    return;
  }

  grid.innerHTML = posts.slice().reverse().map(p => {
    const name = p.name ? escapeHtml(p.name) : "Anonymous";
    const tag = p.tag ? escapeHtml(p.tag) : "";
    const text = escapeHtml(p.text);
    const date = new Date(p.ts).toLocaleDateString();

    return `
      <div class="quote-card">
        <p class="q">“${text}”</p>
        <div class="meta">
          <span><b>${name}</b>${tag ? ` • ${tag}` : ""}</span>
          <span>${date}</span>
        </div>
      </div>
    `;
  }).join("");
}

function setupPostForm(){
  const form = document.getElementById("postForm");
  if (!form) return;

  const nameEl = document.getElementById("pName");
  const tagEl  = document.getElementById("pTag");
  const textEl = document.getElementById("pText");
  const noteEl = document.getElementById("saveNote");
  const clearBtn = document.getElementById("clearPostsBtn");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const text = (textEl.value || "").trim();
    if (!text){
      noteEl.textContent = "Please write a post first.";
      return;
    }

    const posts = loadPosts();
    posts.push({
      name: (nameEl.value || "").trim(),
      tag: (tagEl.value || "").trim(),
      text,
      ts: Date.now()
    });

    savePosts(posts);
    noteEl.textContent = "Saved (on this device).";
    textEl.value = "";
    renderPosts();
  });

  clearBtn?.addEventListener("click", () => {
    localStorage.removeItem(STORAGE_KEY);
    noteEl.textContent = "Cleared your saved posts.";
    renderPosts();
  });
}

document.addEventListener("DOMContentLoaded", () => {
  renderPosts();
  setupPostForm();
});
