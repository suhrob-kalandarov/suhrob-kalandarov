document.addEventListener("DOMContentLoaded", () => {
    // Create particles
    const particlesContainer = document.createElement("div")
    particlesContainer.className = "particles-container"

    // Add particles to the loading screen
    const loadingScreen = document.querySelector(".loading-screen")

    // Clear existing content
    loadingScreen.innerHTML = ""

    // Add particles container
    loadingScreen.appendChild(particlesContainer)

    // Create particles
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement("div")
        particle.className = "particle"

        // Random position
        const posX = Math.random() * 100
        const posY = Math.random() * 100

        // Random size
        const size = Math.random() * 5 + 2

        // Random animation delay
        const delay = Math.random() * 4

        // Random opacity
        const opacity = Math.random() * 0.5 + 0.3

        // Apply styles
        particle.style.left = `${posX}%`
        particle.style.top = `${posY}%`
        particle.style.width = `${size}px`
        particle.style.height = `${size}px`
        particle.style.animationDelay = `${delay}s`
        particle.style.opacity = opacity

        particlesContainer.appendChild(particle)
    }

    // Create loader container
    const loaderContainer = document.createElement("div")
    loaderContainer.className = "loader-container"

    // Create loader
    const loader = document.createElement("div")
    loader.className = "loader"

    // Create loader circles
    for (let i = 0; i < 3; i++) {
        const circle = document.createElement("div")
        circle.className = "loader-circle"
        loader.appendChild(circle)
    }

    // Create loader logo
    const loaderLogo = document.createElement("div")
    loaderLogo.className = "loader-logo"
    loader.appendChild(loaderLogo)

    // Create loader text
    const loaderText = document.createElement("div")
    loaderText.className = "loader-text"
    loaderText.textContent = "LOADING"

    // Create progress bar
    const progressBar = document.createElement("div")
    progressBar.className = "progress-bar"

    const progress = document.createElement("div")
    progress.className = "progress"
    progressBar.appendChild(progress)

    // Add elements to loader container
    loaderContainer.appendChild(loader)
    loaderContainer.appendChild(loaderText)
    loaderContainer.appendChild(progressBar)

    // Add loader container to loading screen
    loadingScreen.appendChild(loaderContainer)

    // Simulate loading progress
    let width = 0
    const interval = setInterval(() => {
        if (width >= 100) {
            clearInterval(interval)
            // Hide loading screen after progress reaches 100%
            setTimeout(() => {
                loadingScreen.classList.add("hidden")
            }, 500)
        } else {
            width += Math.random() * 10
            if (width > 100) width = 100
            progress.style.width = `${width}%`
        }
    }, 200)
})

// Add this to the window load event
window.addEventListener("load", () => {
    // Hide loading screen
    setTimeout(() => {
        document.querySelector(".loading-screen").classList.add("hidden")
    }, 1000)
})
