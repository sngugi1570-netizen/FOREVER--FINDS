// ===============================
// LOAD HEADER & FOOTER PARTIALS
// ===============================
async function loadPartial(targetId, filePath) {
  try {
    const response = await fetch(filePath);
    if (!response.ok) throw new Error("Partial not found");
    const html = await response.text();
    document.getElementById(targetId).innerHTML = html;
  } catch (error) {
    console.error(`Error loading ${filePath}:`, error);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  loadPartial("header", "partials/header.html");
  loadPartial("footer", "partials/footer.html");

  // ===================================
  // PREFILL PRODUCT FROM URL (NEW)
  // ===================================
  const params = new URLSearchParams(window.location.search);
  const productFromURL = params.get("product");

  const productDisplay = document.getElementById("productDisplay");
  const productHidden = document.getElementById("productName");
  const prefillContainer = document.getElementById("prefillContainer");
  const productTypeSelect = document.getElementById("productType");

  if (productFromURL && productTypeSelect) {

    if (productDisplay) productDisplay.textContent = productFromURL;
    if (productHidden) productHidden.value = productFromURL;
    if (prefillContainer) prefillContainer.style.display = "block";

    const lowerProduct = productFromURL.toLowerCase();

    if (
      lowerProduct.includes("couch") ||
      lowerProduct.includes("seater") ||
      lowerProduct.includes("sectional")
    ) {
      productTypeSelect.value = "Couch";
      productTypeSelect.disabled = true;
    }

    if (lowerProduct.includes("bed")) {
      productTypeSelect.value = "Bed";
      productTypeSelect.disabled = true;
    }
  }

  // ===================================
  // WHATSAPP SUBMIT LOGIC
  // ===================================
  const form = document.getElementById("customForm");

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      const selectedDesign =
        document.getElementById("productName")?.value || "Custom Furniture Request";

      const product = document.getElementById("productType").value;
      const size = document.getElementById("size").value;
      const fabric = document.getElementById("fabric").value;
      const cushion = document.getElementById("cushion").value;
      const color = document.getElementById("color").value;
      const notes = document.getElementById("notes").value;

      const message = `
Hello Forever Finds 👋

I’d like to customize a piece with the following details:

• Design: ${selectedDesign}
• Product Type: ${product}
• Size: ${size}
• Fabric: ${fabric}
• Cushion: ${cushion}
• Color: ${color}
• Notes: ${notes || "N/A"}

Please share pricing and timeline. Thank you.
      `;

      const phone = "254718189714"; // Your WhatsApp number
      const url = `https://api.whatsapp.com/send?phone=${phone}&text=${encodeURIComponent(message)}`;

      window.open(url, "_blank");
    });
  }

  // ===================================
  // AUTO YEAR IN FOOTER
  // ===================================
  const yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
});
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
});

document.querySelectorAll(".fade-in").forEach(el => {
  observer.observe(el);
});

/* ===== Scroll Fade In ===== */
const faders = document.querySelectorAll(".fade-in");

const appearOnScroll = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, { threshold: 0.2 });

faders.forEach(el => {
  appearOnScroll.observe(el);
});
// GOLD SHIMMER PARALLAX
const shimmer = document.getElementById("shimmer");

window.addEventListener("scroll", () => {
  const scrollY = window.scrollY;
  shimmer.style.transform = `translateX(${scrollY * 0.2}px)`;
});
// HERO CINEMATIC ZOOM
const heroImg = document.querySelector(".hero-image img");

window.addEventListener("scroll", () => {
  const scrollY = window.scrollY;
  if (heroImg) {
    heroImg.style.transform = `scale(${1 + scrollY * 0.0003})`;
  }
});
// LUXURY LOADER
window.addEventListener("load", () => {
  const loader = document.getElementById("luxuryLoader");
  loader.style.opacity = "0";
  loader.style.visibility = "hidden";
});
/* ===== CURSOR GLOW ===== */
const cursor = document.createElement("div");
cursor.classList.add("cursor-glow");
document.body.appendChild(cursor);

document.addEventListener("mousemove", (e) => {
  cursor.style.left = e.clientX + "px";
  cursor.style.top = e.clientY + "px";
});

/* ===== SOFT PARALLAX SCROLL ===== */
const parallaxElements = document.querySelectorAll(".hero-image img");

window.addEventListener("scroll", () => {
  let scrollY = window.scrollY;
  parallaxElements.forEach(el => {
    el.style.transform = `translateY(${scrollY * 0.05}px)`;
  });
});
/* ===== PAGE TRANSITION ===== */

const transition = document.createElement("div");
transition.classList.add("page-transition");
document.body.appendChild(transition);

document.querySelectorAll("a").forEach(link => {
  if (link.hostname === window.location.hostname) {
    link.addEventListener("click", function (e) {
      const href = this.getAttribute("href");
      if (!href || href.startsWith("#")) return;

      e.preventDefault();
      transition.classList.add("active");

      setTimeout(() => {
        window.location.href = href;
      }, 500);
    });
  }
});

