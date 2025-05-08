// Loading Screen
window.addEventListener("load", () => {
    setTimeout(() => {
        document.querySelector(".loading-screen").classList.add("hidden")
    }, 1500)
})

// Theme Toggle
document.addEventListener("DOMContentLoaded", () => {
    const themeToggle = document.querySelector(".theme-toggle");
    const body = document.querySelector("body");

    if (themeToggle) {
        const icon = themeToggle.querySelector("i");

        // Check for saved theme preference
        if (localStorage.getItem("theme") === "dark") {
            body.classList.add("dark-mode");
            if (icon) {
                icon.classList.remove("fa-moon");
                icon.classList.add("fa-sun");
            }
        }

        themeToggle.addEventListener("click", () => {
            body.classList.toggle("dark-mode");

            if (body.classList.contains("dark-mode")) {
                if (icon) {
                    icon.classList.remove("fa-moon");
                    icon.classList.add("fa-sun");
                }
                localStorage.setItem("theme", "dark");
            } else {
                if (icon) {
                    icon.classList.remove("fa-sun");
                    icon.classList.add("fa-moon");
                }
                localStorage.setItem("theme", "light");
            }
        });
    }

    // Initialize AOS
    let AOS; // Declare AOS variable
    if (typeof AOS !== "undefined") {
        AOS.init({
            duration: 800,
            easing: "ease-in-out",
            once: true,
            mirror: false,
        });
    }

    // Initialize Canvas Background Animation (for home page)
    initCanvasBackground();

    // Initialize Interactive Text Animation
    initInteractiveText();

    // Initialize Typed Text Animation
    initTypedText();

    // Initialize Statement Animation
    initStatementAnimation();

    // Initialize Project Items Animation
    initProjectItemsAnimation();

    // Replace placeholder images
    replacePlaceholderImages();
});

// Canvas Background Animation
function initCanvasBackground() {
    const canvas = document.getElementById("canvas");
    if (canvas) {
        const ctx = canvas.getContext("2d");

        let width = (canvas.width = window.innerWidth);
        let height = (canvas.height = window.innerHeight);

        const pointCount = 150;
        const maxDistance = 180;
        const points = [];

        // Create random points
        for (let i = 0; i < pointCount; i++) {
            points.push(createRandomPoint());
        }

        function createRandomPoint(x = Math.random() * width, y = Math.random() * height) {
            return {
                x,
                y,
                vx: (Math.random() - 0.5) * 1.5,
                vy: (Math.random() - 0.5) * 1.5,
                size: Math.random() * 2 + 1,
                color: `rgba(${Math.floor(Math.random() * 100 + 155)}, ${Math.floor(Math.random() * 100 + 155)}, ${Math.floor(Math.random() * 100 + 155)}, 0.7)`,
            };
        }

        function draw() {
            ctx.clearRect(0, 0, width, height);

            // Draw lines between points
            for (let i = 0; i < points.length; i++) {
                for (let j = i + 1; j < points.length; j++) {
                    const dx = points[i].x - points[j].x;
                    const dy = points[i].y - points[j].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < maxDistance) {
                        ctx.strokeStyle = `rgba(255, 255, 255, ${(1 - distance / maxDistance).toFixed(2)})`;
                        ctx.lineWidth = 0.5;
                        ctx.beginPath();
                        ctx.moveTo(points[i].x, points[i].y);
                        ctx.lineTo(points[j].x, points[j].y);
                        ctx.stroke();
                    }
                }
            }

            // Move and draw points
            for (let i = 0; i < points.length; i++) {
                const p = points[i];
                p.x += p.vx;
                p.y += p.vy;

                // Bounce off walls
                if (p.x <= 0 || p.x >= width) p.vx *= -1;
                if (p.y <= 0 || p.y >= height) p.vy *= -1;

                // Draw point
                ctx.fillStyle = p.color;
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fill();
            }

            requestAnimationFrame(draw);
        }

        draw();

        // Add point on click/touch
        function addPoint(e) {
            const rect = canvas.getBoundingClientRect();
            const x = e.clientX || (e.touches && e.touches[0].clientX);
            const y = e.clientY || (e.touches && e.touches[0].clientY);
            if (x && y) {
                for (let i = 0; i < 5; i++) {
                    points.push(createRandomPoint(x - rect.left, y - rect.top));
                }
            }
        }

        canvas.addEventListener("mousedown", addPoint);
        canvas.addEventListener("touchstart", addPoint);

        // Resize canvas on window resize
        window.addEventListener("resize", () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        });
    }
}

// Interactive Text Animation
function initInteractiveText() {
    const interactiveText = document.querySelector(".interactive-text");
    if (interactiveText) {
        const text = interactiveText.textContent;
        interactiveText.textContent = "";

        // Split text into individual spans
        for (let i = 0; i < text.length; i++) {
            const span = document.createElement("span");
            span.textContent = text[i];
            interactiveText.appendChild(span);
        }

        const letters = interactiveText.querySelectorAll("span");

        interactiveText.addEventListener("mousemove", (e) => {
            const bounds = interactiveText.getBoundingClientRect();
            const mouseX = e.clientX - bounds.left;
            const mouseY = e.clientY - bounds.top;

            letters.forEach((letter) => {
                const letterBounds = letter.getBoundingClientRect();
                const letterX = letterBounds.left - bounds.left + letterBounds.width / 2;
                const letterY = letterBounds.top - bounds.top + letterBounds.height / 2;

                const distX = mouseX - letterX;
                const distY = mouseY - letterY;
                const distance = Math.sqrt(distX * distX + distY * distY);

                const maxDistance = 100;
                if (distance < maxDistance) {
                    const force = (1 - distance / maxDistance) * 20;
                    const moveX = (distX / distance) * force;
                    const moveY = (distY / distance) * force;
                    letter.style.transform = `translate(${-moveX}px, ${-moveY}px)`;
                } else {
                    letter.style.transform = "translate(0, 0)";
                }
            });
        });

        interactiveText.addEventListener("mouseleave", () => {
            letters.forEach((letter) => {
                letter.style.transform = "translate(0, 0)";
            });
        });
    }
}

// Typed Text Animation
function initTypedText() {
    const typedTextElement = document.getElementById("typed-text");
    if (typedTextElement) {
        const textArray = ["Backend Developer", "Frontend Developer", "Freelancer", "Designer", "Problem Solver"];
        let textIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typingSpeed = 100;

        function typeText() {
            const currentText = textArray[textIndex];

            if (isDeleting) {
                typedTextElement.textContent = currentText.substring(0, charIndex - 1);
                charIndex--;
                typingSpeed = 50;
            } else {
                typedTextElement.textContent = currentText.substring(0, charIndex + 1);
                charIndex++;
                typingSpeed = 100;
            }

            if (!isDeleting && charIndex === currentText.length) {
                isDeleting = true;
                typingSpeed = 1500; // Pause at end
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                textIndex = (textIndex + 1) % textArray.length;
                typingSpeed = 500; // Pause before typing next
            }

            setTimeout(typeText, typingSpeed);
        }

        typeText();
    }
}

// Statement Animation
function initStatementAnimation() {
    const statementContainer = document.querySelector(".statement-container");
    if (statementContainer) {
        const statements = statementContainer.querySelectorAll(".statement");
        let activeStatement = 0;

        function animateStatements() {
            statements.forEach((statement, index) => {
                statement.classList.remove("visible", "exit");
                if (index === activeStatement) {
                    statement.classList.add("visible");
                } else if (index === (activeStatement - 1 + statements.length) % statements.length) {
                    statement.classList.add("exit");
                }
            });

            activeStatement = (activeStatement + 1) % statements.length;
            setTimeout(animateStatements, 4000);
        }

        animateStatements();
    }
}

// Project Items Animation
function initProjectItemsAnimation() {
    const projectsContainer = document.querySelector(".projects-container");
    if (projectsContainer) {
        const projectItems = projectsContainer.querySelectorAll(".project-item");

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("visible");
                    }
                });
            },
            { threshold: 0.1 }
        );

        projectItems.forEach((item) => {
            observer.observe(item);
        });
    }
}

// Replace placeholder images
function replacePlaceholderImages() {
    document.querySelectorAll('img[src="placeholder.svg"]').forEach((img) => {
        const width = img.width || 200;
        const height = img.height || 200;
        img.src = `https://via.placeholder.com/${width}x${height}`;
    });
}
