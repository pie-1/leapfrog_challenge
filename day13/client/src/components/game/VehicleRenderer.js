// src/components/game/VehicleRenderer.js

export class VehicleRenderer {
  // Draw detailed Car
  static drawCar(ctx, x, y, rotation, color, size = 40, isPlayer2 = false) {
    const s = size / 40;
    
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rotation || 0);
    
    // Shadow
    ctx.shadowColor = 'rgba(0,0,0,0.3)';
    ctx.shadowBlur = 15;
    ctx.shadowOffsetX = 3;
    ctx.shadowOffsetY = 5;
    
    const bodyColor = color || '#FF6B6B';
    const darkColor = this.darkenColor(bodyColor, 30);
    
    // Main body
    const grad = ctx.createLinearGradient(-20*s, 0, 20*s, 0);
    grad.addColorStop(0, darkColor);
    grad.addColorStop(0.3, bodyColor);
    grad.addColorStop(0.7, bodyColor);
    grad.addColorStop(1, darkColor);
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.roundRect(-18*s, -8*s, 36*s, 16*s, 6*s);
    ctx.fill();
    
    // Roof
    ctx.fillStyle = darkColor;
    ctx.beginPath();
    ctx.roundRect(-10*s, -14*s, 20*s, 8*s, 4*s);
    ctx.fill();
    
    // Windows
    ctx.fillStyle = 'rgba(100, 200, 255, 0.4)';
    ctx.beginPath();
    ctx.roundRect(-8*s, -12*s, 6*s, 5*s, 2*s);
    ctx.fill();
    ctx.fillStyle = 'rgba(100, 200, 255, 0.3)';
    ctx.beginPath();
    ctx.roundRect(2*s, -12*s, 6*s, 5*s, 2*s);
    ctx.fill();
    ctx.fillStyle = 'rgba(100, 200, 255, 0.25)';
    ctx.fillRect(-8*s, -10*s, 4*s, 2*s);
    ctx.fillRect(4*s, -10*s, 4*s, 2*s);
    
    // Headlights
    ctx.shadowBlur = 0;
    ctx.fillStyle = '#FFE082';
    ctx.shadowColor = '#FFD54F';
    ctx.shadowBlur = 10;
    ctx.beginPath();
    ctx.arc(18*s, -4*s, 4*s, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;
    
    // Taillights
    ctx.fillStyle = '#FF1744';
    ctx.shadowColor = '#FF1744';
    ctx.shadowBlur = 8;
    ctx.beginPath();
    ctx.arc(-18*s, -4*s, 3*s, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;
    
    // Wheels
    ctx.shadowColor = 'rgba(0,0,0,0.2)';
    ctx.shadowBlur = 5;
    ctx.shadowOffsetY = 3;
    
    // Front wheel
    ctx.fillStyle = '#1a1a1a';
    ctx.beginPath();
    ctx.arc(-12*s, 10*s, 6*s, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#333';
    ctx.beginPath();
    ctx.arc(-12*s, 10*s, 4*s, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#555';
    ctx.beginPath();
    ctx.arc(-12*s, 10*s, 2*s, 0, Math.PI * 2);
    ctx.fill();
    
    // Rear wheel
    ctx.fillStyle = '#1a1a1a';
    ctx.beginPath();
    ctx.arc(12*s, 10*s, 6*s, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#333';
    ctx.beginPath();
    ctx.arc(12*s, 10*s, 4*s, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#555';
    ctx.beginPath();
    ctx.arc(12*s, 10*s, 2*s, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.restore();
  }

  // Draw detailed Bike
  static drawBike(ctx, x, y, rotation, color, size = 40, isPlayer2 = false) {
    const s = size / 40;
    
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rotation || 0);
    
    // Shadow
    ctx.shadowColor = 'rgba(0,0,0,0.3)';
    ctx.shadowBlur = 15;
    ctx.shadowOffsetX = 3;
    ctx.shadowOffsetY = 5;
    
    const bikeColor = color || '#4ECDC4';
    
    // Frame
    ctx.strokeStyle = bikeColor;
    ctx.lineWidth = 3*s;
    ctx.shadowBlur = 5;
    
    // Main frame triangle
    ctx.beginPath();
    ctx.moveTo(-12*s, 8*s);
    ctx.lineTo(0, -14*s);
    ctx.lineTo(12*s, 8*s);
    ctx.stroke();
    
    // Seat post
    ctx.beginPath();
    ctx.moveTo(-8*s, -6*s);
    ctx.lineTo(-8*s, -2*s);
    ctx.stroke();
    
    // Seat
    ctx.fillStyle = '#2d2d2d';
    ctx.shadowBlur = 0;
    ctx.fillRect(-10*s, -8*s, 6*s, 3*s);
    
    // Handlebars
    ctx.strokeStyle = '#666';
    ctx.lineWidth = 2*s;
    ctx.shadowBlur = 5;
    ctx.beginPath();
    ctx.moveTo(0, -14*s);
    ctx.lineTo(8*s, -18*s);
    ctx.moveTo(0, -14*s);
    ctx.lineTo(-2*s, -18*s);
    ctx.stroke();
    
    // Handlebar grips
    ctx.fillStyle = '#2d2d2d';
    ctx.shadowBlur = 0;
    ctx.fillRect(6*s, -19*s, 4*s, 2*s);
    ctx.fillRect(-4*s, -19*s, 4*s, 2*s);
    
    // Wheels
    ctx.shadowColor = 'rgba(0,0,0,0.2)';
    ctx.shadowBlur = 8;
    ctx.shadowOffsetY = 3;
    
    // Front wheel
    ctx.strokeStyle = '#1a1a1a';
    ctx.lineWidth = 3*s;
    ctx.beginPath();
    ctx.arc(-12*s, 8*s, 8*s, 0, Math.PI * 2);
    ctx.stroke();
    // Spokes
    ctx.strokeStyle = '#444';
    ctx.lineWidth = 0.5*s;
    for (let i = 0; i < 8; i++) {
      const angle = (i / 8) * Math.PI * 2;
      ctx.beginPath();
      ctx.moveTo(-12*s, 8*s);
      ctx.lineTo(-12*s + Math.cos(angle) * 8*s, 8*s + Math.sin(angle) * 8*s);
      ctx.stroke();
    }
    // Hub
    ctx.fillStyle = '#555';
    ctx.beginPath();
    ctx.arc(-12*s, 8*s, 2*s, 0, Math.PI * 2);
    ctx.fill();
    
    // Rear wheel
    ctx.strokeStyle = '#1a1a1a';
    ctx.lineWidth = 3*s;
    ctx.beginPath();
    ctx.arc(12*s, 8*s, 8*s, 0, Math.PI * 2);
    ctx.stroke();
    // Spokes
    ctx.strokeStyle = '#444';
    ctx.lineWidth = 0.5*s;
    for (let i = 0; i < 8; i++) {
      const angle = (i / 8) * Math.PI * 2;
      ctx.beginPath();
      ctx.moveTo(12*s, 8*s);
      ctx.lineTo(12*s + Math.cos(angle) * 8*s, 8*s + Math.sin(angle) * 8*s);
      ctx.stroke();
    }
    // Hub
    ctx.fillStyle = '#555';
    ctx.beginPath();
    ctx.arc(12*s, 8*s, 2*s, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.restore();
  }

  // Draw detailed Airplane
  static drawPlane(ctx, x, y, rotation, color, size = 40, isPlayer2 = false) {
    const s = size / 40;
    
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rotation || 0);
    
    // Shadow
    ctx.shadowColor = 'rgba(0,0,0,0.3)';
    ctx.shadowBlur = 15;
    ctx.shadowOffsetX = 3;
    ctx.shadowOffsetY = 5;
    
    const planeColor = color || '#45B7D1';
    const darkColor = this.darkenColor(planeColor, 30);
    
    // Fuselage
    const grad = ctx.createLinearGradient(-20*s, 0, 20*s, 0);
    grad.addColorStop(0, darkColor);
    grad.addColorStop(0.3, planeColor);
    grad.addColorStop(0.7, planeColor);
    grad.addColorStop(1, darkColor);
    ctx.fillStyle = grad;
    ctx.shadowBlur = 10;
    ctx.beginPath();
    ctx.ellipse(0, 0, 20*s, 6*s, 0, 0, Math.PI * 2);
    ctx.fill();
    
    // Wings
    ctx.shadowBlur = 8;
    ctx.fillStyle = planeColor;
    ctx.beginPath();
    ctx.roundRect(-16*s, -12*s, 32*s, 4*s, 2*s);
    ctx.fill();
    ctx.fillStyle = 'rgba(255,255,255,0.1)';
    ctx.fillRect(-14*s, -11*s, 28*s, 1*s);
    
    // Tail
    ctx.fillStyle = darkColor;
    ctx.beginPath();
    ctx.roundRect(16*s, -14*s, 4*s, 12*s, 2*s);
    ctx.fill();
    ctx.fillStyle = planeColor;
    ctx.beginPath();
    ctx.roundRect(14*s, -10*s, 8*s, 3*s, 1.5*s);
    ctx.fill();
    ctx.beginPath();
    ctx.roundRect(14*s, 7*s, 8*s, 3*s, 1.5*s);
    ctx.fill();
    
    // Cockpit
    ctx.shadowBlur = 0;
    ctx.fillStyle = 'rgba(100, 200, 255, 0.5)';
    ctx.beginPath();
    ctx.ellipse(-8*s, -2*s, 6*s, 4*s, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = 'rgba(255,255,255,0.2)';
    ctx.beginPath();
    ctx.ellipse(-8*s, -3*s, 4*s, 2*s, -0.3, 0, Math.PI * 2);
    ctx.fill();
    
    // Engine
    ctx.fillStyle = '#666';
    ctx.shadowBlur = 5;
    ctx.beginPath();
    ctx.ellipse(-20*s, 0, 4*s, 3*s, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#888';
    ctx.beginPath();
    ctx.ellipse(-22*s, 0, 2*s, 1.5*s, 0, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.restore();
  }

  // Draw detailed Helicopter
  static drawHelicopter(ctx, x, y, rotation, color, size = 40, isPlayer2 = false, frameCounter = 0) {
    const s = size / 40;
    
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rotation || 0);
    
    // Shadow
    ctx.shadowColor = 'rgba(0,0,0,0.3)';
    ctx.shadowBlur = 15;
    ctx.shadowOffsetX = 3;
    ctx.shadowOffsetY = 5;
    
    const heliColor = color || '#FFA07A';
    const darkColor = this.darkenColor(heliColor, 30);
    
    // Main body
    const grad = ctx.createLinearGradient(-16*s, 0, 16*s, 0);
    grad.addColorStop(0, darkColor);
    grad.addColorStop(0.3, heliColor);
    grad.addColorStop(0.7, heliColor);
    grad.addColorStop(1, darkColor);
    ctx.fillStyle = grad;
    ctx.shadowBlur = 10;
    ctx.beginPath();
    ctx.roundRect(-16*s, -6*s, 32*s, 12*s, 5*s);
    ctx.fill();
    
    // Cockpit
    ctx.shadowBlur = 5;
    ctx.fillStyle = 'rgba(100, 200, 255, 0.4)';
    ctx.beginPath();
    ctx.roundRect(-12*s, -8*s, 8*s, 6*s, 3*s);
    ctx.fill();
    
    // Tail boom
    ctx.fillStyle = heliColor;
    ctx.shadowBlur = 5;
    ctx.beginPath();
    ctx.roundRect(16*s, -4*s, 14*s, 8*s, 3*s);
    ctx.fill();
    
    // Main rotor (animated)
    const rotorAngle = (frameCounter || 0) * 0.1;
    ctx.strokeStyle = '#555';
    ctx.lineWidth = 3*s;
    ctx.shadowColor = 'rgba(0,0,0,0.1)';
    ctx.shadowBlur = 5;
    for (let i = 0; i < 4; i++) {
      const angle = (i / 4) * Math.PI * 2 + rotorAngle;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(Math.cos(angle) * 22*s, Math.sin(angle) * 22*s);
      ctx.stroke();
    }
    
    // Rotor hub
    ctx.fillStyle = '#444';
    ctx.shadowBlur = 0;
    ctx.beginPath();
    ctx.arc(0, 0, 4*s, 0, Math.PI * 2);
    ctx.fill();
    
    // Skids
    ctx.strokeStyle = '#666';
    ctx.lineWidth = 2*s;
    ctx.shadowColor = 'rgba(0,0,0,0.2)';
    ctx.shadowBlur = 5;
    ctx.shadowOffsetY = 3;
    ctx.beginPath();
    ctx.moveTo(-12*s, 8*s);
    ctx.quadraticCurveTo(-6*s, 14*s, 12*s, 8*s);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(-10*s, 8*s);
    ctx.quadraticCurveTo(-4*s, 13*s, 10*s, 8*s);
    ctx.stroke();
    
    ctx.restore();
  }

  // Helper methods
  static darkenColor(hex, amount) {
    if (!hex) return '#666';
    let r = parseInt(hex.slice(1, 3), 16);
    let g = parseInt(hex.slice(3, 5), 16);
    let b = parseInt(hex.slice(5, 7), 16);
    r = Math.max(0, r - amount);
    g = Math.max(0, g - amount);
    b = Math.max(0, b - amount);
    return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
  }

  static lightenColor(hex, amount) {
    if (!hex) return '#999';
    let r = parseInt(hex.slice(1, 3), 16);
    let g = parseInt(hex.slice(3, 5), 16);
    let b = parseInt(hex.slice(5, 7), 16);
    r = Math.min(255, r + amount);
    g = Math.min(255, g + amount);
    b = Math.min(255, b + amount);
    return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
  }
}

// Polyfill for roundRect
if (!CanvasRenderingContext2D.prototype.roundRect) {
  CanvasRenderingContext2D.prototype.roundRect = function(x, y, w, h, r) {
    if (r > w/2) r = w/2;
    if (r > h/2) r = h/2;
    this.moveTo(x + r, y);
    this.lineTo(x + w - r, y);
    this.quadraticCurveTo(x + w, y, x + w, y + r);
    this.lineTo(x + w, y + h - r);
    this.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    this.lineTo(x + r, y + h);
    this.quadraticCurveTo(x, y + h, x, y + h - r);
    this.lineTo(x, y + r);
    this.quadraticCurveTo(x, y, x + r, y);
    this.closePath();
    return this;
  };
}

export default VehicleRenderer;