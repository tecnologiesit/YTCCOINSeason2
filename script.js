let coins = 0;
let level = 1;
let coinsToNextLevel = 1000;
let headerVisible = true; // To track header visibility

function mine() {
    let tapCount = 1; // Default to 1 since no finger input is provided
    let coinsPerTap = level * tapCount; // Coins per tap increases with level
    coins += coinsPerTap;

    // Update balance display
    document.getElementById('balance').innerText = `Balance: ${coins} coins (added ${coinsPerTap} coins)`;

    // Level up logic
    if (coins >= coinsToNextLevel) {
        coins -= coinsToNextLevel; // Deduct coins spent for leveling up
        level++;
        updateLevelProgress();
        updateNextLevelRequirement();
    }

    // Update the level progress after mining
    updateLevelProgress();
}

function updateLevelProgress() {
    const levelUpRequirements = [1000, 5000, 10000, 20000, 50000, 1000000, 5000000, 8000000, 1000000000];
    let currentRequirement = level <= levelUpRequirements.length ? levelUpRequirements[level - 1] : Infinity;

    // Calculate the percentage remaining for the next level
    let percentageRemaining = Math.max(0, ((currentRequirement - coins) / currentRequirement) * 100);
    document.getElementById('levelBar').style.width = `${100 - percentageRemaining}%`;
    document.getElementById('levelProgressText').innerText = `Level: ${level} | Progress: ${Math.round(100 - percentageRemaining)}%`;
}

function handleTap() {
    mine();
    shakeImage();
}

// Function to shake image on tap
function shakeImage() {
    const image = document.getElementById('mineImage');
    image.classList.add('shake');
    setTimeout(() => {
        image.classList.remove('shake');
    }, 500); // Shake effect duration
}

// Function to toggle header visibility
function toggleHeader() {
    const header = document.querySelector('header');
    header.style.display = headerVisible ? 'none' : 'block';
    headerVisible = !headerVisible;
}

// Background animation setup
function createBackgroundAnimation() {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    document.body.appendChild(canvas);
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    
    function Particle() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 5 + 2;
        this.speedX = Math.random() * 3 - 1.5;
        this.speedY = Math.random() * 3 - 1.5;
    }

    function initParticles() {
        for (let i = 0; i < 100; i++) {
            particles.push(new Particle());
        }
    }

    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(particle => {
            particle.x += particle.speedX;
            particle.y += particle.speedY;

            if (particle.x < 0 || particle.x > canvas.width) particle.speedX *= -1;
            if (particle.y < 0 || particle.y > canvas.height) particle.speedY *= -1;

            ctx.fillStyle = 'rgba(0, 204, 255, 0.7)'; // Color for particles
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            ctx.fill();
        });
        requestAnimationFrame(animateParticles);
    }

    initParticles();
    animateParticles();
}

// Initialize all functionalities
createBackgroundAnimation();
