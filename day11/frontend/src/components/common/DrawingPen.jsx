import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const DrawingPen = ({ className = '' }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationId;
    let progress = 0;
    const speed = 0.006;

    // Rainbow wave path
    const path = [
      { x: 40, y: 70 }, { x: 60, y: 40 }, { x: 80, y: 70 },
      { x: 100, y: 40 }, { x: 120, y: 70 }, { x: 140, y: 40 },
      { x: 160, y: 70 }, { x: 180, y: 40 }, { x: 200, y: 70 },
      { x: 220, y: 40 }, { x: 240, y: 70 }, { x: 260, y: 40 },
      { x: 280, y: 70 }, { x: 300, y: 40 }, { x: 320, y: 70 },
      { x: 340, y: 40 }, { x: 360, y: 70 }, { x: 380, y: 40 },
      { x: 400, y: 70 }, { x: 420, y: 40 }, { x: 440, y: 70 },
      { x: 460, y: 40 }, { x: 480, y: 70 }, { x: 500, y: 40 },
      { x: 520, y: 70 }, { x: 540, y: 40 }, { x: 560, y: 70 },
    ];

    const colors = ['#FF6B6B', '#FF9F43', '#FECA57', '#48DBFB', '#0ABDE3', '#10AC84', '#5F27CD', '#FF6FB7'];

    const totalPoints = path.length;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const pointsToDraw = Math.floor(progress * totalPoints);

      for (let i = 0; i < pointsToDraw && i < totalPoints - 1; i++) {
        const p1 = path[i];
        const p2 = path[i + 1];
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.strokeStyle = colors[i % colors.length];
        ctx.lineWidth = 4;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.shadowBlur = 6;
        ctx.shadowColor = colors[i % colors.length] + '40';
        ctx.stroke();
      }

      if (pointsToDraw < totalPoints && pointsToDraw > 0) {
        const currentPoint = path[pointsToDraw - 1];
        ctx.save();
        ctx.font = '36px sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.shadowBlur = 20;
        ctx.shadowColor = 'rgba(255, 107, 107, 0.3)';
        ctx.fillText('🖍️', currentPoint.x, currentPoint.y);
        ctx.restore();
      } else if (pointsToDraw >= totalPoints) {
        progress = 0;
      }

      progress += speed;
      animationId = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(animationId);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
      className={`relative ${className}`}
    >
      <canvas
        ref={canvasRef}
        width={600}
        height={140}
        className="w-full max-w-2xl mx-auto rounded-xl bg-gradient-to-r from-pastel-pink/10 via-white/50 to-pastel-sky/10 shadow-inner"
      />
      <p className="text-center text-xs text-gray-400 mt-2 font-medium">
        🖍️ Watch the crayon draw a colorful rainbow!
      </p>
    </motion.div>
  );
};

export default DrawingPen;