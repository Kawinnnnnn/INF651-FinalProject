document.addEventListener("DOMContentLoaded", function () {
    const amountSlider = document.getElementById("amountSlider");
    const termSlider = document.getElementById("termSlider");
    const amountValue = document.getElementById("amountValue");
    const termValue = document.getElementById("termValue");
    const estimatedPayment = document.getElementById("estimatedPayment");
    const fullName = document.getElementById("fullName");
    const email = document.getElementById("email");
    const phone = document.getElementById("phone");
    const idProof = document.getElementById("idProof");
    const incomeProof = document.getElementById("incomeProof");
    const addressProof = document.getElementById("addressProof");
    const captchaInput = document.getElementById("captchaInput");
    const consent = document.getElementById("consent");
    const captchaCode = document.getElementById("captchaCode");

    // Function to calculate the monthly payment
    function calculateMonthlyPayment(amount, term) {
        const interestRate = 0.05; // Example interest rate
        const monthlyInterest = interestRate / 12;
        const monthlyPayment = amount * monthlyInterest / (1 - Math.pow(1 + monthlyInterest, -term));
        return monthlyPayment.toFixed(2);
    }

    // Update amount and estimated payment when the slider is moved
    amountSlider.addEventListener("input", function () {
        const amount = parseInt(this.value, 10);
        amountValue.textContent = `${amount.toLocaleString()} USD`;
        const term = parseInt(termSlider.value, 10);
        estimatedPayment.textContent = `${calculateMonthlyPayment(amount, term)} USD`;
    });

    termSlider.addEventListener("input", function () {
        const term = parseInt(this.value, 10);
        termValue.textContent = `${term} Months`;
        const amount = parseInt(amountSlider.value, 10);
        estimatedPayment.textContent = `${calculateMonthlyPayment(amount, term)} USD`;
    });

    // Function to generate a new CAPTCHA code
    function generateCaptcha() {
        const code = Math.random().toString(36).substring(2, 8).toUpperCase();
        captchaCode.textContent = code;
        window.generatedCaptcha = code;
    }

    // Initialize CAPTCHA on page load
    generateCaptcha();

    // Refresh CAPTCHA on button click
    document.getElementById("refreshCaptcha").addEventListener("click", generateCaptcha);

    // Function to display error message below an input field
    function showError(input, message) {
        const error = input.parentElement.querySelector(".error-message");
        if (error) {
            error.textContent = message;
        } else {
            const errorDiv = document.createElement("div");
            errorDiv.className = "error-message";
            errorDiv.style.color = "red";
            errorDiv.style.fontSize = "0.9em";
            errorDiv.textContent = message;
            input.parentElement.appendChild(errorDiv);
        }
        input.style.borderColor = "red";
    }

    // Function to clear error message
    function clearError(input) {
        const error = input.parentElement.querySelector(".error-message");
        if (error) error.remove();
        input.style.borderColor = "";
    }

    // Function to validate CAPTCHA
    function validateCaptcha() {
        if (captchaInput.value.trim().toUpperCase() !== window.generatedCaptcha) {
            showError(captchaInput, "CAPTCHA does not match.");
            return false;
        }
        clearError(captchaInput);
        return true;
    }

    // Attach validation logic to the form submission
    document.getElementById("submitButton").addEventListener("click", function (e) {
        e.preventDefault();
        let isValid = true;

        // Clear all previous errors
        const inputs = [fullName, email, phone, idProof, incomeProof, addressProof, captchaInput, consent];
        inputs.forEach(clearError);

        // Validate Full Name
        if (!fullName.value.trim()) {
            showError(fullName, "Full Name is required.");
            isValid = false;
        }

        // Validate Email
        if (!email.value.trim() || !/\S+@\S+\.\S+/.test(email.value)) {
            showError(email, "A valid Email is required.");
            isValid = false;
        }

        // Validate Phone Number
        if (!phone.value.trim() || !/^\d+$/.test(phone.value)) {
            showError(phone, "A valid Phone Number is required.");
            isValid = false;
        }

        // Validate File Inputs
        if (!idProof.files.length) {
            showError(idProof, "Government-issued ID is required.");
            isValid = false;
        }
        if (!incomeProof.files.length) {
            showError(incomeProof, "Proof of Income is required.");
            isValid = false;
        }
        if (!addressProof.files.length) {
            showError(addressProof, "Proof of Address is required.");
            isValid = false;
        }

        // Validate CAPTCHA
        if (!captchaInput.value.trim()) {
            showError(captchaInput, "CAPTCHA input is required.");
            isValid = false;
        } else if (!validateCaptcha()) {
            isValid = false;
        }

        // Validate Consent Checkbox
        if (!consent.checked) {
            showError(consent, "You must agree to the terms.");
            isValid = false;
        }

        // Submit if valid
        if (isValid) {
            alert("Form submitted successfully!");
        }
    });
});
