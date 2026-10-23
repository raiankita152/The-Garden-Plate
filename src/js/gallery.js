
(() => {
    "use strict";

    // Gallery photos: edit this array to add, remove, or reorder images.
    const galleryPhotos = [
        { src: "./images/facade2.png", category: "facade", alt: "Garden Plate outdoor look" },
        { src: "./images/G3.png", category: "ambience", alt: "Cozy indoor dining hall" },
        { src: "./images/facade1.png", category: "facade", alt: "Restaurant entrance with warm lighting" },

        { src: "./images/Tropical Sunset Punch.png", category: "food", alt: "Tropical Sunset Punch" },
        { src: "./images/MIDNIGHT CHOCOLATE SYMPHONY.png", category: "food", alt: "Midnight Chocolate Symphony" },

        { src: "./images/G11.png", category: "ambience", alt: "String lights over the patio" },
        { src: "./images/ambience3.png", category: "ambience", alt: "Garden path lined with lanterns" },
        { src: "./images/G12.png", category: "ambience", alt: "Rustic dining room interior" },

        { src: "./images/event1.png", category: "events", alt: "Restaurant event" },
        { src: "./images/event3.png", category: "events", alt: "Restaurant celebration event" },

        { src: "./images/Herb-Crusted Fish Fingers.png", category: "food", alt: "Herb-crusted fish fingers" },
        { src: "./images/Kesar Pistachio Kulfi.png", category: "food", alt: "Kesar Pistachio Kulfi" },
        { src: "./images/Chicken Dum Biryani.png", category: "food", alt: "Chicken Dum Biryani" },

        { src: "./images/Shahi Nizami Kofta.png", category: "food", alt: "Shahi Nizami Kofta", hideFromAll: true },
        { src: "./images/CRISPY PESARATTU.png", category: "food", alt: "Crispy Pesarattu", hideFromAll: true },
        { src: "./images/Chicken Chettinad.png", category: "food", alt: "Chicken Chettinad", hideFromAll: true },
        { src: "./images/home page hero banner.png", category: "ambience", alt: "Restaurant interior", hideFromAll: true }
    ];

    const grid = document.getElementById("gallery-grid");
    const filterContainer = document.getElementById("gallery-filters");
    const filterButtons = document.querySelectorAll(".filter-btn");
    const emptyMessage = document.getElementById("gallery-empty");

    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightbox-img");
    const lightboxCaption = document.getElementById("lightbox-caption");
    const lightboxCounter = document.getElementById("lightbox-counter");
    const lightboxFigure = document.getElementById("lightbox-figure");

    const closeButton = document.getElementById("lightbox-close");
    const prevButton = document.getElementById("lightbox-prev");
    const nextButton = document.getElementById("lightbox-next");

    if (
        !grid || !filterContainer || !lightbox || !lightboxImg ||
        !lightboxCaption || !lightboxCounter || !lightboxFigure ||
        !closeButton || !prevButton || !nextButton
    ) {
        console.error("Gallery HTML elements are missing.");
        return;
    }

    let activeFilter = "all";
    let visiblePhotos = [];
    let currentIndex = 0;
    let lastFocusedElement = null;

    // Show the selected category and create the photo grid.
    function renderGrid() {
        visiblePhotos = galleryPhotos.filter(photo =>
            activeFilter === "all"
                ? !photo.hideFromAll
                : photo.category === activeFilter
        );

        grid.replaceChildren();

        visiblePhotos.forEach((photo, index) => {
            const position = index % 5;
            const sizeClass = position < 3 ? "size-normal" : "size-wide";

            const item = document.createElement("figure");
            item.className = `gallery-item gallery-fade ${sizeClass}`;
            item.style.animationDelay = `${index * 40}ms`;

            const image = document.createElement("img");
            image.src = photo.src;
            image.alt = photo.alt;
            image.loading = "lazy";
            image.decoding = "async";

            item.appendChild(image);
            item.tabIndex = 0;
            item.setAttribute("role", "button");
            item.setAttribute("aria-label", `View image: ${photo.alt}`);

            item.addEventListener("click", () => openLightbox(index));

            item.addEventListener("keydown", event => {
                if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    openLightbox(index);
                }
            });

            grid.appendChild(item);
        });

        emptyMessage?.classList.toggle("hidden", visiblePhotos.length > 0);
    }

    // Update filter button styling and accessibility state.
    filterButtons.forEach(button => {
        button.addEventListener("click", () => {
            activeFilter = button.dataset.filter || "all";

            filterButtons.forEach(filterButton => {
                const isActive = filterButton === button;

                filterButton.classList.toggle("active-filter", isActive);
                filterButton.setAttribute("aria-pressed", String(isActive));
            });

            renderGrid();
        });
    });

    // Display an image in the lightbox.
    function showLightboxImage() {
        const photo = visiblePhotos[currentIndex];

        if (!photo) return;

        lightboxImg.src = photo.src;
        lightboxImg.alt = photo.alt;
        lightboxCaption.textContent = photo.alt;
        lightboxCounter.textContent =
            `${currentIndex + 1} / ${visiblePhotos.length}`;

        // Restart the zoom animation.
        lightboxImg.style.animation = "none";
        void lightboxImg.offsetWidth;
        lightboxImg.style.animation = "";
    }

    function openLightbox(index) {
        if (!visiblePhotos.length) return;

        currentIndex = index;
        lastFocusedElement = document.activeElement;

        showLightboxImage();

        lightbox.classList.remove("hidden");
        lightbox.classList.add("flex-visible");
        document.body.style.overflow = "hidden";

        closeButton.focus();
    }

    function closeLightbox() {
        lightbox.classList.add("hidden");
        lightbox.classList.remove("flex-visible");
        document.body.style.overflow = "";

        if (lastFocusedElement instanceof HTMLElement) {
            lastFocusedElement.focus();
        }
    }

    function showNext() {
        if (!visiblePhotos.length) return;

        currentIndex = (currentIndex + 1) % visiblePhotos.length;
        showLightboxImage();
    }

    function showPrevious() {
        if (!visiblePhotos.length) return;

        currentIndex =
            (currentIndex - 1 + visiblePhotos.length) % visiblePhotos.length;

        showLightboxImage();
    }

    closeButton.addEventListener("click", closeLightbox);
    nextButton.addEventListener("click", showNext);
    prevButton.addEventListener("click", showPrevious);

    // Close when clicking the dark background.
    lightbox.addEventListener("click", event => {
        const clickedControl = event.target.closest(
            "#lightbox-close, #lightbox-prev, #lightbox-next"
        );

        if (!lightboxFigure.contains(event.target) && !clickedControl) {
            closeLightbox();
        }
    });

    // Keyboard navigation.
    document.addEventListener("keydown", event => {
        if (lightbox.classList.contains("hidden")) return;

        if (event.key === "Escape") closeLightbox();
        if (event.key === "ArrowRight") showNext();
        if (event.key === "ArrowLeft") showPrevious();
    });

    // Initial gallery render.
    renderGrid();
})();
