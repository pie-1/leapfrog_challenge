import { useEffect, useState, useRef } from 'react';
import io from 'socket.io-client';

export const useSocket = (roomId = 'default') => {
  const [shapes, setShapes] = useState([]);
  const [isConnected, setIsConnected] = useState(false);
  const socketRef = useRef(null);

  useEffect(() => {
    socketRef.current = io('http://localhost:3001');

    socketRef.current.on('connect', () => {
      setIsConnected(true);
      socketRef.current.emit('join-room', roomId);
    });

    socketRef.current.on('init-shapes', (initialShapes) => {
      setShapes(initialShapes);
    });

    socketRef.current.on('shape-added', (shape) => {
      setShapes(prev => [...prev, shape]);
    });

    socketRef.current.on('shape-updated', ({ shapeId, updates }) => {
      setShapes(prev =>
        prev.map(s => s.id === shapeId ? { ...s, ...updates } : s)
      );
    });

    socketRef.current.on('shape-deleted', (shapeId) => {
      setShapes(prev => prev.filter(s => s.id !== shapeId));
    });

    socketRef.current.on('canvas-cleared', () => {
      setShapes([]);
    });

    socketRef.current.on('disconnect', () => {
      setIsConnected(false);
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, [roomId]);

  const addShape = (shape) => {
    setShapes(prev => [...prev, shape]);
    socketRef.current.emit('add-shape', { roomId, shape });
  };

  const updateShape = (shapeId, updates) => {
    setShapes(prev =>
      prev.map(s => s.id === shapeId ? { ...s, ...updates } : s)
    );
    socketRef.current.emit('update-shape', { roomId, shapeId, updates });
  };

  const deleteShape = (shapeId) => {
    setShapes(prev => prev.filter(s => s.id !== shapeId));
    socketRef.current.emit('delete-shape', { roomId, shapeId });
  };

  const clearCanvas = () => {
    setShapes([]);
    socketRef.current.emit('clear-canvas', { roomId });
  };

  return {
    shapes,
    isConnected,
    addShape,
    updateShape,
    deleteShape,
    clearCanvas
  };
};