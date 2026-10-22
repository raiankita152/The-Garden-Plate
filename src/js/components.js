
async function loadComponent(selector, filePath) {
  const container = document.querySelector(selector);

  if (!container) return;

  try {
    const response = await fetch(filePath);

    if (!response.ok) {
      throw new Error(`Could not load ${filePath}: ${response.status}`);
    }

    container.innerHTML = await response.text();
  } catch (error) {
    console.error(error);
    container.innerHTML = "<p>Unable to load this page component.</p>";
  }
}

async function initializeComponents() {
  await Promise.all([
    loadComponent("#navbar-placeholder", "./components/navbar.html"),
    loadComponent("#footer-placeholder", "./components/footer.html")
  ]);

  // Highlight the current page in the navbar.
  const currentFile = window.location.pathname
    .split("/")
    .pop()
    .toLowerCase();

  const pageMap = {
    "index.html": "home",
    "menu.html": "menu",
    "gallery.html": "gallery",
    "about_us.html": "about",
    "contact_us.html": "contact"
  };

  const activePage = pageMap[currentFile];

  if (activePage) {
    document.querySelectorAll(".gp-nav-link").forEach(link => {
      if (link.dataset.page === activePage) {
        link.classList.add("text-[#A6833E]", "font-semibold");
        link.setAttribute("aria-current", "page");
      }
    });
  }

  // Mobile menu toggle.
  const menuButton = document.getElementById("gp-menu-btn");
  const mobileMenu = document.getElementById("gp-mobile-menu");

  if (menuButton && mobileMenu) {
    menuButton.addEventListener("click", () => {
      const isHidden = mobileMenu.classList.toggle("hidden");

      menuButton.setAttribute("aria-expanded", String(!isHidden));
    });
  }
}

document.addEventListener("DOMContentLoaded", initializeComponents);
