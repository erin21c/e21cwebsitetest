// script.js — Baltacı Asansör site JS

// 1. Auto-update footer year (if not handled inline in HTML)
document.addEventListener("DOMContentLoaded", () => {
  const yearSpan = document.getElementById("y");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
});

// 2. Smooth scroll for internal anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    // Only intercept if the link is on the same page
    const targetId = this.getAttribute("href").substring(1);
    if (targetId) {
      const target = document.getElementById(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth" });
      }
    }
  });
});

// 3. Simple form confirmation for Netlify form
document.addEventListener("submit", (e) => {
  const form = e.target;
  if (form.getAttribute("name") === "contact") {
    // Let Netlify handle submission, but show a quick message
    alert("Teşekkürler! Mesajınız gönderildi.");
  }
});

