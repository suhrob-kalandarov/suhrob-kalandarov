// AOS Initialization
AOS.init({
  duration: 1000,
  easing: 'ease-in-out',
  once: true,
});

// Typed.js Initialization
const typed = new Typed('.typed', {
  strings: ['Backend Developer', 'Frontend Developer', 'Freelancer', 'Designer'],
  typeSpeed: 100,
  backSpeed: 50,
  loop: true,
});

// Mobile Menu Toggle
const menuToggle = document.querySelector('.menu-toggle');
const sidebar = document.querySelector('.sidebar');

menuToggle.addEventListener('click', () => {
  sidebar.classList.toggle('active');
});

// Smooth Scroll for Navigation Links
document.querySelectorAll('.nav-link').forEach((link) => {
  link.addEventListener('click', function (e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    document.querySelector(targetId).scrollIntoView({
      behavior: 'smooth',
    });
  });
});