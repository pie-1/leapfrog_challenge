export class VehicleRenderer {
  static drawCar(ctx, x, y, rotation, color, size = 40) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rotation);
    ctx.scale(-1, 1);
    
    // Car body
    ctx.shadowColor = 'rgba(0,0,0,0.2)';
    ctx.shadowBlur = 10;
    ctx.shadowOffsetX = 2;
    ctx.shadowOffsetY = 4;
    
    // Main body
    ctx.fillStyle = color || '#FF6B6B';
    ctx.beginPath();
    ctx.roundRect(-size/2, -size/3, size, size * 0.6, 8);
    ctx.fill();
    
    // Roof
    ctx.fillStyle = color ? darkenColor(color, 20) : '#CC5555';
    ctx.beginPath();
    ctx.roundRect(-size/3, -size/2, size * 0.4, size * 0.4, 6);
    ctx.fill();
    
    // Windows
    ctx.fillStyle = 'rgba(100, 200, 255, 0.6)';
    ctx.beginPath();
    ctx.roundRect(-size/4, -size/3, size * 0.15, size * 0.25, 3);
    ctx.fill();
    ctx.beginPath();
    ctx.roundRect(size/8, -size/3, size * 0.15, size * 0.25, 3);
    ctx.fill();
    
    // Wheels
    ctx.shadowBlur = 0;
    ctx.fillStyle = '#222';
    ctx.beginPath();
    ctx.arc(-size/4, size/3.5, size/6, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(size/4, size/3.5, size/6, 0, Math.PI * 2);
    ctx.fill();
    
    // Headlights
    ctx.fillStyle = '#FFD700';
    ctx.beginPath();
    ctx.arc(size/2.5, -size/5, 4, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#FF6B6B';
    ctx.beginPath();
    ctx.arc(-size/2.5, -size/5, 4, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.restore();
  }

  static drawBike(ctx, x, y, rotation, color, size = 40) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rotation);
    ctx.scale(-1, 1);
    
    // Bike frame
    ctx.shadowColor = 'rgba(0,0,0,0.2)';
    ctx.shadowBlur = 10;
    ctx.shadowOffsetX = 2;
    ctx.shadowOffsetY = 4;
    
    ctx.strokeStyle = color || '#4ECDC4';
    ctx.lineWidth = 4;
    
    // Frame triangle
    ctx.beginPath();
    ctx.moveTo(-size/3, size/4);
    ctx.lineTo(0, -size/3);
    ctx.lineTo(size/3, size/4);
    ctx.stroke();
    
    // Seat
    ctx.fillStyle = '#333';
    ctx.fillRect(-size/4, -size/3 - 4, size/2, 6);
    
    // Handlebars
    ctx.strokeStyle = '#666';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(0, -size/3);
    ctx.lineTo(size/6, -size/2);
    ctx.moveTo(0, -size/3);
    ctx.lineTo(-size/6, -size/2);
    ctx.stroke();
    
    // Wheels
    ctx.shadowBlur = 0;
    ctx.strokeStyle = '#333';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(-size/3, size/4, size/5, 0, Math.PI * 2);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(size/3, size/4, size/5, 0, Math.PI * 2);
    ctx.stroke();
    
    ctx.restore();
  }

  static drawPlane(ctx, x, y, rotation, color, size = 40) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rotation);
    ctx.scale(-1, 1);
    
    ctx.shadowColor = 'rgba(0,0,0,0.2)';
    ctx.shadowBlur = 10;
    ctx.shadowOffsetX = 2;
    ctx.shadowOffsetY = 4;
    
    // Fuselage
    ctx.fillStyle = color || '#45B7D1';
    ctx.beginPath();
    ctx.ellipse(0, 0, size/1.5, size/5, 0, 0, Math.PI * 2);
    ctx.fill();
    
    // Wings
    ctx.fillStyle = color ? darkenColor(color, 10) : '#3A9BB5';
    ctx.fillRect(-size/2, -size/4, size, size/8);
    
    // Tail
    ctx.fillRect(size/2.5, -size/3, size/6, size/1.5);
    
    // Cockpit
    ctx.fillStyle = 'rgba(100, 200, 255, 0.5)';
    ctx.beginPath();
    ctx.ellipse(-size/6, -size/5, size/6, size/7, 0, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.restore();
  }

  static drawHelicopter(ctx, x, y, rotation, color, size = 40) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rotation);
    ctx.scale(-1, 1);
    
    ctx.shadowColor = 'rgba(0,0,0,0.2)';
    ctx.shadowBlur = 10;
    ctx.shadowOffsetX = 2;
    ctx.shadowOffsetY = 4;
    
    // Body
    ctx.fillStyle = color || '#FFA07A';
    ctx.beginPath();
    ctx.ellipse(0, 0, size/1.8, size/4, 0, 0, Math.PI * 2);
    ctx.fill();
    
    // Cockpit
    ctx.fillStyle = 'rgba(100, 200, 255, 0.5)';
    ctx.beginPath();
    ctx.ellipse(-size/4, -size/6, size/5, size/7, 0, 0, Math.PI * 2);
    ctx.fill();
    
    // Tail boom
    ctx.fillStyle = color ? darkenColor(color, 15) : '#E88A6A';
    ctx.fillRect(size/2, -size/12, size/2, size/6);
    
    // Main rotor
    ctx.shadowBlur = 0;
    ctx.strokeStyle = '#666';
    ctx.lineWidth = 2;
    const rotorAngle = Date.now() / 50;
    for (let i = 0; i < 4; i++) {
      const angle = (i / 4) * Math.PI * 2 + rotorAngle;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(Math.cos(angle) * size * 0.8, Math.sin(angle) * size * 0.8);
      ctx.stroke();
    }
    
    // Tail rotor
    const tailAngle = Date.now() / 30;
    ctx.strokeStyle = '#888';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(size/1.2, 0);
    ctx.lineTo(size/1.2 + Math.cos(tailAngle) * size/4, Math.sin(tailAngle) * size/4);
    ctx.stroke();
    
    ctx.restore();
  }
}

// Helper function to darken color
function darkenColor(hex, amount) {
  let r = parseInt(hex.slice(1, 3), 16);
  let g = parseInt(hex.slice(3, 5), 16);
  let b = parseInt(hex.slice(5, 7), 16);
  
  r = Math.max(0, r - amount);
  g = Math.max(0, g - amount);
  b = Math.max(0, b - amount);
  
  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
}