// Load the navbar component
document.addEventListener("DOMContentLoaded", () => {
    const navbarContainer = document.getElementById("navbar-container");

    if (navbarContainer) {
        // Fetch the navbar HTML
        fetch("/home/fragments/navbar.html")
            .then((response) => response.text())
            .then((html) => {
                navbarContainer.innerHTML = html;

                // Initialize navbar functionality after loading
                initNavbar();
            })
            .catch((error) => {
                console.error("Error loading navbar:", error);
                // Fallback navbar if fetch fails
                navbarContainer.innerHTML = `
                    <nav class="navbar">
                        <div class="navbar-container">
                            <a href="/index.html" class="logo">
                                <span class="logo-text">Suhrob</span>
                                <span class="logo-dot"></span>
                            </a>
                            <div class="nav-links">
                                <a href="/index.html" class="nav-link">
                                    <span class="nav-icon"><i class="fas fa-home"></i></span>
                                    <span class="nav-text">Home</span>
                                </a>
                                <a href="/home/about.html" class="nav-link">
                                    <span class="nav-icon"><i class="fas fa-user"></i></span>
                                    <span class="nav-text">About</span>
                                </a>
                                <a href="/home/skills.html" class="nav-link">
                                    <span class="nav-icon"><i class="fas fa-code"></i></span>
                                    <span class="nav-text">Skills</span>
                                </a>
                                <a href="/home/experience.html" class="nav-link">
                                    <span class="nav-icon"><i class="fas fa-briefcase"></i></span>
                                    <span class="nav-text">Experience</span>
                                </a>
                                <a href="/home/projects.html" class="nav-link">
                                    <span class="nav-icon"><i class="fas fa-project-diagram"></i></span>
                                    <span class="nav-text">Projects</span>
                                </a>
                                <a href="/home/profiles.html" class="nav-link">
                                    <span class="nav-icon"><i class="fas fa-id-card"></i></span>
                                    <span class="nav-text">Profiles</span>
                                </a>
                                <a href="/home/contact.html" class="nav-link">
                                    <span class="nav-icon"><i class="fas fa-envelope"></i></span>
                                    <span class="nav-text">Contact</span>
                                </a>
                            </div>
                            <div class="mobile-menu-btn">
                                <div class="menu-icon">
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                </div>
                            </div>
                        </div>
                    </nav>
                `;

                // Initialize navbar functionality with fallback
                initNavbar();
            });
    }
});

// Initialize navbar functionality
function initNavbar() {
    // Set active link based on current page
    const currentPage = window.location.pathname.split("/").pop();
    const navLinks = document.querySelectorAll(".nav-link");

    navLinks.forEach((link) => {
        const linkHref = link.getAttribute("href");
        if (linkHref.includes(currentPage)) {
            link.classList.add("active");
        } else if ((currentPage === "" || currentPage === "/") && linkHref.includes("index.html")) {
            link.classList.add("active");
        }
    });

    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
    const menuIcon = document.querySelector(".menu-icon");
    const navLinksContainer = document.querySelector(".nav-links");

    if (mobileMenuBtn && navLinksContainer) {
        mobileMenuBtn.addEventListener("click", () => {
            navLinksContainer.classList.toggle("active");
            if (menuIcon) {
                menuIcon.classList.toggle("open");
            } else {
                mobileMenuBtn.innerHTML = navLinksContainer.classList.contains("active")
                    ? '<i class="fas fa-times"></i>'
                    : '<i class="fas fa-bars"></i>';
            }
        });
    }

    // Navbar scroll effect
    window.addEventListener("scroll", () => {
        const navbar = document.querySelector(".navbar");
        if (navbar) {
            if (window.scrollY > 50) {
                navbar.classList.add("scrolled");
            } else {
                navbar.classList.remove("scrolled");
            }
        }
    });

    // Close mobile menu when clicking a link
    document.querySelectorAll(".nav-links a").forEach((link) => {
        link.addEventListener("click", () => {
            if (navLinksContainer) {
                navLinksContainer.classList.remove("active");
            }
            if (menuIcon) {
                menuIcon.classList.remove("open");
            } else if (mobileMenuBtn) {
                mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
            }
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener("click", (e) => {
        if (
            navLinksContainer &&
            navLinksContainer.classList.contains("active") &&
            !e.target.closest(".nav-links") &&
            !e.target.closest(".mobile-menu-btn")
        ) {
            navLinksContainer.classList.remove("active");
            if (menuIcon) {
                menuIcon.classList.remove("open");
            } else if (mobileMenuBtn) {
                mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
            }
        }
    });
}
