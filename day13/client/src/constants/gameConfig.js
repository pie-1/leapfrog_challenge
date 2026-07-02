export const GAME_CONFIG = {
  GRAVITY: 0.25,
  JUMP_FORCE: -5.2,
  PIPE_WIDTH: 48,
  PIPE_GAP: 140,
  PIPE_SPEED: 2.2,
  PIPE_SPAWN_INTERVAL: 110,
  GROUND_Y: 440,
  PLAYER_RADIUS: 18,
  MAX_LIVES: 3, // Added max lives
  VEHICLES: {
    car: { emoji: '🚗', label: 'Car', speed: 1, rotate: true },
    bike: { emoji: '🏍️', label: 'Bike', speed: 1.1, rotate: true },
    plane: { emoji: '✈️', label: 'Plane', speed: 0.9, rotate: false },
    helicopter: { emoji: '🚁', label: 'Helicopter', speed: 1, rotate: false }
  }
};