// Study-specific JavaScript for experience page
document.addEventListener("DOMContentLoaded", () => {
    // Initialize AOS (if it's not already initialized)
    if (typeof AOS === "undefined") {
        AOS = {} // Or load AOS library here if needed
    }

    // Initialize experience cards animations
    initExperienceCards()

    // Add parallax effect to experience images
    initParallaxEffect()

    // Initialize AOS for experience cards with custom settings
    if (typeof AOS !== "undefined") {
        AOS.refresh()
    }
})

// Initialize experience cards animations
function initExperienceCards() {
    const experienceCards = document.querySelectorAll(".experience-card")

    experienceCards.forEach((card, index) => {
        // Set different animation for each card
        if (index % 2 === 0) {
            card.setAttribute("data-aos", "fade-right")
        } else {
            card.setAttribute("data-aos", "fade-left")
        }

        // Set different delays
        card.setAttribute("data-aos-delay", (200 + index * 100).toString())
        card.setAttribute("data-aos-duration", "800")

        // Add hover effect for images
        card.addEventListener("mouseenter", function () {
            const image = this.querySelector(".experience-image img")
            if (image) {
                image.style.transform = "scale(1.05)"
            }

            const logo = this.querySelector(".experience-logo")
            if (logo) {
                logo.style.transform = "scale(1.1) rotate(5deg)"
            }
        })

        card.addEventListener("mouseleave", function () {
            const image = this.querySelector(".experience-image img")
            if (image) {
                image.style.transform = ""
            }

            const logo = this.querySelector(".experience-logo")
            if (logo) {
                logo.style.transform = ""
            }
        })
    })

    // Add click event to skill tags
    const skillTags = document.querySelectorAll(".experience-skills span")

    skillTags.forEach((tag) => {
        tag.addEventListener("click", function () {
            // Create a ripple effect
            const ripple = document.createElement("span")
            ripple.classList.add("skill-ripple")
            this.appendChild(ripple)

            // Remove ripple after animation
            setTimeout(() => {
                ripple.remove()
            }, 600)

            // Show a tooltip or perform an action
            const skillName = this.textContent
            console.log(`Skill selected: ${skillName}`)

            // You could add a filter functionality here
            // or show more information about the skill
        })
    })

    // Add animation to experience titles on hover
    const experienceTitles = document.querySelectorAll(".experience-title")

    experienceTitles.forEach((title) => {
        title.addEventListener("mouseenter", function () {
            this.style.transform = "translateX(10px)"
        })

        title.addEventListener("mouseleave", function () {
            this.style.transform = ""
        })
    })
}

// Add parallax effect to experience images
function initParallaxEffect() {
    window.addEventListener("scroll", () => {
        const experienceImages = document.querySelectorAll(".experience-image")

        experienceImages.forEach((image) => {
            const scrollPosition = window.pageYOffset
            const imagePosition = image.getBoundingClientRect().top + scrollPosition
            const offset = (scrollPosition - imagePosition) * 0.1

            if (offset > -100 && offset < 100) {
                const img = image.querySelector("img")
                if (img) {
                    img.style.transform = `translateY(${offset}px)`
                }
            }
        })
    })
}
