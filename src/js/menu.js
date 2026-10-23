
(() => {
    "use strict";

    // Menu data: update dish details here instead of duplicating HTML cards.
    const dishes = [
        {
            name: "CRISPY CALAMARI RINGS",
            image: "CRISPY CALAMAR RINGS.png",
            description: "Tender squid rings lightly coated in seasoned batter and fried until perfectly golden and crispy.",
            price: 1359,
            type: "non-veg",
            categories: ["top", "starter"],
            badge: "Signature"
        },
        {
            name: "SOFT CLOUD IDLIS",
            image: "idli.png",
            description: "Soft, fluffy steamed rice cakes served with flavorful sambar and fresh coconut chutney for a wholesome South Indian classic.",
            price: 1359,
            type: "veg",
            categories: ["starter"]
        },
        {
            name: "CRISPY CHILLI CHICKEN",
            image: "Crispy Chilli Chicken.png",
            description: "Tender chicken tossed in a bold, spicy chilli sauce with crunchy vegetables for the perfect balance of heat and flavor.",
            price: 1299,
            type: "non-veg",
            categories: ["starter"]
        },
        {
            name: "CRISPY PESARATTU",
            image: "CRISPY PESARATTU.png",
            description: "A golden, crispy green gram crepe served with flavorful chutneys for an authentic and wholesome South Indian delight.",
            price: 1359,
            type: "veg",
            categories: ["starter"]
        },
        {
            name: "PANEER LABABDAR",
            image: "paneerlababdar.png",
            description: "A rich and creamy paneer dish cooked in a spiced tomato-based sauce.",
            price: 1199,
            type: "veg",
            categories: ["top", "main"]
        },
        {
            name: "HERB-CRUSTED FISH FINGERS",
            image: "Herb-Crusted Fish Fingers.png",
            description: "Delicately seasoned herb-crusted fish fingers, perfectly golden and crispy.",
            price: 1059,
            type: "non-veg",
            categories: ["top", "starter"],
            badge: "Best Seller"
        },
        {
            name: "FIERY COTTAGE CHEESE BITES",
            image: "Fiery Cottage Cheese Bites.png",
            description: "Crispy cottage cheese bites tossed in a bold blend of fiery spices and peppers for a flavor-packed appetizer.",
            price: 1159,
            type: "veg",
            categories: ["starter"]
        },
        {
            name: "ROSE CITRUS SPARKLER",
            image: "ROSE CITRUS SPARKLER.png",
            description: "Delicate rose meets vibrant citrus in a crisp sparkling refreshment.",
            price: 1349,
            type: "veg",
            categories: ["beverage"]
        },
        {
            name: "MIDNIGHT CHOCOLATE SYMPHONY",
            image: "MIDNIGHT CHOCOLATE SYMPHONY.png",
            description: "Velvety dark chocolate mousse layered with delicate cocoa sponge and silky ganache.",
            price: 999,
            type: "veg",
            categories: ["dessert"]
        },
        {
            name: "KESAR PISTACHIO KULFI",
            image: "Kesar Pistachio Kulfi.png",
            description: "A creamy traditional kulfi enriched with aromatic saffron and crunchy pistachios for an indulgent frozen treat.",
            price: 999,
            type: "veg",
            categories: ["dessert"]
        },
        {
            name: "SHAHI TUKDA SUPREME",
            image: "Shahi Tukda Supreme.png",
            description: "A royal Indian dessert featuring crispy saffron-soaked bread layered with rich rabri and garnished with premium nuts.",
            price: 1399,
            type: "veg",
            categories: ["dessert"]
        },
        {
            name: "ROSE & PAAN MOUSSE",
            image: "Rose & Paan Mousse.png",
            description: "A silky mousse infused with fragrant rose and refreshing paan flavors for a uniquely Indian dessert experience.",
            price: 1149,
            type: "veg",
            categories: ["top", "dessert"]
        },
        {
            name: "HAZELNUT SIGNATURE BREW",
            image: "Hazelnut Signature Brew.png",
            description: "A rich, aromatic coffee infused with roasted hazelnut notes and a velvety finish.",
            price: 1499,
            type: "veg",
            categories: ["beverage"]
        },
        {
            name: "CHICKEN DUM BIRYANI",
            image: "Chicken Dum Biryani.png",
            description: "Fragrant basmati rice and tender chicken slow-cooked with aromatic spices in the traditional dum style for an unforgettable feast.",
            price: 1389,
            type: "non-veg",
            categories: ["main"]
        },
        {
            name: "CHICKEN CHETTINAD",
            image: "Chicken Chettinad.png",
            description: "Tender chicken simmered in an aromatic South Indian gravy with roasted spices and fresh curry leaves.",
            price: 1389,
            type: "non-veg",
            categories: ["main"]
        },
        {
            name: "HERB & CHEESE STUFFED PEPPERS",
            image: "HERB & CHEESE STUFFED PEPPERS.png",
            description: "Oven-baked bell peppers filled with a savory vegetable stuffing and topped with a golden, bubbly cheese crust.",
            price: 1389,
            type: "veg",
            categories: ["main"]
        },
        {
            name: "SHAHI NIZAMI KOFTA",
            image: "Shahi Nizami Kofta.png",
            description: "Rich vegetable and paneer koftas served in an aromatic Mughlai gravy.",
            price: 1389,
            type: "veg",
            categories: ["top", "main"]
        },
        {
            name: "TROPICAL SUNSET PUNCH",
            image: "Tropical Sunset Punch.png",
            description: "A refreshing blend of tropical fruits and a hint of citrus, served over ice.",
            price: 1099,
            type: "veg",
            categories: ["top", "beverage"]
        },
        {
            name: "BERRY BLISS BOWL",
            image: "Berry Bliss Bowl.png",
            description: "A vibrant medley of fresh berries, creamy yogurt, and crunchy granola.",
            price: 1349,
            type: "veg",
            categories: ["dessert"]
        },
        {
            name: "BLUE LAGOON BLISS",
            image: "Blue Lagoon Bliss.jpg",
            description: "A cool, citrusy mocktail with a stunning blue hue that's as refreshing as it is eye-catching.",
            price: 1299,
            type: "veg",
            categories: ["beverage"]
        },
        {
            name: "BELGIAN CHOCOLATE SHAKE",
            image: "Belgian Chocolate Shake.jpg",
            description: "A rich, creamy shake with a delightful chocolate flavor that's sure to satisfy your sweet tooth.",
            price: 1349,
            type: "veg",
            categories: ["beverage"]
        },
        {
            name: "KASHMIRI KAHWA",
            image: "Kashmiri Kahwa.png",
            description: "A fragrant traditional Kashmiri tea infused with saffron, spices, and almonds for a soothing, aromatic experience.",
            price: 1199,
            type: "veg",
            categories: ["beverage"]
        },
        {
            name: "MEDITERRANEAN SALAD",
            image: "mediterranean salad.png",
            description: "Crisp garden vegetables, olives, and feta cheese tossed in a zesty herb vinaigrette.",
            price: 1349,
            type: "veg",
            categories: ["main"]
        },
        {
            name: "TIRAMISU",
            image: "tiramisu.png",
            description: "A heavenly blend of coffee-soaked layers and velvety mascarpone that melts in every bite.",
            price: 1599,
            type: "veg",
            categories: ["dessert"]
        }
    ];

    const menuContainer = document.getElementById("menuContainer");
    const searchInput = document.getElementById("searchInput");
    const filterButtons = document.querySelectorAll(".filter-btn");
    const noResults = document.getElementById("noMenuResults");

    if (!menuContainer || !searchInput || !filterButtons.length) {
        console.error("Menu elements are missing from Menu.html.");
        return;
    }

    let activeFilter = "top";
    let searchTerm = "";

    // Create a menu card safely using DOM methods.
    function createCard(dish) {
        const card = document.createElement("article");
        card.className =
            "menu-card bg-white rounded-xl border border-[#D9C6A5] overflow-hidden card-hover";

        const imageWrapper = document.createElement("div");
        imageWrapper.className = "relative image-hover";

        const image = document.createElement("img");
        image.src = `./images/${dish.image}`;
        image.alt = dish.name;
        image.loading = "lazy";
        image.decoding = "async";
        image.className = "w-full h-64 object-cover";

        image.addEventListener("error", () => {
            console.error(`Menu image not found: ${dish.image}`);
        }, { once: true });

        imageWrapper.appendChild(image);

        if (dish.badge) {
            const badge = document.createElement("span");
            badge.className =
                "absolute top-3 left-3 bg-[#B88A3B] text-white text-xs px-3 py-1 rounded-full";
            badge.textContent = dish.badge;
            imageWrapper.appendChild(badge);
        }

        const content = document.createElement("div");
        content.className = "p-6 flex flex-col min-h-[260px]";

        const title = document.createElement("h2");
        title.className =
            "font-primary text-2xl font-semibold text-[#222] leading-tight";
        title.textContent = dish.name;

        const description = document.createElement("p");
        description.className =
            "mt-5 text-gray-600 text-sm leading-6 flex-grow";
        description.textContent = dish.description;

        const details = document.createElement("div");
        details.className = "flex justify-between items-center mt-6";

        const price = document.createElement("p");
        price.className = "text-2xl font-semibold";
        price.textContent = `₹${dish.price}`;

        const foodIcon = document.createElement("img");
        foodIcon.src = `./images/${dish.type}.png`;
        foodIcon.alt = dish.type === "veg" ? "Vegetarian" : "Non-vegetarian";
        foodIcon.className = "w-6 h-6";
        foodIcon.loading = "lazy";

        details.append(price, foodIcon);
        content.append(title, description, details);
        card.append(imageWrapper, content);

        return card;
    }

    // Apply both category and search filters together.
    function renderMenu() {
        const filteredDishes = dishes.filter(dish => {
            const matchesCategory =
                activeFilter === "all" ||
                dish.categories.includes(activeFilter);

            const searchableText =
                `${dish.name} ${dish.description}`.toLowerCase();

            const matchesSearch = searchableText.includes(searchTerm);

            return matchesCategory && matchesSearch;
        });

        menuContainer.replaceChildren();

        filteredDishes.forEach(dish => {
            menuContainer.appendChild(createCard(dish));
        });

        noResults?.classList.toggle("hidden", filteredDishes.length > 0);
    }

    // Category filter buttons.
    filterButtons.forEach(button => {
        button.addEventListener("click", () => {
            activeFilter = button.dataset.filter || "top";

            filterButtons.forEach(filterButton => {
                const isActive = filterButton === button;

                filterButton.classList.toggle("active-filter", isActive);
                filterButton.setAttribute("aria-pressed", String(isActive));
            });

            renderMenu();
        });
    });

    // Search by dish name or description.
    searchInput.addEventListener("input", () => {
        searchTerm = searchInput.value.trim().toLowerCase();
        renderMenu();
    });

    // Display Top Dishes when the page first loads.
    renderMenu();
})();
