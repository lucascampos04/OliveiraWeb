// Variáveis do jogo
let canvas; // Elemento canvas
let ctx; // Contexto de renderização
let ship; // Objeto da nave do jogador
let asteroids = []; // Array para armazenar os asteroides
let bullets = []; // Array para armazenar os tiros do jogador
let lives = 3;
let level = 1;
let destroyedAsteroids = 0;
let coins = 0;
let gameTime = 0;

// Configuração inicial
function setup() {
  canvas = document.getElementById('gameCanvas');
  ctx = canvas.getContext('2d');
  
  // Cria a nave do jogador
  ship = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    radius: 20,
    angle: 0,
    rotationSpeed: 0.05,
    speed: 0,
    acceleration: 0.1,
    maxSpeed: 5
  };

  // Gera asteroides iniciais
  generateAsteroids(level * 5);

  // Inicia o loop do jogo
  gameLoop();
}

// Loop principal do jogo
function gameLoop() {
  update();
  draw();
  requestAnimationFrame(gameLoop);
}

// Atualiza o estado do jogo
function update() {
  gameTime++;
  
  // Movimentação da nave
  ship.x += ship.speed * Math.cos(ship.angle);
  ship.y += ship.speed * Math.sin(ship.angle);
  
  // Verifica se a nave ultrapassou os limites do canvas e a reposiciona se necessário
  if (ship.x > canvas.width) {
    ship.x = 0;
  } else if (ship.x < 0) {
    ship.x = canvas.width;
  }
  
  if (ship.y > canvas.height) {
    ship.y = 0;
  } else if (ship.y < 0) {
    ship.y = canvas.height;
  }
  
  // Movimentação dos asteroides
  for (let i = 0; i < asteroids.length; i++) {
    asteroids[i].x += asteroids[i].speedX;
    asteroids[i].y += asteroids[i].speedY;
    
    // Verifica se o asteroide ultrapassou os limites do canvas e o reposiciona se necessário
    if (asteroids[i].x > canvas.width + asteroids[i].radius) {
      asteroids[i].x = -asteroids[i].radius;
    } else if (asteroids[i].x < -asteroids[i].radius) {
      asteroids[i].x = canvas.width + asteroids[i].radius;
    }
    
    if (asteroids[i].y > canvas.height + asteroids[i].radius) {
      asteroids[i].y = -asteroids[i].radius;
    } else if (asteroids[i].y < -asteroids[i].radius) {
      asteroids[i].y = canvas.height + asteroids[i].radius;
    }
  }
  
  // Movimentação dos tiros
  for (let i = 0; i < bullets.length; i++) {
    bullets[i].x += bullets[i].speedX;
    bullets[i].y += bullets[i].speedY;
    
    // Verifica se o tiro ultrapassou os limites do canvas e o remove se necessário
    if (bullets[i].x > canvas.width || bullets[i].x < 0 ||
        bullets[i].y > canvas.height || bullets[i].y < 0) {
      bullets.splice(i, 1);
      i--;
    }
  }
  
  // Verifica colisões
  checkCollisions();
  
  // Verifica se o jogador ganha uma moeda a cada 5 asteroides destruídos
  if (destroyedAsteroids % 5 === 0 && destroyedAsteroids > 0) {
    coins++;
  }
  
  // Verifica se o jogador atinge o tempo necessário para subir de nível
  if (gameTime % 120 === 0 && gameTime > 0) {
    if (lives > 0) {
      level++;
      generateAsteroids(level * 5);
    }
    gameTime = 0;
  }
}

// Verifica colisões
function checkCollisions() {
  // Colisão entre a nave e os asteroides
  for (let i = 0; i < asteroids.length; i++) {
    const dist = Math.hypot(ship.x - asteroids[i].x, ship.y - asteroids[i].y);
    
    if (dist < ship.radius + asteroids[i].radius) {
      if (lives > 0) {
        lives--;
        resetShip();
      }
    }
  }
  
  // Colisão entre tiros e asteroides
  for (let i = 0; i < bullets.length; i++) {
    for (let j = 0; j < asteroids.length; j++) {
      const dist = Math.hypot(bullets[i].x - asteroids[j].x, bullets[i].y - asteroids[j].y);
      
      if (dist < bullets[i].radius + asteroids[j].radius) {
        bullets.splice(i, 1);
        i--;
        destroyAsteroid(j);
        break;
      }
    }
  }
}

// Destroi um asteroide
function destroyAsteroid(index) {
  asteroids.splice(index, 1);
  destroyedAsteroids++;
}

// Reinicia a nave do jogador
function resetShip() {
  ship.x = canvas.width / 2;
  ship.y = canvas.height / 2;
  ship.angle = 0;
  ship.speed = 0;
}

// Gera asteroides
function generateAsteroids(numAsteroids) {
  asteroids = [];
  
  for (let i = 0; i < numAsteroids; i++) {
    const asteroid = {
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: 30,
      speedX: Math.random() - 0.5,
      speedY: Math.random() - 0.5
    };
    
    asteroids.push(asteroid);
  }
}

// Função para desenhar na tela
function draw() {
  // Limpa o canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  // Desenha a nave do jogador
  ctx.beginPath();
  ctx.arc(ship.x, ship.y, ship.radius, 0, Math.PI * 2);
  ctx.strokeStyle = '#ffffff';
  ctx.stroke();
  
  // Desenha os asteroides
  for (let i = 0; i < asteroids.length; i++) {
    ctx.beginPath();
    ctx.arc(asteroids[i].x, asteroids[i].y, asteroids[i].radius, 0, Math.PI * 2);
    ctx.strokeStyle = '#ffffff';
    ctx.stroke();
  }
  
  // Desenha os tiros do jogador
  for (let i = 0; i < bullets.length; i++) {
    ctx.beginPath();
    ctx.arc(bullets[i].x, bullets[i].y, bullets[i].radius, 0, Math.PI * 2);
    ctx.fillStyle = '#ffffff';
    ctx.fill();
  }
  
  // Exibe informações na tela (vidas, nível, moedas)
  ctx.font = '16px Arial';
  ctx.fillStyle = '#ffffff';
  ctx.fillText(`Vidas: ${lives}`, 10, 20);
  ctx.fillText(`Nível: ${level}`, 10, 40);
  ctx.fillText(`Moedas: ${coins}`, 10, 60);
}

// Evento para disparar um tiro
document.addEventListener('keydown', function(event) {
  if (event.keyCode === 32) {
    const bullet = {
      x: ship.x + ship.radius * Math.cos(ship.angle),
      y: ship.y + ship.radius * Math.sin(ship.angle),
      radius: 5,
      speedX: 5 * Math.cos(ship.angle),
      speedY: 5 * Math.sin(ship.angle)
    };
    
    bullets.push(bullet);
  }
});

// Eventos para controlar a movimentação da nave
document.addEventListener('keydown', function(event) {
  if (event.keyCode === 37) { // Seta esquerda
    ship.angle -= ship.rotationSpeed;
  } else if (event.keyCode === 39) { // Seta direita
    ship.angle += ship.rotationSpeed;
  } else if (event.keyCode === 38) { // Seta cima
    ship.speed += ship.acceleration;
    if (ship.speed > ship.maxSpeed) {
      ship.speed = ship.maxSpeed;
    }
  }
});

document.addEventListener('keyup', function(event) {
  if (event.keyCode === 38) { // Seta cima
    ship.speed = 0;
  }
});

// Inicia o jogo ao carregar a página
window.onload = setup;
