import { GAME_CONFIG } from '../../constants/gameConfig';

export class PipeManager {
  constructor() {
    this.pipes = [];
    this.counter = 0;
    this.spawnInterval = GAME_CONFIG.PIPE_SPAWN_INTERVAL;
  }

  reset() {
    this.pipes = [];
    this.counter = 0;
  }

  spawnPipe(score) {
    // Dynamic gap based on score
    const minGap = GAME_CONFIG.PIPE_GAP_MIN;
    const maxGap = GAME_CONFIG.PIPE_GAP_MAX;
    const difficultyFactor = Math.min(score / 50, 1);
    const gapSize = Math.max(
      minGap,
      maxGap - (difficultyFactor * (maxGap - minGap) * 0.5)
    );
    
    const minGapY = 60;
    const maxGapY = GAME_CONFIG.GROUND_Y - gapSize - 50;
    const gapY = Math.floor(Math.random() * (maxGapY - minGapY + 1)) + minGapY;
    const safeGapY = Math.min(Math.max(gapY, minGapY), maxGapY);
    
    const pipe = {
      x: 700,
      topHeight: safeGapY,
      gap: gapSize,
      width: GAME_CONFIG.PIPE_WIDTH,
      scored: false
    };
    
    this.pipes.push(pipe);
    return pipe;
  }

  update(speedMultiplier) {
    const speed = GAME_CONFIG.PIPE_SPEED * speedMultiplier;
    this.pipes = this.pipes
      .map(pipe => ({ ...pipe, x: pipe.x - speed }))
      .filter(pipe => pipe.x + pipe.width > -50);
    
    // Check scoring
    const scoredPipes = this.pipes.filter(p => p.scored === false && p.x + p.width < 120);
    scoredPipes.forEach(p => p.scored = true);
    
    return scoredPipes.length;
  }

  shouldSpawn(score) {
    const spawnInterval = Math.max(55, GAME_CONFIG.PIPE_SPAWN_INTERVAL - score * 1.2);
    this.counter++;
    if (this.counter >= spawnInterval) {
      this.counter = 0;
      return true;
    }
    return false;
  }
}