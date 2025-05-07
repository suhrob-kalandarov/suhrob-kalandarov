// Load the footer component
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

    if (footerContainer) {
        // Fetch the footer HTML
        fetch("/home/fragments/footer.html")
            .then((response) => response.text())
            .then((html) => {
                footerContainer.innerHTML = html

                // Initialize footer functionality after loading
                initFooter()
            })
            .catch((error) => {
                console.error("Error loading footer:", error)
                // Fallback footer if fetch fails
                footerContainer.innerHTML = `
          <footer class="footer">
            <!-- Footer Top Wave -->
            <div class="footer-wave-top">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                    <path fill="currentColor" fill-opacity="1" d="M0,192L48,176C96,160,192,128,288,138.7C384,149,480,203,576,208C672,213,768,171,864,149.3C960,128,1056,128,1152,149.3C1248,171,1344,213,1392,234.7L1440,256L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
                </svg>
            </div>
            
            <!-- Main Footer Content -->
            <div class="footer-main">
                <div class="footer-container">
                    <!-- Footer Brand Section -->
                    <div class="footer-brand">
                        <div class="footer-logo">
                            <div class="logo-text">Suhrob</div>
                            <div class="logo-dot"></div>
                        </div>
                        <p class="footer-tagline">Turning ideas into exceptional digital experiences</p>
                        <div class="footer-contact-info">
                            <div class="contact-item">
                                <i class="fas fa-map-marker-alt"></i>
                                <span>Tashkent, Uzbekistan</span>
                            </div>
                            <div class="contact-item">
                                <i class="fas fa-envelope"></i>
                                <span>suhrobqalandarov27@gmail.com</span>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Footer Navigation -->
                    <div class="footer-nav">
                        <h3 class="footer-heading">Quick Links</h3>
                        <div class="footer-links">
                            <a href="/index.html" class="footer-link">
                                <i class="fas fa-chevron-right"></i>
                                <span>Home</span>
                            </a>
                            <a href="/home/about.html" class="footer-link">
                                <i class="fas fa-chevron-right"></i>
                                <span>About</span>
                            </a>
                            <a href="/home/skills.html" class="footer-link">
                                <i class="fas fa-chevron-right"></i>
                                <span>Skills</span>
                            </a>
                            <a href="/home/experience.html" class="footer-link">
                                <i class="fas fa-chevron-right"></i>
                                <span>Experience</span>
                            </a>
                            <a href="/home/projects.html" class="footer-link">
                                <i class="fas fa-chevron-right"></i>
                                <span>Projects</span>
                            </a>
                            <a href="/home/profiles.html" class="footer-link">
                                <i class="fas fa-chevron-right"></i>
                                <span>Profiles</span>
                            </a>
                            <a href="/home/contact.html" class="footer-link">
                                <i class="fas fa-chevron-right"></i>
                                <span>Contact</span>
                            </a>
                        </div>
                    </div>
                    
                    <!-- Footer Social Media -->
                    <div class="footer-social-section">
                        <h3 class="footer-heading">Connect With Me</h3>
                        <p class="social-text">Let's connect on social media and start a conversation!</p>
                        <div class="social-icons">
                            <a href="mailto:suhrobqalandarov27@gmail.com" class="social-icon" aria-label="Email">
                                <div class="icon-inner">
                                    <i class="fas fa-envelope"></i>
                                </div>
                            </a>
                            <a href="https://t.me/SuhrobKalandarov" class="social-icon" aria-label="Telegram">
                                <div class="icon-inner">
                                    <i class="fab fa-telegram-plane"></i>
                                </div>
                            </a>
                            <a href="https://linkedin.com/in/suhrob-qalandarov-4a20b5293" class="social-icon" aria-label="LinkedIn">
                                <div class="icon-inner">
                                    <i class="fab fa-linkedin-in"></i>
                                </div>
                            </a>
                            <a href="https://github.com/suhrob-kalandarov" class="social-icon" aria-label="GitHub">
                                <div class="icon-inner">
                                    <i class="fab fa-github"></i>
                                </div>
                            </a>
                        </div>
                    </div>
                    
                    <!-- Footer Newsletter -->
                    <div class="footer-newsletter">
                        <h3 class="footer-heading">Stay Updated</h3>
                        <p class="newsletter-text">Subscribe to my newsletter for the latest updates and insights.</p>
                        <form class="newsletter-form">
                            <div class="form-group">
                                <input type="email" placeholder="Your Email" required>
                                <button type="submit">
                                    <i class="fas fa-paper-plane"></i>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
                
                <!-- Footer Bottom -->
                <div class="footer-bottom">
                    <div class="footer-bottom-container">
                        <div class="copyright">
                            <p>&copy; <span id="current-year">2025</span> Suhrob Kalandarov. All rights reserved.</p>
                        </div>
                        <div class="footer-bottom-links">
                            <a href="#">Privacy Policy</a>
                            <a href="#">Terms of Service</a>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- Back to Top Button -->
            <div class="back-to-top" id="backToTop">
                <i class="fas fa-arrow-up"></i>
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
    // Set current year in copyright
    const currentYearElement = document.getElementById("current-year")
    if (currentYearElement) {
        currentYearElement.textContent = new Date().getFullYear()
    }

    // Back to top button functionality
    const backToTopButton = document.getElementById("backToTop")
    if (backToTopButton) {
        // Show/hide back to top button based on scroll position
        window.addEventListener("scroll", () => {
            if (window.pageYOffset > 300) {
                backToTopButton.classList.add("active")
            } else {
                backToTopButton.classList.remove("active")
            }
        })

        // Scroll to top when button is clicked
        backToTopButton.addEventListener("click", () => {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            })
        })
    }

    // Add hover effects to footer links
    const footerLinks = document.querySelectorAll(".footer-link")
    footerLinks.forEach((link) => {
        link.addEventListener("mouseenter", function () {
            const icon = this.querySelector("i")
            if (icon) {
                icon.style.transform = "translateX(3px)"
            }
        })

        link.addEventListener("mouseleave", function () {
            const icon = this.querySelector("i")
            if (icon) {
                icon.style.transform = ""
            }
        })
    })

    // Add animation to social icons
    const socialIcons = document.querySelectorAll(".social-icon")
    socialIcons.forEach((icon) => {
        icon.addEventListener("mouseenter", function () {
            const iconInner = this.querySelector(".icon-inner")
            if (iconInner) {
                iconInner.style.animation = "iconBounce 0.5s"
            }
        })

        icon.addEventListener("mouseleave", function () {
            const iconInner = this.querySelector(".icon-inner")
            if (iconInner) {
                iconInner.style.animation = ""
            }
        })
    })

    // Newsletter form submission
    const newsletterForm = document.querySelector(".newsletter-form")
    if (newsletterForm) {
        newsletterForm.addEventListener("submit", function (e) {
            e.preventDefault()
            const emailInput = this.querySelector("input[type='email']")
            const email = emailInput.value.trim()

            if (email) {
                // Show success message (in a real implementation, you would send this to a server)
                const formGroup = this.querySelector(".form-group")
                const successMessage = document.createElement("div")
                successMessage.className = "success-message"
                successMessage.textContent = "Thank you for subscribing!"
                successMessage.style.color = "#82c3ec"
                successMessage.style.marginTop = "10px"
                successMessage.style.fontWeight = "500"

                // Remove any existing message
                const existingMessage = formGroup.parentNode.querySelector(".success-message")
                if (existingMessage) {
                    existingMessage.remove()
                }

                formGroup.parentNode.appendChild(successMessage)

                // Clear the input
                emailInput.value = ""

                // Remove the message after 3 seconds
                setTimeout(() => {
                    successMessage.remove()
                }, 3000)
            }
        })
    }

    // Add animation to footer logo dot
    const footerLogoDot = document.querySelector(".logo-dot")
    if (footerLogoDot) {
        const footerLogo = document.querySelector(".footer-logo")
        if (footerLogo) {
            footerLogo.addEventListener("mouseenter", () => {
                footerLogoDot.style.animation = "pulse 1s infinite"
            })

            footerLogo.addEventListener("mouseleave", () => {
                footerLogoDot.style.animation = "pulse 2s infinite"
            })
        }
    }

    // Add hover effect to contact items
    const contactItems = document.querySelectorAll(".contact-item")
    contactItems.forEach((item) => {
        item.addEventListener("mouseenter", function () {
            this.style.transform = "translateX(5px)"
            this.style.color = "#82c3ec"
        })

        item.addEventListener("mouseleave", function () {
            this.style.transform = ""
            this.style.color = ""
        })
    })
}
