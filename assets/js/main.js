// ===============================
// LOAD HEADER & FOOTER PARTIALS
// ===============================
async function loadPartial(targetId, filePath) {
  try {
    const response = await fetch(filePath);
    if (!response.ok) throw new Error("Partial not found");
    const html = await response.text();
    const target = document.getElementById(targetId);
    if (target) target.innerHTML = html;
  } catch (error) {
    console.error(`Error loading ${filePath}:`, error);
    // Hide loader even if partials fail to load
    const loader = document.getElementById("luxuryLoader");
    if (loader) {
      loader.style.opacity = "0";
      loader.style.visibility = "hidden";
    }
  }
}

// ===============================
// MOBILE MENU FUNCTION
// ===============================
function initMobileMenu() {
  const mobileToggle = document.getElementById("mobileToggle");
  const mainNav = document.getElementById("mainNav");

  if (!mobileToggle || !mainNav) return;

  // Create overlay
  let overlay = document.querySelector('.mobile-menu-overlay');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.classList.add('mobile-menu-overlay');
    document.body.appendChild(overlay);
  }

  // Ensure overlay starts hidden
  overlay.classList.remove('active');
  document.body.classList.remove('menu-open');

  // Toggle menu
  mobileToggle.addEventListener("click", (e) => {
    e.stopPropagation();
    const isActive = mainNav.classList.toggle("active");
    mobileToggle.classList.toggle("active");
    overlay.classList.toggle("active");
    document.body.classList.toggle("menu-open");
  });

  // Close when clicking overlay
  overlay.addEventListener("click", () => {
    mainNav.classList.remove("active");
    mobileToggle.classList.remove("active");
    overlay.classList.remove("active");
    document.body.classList.remove("menu-open");
  });

  // Close when clicking a nav link
  document.querySelectorAll(".main-nav a").forEach(link => {
    link.addEventListener("click", () => {
      mainNav.classList.remove("active");
      mobileToggle.classList.remove("active");
      overlay.classList.remove("active");
      document.body.classList.remove("menu-open");
    });
  });

  // Close when clicking outside
  document.addEventListener("click", (e) => {
    if (!mainNav.contains(e.target) && !mobileToggle.contains(e.target)) {
      mainNav.classList.remove("active");
      mobileToggle.classList.remove("active");
      overlay.classList.remove("active");
      document.body.classList.remove("menu-open");
    }
  });

  // Reset when resizing to desktop
  window.addEventListener("resize", () => {
    if (window.innerWidth > 992) {
      mainNav.classList.remove("active");
      mobileToggle.classList.remove("active");
      overlay.classList.remove("active");
      document.body.classList.remove("menu-open");
    }
  });
}

// ===============================
// MAIN DOM LOAD
// ===============================
document.addEventListener("DOMContentLoaded", async () => {

  await loadPartial("header", "partials/header.html");
  await loadPartial("footer", "partials/footer.html");

  initMobileMenu();

  // ===================================
  // PREFILL PRODUCT FROM URL
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

      const product = document.getElementById("productType")?.value || "";
      const size = document.getElementById("size")?.value || "";
      const fabric = document.getElementById("fabric")?.value || "";
      const cushion = document.getElementById("cushion")?.value || "";
      const color = document.getElementById("color")?.value || "";
      const notes = document.getElementById("notes")?.value || "";

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

      const phone = "254718189714";
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

  // ===================================
  // FADE IN ON SCROLL
  // ===================================
  const faders = document.querySelectorAll(".fade-in");

  if (faders.length) {
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
  }

  // ===================================
  // HERO CINEMATIC ZOOM
  // ===================================
  const heroImg = document.querySelector(".hero-image img");

  if (heroImg) {
    window.addEventListener("scroll", () => {
      const scrollY = window.scrollY;
      heroImg.style.transform = `scale(${1 + scrollY * 0.0003})`;
    });
  }

  // ===================================
  // SOFT PARALLAX SCROLL
  // ===================================
  const parallaxElements = document.querySelectorAll(".hero-image img");

  if (parallaxElements.length) {
    window.addEventListener("scroll", () => {
      let scrollY = window.scrollY;
      parallaxElements.forEach(el => {
        el.style.transform = `translateY(${scrollY * 0.05}px)`;
      });
    });
  }

});

// ===============================
// GOLD SHIMMER PARALLAX
// ===============================
const shimmer = document.getElementById("shimmer");

if (shimmer) {
  window.addEventListener("scroll", () => {
    const scrollY = window.scrollY;
    shimmer.style.transform = `translateX(${scrollY * 0.2}px)`;
  });
}

// ===============================
// LUXURY LOADER
// ===============================
window.addEventListener("load", () => {
  const loader = document.getElementById("luxuryLoader");
  if (loader) {
    loader.style.opacity = "0";
    loader.style.visibility = "hidden";
  }
});

// Fallback: Force hide loader after 3 seconds if it's still visible
setTimeout(() => {
  const loader = document.getElementById("luxuryLoader");
  if (loader && loader.style.opacity !== "0") {
    loader.style.opacity = "0";
    loader.style.visibility = "hidden";
  }
}, 3000);


// ===============================
// CURSOR GLOW
// ===============================
const cursor = document.createElement("div");
cursor.classList.add("cursor-glow");
document.body.appendChild(cursor);

document.addEventListener("mousemove", (e) => {
  cursor.style.left = e.clientX + "px";
  cursor.style.top = e.clientY + "px";
});

// ===============================
// PAGE TRANSITION - DISABLED TO FIX BLACK SCREEN ISSUE
// ===============================
// Removed page transition that was causing black screen on mobile back button

