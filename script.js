// === CONFIGURAÇÃO DO CANVAS ===
const canvas = document.getElementById('bg');
const ctx = canvas.getContext('2d');

// Ajusta o tamanho do fundo para o tamanho da tela
canvas.width = innerWidth;
canvas.height = innerHeight;

let particlesArray;

// === CLASSE DE PARTÍCULAS ===
class Particle {
  constructor(x, y, directionX, directionY, size, color) {
    this.x = x;
    this.y = y;
    this.directionX = directionX;
    this.directionY = directionY;
    this.size = size;
    this.color = color;
  }

  // Desenha uma partícula (pontinho branco)
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
    ctx.fillStyle = '#fff';
    ctx.fill();
  }

  // Atualiza a posição e movimentação
  update() {
    // Inverte a direção se bater na borda da tela
    if (this.x > canvas.width || this.x < 0) this.directionX = -this.directionX;
    if (this.y > canvas.height || this.y < 0) this.directionY = -this.directionY;

    this.x += this.directionX;
    this.y += this.directionY;

    this.draw();
  }
}

// === CRIA AS PARTÍCULAS ===
function init() {
  particlesArray = [];
  const numberOfParticles = (canvas.height * canvas.width) / 9000;

  for (let i = 0; i < numberOfParticles; i++) {
    const size = Math.random() * 2 + 1;
    const x = Math.random() * (innerWidth - size * 2);
    const y = Math.random() * (innerHeight - size * 2);
    const directionX = Math.random() * 0.5 - 0.25;
    const directionY = Math.random() * 0.5 - 0.25;
    const color = '#fff';
    particlesArray.push(new Particle(x, y, directionX, directionY, size, color));
  }
}

// === CONECTA AS PARTÍCULAS COM LINHAS ===
function connect() {
  for (let a = 0; a < particlesArray.length; a++) {
    for (let b = a; b < particlesArray.length; b++) {
      const distance =
        (particlesArray[a].x - particlesArray[b].x) ** 2 +
        (particlesArray[a].y - particlesArray[b].y) ** 2;

      // Define a distância e opacidade das linhas
      if (distance < (canvas.width / 7) * (canvas.height / 7)) {
        const opacityValue = 1 - distance / 20000;
        ctx.strokeStyle = `rgba(255,255,255,${opacityValue})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
        ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
        ctx.stroke();
      }
    }
  }
}

// === ANIMAÇÃO DO FUNDO ===
function animate() {
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, innerWidth, innerHeight);

  for (let i = 0; i < particlesArray.length; i++) {
    particlesArray[i].update();
  }

  connect();
}

// === AJUSTA O FUNDO AO REDIMENSIONAR A TELA ===
window.addEventListener('resize', function () {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
  init();
});

// === EXECUTA ===
init();
animate();
