// const canvas = document.getElementById("gameCanvas");
// const ctx = canvas.getContext("2d");
// let baseEnemySpeed = 1;
// const backgroundImg = new Image();
// backgroundImg.src = "intestino.jpeg";

// function resizeCanvas() {
//   canvas.width = window.innerWidth;
//   canvas.height = window.innerHeight;
// }

// resizeCanvas();
// window.addEventListener("resize", resizeCanvas);

// const kefirImg = new Image();
// kefirImg.src = "kefir.png";

// const probioticImg = new Image();
// probioticImg.src = "probiotico.png";

// const enemyImgs = ["salmonella.png", "ecoli.png", "clostridium.png"].map(
//   (src) => {
//     const img = new Image();
//     img.src = src;
//     return img;
//   }
// );

// const playerHeight = 100;
// const player = {
//   x: canvas.width / 2 - 50,
//   y: canvas.height - playerHeight - 95,
//   width: 200,
//   height: 200,
//   speed: 10,
//   projectiles: [],
// };

// let enemies = [];
// let enemyDirection = 1;
// let score = 0;

// const keys = {};

// function spawnEnemies() {
//   enemies = [];
//   const rows = 4;
//   const cols = 8;
//   const margin = 20;
//   const enemyWidth = 120;
//   const enemyHeight = 120;
//   const totalWidth = cols * (enemyWidth + margin) - margin;
//   const startX = (canvas.width - totalWidth) / 2;
//   const startY = 50;

//   for (let row = 0; row < rows; row++) {
//     for (let col = 0; col < cols; col++) {
//       enemies.push({
//         x: startX + col * (enemyWidth + margin),
//         y: startY + row * (enemyHeight + margin),
//         width: enemyWidth,
//         height: enemyHeight,
//         img: enemyImgs[(row * cols + col) % enemyImgs.length],
//         dx: 1,
//       });
//     }
//   }
// }

// function updateEnemies() {
//   let shouldReverse = false;

//   // Ajustar velocidad en función del número de enemigos restantes
//   const speedMultiplier = 1 + (30 - enemies.length) * 0.5; // Ajusta como quieras
//   const currentSpeed = baseEnemySpeed * speedMultiplier;

//   enemies.forEach((e) => {
//     e.x += currentSpeed * enemyDirection;
//     if (e.x + e.width >= canvas.width || e.x <= 0) {
//       shouldReverse = true;
//     }
//   });

//   if (shouldReverse) {
//     enemyDirection *= -1;
//     // enemies.forEach((e) => {
//     //   e.y += 20;
//     // });
//   }
// }

// function drawPlayer() {
//   ctx.drawImage(kefirImg, player.x, player.y, player.width, player.height);
// }

// function drawEnemies() {
//   enemies.forEach((e) => {
//     ctx.drawImage(e.img, e.x, e.y, e.width, e.height);
//   });
// }

// function drawProjectiles() {
//   player.projectiles.forEach((p) => {
//     ctx.drawImage(probioticImg, p.x, p.y, p.width, p.height);
//   });
// }

// function updateProjectiles() {
//   player.projectiles.forEach((p) => (p.y -= p.speed));
//   player.projectiles = player.projectiles.filter((p) => p.y > 0);
// }

// function checkCollisions() {
//   player.projectiles.forEach((p, i) => {
//     enemies.forEach((e, j) => {
//       if (
//         p.x < e.x + e.width &&
//         p.x + p.width > e.x &&
//         p.y < e.y + e.height &&
//         p.y + p.height > e.y
//       ) {
//         enemies.splice(j, 1);
//         player.projectiles.splice(i, 1);
//         score++;
//       }
//     });
//   });

//   if (enemies.length === 0) {
//     showVictoryPopup();
//   }
// }

// function drawScore() {
//   ctx.font = "24px Arial";
//   ctx.fillStyle = "white";
//   ctx.fillText("Score: " + score, canvas.width - 150, 30);
// }

// function restartGame() {
//   // Refresca toda la página
//   window.location.reload();
// }

// function showVictoryPopup() {
//   window.location.href = "nivel3-instrucciones.html";
// }

// function update() {
//   if (keys["ArrowLeft"] && player.x > 0) player.x -= player.speed;
//   if (keys["ArrowRight"] && player.x + player.width < canvas.width)
//     player.x += player.speed;

//   updateEnemies();
//   updateProjectiles();
//   checkCollisions();
// }

// function draw() {
//   ctx.clearRect(0, 0, canvas.width, canvas.height);
//   ctx.drawImage(backgroundImg, 0, 0, canvas.width, canvas.height);

//   ctx.fillStyle = "rgba(0, 0, 0, 0.4)"; // Ajusta el 0.4 según qué tan oscuro quieras
//   ctx.fillRect(0, 0, canvas.width, canvas.height);
//   drawPlayer();
//   drawEnemies();
//   drawProjectiles();
//   drawScore();
// }

// function loop() {
//   update();
//   draw();
//   requestAnimationFrame(loop);
// }

// document.addEventListener("keydown", (e) => {
//   keys[e.key] = true;
//   if (e.key === " " || e.key === "Spacebar") {
//     player.projectiles.push({
//       x: player.x + player.width / 2 - 25,
//       y: player.y,
//       width: 50,
//       height: 50,
//       speed: 7,
//     });
//   }
// });

// document.addEventListener("keyup", (e) => {
//   keys[e.key] = false;
// });

// spawnEnemies();
// loop();

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
let baseEnemySpeed = 1;

const backgroundImg = new Image();
backgroundImg.src = "nivel2-fondo.jpeg";

const kefirImg = new Image();
kefirImg.src = "kefir.png";

const probioticImg = new Image();
probioticImg.src = "probiotico.png";

const enemyImgs = ["salmonella.png", "ecoli.png", "clostridium.png"].map(
  (src) => {
    const img = new Image();
    img.src = src;
    return img;
  }
);

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

resizeCanvas();
window.addEventListener("resize", resizeCanvas);

// === Esperar a que TODAS las imágenes se carguen ===
function loadAllImages(callback) {
  const images = [backgroundImg, kefirImg, probioticImg, ...enemyImgs];
  let loaded = 0;
  images.forEach((img) => {
    img.onload = () => {
      loaded++;
      if (loaded === images.length) {
        callback(); // iniciar juego
      }
    };
  });
}

const playerHeight = 100;
const player = {
  x: canvas.width / 2 - 50,
  y: canvas.height - playerHeight - 95,
  width: 200,
  height: 200,
  speed: 10,
  projectiles: [],
};

let enemies = [];
let enemyDirection = 1;
let score = 0;
let keys = {};

function spawnEnemies() {
  enemies = [];
  const rows = 4;
  const cols = 8;
  const margin = 20;
  const enemyWidth = 120;
  const enemyHeight = 120;
  const totalWidth = cols * (enemyWidth + margin) - margin;
  const startX = (canvas.width - totalWidth) / 2;
  const startY = 50;

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      enemies.push({
        x: startX + col * (enemyWidth + margin),
        y: startY + row * (enemyHeight + margin),
        width: enemyWidth,
        height: enemyHeight,
        img: enemyImgs[(row * cols + col) % enemyImgs.length],
        dx: 1,
      });
    }
  }
}

function updateEnemies() {
  let shouldReverse = false;
  const speedMultiplier = 1 + (30 - enemies.length) * 0.5;
  const currentSpeed = baseEnemySpeed * speedMultiplier;

  enemies.forEach((e) => {
    e.x += currentSpeed * enemyDirection;
    if (e.x + e.width >= canvas.width || e.x <= 0) {
      shouldReverse = true;
    }
  });

  if (shouldReverse) {
    enemyDirection *= -1;
  }
}

function drawPlayer() {
  ctx.drawImage(kefirImg, player.x, player.y, player.width, player.height);
}

function drawEnemies() {
  enemies.forEach((e) => {
    ctx.drawImage(e.img, e.x, e.y, e.width, e.height);
  });
}

function drawProjectiles() {
  player.projectiles.forEach((p) => {
    ctx.drawImage(probioticImg, p.x, p.y, p.width, p.height);
  });
}

function updateProjectiles() {
  player.projectiles.forEach((p) => (p.y -= p.speed));
  player.projectiles = player.projectiles.filter((p) => p.y > 0);
}

function checkCollisions() {
  player.projectiles.forEach((p, i) => {
    enemies.forEach((e, j) => {
      if (
        p.x < e.x + e.width &&
        p.x + p.width > e.x &&
        p.y < e.y + e.height &&
        p.y + p.height > e.y
      ) {
        enemies.splice(j, 1);
        player.projectiles.splice(i, 1);
        score++;
      }
    });
  });

  if (enemies.length === 0) {
    clearInterval(countdownInterval);
    showVictoryPopup();
  }
}

function drawScore() {
  ctx.font = "24px Arial";
  ctx.fillStyle = "white";
  ctx.fillText("Score: " + score, canvas.width - 150, 30);
}

function drawTimer() {
  ctx.font = "24px Arial";
  ctx.fillStyle = "white";
  ctx.fillText("Tiempo: " + timeLeft + "s", 30, 30);
}

function showVictoryPopup() {
  window.location.href = "nivel3-instrucciones.html";
}

function update() {
  if (keys["ArrowLeft"] && player.x > 0) player.x -= player.speed;
  if (keys["ArrowRight"] && player.x + player.width < canvas.width)
    player.x += player.speed;

  updateEnemies();
  updateProjectiles();
  checkCollisions();
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(backgroundImg, 0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "rgba(0, 0, 0, 0.4)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  drawPlayer();
  drawEnemies();
  drawProjectiles();
  drawScore();
  drawTimer();
}

function loop() {
  update();
  draw();
  requestAnimationFrame(loop);
}

document.addEventListener("keydown", (e) => {
  keys[e.key] = true;
  if (e.key === " " || e.key === "Spacebar") {
    player.projectiles.push({
      x: player.x + player.width / 2 - 25,
      y: player.y,
      width: 50,
      height: 50,
      speed: 7,
    });
  }
});

document.addEventListener("keyup", (e) => {
  keys[e.key] = false;
});

let timeLeft = 10;
let countdownInterval;

function startGame() {
  spawnEnemies();
  loop();

  // Iniciar contador solo después de cargar todo
  countdownInterval = setInterval(() => {
    timeLeft--;
    if (timeLeft <= 0) {
      clearInterval(countdownInterval);
      window.location.href = "nivel2-perdiste.html";
    }
  }, 1000);
}

// Esperar a que todas las imágenes estén listas
loadAllImages(startGame);
