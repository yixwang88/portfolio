document.addEventListener('DOMContentLoaded', () => {
    // Smooth Scroll for "See More" Button
    const seeMoreBtn = document.getElementById('see-more-btn');
    const aboutSection = document.getElementById('about');
    const navLinks = document.querySelectorAll('.icon-list a');

    if (seeMoreBtn && aboutSection) {
        // Click event for the "See More" button
        seeMoreBtn.addEventListener('click', () => {
            aboutSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });
    }
    
    // Apply smooth scroll behavior to each link
    navLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault(); // Prevent default anchor behavior
            const targetId = link.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Select Elements
    const menuButton = document.getElementById('menu-toggle');
    const menuWrap = document.getElementById('menu-wrap');


    // Toggle Menu Animation
    menuButton.addEventListener('click', () => {
        menuWrap.classList.toggle('active');
    });

});


// Code from youtube tutorial: https://www.youtube.com/watch?v=d620nV6bp0A
const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particlesArray = [];
const mouse = { x: null, y: null, radius: (canvas.height / 80) * (canvas.width / 80) };

// Mouse move event
window.addEventListener("mousemove", (event) => {
    mouse.x = event.x;
    mouse.y = event.y;
});

// Particle class
class Particle {
    constructor(x, y, directionX, directionY, size, color) {
        this.x = x;
        this.y = y;
        this.directionX = directionX;
        this.directionY = directionY;
        this.size = size;
        this.color = color;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx.fillStyle = "rgba(255, 255, 255, 0.4)";
        ctx.fill();
    }

    // Update particle position and behavior
    update() {

        // Check boundaries and reverse direction if needed
        if (this.x > canvas.width || this.x < 0) this.directionX = -this.directionX;
        if (this.y > canvas.height || this.y < 0) this.directionY = -this.directionY;

        this.x += this.directionX;
        this.y += this.directionY;
        this.draw();
    }
}

// Initialize particles
function init() {
    particlesArray = [];
    const numberOfParticles = (canvas.height * canvas.width) / 9000;
    for (let i = 0; i < numberOfParticles; i++) {
        const size = (Math.random() * 5) + 1;
        const x = Math.random() * (canvas.width - size * 2) + size * 2;
        const y = Math.random() * (canvas.height - size * 2) + size * 2;
        const directionX = (Math.random() * 3) - 1.5;
        const directionY = (Math.random() * 3) - 1.5;
        const color = "rgba(199, 155, 195, 0.5)";
        particlesArray.push(new Particle(x, y, directionX, directionY, size, color));
    }
}

// Connect particles and link to mouse
function connect() {
    for (let a = 0; a < particlesArray.length; a++) {
        for (let b = a + 1; b < particlesArray.length; b++) {
            const dx = particlesArray[a].x - particlesArray[b].x;
            const dy = particlesArray[a].y - particlesArray[b].y;
            const distance = dx * dx + dy * dy;

            // Draw line between particles if close
            if (distance < (canvas.width / 7) * (canvas.height / 7)) {
                ctx.strokeStyle = "rgba(199, 155, 195, 0.2)";
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                ctx.stroke();
            }
        }

        // Draw line from particle to mouse cursor
        const mouseDx = mouse.x - particlesArray[a].x;
        const mouseDy = mouse.y - particlesArray[a].y;
        const mouseDistance = Math.sqrt(mouseDx * mouseDx + mouseDy * mouseDy);

        if (mouseDistance < mouse.radius) {
            ctx.strokeStyle = "rgba(255, 255, 255, 0.3)";
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();
        }
    }
}

// Animation loop
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particlesArray.forEach((particle) => particle.update());
    connect();
    requestAnimationFrame(animate);
}

// Handle window resize
window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    mouse.radius = (canvas.height / 80) * (canvas.width / 80);
    init();
});

init();
animate();
