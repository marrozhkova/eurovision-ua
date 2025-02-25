import { useEffect, useRef } from "react";
import { initCaterpillar } from "./caterpillar";
function Eurovision() {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (canvasRef.current) {
      const cleanup = initCaterpillar(canvasRef.current);
      return () => {
        if (cleanup) cleanup();
      };
    }
  }, []);

  return (
    <>
      <div className="eurovision">
        <canvas ref={canvasRef} id="world"></canvas>
      </div>
      <div className="main-img"></div>
    </>
  );
}

export default Eurovision;
