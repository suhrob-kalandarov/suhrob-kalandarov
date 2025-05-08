// Page Transition Animation
document.addEventListener("DOMContentLoaded", () => {
    // Initialize loading animation
    initLoadingAnimation();

    // Initialize page transitions
    initPageTransitions();
});

// Initialize loading animation
function initLoadingAnimation() {
    // Create hexagons for background
    createHexagonBackground();

    // Animate progress bar
    animateProgressBar();
}

// Create hexagon background
function createHexagonBackground() {
    const hexContainer = document.querySelector(".hexagon-container");

    // Clear existing hexagons
    if (hexContainer) {
        hexContainer.innerHTML = "";

        // Add hexagons
        for (let i = 0; i < 20; i++) {
            const hexagon = document.createElement("div");
            hexagon.className = "hexagon";

            // Random position
            const posX = Math.random() * 100;
            const posY = Math.random() * 100;

            // Random size
            const size = Math.random() * 50 + 50;

            // Random animation delay
            const delay = Math.random() * 3;

            // Apply styles
            hexagon.style.left = `${posX}%`;
            hexagon.style.top = `${posY}%`;
            hexagon.style.width = `${size}px`;
            hexagon.style.height = `${size * 1.1}px`;
            hexagon.style.animationDelay = `${delay}s`;

            hexContainer.appendChild(hexagon);
        }
    }
}

// Animate progress bar
function animateProgressBar() {
    const progressBar = document.querySelector(".progress-bar");

    if (progressBar) {
        let width = 0;
        const interval = setInterval(() => {
            if (width >= 100) {
                clearInterval(interval);

                // Hide loading screen after progress reaches 100%
                setTimeout(() => {
                    const loadingScreen = document.querySelector(".loading-screen");
                    if (loadingScreen) {
                        loadingScreen.classList.add("hidden");
                    }
                }, 500);
            } else {
                width += Math.random() * 10;
                if (width > 100) width = 100;
                progressBar.style.width = `${width}%`;
            }
        }, 200);
    }
}

// Initialize page transitions
function initPageTransitions() {
    // Handle link clicks for page transitions
    document.addEventListener("click", (e) => {
        const link = e.target.closest("a");

        // Only handle internal links
        if (link && link.href &&
            link.href.startsWith(window.location.origin) &&
            !link.hasAttribute("target") &&
            !link.classList.contains("project-link") &&
            !link.classList.contains("profile-link")) {

            e.preventDefault();

            // Show loading screen
            const loadingScreen = document.querySelector(".loading-screen");
            if (loadingScreen) {
                loadingScreen.classList.remove("hidden");

                // Update page name
                const pageName = loadingScreen.querySelector(".page-name");
                if (pageName) {
                    let newPageName = "Home";

                    if (link.href.includes("about")) {
                        newPageName = "About";
                    } else if (link.href.includes("skills")) {
                        newPageName = "Skills";
                    } else if (link.href.includes("experience")) {
                        newPageName = "Experience";
                    } else if (link.href.includes("projects")) {
                        newPageName = "Projects";
                    } else if (link.href.includes("profiles")) {
                        newPageName = "Profiles";
                    } else if (link.href.includes("contact")) {
                        newPageName = "Contact";
                    }

                    pageName.textContent = newPageName;
                }

                // Reset and animate progress bar
                const progressBar = loadingScreen.querySelector(".progress-bar");
                if (progressBar) {
                    progressBar.style.width = "0";
                    animateProgressBar();
                }

                // Navigate to new page after delay
                setTimeout(() => {
                    window.location.href = link.href;
                }, 1000);
            }
        }
    });
}

// Hide loading screen on page load
window.addEventListener("load", () => {
    setTimeout(() => {
        const loadingScreen = document.querySelector(".loading-screen");
        if (loadingScreen) {
            loadingScreen.classList.add("hidden");
        }
    }, 1500);
});
