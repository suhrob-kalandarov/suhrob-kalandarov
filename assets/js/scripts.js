// Theme Toggle
const themeToggle = document.querySelector(".theme-toggle")
const body = document.querySelector("body")
const icon = themeToggle.querySelector("i")

// Check for saved theme preference
if (localStorage.getItem("theme") === "dark") {
    body.classList.add("dark-mode")
    icon.classList.remove("fa-moon")
    icon.classList.add("fa-sun")
}

themeToggle.addEventListener("click", () => {
    body.classList.toggle("dark-mode")

    if (body.classList.contains("dark-mode")) {
        icon.classList.remove("fa-moon")
        icon.classList.add("fa-sun")
        localStorage.setItem("theme", "dark")
    } else {
        icon.classList.remove("fa-sun")
        icon.classList.add("fa-moon")
        localStorage.setItem("theme", "light")
    }
})

// Initialize AOS
document.addEventListener("DOMContentLoaded", () => {
    AOS.init({
        duration: 800,
        easing: "ease-in-out",
        once: true,
        mirror: false,
    })
})

// Canvas Background Animation (for home page)
if (document.getElementById("canvas")) {
    const canvas = document.getElementById("canvas")
    const ctx = canvas.getContext("2d")

    let width = (canvas.width = window.innerWidth)
    let height = (canvas.height = window.innerHeight)

    const pointCount = 150
    const maxDistance = 180
    const points = []

    // Create random points
    for (let i = 0; i < pointCount; i++) {
        points.push(createRandomPoint())
    }

    function createRandomPoint(x = Math.random() * width, y = Math.random() * height) {
        return {
            x,
            y,
            vx: (Math.random() - 0.5) * 1.5,
            vy: (Math.random() - 0.5) * 1.5,
            size: Math.random() * 2 + 1,
            color: `rgba(${Math.floor(Math.random() * 100 + 155)}, ${Math.floor(Math.random() * 100 + 155)}, ${Math.floor(Math.random() * 100 + 155)}, 0.7)`,
        }
    }

    function draw() {
        ctx.clearRect(0, 0, width, height)

        // Draw lines between points
        for (let i = 0; i < points.length; i++) {
            for (let j = i + 1; j < points.length; j++) {
                const dx = points[i].x - points[j].x
                const dy = points[i].y - points[j].y
                const distance = Math.sqrt(dx * dx + dy * dy)

                if (distance < maxDistance) {
                    ctx.strokeStyle = `rgba(255, 255, 255, ${(1 - distance / maxDistance).toFixed(2)})`
                    ctx.lineWidth = 0.5
                    ctx.beginPath()
                    ctx.moveTo(points[i].x, points[i].y)
                    ctx.lineTo(points[j].x, points[j].y)
                    ctx.stroke()
                }
            }
        }

        // Move and draw points
        for (let i = 0; i < points.length; i++) {
            const p = points[i]
            p.x += p.vx
            p.y += p.vy

            // Bounce off walls
            if (p.x <= 0 || p.x >= width) p.vx *= -1
            if (p.y <= 0 || p.y >= height) p.vy *= -1

            // Draw point
            ctx.fillStyle = p.color
            ctx.beginPath()
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
            ctx.fill()
        }

        requestAnimationFrame(draw)
    }

    draw()

    // Add point on click/touch
    function addPoint(e) {
        const rect = canvas.getBoundingClientRect()
        const x = e.clientX || (e.touches && e.touches[0].clientX)
        const y = e.clientY || (e.touches && e.touches[0].clientY)
        if (x && y) {
            for (let i = 0; i < 5; i++) {
                points.push(createRandomPoint(x - rect.left, y - rect.top))
            }
        }
    }

    canvas.addEventListener("mousedown", addPoint)
    canvas.addEventListener("touchstart", addPoint)

    // Resize canvas on window resize
    window.addEventListener("resize", () => {
        width = canvas.width = window.innerWidth
        height = canvas.height = window.innerHeight
    })
}

// Interactive Text Animation
if (document.querySelector(".interactive-text")) {
    const interactiveText = document.querySelector(".interactive-text")
    const text = interactiveText.textContent
    interactiveText.textContent = ""

    // Split text into individual spans
    for (let i = 0; i < text.length; i++) {
        const span = document.createElement("span")
        span.textContent = text[i]
        interactiveText.appendChild(span)
    }

    const letters = interactiveText.querySelectorAll("span")

    interactiveText.addEventListener("mousemove", (e) => {
        const bounds = interactiveText.getBoundingClientRect()
        const mouseX = e.clientX - bounds.left
        const mouseY = e.clientY - bounds.top

        letters.forEach((letter, index) => {
            const letterBounds = letter.getBoundingClientRect()
            const letterX = letterBounds.left - bounds.left + letterBounds.width / 2
            const letterY = letterBounds.top - bounds.top + letterBounds.height / 2

            const distX = mouseX - letterX
            const distY = mouseY - letterY
            const distance = Math.sqrt(distX * distX + distY * distY)

            const maxDistance = 100
            if (distance < maxDistance) {
                const force = (1 - distance / maxDistance) * 20
                const moveX = (distX / distance) * force
                const moveY = (distY / distance) * force
                letter.style.transform = `translate(${-moveX}px, ${-moveY}px)`
            } else {
                letter.style.transform = "translate(0, 0)"
            }
        })
    })

    interactiveText.addEventListener("mouseleave", () => {
        letters.forEach((letter) => {
            letter.style.transform = "translate(0, 0)"
        })
    })
}

// Typed Text Animation
if (document.getElementById("typed-text")) {
    const typedTextElement = document.getElementById("typed-text")
    const textArray = ["Backend Developer", "Frontend Developer", "Freelancer", "Designer", "Problem Solver"]
    let textIndex = 0
    let charIndex = 0
    let isDeleting = false
    let typingSpeed = 100

    function typeText() {
        const currentText = textArray[textIndex]

        if (isDeleting) {
            typedTextElement.textContent = currentText.substring(0, charIndex - 1)
            charIndex--
            typingSpeed = 50
        } else {
            typedTextElement.textContent = currentText.substring(0, charIndex + 1)
            charIndex++
            typingSpeed = 100
        }

        if (!isDeleting && charIndex === currentText.length) {
            isDeleting = true
            typingSpeed = 1500 // Pause at end
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false
            textIndex = (textIndex + 1) % textArray.length
            typingSpeed = 500 // Pause before typing next
        }

        setTimeout(typeText, typingSpeed)
    }

    typeText()
}

// Statement Animation
if (document.querySelector(".statement-container")) {
    const statements = document.querySelectorAll(".statement")
    let activeStatement = 0

    function animateStatements() {
        statements.forEach((statement, index) => {
            statement.classList.remove("visible", "exit")
            if (index === activeStatement) {
                statement.classList.add("visible")
            } else if (index === (activeStatement - 1 + statements.length) % statements.length) {
                statement.classList.add("exit")
            }
        })

        activeStatement = (activeStatement + 1) % statements.length
        setTimeout(animateStatements, 4000)
    }

    animateStatements()
}

// Mobile Menu
const mobileMenuBtn = document.querySelector(".mobile-menu-btn")
const navLinks = document.querySelector(".nav-links")

if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener("click", () => {
        navLinks.classList.toggle("active")
        mobileMenuBtn.innerHTML = navLinks.classList.contains("active")
            ? '<i class="fas fa-times"></i>'
            : '<i class="fas fa-bars"></i>'
    })

    // Close mobile menu when clicking a link
    document.querySelectorAll(".nav-links a").forEach((link) => {
        link.addEventListener("click", () => {
            navLinks.classList.remove("active")
            mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>'
        })
    })
}

// Profile Card Animations
if (document.querySelector(".profiles-container")) {
    const profileCards = document.querySelectorAll(".profile-card")

    profileCards.forEach((card) => {
        card.addEventListener("mouseenter", () => {
            card.classList.add("animate")
            setTimeout(() => {
                card.classList.remove("animate")
            }, 800)
        })
    })
}

// Contact Form
if (document.getElementById("contactForm")) {
    const contactForm = document.getElementById("contactForm")

    contactForm.addEventListener("submit", function (e) {
        e.preventDefault()

        const name = document.getElementById("name").value
        const email = document.getElementById("email").value
        const subject = document.getElementById("subject").value
        const message = document.getElementById("message").value

        // Check for admin credentials
        if (
            name === "admin" &&
            email === "admin@gmail.com" &&
            subject === "i'm admin" &&
            message === "i'm login admin page"
        ) {
            // Redirect to admin page
            window.location.href = "/admin"
            return
        }

        // Regular form submission
        const submitBtn = this.querySelector(".submit-btn")
        const originalText = submitBtn.innerHTML

        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...'
        submitBtn.disabled = true

        // Simulate form submission
        setTimeout(() => {
            submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!'
            submitBtn.style.backgroundColor = "#28a745"

            // Reset form
            this.reset()

            // Reset button after 3 seconds
            setTimeout(() => {
                submitBtn.innerHTML = originalText
                submitBtn.disabled = false
                submitBtn.style.backgroundColor = ""
            }, 3000)
        }, 2000)
    })
}

// Page transition handling
document.addEventListener("DOMContentLoaded", () => {
    // Add placeholder image for all img tags with src="placeholder.svg"
    document.querySelectorAll('img[src="placeholder.svg"]').forEach((img) => {
        const width = img.width || 200
        const height = img.height || 200
        img.src = `https://via.placeholder.com/${width}x${height}`
    })
})
