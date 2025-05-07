// Loading Screen
window.addEventListener("load", () => {
    setTimeout(() => {
        document.querySelector(".loading-screen").classList.add("hidden")
    }, 1000) // Reduced from 1500ms to 1000ms for better UX
})

// Modify the theme toggle code in scripts.js to work with the navbar toggle
// Replace the existing theme toggle code with this:

// Theme Toggle
document.addEventListener("DOMContentLoaded", () => {
    const themeToggle = document.querySelector(".theme-toggle:not(.navbar-theme-toggle)")
    if (themeToggle) {
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
    }
})

// Initialize AOS
let AOS // Declare AOS here
document.addEventListener("DOMContentLoaded", () => {
    if (typeof AOS !== "undefined") {
        AOS.init({
            duration: 800,
            easing: "ease-in-out",
            once: true,
            mirror: false,
            disable: "mobile", // Disable on mobile for better performance
        })
    }
})

// Canvas Background Animation (for home page)
if (document.getElementById("canvas")) {
    const canvas = document.getElementById("canvas")
    const ctx = canvas.getContext("2d")

    let width = (canvas.width = window.innerWidth)
    let height = (canvas.height = window.innerHeight)

    // Adjust point count based on screen size for better performance
    const isMobile = window.innerWidth < 768
    const pointCount = isMobile ? 80 : 150
    const maxDistance = isMobile ? 120 : 180
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

// Project Items Animation
if (document.querySelector(".projects-container")) {
    const projectItems = document.querySelectorAll(".project-item")

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible")
                }
            })
        },
        { threshold: 0.1 },
    )

    projectItems.forEach((item, index) => {
        // Add staggered delay for smoother animation
        setTimeout(() => {
            observer.observe(item)
        }, index * 100)
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

// Add this code at the end of the file to ensure the back-to-top button works on all pages
window.addEventListener("load", () => {
    // Initialize back to top button if it exists
    const backToTopButton = document.querySelector(".back-to-top")
    if (backToTopButton) {
        let lastScrollTop = 0
        const scrollThreshold = 300
        const bottomOffset = 840 // Distance from bottom in pixels

        function updateButtonPosition() {
            // Calculate position from bottom of document
            const totalHeight = document.documentElement.scrollHeight
            const viewportHeight = window.innerHeight
            const currentScroll = window.scrollY

            // Calculate how far we are from the bottom of the document
            const distanceFromBottom = totalHeight - (currentScroll + viewportHeight)

            // If we're close to the bottom, adjust the position to maintain the 840px from bottom
            if (distanceFromBottom < bottomOffset) {
                backToTopButton.style.bottom = `${bottomOffset - distanceFromBottom}px`
            } else {
                backToTopButton.style.bottom = "30px"
            }
        }

        function handleScroll() {
            const currentScrollTop = window.scrollY || document.documentElement.scrollTop

            // Show button when scrolled down enough
            if (currentScrollTop > scrollThreshold) {
                // Only show when scrolling down
                if (currentScrollTop > lastScrollTop) {
                    backToTopButton.classList.add("active")
                } else {
                    // Hide when scrolling up
                    backToTopButton.classList.remove("active")
                }

                // Update button position
                updateButtonPosition()
            } else {
                // Always hide when near the top
                backToTopButton.classList.remove("active")
            }

            lastScrollTop = currentScrollTop <= 0 ? 0 : currentScrollTop
        }

        // Add scroll event listener
        window.addEventListener("scroll", handleScroll)

        // Add click event to scroll to top
        backToTopButton.addEventListener("click", () => {
            window.scrollTo({
                top: 0,
                behavior: "smooth",
            })
        })

        // Initial check
        handleScroll()
    }
})
