document.addEventListener("DOMContentLoaded", () => {
    // Get the loading screen element
    const loadingScreen = document.querySelector(".loading-screen")
    const progressBar = document.querySelector(".progress-bar")
    const pageName = document.querySelector(".page-name")

    // Set the page name based on the current page
    const currentPage = window.location.pathname.split("/").pop()
    if (pageName) {
        if (currentPage === "" || currentPage === "/" || currentPage === "index.html") {
            pageName.textContent = "Home"
        } else if (currentPage === "about.html") {
            pageName.textContent = "About"
        } else if (currentPage === "skills.html") {
            pageName.textContent = "Skills"
        } else if (currentPage === "experience.html") {
            pageName.textContent = "Experience"
        } else if (currentPage === "projects.html") {
            pageName.textContent = "Projects"
        } else if (currentPage === "profiles.html") {
            pageName.textContent = "Profiles"
        } else if (currentPage === "contact.html") {
            pageName.textContent = "Contact"
        } else {
            pageName.textContent = "Loading"
        }
    }

    // Simulate loading progress
    let progress = 0
    const interval = setInterval(() => {
        progress += Math.random() * 10
        if (progress >= 100) {
            progress = 100
            clearInterval(interval)

            // Hide loading screen after a short delay
            setTimeout(() => {
                if (loadingScreen) {
                    loadingScreen.classList.add("hidden")
                }

                // Initialize AOS after loading
                if (typeof AOS !== "undefined") {
                    try {
                        AOS.init({
                            duration: 800,
                            easing: "ease-in-out",
                            once: true,
                            mirror: false,
                        })
                    } catch (error) {
                        console.error("AOS initialization failed:", error)
                    }
                }
            }, 500)
        }

        if (progressBar) {
            progressBar.style.width = `${progress}%`
        }
    }, 100)

    // Ensure loading screen is removed even if something goes wrong
    window.addEventListener("load", () => {
        setTimeout(() => {
            if (loadingScreen) {
                loadingScreen.classList.add("hidden")
            }

            // Initialize AOS after loading
            if (typeof AOS !== "undefined") {
                try {
                    AOS.init({
                        duration: 800,
                        easing: "ease-in-out",
                        once: true,
                        mirror: false,
                    })
                } catch (error) {
                    console.error("AOS initialization failed:", error)
                }
            }
        }, 2000) // Ensure it's removed after 2 seconds max
    })
})
