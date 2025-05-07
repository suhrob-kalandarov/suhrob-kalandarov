// Load the navbar component
document.addEventListener("DOMContentLoaded", () => {
    const navbarContainer = document.getElementById("navbar-container")

    if (navbarContainer) {
        // Fetch the navbar HTML
        fetch("/home/fragments/navbar.html")
            .then((response) => response.text())
            .then((html) => {
                navbarContainer.innerHTML = html

                // Initialize navbar functionality after loading
                initNavbar()
            })
            .catch((error) => {
                console.error("Error loading navbar:", error)
                navbarContainer.innerHTML = `
          <nav class="navbar">
            <a href="/index.html" class="logo">Suhrob Kalandarov</a>
            <div class="nav-links">
              <a href="/index.html">Home</a>
              <a href="/home/about.html">About</a>
              <a href="/home/skills.html">Skills</a>
              <a href="/home/experience.html">Experience</a>
              <a href="/home/projects.html">Projects</a>
              <a href="/home/profiles.html">Profiles</a>
              <a href="/home/contact.html">Contact</a>
            </div>
            <div class="mobile-menu-btn">
              <i class="fas fa-bars"></i>
            </div>
          </nav>
        `

                // Initialize navbar functionality with fallback
                initNavbar()
            })
    }
})

// Initialize navbar functionality
function initNavbar() {
    // Set active link based on current page
    const currentPage = window.location.pathname.split("/").pop()
    const navLinks = document.querySelectorAll(".nav-links a")

    navLinks.forEach((link) => {
        const linkHref = link.getAttribute("href")
        if (linkHref.includes(currentPage)) {
            link.classList.add("active")
        } else if (currentPage === "" && linkHref.includes("index.html")) {
            link.classList.add("active")
        }
    })

    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector(".mobile-menu-btn")
    const navLinksContainer = document.querySelector(".nav-links")

    if (mobileMenuBtn && navLinksContainer) {
        mobileMenuBtn.addEventListener("click", () => {
            navLinksContainer.classList.toggle("active")
            mobileMenuBtn.innerHTML = navLinksContainer.classList.contains("active")
                ? '<i class="fas fa-times"></i>'
                : '<i class="fas fa-bars"></i>'
        })
    }

    // Navbar scroll effect
    window.addEventListener("scroll", () => {
        const navbar = document.querySelector(".navbar")
        if (navbar) {
            if (window.scrollY > 50) {
                navbar.classList.add("scrolled")
            } else {
                navbar.classList.remove("scrolled")
            }
        }
    })

    // Close mobile menu when clicking a link
    document.querySelectorAll(".nav-links a").forEach((link) => {
        link.addEventListener("click", () => {
            navLinksContainer.classList.remove("active")
            if (mobileMenuBtn) {
                mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>'
            }
        })
    })
}
