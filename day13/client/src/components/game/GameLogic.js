import { GAME_CONFIG } from '../../constants/gameConfig';

export class GameLogic {
  constructor() {
    this.bird = {
      x: 120,
      y: 250,
      radius: GAME_CONFIG.PLAYER_RADIUS,
      vy: 0,
      rotation: 0
    };
    this.pipes = [];
    this.score = 0;
    this.gameOver = false;
    this.gameStarted = false;
    this.lives = GAME_CONFIG.MAX_LIVES;
    this.isInvincible = false;
    this.combo = 0;
    this.speedMultiplier = 1;
    this.frameCounter = 0;
  }

  reset() {
    this.bird = {
      x: 120,
      y: 250,
      radius: GAME_CONFIG.PLAYER_RADIUS,
      vy: 0,
      rotation: 0
    };
    this.pipes = [];
    this.score = 0;
    this.gameOver = false;
    this.gameStarted = false;
    this.lives = GAME_CONFIG.MAX_LIVES;
    this.isInvincible = false;
    this.combo = 0;
    this.speedMultiplier = 1;
    this.frameCounter = 0;
  }

  flap() {
    if (this.gameOver) return false;
    this.bird.vy = GAME_CONFIG.JUMP_FORCE;
    return true;
  }

  update() {
    if (this.gameOver || !this.gameStarted) return;

    // Update speed
    this.speedMultiplier = Math.min(1 + (this.score * 0.015), 3.5);

    // Update bird physics
    const gravity = GAME_CONFIG.GRAVITY * (1 + this.score * 0.003);
    this.bird.vy += gravity;
    this.bird.y += this.bird.vy;
    this.bird.rotation = Math.min(Math.max(this.bird.vy * 0.06, -0.6), 0.8);

    // Update pipes
    this.updatePipes();

    this.frameCounter++;

    // Collision detection
    if (!this.isInvincible) {
      const hasCollision = this.checkCollisions();
      if (hasCollision) {
        this.loseLife();
      }
    }
  }

  updatePipes() {
    const currentSpeed = GAME_CONFIG.PIPE_SPEED * this.speedMultiplier;
    
    // Move pipes
    this.pipes = this.pipes
      .map(pipe => ({ ...pipe, x: pipe.x - currentSpeed }))
      .filter(pipe => pipe.x + pipe.width > -50);

    // Check scoring
    this.pipes.forEach(pipe => {
      if (!pipe.scored && pipe.x + pipe.width < this.bird.x) {
        pipe.scored = true;
        this.score++;
        this.combo++;
        return true; // Score event
      }
    });
  }

  loseLife() {
    if (this.isInvincible) return;

    this.lives--;
    if (this.lives <= 0) {
      this.gameOver = true;
      return;
    }

    this.isInvincible = true;
    this.bird.y = 250;
    this.bird.vy = 0;
    this.pipes = [];
    
    setTimeout(() => {
      this.isInvincible = false;
    }, 2000);
  }

  checkCollisions() {
    // Ground collision
    if (this.bird.y + this.bird.radius > GAME_CONFIG.GROUND_Y) return true;
    
    // Ceiling collision
    if (this.bird.y - this.bird.radius < 0) return true;
    
    // Pipe collisions
    for (const pipe of this.pipes) {
      if (this.rectCircleCollision(
        this.bird.x, this.bird.y, this.bird.radius,
        pipe.x, 0, pipe.width, pipe.topHeight
      )) return true;
      
      if (this.rectCircleCollision(
        this.bird.x, this.bird.y, this.bird.radius,
        pipe.x, pipe.topHeight + pipe.gap, 
        pipe.width, GAME_CONFIG.GROUND_Y - (pipe.topHeight + pipe.gap)
      )) return true;
    }
    
    return false;
  }

  rectCircleCollision(cx, cy, radius, rx, ry, rw, rh) {
    const nearestX = Math.max(rx, Math.min(cx, rx + rw));
    const nearestY = Math.max(ry, Math.min(cy, ry + rh));
    const dx = cx - nearestX;
    const dy = cy - nearestY;
    return (dx * dx + dy * dy) < (radius * radius);
  }
}