document.addEventListener("DOMContentLoaded", () => {
    const footerContainer = document.getElementById("footer-container")

    // Fetch and insert the footer content
    fetch("/fragments/footer.html")
        .then((response) => response.text())
        .then((html) => {
            footerContainer.innerHTML = html

            // After footer is loaded, initialize the back to top button
            initBackToTop()
        })
        .catch((error) => {
            console.error("Error loading footer:", error)
            footerContainer.innerHTML = "<p>Error loading footer</p>"
        })
})

// Move the back to top initialization outside the fetch callback
// so it runs even if the footer is already in the DOM
window.addEventListener("DOMContentLoaded", () => {
    // Wait a short time to ensure the footer is loaded
    setTimeout(initBackToTop, 500)
})

// Initialize back to top button functionality
function initBackToTop() {
    const backToTopButton = document.querySelector(".back-to-top")
    if (!backToTopButton) return

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
