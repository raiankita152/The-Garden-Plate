
document.addEventListener("DOMContentLoaded", function () {

    // Initialize EmailJS
    emailjs.init({
        publicKey: "LYGSY1k-BT25e80Xi"
    });

    // Form and popup
    const bookingForm = document.getElementById("bookingForm");
    const successModal = document.getElementById("successModal");
    const closeModal = document.getElementById("closeModal");
    const closeIcon = document.getElementById("closeIcon");

    if (!bookingForm || !successModal) {
        console.error("Booking form or success popup not found.");
        return;
    }

    // Inputs
    const titleInput = document.getElementById("title");
    const firstNameInput = document.getElementById("firstName");
    const lastNameInput = document.getElementById("lastName");
    const phoneInput = document.getElementById("phone");
    const dateInput = document.getElementById("date");
    const timeInput = document.getElementById("time");
    const guestsInput = document.getElementById("guests");

    // Error messages
    const titleError = document.getElementById("titleError");
    const firstNameError = document.getElementById("firstNameError");
    const lastNameError = document.getElementById("lastNameError");
    const phoneError = document.getElementById("phoneError");
    const dateError = document.getElementById("dateError");
    const timeError = document.getElementById("timeError");
    const guestError = document.getElementById("guestError");

    const fields = [
        [titleInput, titleError],
        [firstNameInput, firstNameError],
        [lastNameInput, lastNameError],
        [phoneInput, phoneError],
        [dateInput, dateError],
        [timeInput, timeError],
        [guestsInput, guestError]
    ];

    // Check required HTML elements
    if (fields.some(([input, error]) => !input || !error)) {
        console.error("One or more booking fields are missing.");
        return;
    }

    // Error functions
    function showError(input, errorBox, message) {
        input.classList.add("border-red-500");
        errorBox.textContent = message;
        errorBox.classList.remove("hidden");
    }

    function clearError(input, errorBox) {
        input.classList.remove("border-red-500");
        errorBox.textContent = "";
        errorBox.classList.add("hidden");
    }

    // Today's date in local time
    function getToday() {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, "0");
        const day = String(today.getDate()).padStart(2, "0");

        return `${year}-${month}-${day}`;
    }

    dateInput.min = getToday();

    // Title validation
    titleInput.addEventListener("change", function () {
        if (!this.value) {
            showError(titleInput, titleError, "Please select a title.");
        } else {
            clearError(titleInput, titleError);
        }
    });

    // First name validation
    firstNameInput.addEventListener("input", function () {
        const value = this.value.trim();

        if (/^[A-Za-z ]{2,30}$/.test(value)) {
            clearError(firstNameInput, firstNameError);
        } else {
            showError(
                firstNameInput,
                firstNameError,
                "Please enter a valid first name."
            );
        }
    });

    // Last name validation
    lastNameInput.addEventListener("input", function () {
        const value = this.value.trim();

        if (/^[A-Za-z ]{2,30}$/.test(value)) {
            clearError(lastNameInput, lastNameError);
        } else {
            showError(
                lastNameInput,
                lastNameError,
                "Please enter a valid last name."
            );
        }
    });

    // Phone validation
    phoneInput.addEventListener("input", function () {
        const phone = this.value.trim();

        if (!/^\d{10}$/.test(phone)) {
            showError(
                phoneInput,
                phoneError,
                "Phone number must contain exactly 10 digits."
            );
        } else {
            clearError(phoneInput, phoneError);
        }
    });

    // Date validation
    dateInput.addEventListener("change", function () {
        if (!this.value) {
            showError(dateInput, dateError, "Please select a date.");
        } else if (this.value < getToday()) {
            showError(dateInput, dateError, "Past dates are not allowed.");
        } else {
            clearError(dateInput, dateError);
        }
    });

    // Time validation
    timeInput.addEventListener("change", function () {
        if (!this.value) {
            showError(timeInput, timeError, "Please select a time slot.");
        } else {
            clearError(timeInput, timeError);
        }
    });

    // Member validation
    guestsInput.addEventListener("input", function () {
        const count = Number(this.value);

        if (
            this.value === "" ||
            !Number.isInteger(count) ||
            count < 1 ||
            count > 20
        ) {
            showError(
                guestsInput,
                guestError,
                "Enter 1 to 20 members."
            );
        } else {
            clearError(guestsInput, guestError);
        }
    });

    // Validate complete form
    function validateForm() {
        let isValid = true;

        function check(condition, input, error, message) {
            if (!condition) {
                showError(input, error, message);
                isValid = false;
            } else {
                clearError(input, error);
            }
        }

        check(
            titleInput.value !== "",
            titleInput,
            titleError,
            "Please select a title."
        );

        check(
            /^[A-Za-z ]{2,30}$/.test(firstNameInput.value.trim()),
            firstNameInput,
            firstNameError,
            "Please enter a valid first name."
        );

        check(
            /^[A-Za-z ]{2,30}$/.test(lastNameInput.value.trim()),
            lastNameInput,
            lastNameError,
            "Please enter a valid last name."
        );

        check(
            /^\d{10}$/.test(phoneInput.value.trim()),
            phoneInput,
            phoneError,
            "Phone number must contain exactly 10 digits."
        );

        check(
            dateInput.value !== "" && dateInput.value >= getToday(),
            dateInput,
            dateError,
            "Please select a valid date."
        );

        check(
            timeInput.value !== "",
            timeInput,
            timeError,
            "Please select a time slot."
        );

        const guests = Number(guestsInput.value);

        check(
            guestsInput.value !== "" &&
            Number.isInteger(guests) &&
            guests >= 1 &&
            guests <= 20,
            guestsInput,
            guestError,
            "Enter between 1 and 20 members."
        );

        return isValid;
    }

    // Submit booking
    bookingForm.addEventListener("submit", function (event) {
        event.preventDefault();

        if (!validateForm()) return;

        const submitButton = bookingForm.querySelector(
            'button[type="submit"]'
        );

        if (submitButton) {
            submitButton.disabled = true;
            submitButton.textContent = "SENDING...";
        }

        emailjs.sendForm(
            "service_e7r3juq",
            "template_za7x7qf",
            bookingForm
        )
        .then(function () {
            bookingForm.reset();
            dateInput.min = getToday();

            fields.forEach(([input, error]) => {
                clearError(input, error);
            });

            successModal.classList.remove("hidden");
            successModal.classList.add("flex");
        })
        .catch(function (error) {
            console.error("EmailJS booking error:", error);
            alert("Failed to send reservation. Please try again.");
        })
        .finally(function () {
            if (submitButton) {
                submitButton.disabled = false;
                submitButton.textContent = "BOOK NOW";
            }
        });
    });

    // Close success popup
    function closeSuccessPopup() {
        successModal.classList.add("hidden");
        successModal.classList.remove("flex");
    }

    if (closeModal) {
        closeModal.addEventListener("click", closeSuccessPopup);
    }

    if (closeIcon) {
        closeIcon.addEventListener("click", closeSuccessPopup);
    }

    window.addEventListener("click", function (event) {
        if (event.target === successModal) {
            closeSuccessPopup();
        }
    });

    // Scroll reveal animation
    const cards = document.querySelectorAll(".card-hover");

    function revealCards() {
        cards.forEach(card => {
            if (card.getBoundingClientRect().top < window.innerHeight - 100) {
                card.classList.add("fade-up");
            }
        });
    }

    window.addEventListener("scroll", revealCards);
    revealCards();

});
