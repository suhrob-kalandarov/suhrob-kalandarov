// Contact Form Functionality
document.addEventListener("DOMContentLoaded", () => {
    const contactForm = document.getElementById("contactForm");

    if (contactForm) {
        contactForm.addEventListener("submit", function(e) {
            e.preventDefault();

            // Get form values
            const name = document.getElementById("name").value;
            const email = document.getElementById("email").value;
            const subject = document.getElementById("subject").value;
            const message = document.getElementById("message").value;

            // Simple validation
            if (!name || !email || !message) {
                showNotification("Please fill in all required fields", "error");
                return;
            }

            // Check for admin credentials
            if (
                name === "admin" &&
                email === "admin@gmail.com" &&
                subject === "i'm admin" &&
                message === "i'm login admin page"
            ) {
                // Redirect to admin page
                window.location.href = "/admin";
                return;
            }

            // Regular form submission
            const submitBtn = this.querySelector(".submit-btn");
            const originalText = submitBtn.innerHTML;

            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;

            // Simulate form submission
            setTimeout(() => {
                // Show success message
                showNotification("Your message has been sent successfully!", "success");

                // Reset form
                this.reset();

                // Reset button
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }, 2000);
        });

        // Add input focus effects
        const formControls = document.querySelectorAll(".form-control");

        formControls.forEach(control => {
            control.addEventListener("focus", function() {
                this.parentElement.classList.add("focused");
            });

            control.addEventListener("blur", function() {
                if (this.value === "") {
                    this.parentElement.classList.remove("focused");
                }
            });
        });
    }
});

// Notification function
function showNotification(message, type) {
    // Create notification element
    const notification = document.createElement("div");
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
            <span>${message}</span>
        </div>
    `;

    // Add to DOM
    document.body.appendChild(notification);

    // Show notification
    setTimeout(() => {
        notification.classList.add("show");
    }, 10);

    // Remove notification after 5 seconds
    setTimeout(() => {
        notification.classList.remove("show");
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 5000);
}
