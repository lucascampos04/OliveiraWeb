var buttonStart = document.getElementById('btn-start-game');

buttonStart.addEventListener('click', openStartGame);

function openStartGame() {
  var newWindow = window.open('', 'Jogo iniciado', 'width=500, height=500');

  var htmlContent = `
    <html>
      <head>
        <link rel="stylesheet" href="game/gameStyle.css">
        <title>Jogo iniciado</title>
      </head>
      <body style="background-color: black;">
        <canvas id="gameCanvas" width="700" height="500"></canvas>
        <script>
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
            ctx.fillStyle = 'white';
            ctx.beginPath();
            ctx.moveTo(
              ship.x + ship.radius * Math.cos(ship.angle),
              ship.y + ship.radius * Math.sin(ship.angle)
            );
            ctx.lineTo(
              ship.x + ship.radius * Math.cos(ship.angle - 0.8),
              ship.y + ship.radius * Math.sin(ship.angle - 0.8)
            );
            ctx.lineTo(
              ship.x + ship.radius * Math.cos(ship.angle + 0.8),
              ship.y + ship.radius * Math.sin(ship.angle + 0.8)
            );
            ctx.closePath();
            ctx.fill();
            
            // Desenha os asteroides
            ctx.fillStyle = 'gray';
            for (let i = 0; i < asteroids.length; i++) {
              ctx.beginPath();
              ctx.arc(asteroids[i].x, asteroids[i].y, asteroids[i].radius, 0, Math.PI * 2);
              ctx.closePath();
              ctx.fill();
            }
            
            // Desenha os tiros
            ctx.fillStyle = 'red';
            for (let i = 0; i < bullets.length; i++) {
              ctx.beginPath();
              ctx.arc(bullets[i].x, bullets[i].y, bullets[i].radius, 0, Math.PI * 2);
              ctx.closePath();
              ctx.fill();
            }
            
            // Exibe informações do jogo
            ctx.fillStyle = 'white';
            ctx.font = '16px Arial';
            ctx.fillText('Vidas: ' + lives, 10, 20);
            ctx.fillText('Nível: ' + level, 10, 40);
            ctx.fillText('Asteroides destruídos: ' + destroyedAsteroids, 10, 60);
            ctx.fillText('Moedas: ' + coins, 10, 80);
          }
          
          // Eventos de teclado
          document.addEventListener('keydown', keyDownHandler);
          document.addEventListener('keyup', keyUpHandler);
          
          // Manipulador para pressionamento de tecla
          function keyDownHandler(event) {
            if (event.keyCode === 37) {
              // Tecla da seta esquerda (gira a nave para a esquerda)
              ship.angle -= ship.rotationSpeed;
            } else if (event.keyCode === 39) {
              // Tecla da seta direita (gira a nave para a direita)
              ship.angle += ship.rotationSpeed;
            } else if (event.keyCode === 38) {
              // Tecla da seta para cima (acelera a nave para frente)
              ship.speed += ship.acceleration;
              
              // Limita a velocidade da nave
              if (ship.speed > ship.maxSpeed) {
                ship.speed = ship.maxSpeed;
              }
            } else if (event.keyCode === 32) {
              // Barra de espaço (atira)
              bullets.push({
                x: ship.x + ship.radius * Math.cos(ship.angle),
                y: ship.y + ship.radius * Math.sin(ship.angle),
                radius: 5,
                speedX: 5 * Math.cos(ship.angle),
                speedY: 5 * Math.sin(ship.angle)
              });
            }
          }
          
          // Manipulador para liberação de tecla
          function keyUpHandler(event) {
            if (event.keyCode === 38) {
              // Tecla da seta para cima (desacelera a nave)
              ship.speed = 0;
            }
          }
          
          // Inicia o jogo
          setup();
        </script>
      </body>
    </html>
  `;
  
  newWindow.document.open();
  newWindow.document.write(htmlContent);
  newWindow.document.close();
}
