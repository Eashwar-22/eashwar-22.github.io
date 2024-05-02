const navLinks = document.querySelectorAll('nav ul li a');

navLinks.forEach(link => {
  link.addEventListener('click', (event) => {
    event.preventDefault();
    const targetSection = document.getElementById(event.target.getAttribute('href').slice(1));
    targetSection.scrollIntoView({ behavior: "smooth" });
  });
});
