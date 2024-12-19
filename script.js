const canvas = document.getElementById('confettiCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const audio = document.getElementById('celebrationAudio');
let confetti = [];

class ConfettiParticle {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height - canvas.height;
    this.size = Math.random() * 10 + 5;
    this.speed = Math.random() * 2 + 1;
    this.angle = Math.random() * Math.PI * 2;
    this.rotationSpeed = Math.random() * 0.05 - 0.025;
    this.color = `hsl(${Math.random() * 360}, 100%, 50%)`;
  }

  update() {
    this.y += this.speed;
    this.angle += this.rotationSpeed;
    if (this.y > canvas.height) {
      this.y = 0 - this.size;
      this.x = Math.random() * canvas.width;
    }
  }

  draw() {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.angle);
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(this.size, 0);
    ctx.lineTo(this.size / 2, this.size);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }
}

function generateConfetti() {
  for (let i = 0; i < 200; i++) {
    confetti.push(new ConfettiParticle());
  }
}

function animateConfetti() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  confetti.forEach((particle) => {
    particle.update();
    particle.draw();
  });
  requestAnimationFrame(animateConfetti);
}

document.getElementById('celebrateButton').addEventListener('click', () => {
  confetti = [];
  generateConfetti();
  animateConfetti();
  audio.play();
});
