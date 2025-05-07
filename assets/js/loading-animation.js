// Page Transition Animation
document.addEventListener("DOMContentLoaded", () => {
    // Create hexagon background
    createHexagonBackground()

    // Create loader elements
    createLoader()

    // Initialize page transitions
    initPageTransitions()
})

// Create hexagon background
function createHexagonBackground() {
    const loadingScreen = document.querySelector(".loading-screen")

    // Clear existing content
    loadingScreen.innerHTML = ""

    // Create hexagon container
    const hexContainer = document.createElement("div")
    hexContainer.className = "hexagon-container"

    // Add hexagons
    for (let i = 0; i < 20; i++) {
        const hexagon = document.createElement("div")
        hexagon.className = "hexagon"

        // Random position
        const posX = Math.random() * 100
        const posY = Math.random() * 100

        // Random size
        const size = Math.random() * 50 + 50

        // Random animation delay
        const delay = Math.random() * 3

        // Apply styles
        hexagon.style.left = `${posX}%`
        hexagon.style.top = `${posY}%`
        hexagon.style.width = `${size}px`
        hexagon.style.height = `${size * 1.1}px`
        hexagon.style.animationDelay = `${delay}s`

        hexContainer.appendChild(hexagon)
    }

    loadingScreen.appendChild(hexContainer)
}

// Create loader elements
function createLoader() {
    const loadingScreen = document.querySelector(".loading-screen")

    // Create loader wrapper
    const loaderWrapper = document.createElement("div")
    loaderWrapper.className = "loader-wrapper"

    // Create 3D cube loader
    const loader = document.createElement("div")
    loader.className = "loader"

    const cube = document.createElement("div")
    cube.className = "cube"

    // Create cube faces
    for (let i = 0; i < 6; i++) {
        const face = document.createElement("div")
        face.className = "cube-face"

        const inner = document.createElement("div")
        inner.className = "cube-inner"

        face.appendChild(inner)
        cube.appendChild(face)
    }

    loader.appendChild(cube)

    // Create page name element
    const pageName = document.createElement("div")
    pageName.className = "page-name"
    pageName.textContent = getCurrentPageName()

    // Create progress container
    const progressContainer = document.createElement("div")
    progressContainer.className = "progress-container"

    const progressBar = document.createElement("div")
    progressBar.className = "progress-bar"
    progressContainer.appendChild(progressBar)

    // Create loading text
    const loadingText = document.createElement("div")
    loadingText.className = "loading-text"
    loadingText.textContent = "LOADING"

    // Add elements to wrapper
    loaderWrapper.appendChild(loader)
    loaderWrapper.appendChild(pageName)
    loaderWrapper.appendChild(progressContainer)
    loaderWrapper.appendChild(loadingText)

    // Add wrapper to loading screen
    loadingScreen.appendChild(loaderWrapper)

    // Animate progress bar
    simulateLoading(progressBar)
}

// Simulate loading progress
function simulateLoading(progressBar) {
    let width = 0
    const interval = setInterval(() => {
        if (width >= 100) {
            clearInterval(interval)

            // Hide loading screen after progress reaches 100%
            setTimeout(() => {
                document.querySelector(".loading-screen").classList.add("hidden")
            }, 500)
        } else {
            width += Math.random() * 10
            if (width > 100) width = 100
            progressBar.style.width = `${width}%`
        }
    }, 200)
}

// Get current page name
function getCurrentPageName() {
    const path = window.location.pathname
    let pageName = "Home"

    if (path.includes("about")) {
        pageName = "About"
    } else if (path.includes("skills")) {
        pageName = "Skills"
    } else if (path.includes("experience")) {
        pageName = "Experience"
    } else if (path.includes("projects")) {
        pageName = "Projects"
    } else if (path.includes("profiles")) {
        pageName = "Profiles"
    } else if (path.includes("contact")) {
        pageName = "Contact"
    }

    return pageName
}

// Initialize page transitions
function initPageTransitions() {
    // Show loading screen on initial load
    window.addEventListener("load", () => {
        setTimeout(() => {
            document.querySelector(".loading-screen").classList.add("hidden")
        }, 1500)
    })

    // Handle link clicks for page transitions
    document.addEventListener("click", (e) => {
        const link = e.target.closest("a")

        // Only handle internal links
        if (link && link.href && link.href.startsWith(window.location.origin) && !link.hasAttribute("target")) {
            e.preventDefault()

            // Show loading screen
            const loadingScreen = document.querySelector(".loading-screen")
            loadingScreen.classList.remove("hidden")

            // Update page name
            const pageName = loadingScreen.querySelector(".page-name")
            if (pageName) {
                let newPageName = "Home"

                if (link.href.includes("about")) {
                    newPageName = "About"
                } else if (link.href.includes("skills")) {
                    newPageName = "Skills"
                } else if (link.href.includes("experience")) {
                    newPageName = "Experience"
                } else if (link.href.includes("projects")) {
                    newPageName = "Projects"
                } else if (link.href.includes("profiles")) {
                    newPageName = "Profiles"
                } else if (link.href.includes("contact")) {
                    newPageName = "Contact"
                }

                pageName.textContent = newPageName
            }

            // Reset and animate progress bar
            const progressBar = loadingScreen.querySelector(".progress-bar")
            if (progressBar) {
                progressBar.style.width = "0"
                simulateLoading(progressBar)
            }

            // Navigate to new page after delay
            setTimeout(() => {
                window.location.href = link.href
            }, 1000)
        }
    })
}

// Add this to the window load event
window.addEventListener("load", () => {
    // Hide loading screen
    setTimeout(() => {
        document.querySelector(".loading-screen").classList.add("hidden")
    }, 1500)
})
