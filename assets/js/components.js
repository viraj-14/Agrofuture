/* ============================================================
   AGROFUTURE - Shared Components
   Navbar + Footer injected into every page
   ============================================================ */

function injectComponents() {
  // ── Cursor Elements ──────────────────────────────────────
  document.body.insertAdjacentHTML(
    "afterbegin",
    `
    <div class="orb orb-1"></div>
    <div class="orb orb-2"></div>
    <div class="cursor"></div>
    <div class="cursor-follower"></div>
    <div id="scroll-progress"></div>

    <!-- Loader -->
    <div id="loader">
      <div class="loader-logo">🌿 AgroFuture</div>
      <div class="loader-bar"><div class="loader-fill"></div></div>
    </div>

    <!-- Mobile Nav -->
    <nav class="mobile-nav">
      <button class="mobile-nav-close">✕</button>
      <a href="../index.html">🏠 Home</a>
      <a href="learn.html">📚 Learn</a>
      <a href="pages/pesticides.html">🧪 Pesticides</a>
      <a href="pages/soil.html">🌍 Soil & Land</a>
      <a href="pages/crops.html">🌾 Crops</a>
      <a href="pages/weather.html">🌤️ Weather</a>
      <a href="pages/organic.html">🍃 Organic</a>
      <a href="pages/schemes.html">🏛️ Schemes</a>
      <a href="pages/contact.html">✉️ Contact</a>
    </nav>
  `
  );

  // ── Navbar ────────────────────────────────────────────────
  const navHtml = `
  <header class="navbar" id="main-navbar">
    <a href="../index.html" class="nav-logo">Agro<span>Future</span></a>
    <nav class="nav-links">
      <a href="../index.html">Home</a>
      <a href="pages/learn.html">Learn</a>
      <a href="pesticides.html">Pesticides</a>
      <a href="soil.html">Soil & Land</a>
      <a href="crops.html">Crops</a>
      <a href="weather.html">Weather</a>
      <a href="organic.html">Organic</a>
      <a href="schemes.html">Schemes</a>
      <a href="contact.html" class="nav-cta">Contact Us</a>
    </nav>
    <div class="hamburger"><span></span><span></span><span></span></div>
  </header>`;

  // ── Footer ────────────────────────────────────────────────
  const footerHtml = `
  <footer class="footer">
    <div class="footer-inner">
      <div class="footer-grid">
        <div class="footer-brand">
          <div class="nav-logo" style="font-size:1.8rem;">Agro<span>Future</span></div>
          <p>Empowering Indian farmers with smart technology, modern methods, and data-driven agriculture for a sustainable tomorrow.</p>
          <div class="social-links" style="margin-top:1.5rem;">
            <a class="social-link" href="#" title="Twitter">𝕏</a>
            <a class="social-link" href="#" title="Facebook">f</a>
            <a class="social-link" href="#" title="Instagram">📷</a>
            <a class="social-link" href="#" title="YouTube">▶</a>
          </div>
        </div>
        <div class="footer-col">
          <h4>Platform</h4>
          <a href="learn.html">Learn Agriculture</a>
          <a href="crops.html">Crop Information</a>
          <a href="soil.html">Soil & Land</a>
          <a href="pesticides.html">Pesticides</a>
          <a href="organic.html">Organic Farming</a>
        </div>
        <div class="footer-col">
          <h4>Resources</h4>
          <a href="weather.html">Weather Dashboard</a>
          <a href="schemes.html">Govt. Schemes</a>
          <a href="contact.html">Farmer Helpline</a>
          <a href="#">Market Prices</a>
          <a href="#">Irrigation Guide</a>
        </div>
        <div class="footer-col">
          <h4>Company</h4>
          <a href="#">About Us</a>
          <a href="#">Research</a>
          <a href="#">Partners</a>
          <a href="#">Careers</a>
          <a href="contact.html">Contact</a>
        </div>
      </div>
      <div class="footer-bottom">
        <p>© 2025 AgroFuture. Built for SmartFarm College Project. All rights reserved.</p>
        <p style="color:rgba(255,255,255,0.25)">🌱 Designed for the Future of Farming</p>
      </div>
    </div>
  </footer>
  <button id="back-to-top" title="Back to top">↑</button>`;

  // Insert navbar before first child
  document.body.insertAdjacentHTML("afterbegin", navHtml);
  // Insert footer before end of body
  document.body.insertAdjacentHTML("beforeend", footerHtml);
}

// Auto-inject when DOM is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", injectComponents);
} else {
  injectComponents();
}
