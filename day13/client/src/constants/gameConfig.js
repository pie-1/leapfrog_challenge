export const GAME_CONFIG = {
  GRAVITY: 0.25,
  JUMP_FORCE: -5.2,
  PIPE_WIDTH: 52,
  PIPE_GAP: 150, // Base gap
  PIPE_GAP_MIN: 140, // Minimum gap (never go below this)
  PIPE_GAP_MAX: 180, // Maximum gap (for easier difficulty)
  PIPE_SPEED: 2.2,
  PIPE_SPAWN_INTERVAL: 100,
  GROUND_Y: 440,
  PLAYER_RADIUS: 18,
  MAX_LIVES: 3,
  VEHICLES: {
    car: { emoji: '🚗', label: 'Car', speed: 1, rotate: true },
    bike: { emoji: '🏍️', label: 'Bike', speed: 1.1, rotate: true },
    plane: { emoji: '✈️', label: 'Plane', speed: 0.9, rotate: false },
    helicopter: { emoji: '🚁', label: 'Helicopter', speed: 1, rotate: false }
  },
  MULTIPLAYER: {
    PLAYER_OFFSET: 80,
    MAX_PLAYERS: 2
  }
};