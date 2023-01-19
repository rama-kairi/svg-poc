import { useEffect, useRef, useState } from 'react';
import './App.css';

function App() {
  // const [count, setCount] = useState(0);
  // use ref to get the svg element
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Set the canvas size to the size of the viewport
  const setCanvasSize = () => {
    if (canvasRef.current) {
      canvasRef.current.width = window.innerWidth;
      canvasRef.current.height = window.innerHeight;
    }
  };

  // Make the canvas color red
  const draw = () => {
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d');
      if (ctx) {
        ctx.fillStyle = 'red';
        ctx.fillRect(
          0,
          0,
          canvasRef.current.width,
          canvasRef.current.height
        );
      }
    }
  };

  // Create a Box of 300x300 pixels in the center of the canvas with a black background and make it draggable
  const createDraggableBox = () => {
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d');
      if (ctx) {
        const box = {
          x: canvasRef.current.width / 2 - 150,
          y: canvasRef.current.height / 2 - 150,
          width: 300,
          height: 300,
        };

        ctx.fillStyle = 'black';
        ctx.fillRect(box.x, box.y, box.width, box.height);

        let isDragging = false;
        let offset = { x: 0, y: 0 };

        const mouseDownHandler = (e: MouseEvent) => {
          if (
            e.clientX > box.x &&
            e.clientX < box.x + box.width &&
            e.clientY > box.y &&
            e.clientY < box.y + box.height
          ) {
            isDragging = true;
            offset.x = box.x - e.clientX;
            offset.y = box.y - e.clientY;
          }
        };

        const mouseMoveHandler = (e: MouseEvent) => {
          if (isDragging) {
            box.x = e.clientX + offset.x;
            box.y = e.clientY + offset.y;
            ctx.clearRect(
              0,
              0,
              canvasRef?.current?.width || 0,
              canvasRef?.current?.height || 0
            );
            ctx.fillStyle = 'black';
            ctx.fillRect(box.x, box.y, box.width, box.height);
          }
        };

        const mouseUpHandler = () => {
          isDragging = false;
        };

        canvasRef.current.addEventListener(
          'mousedown',
          mouseDownHandler
        );
        canvasRef.current.addEventListener(
          'mousemove',
          mouseMoveHandler
        );
        canvasRef.current.addEventListener('mouseup', mouseUpHandler);
      }
    }
  };

  // export the canvas as a png
  const exportCanvas = () => {
    if (canvasRef.current) {
      const link = document.createElement('a');
      link.download = 'canvas.png';
      link.href = canvasRef.current.toDataURL();
      link.click();
    }
  };

  // Set the canvas size on mount
  useEffect(() => {
    setCanvasSize();
    draw();
    createDraggableBox();
  }, []);

  return <canvas ref={canvasRef}></canvas>;
}

export default App;
