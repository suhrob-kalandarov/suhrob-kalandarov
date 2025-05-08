// Contact Form Functionality
document.addEventListener("DOMContentLoaded", () => {
    const contactForm = document.getElementById("contactForm")

    if (contactForm) {
        contactForm.addEventListener("submit", handleContactFormSubmit)
    }
})

// Handle contact form submission
function handleContactFormSubmit(e) {
    e.preventDefault()

    // Get form values
    const name = document.getElementById("name").value.trim()
    const email = document.getElementById("email").value.trim()
    const subject = document.getElementById("subject").value.trim()
    const message = document.getElementById("message").value.trim()

    // Validate form
    if (!name || !email || !message) {
        showNotification("error", "Error", "Please fill in all required fields.")
        return
    }

    // Simulate form submission
    const submitBtn = document.querySelector(".submit-btn")
    if (submitBtn) {
        // Disable button and show loading state
        const originalText = submitBtn.innerHTML
        submitBtn.disabled = true
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...'

        // Simulate API call
        setTimeout(() => {
            const contactForm = document.getElementById("contactForm")
            // Reset form
            contactForm.reset()

            // Reset button
            submitBtn.disabled = false
            submitBtn.innerHTML = originalText

            // Show success notification
            showNotification("success", "Success", "Your message has been sent successfully! I'll get back to you soon.")
        }, 2000)
    }
}

// Show notification
function showNotification(type, title, message) {
    // Create notification element if it doesn't exist
    let notification = document.querySelector(".notification")

    if (!notification) {
        notification = document.createElement("div")
        notification.className = "notification"
        document.body.appendChild(notification)
    }

    // Set notification content and type
    notification.className = `notification notification-${type}`
    notification.innerHTML = `
    <div class="notification-icon">
      <i class="fas ${type === "success" ? "fa-check-circle" : "fa-exclamation-circle"}"></i>
    </div>
    <div class="notification-content">
      <div class="notification-title">${title}</div>
      <div class="notification-message">${message}</div>
    </div>
    <button class="notification-close">
      <i class="fas fa-times"></i>
    </button>
  `

    // Add show class to animate in
    setTimeout(() => {
        notification.classList.add("show")
    }, 10)

    // Add close button functionality
    const closeBtn = notification.querySelector(".notification-close")
    if (closeBtn) {
        closeBtn.addEventListener("click", () => {
            notification.classList.remove("show")
            setTimeout(() => {
                notification.remove()
            }, 300)
        })
    }

    // Auto-hide after 5 seconds
    setTimeout(() => {
        if (notification.classList.contains("show")) {
            notification.classList.remove("show")
            setTimeout(() => {
                notification.remove()
            }, 300)
        }
    }, 5000)
}
