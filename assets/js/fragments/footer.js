// Load the footer component
document.addEventListener("DOMContentLoaded", () => {
    const footerContainer = document.getElementById("footer-container")

    if (footerContainer) {
        // Fetch the footer HTML
        fetch("footer.html")
            .then((response) => response.text())
            .then((html) => {
                footerContainer.innerHTML = html

                // Initialize footer functionality after loading
                initFooter()
            })
            .catch((error) => {
                console.error("Error loading footer:", error)
                footerContainer.innerHTML = `
          <footer class="footer">
            <div class="footer-container">
              <div class="footer-logo">
                <img src="placeholder.svg" alt="Logo">
              </div>
              <div class="footer-content">
                <div class="footer-links">
                  <div class="footer-nav">
                    <a href="index.html">Home</a>
                    <a href="about.html">About</a>
                    <a href="skills.html">Skills</a>
                    <a href="experience.html">Experience</a>
                    <a href="projects.html">Projects</a>
                    <a href="profiles.html">Profiles</a>
                    <a href="contact.html">Contact</a>
                  </div>
                  <div class="footer-social">
                    <a href="mailto:suhrobqalandarov27@gmail.com"><i class="fas fa-envelope"></i></a>
                    <a href="https://t.me/SuhrobKalandarov"><i class="fab fa-telegram"></i></a>
                    <a href="https://linkedin.com/in/suhrob-qalandarov-4a20b5293"><i class="fab fa-linkedin"></i></a>
                    <a href="https://github.com/suhrob-kalandarov"><i class="fab fa-github"></i></a>
                  </div>
                </div>
                <div class="footer-copyright">
                  <p>&copy; 2025 Suhrob Kalandarov. All rights reserved.</p>
                </div>
              </div>
            </div>
          </footer>
        `

                // Initialize footer functionality with fallback
                initFooter()
            })
    }
})

// Initialize footer functionality
function initFooter() {
    // Replace placeholder images with actual images
    const footerLogo = document.querySelector(".footer-logo img")
    if (footerLogo) {
        footerLogo.src = "https://via.placeholder.com/70x70/4b56d2/ffffff?text=SK"
    }

    // Add hover effects to footer links
    const footerLinks = document.querySelectorAll(".footer-nav a")
    footerLinks.forEach((link) => {
        link.addEventListener("mouseenter", function () {
            this.style.color = "#82c3ec"
        })

        link.addEventListener("mouseleave", function () {
            this.style.color = ""
        })
    })

    // Add animation to social icons
    const socialLinks = document.querySelectorAll(".footer-social a")
    socialLinks.forEach((link) => {
        link.addEventListener("mouseenter", function () {
            const icon = this.querySelector("i")
            if (icon) {
                icon.style.transform = "scale(1.2)"
            }
        })

        link.addEventListener("mouseleave", function () {
            const icon = this.querySelector("i")
            if (icon) {
                icon.style.transform = ""
            }
        })
    })
}
