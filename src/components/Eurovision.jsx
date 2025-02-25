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
      <div className="main-img">
        {/* <img
          src="https://mdz-moskau.eu/wp-content/uploads/2019/02/wsi-imageoptim-ukraine-vidbir-2019.jpg"
          alt="Eurovision"
        /> */}
      </div>
    </>
  );
}

export default Eurovision;
