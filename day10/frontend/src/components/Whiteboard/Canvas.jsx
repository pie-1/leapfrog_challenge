import { forwardRef } from 'react';

const Canvas = forwardRef(({ startDrawing, draw, stopDrawing }, ref) => {
  return (
    <div className="p-4 bg-[#fcfbf9]">
      <canvas
        ref={ref}
        width={900}
        height={550}
        className="w-full h-auto rounded-lg shadow-inner bg-white cursor-crosshair"
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
      />
    </div>
  );
});

export default Canvas;