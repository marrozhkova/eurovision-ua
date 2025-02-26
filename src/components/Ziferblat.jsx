import React, { useState } from "react";
const Ziferblat = () => {
  const [showVideo, setShowVideo] = useState(false);
  return (
    <div className="ziferblat page-transition">
      <h1>Ziferblat 2025</h1>
      <div className="youtube-imitate">
        {showVideo ? (
          <iframe
            className="video"
            src="https://www.youtube.com/embed/Dv4Zp_FG0qg"
          ></iframe>
        ) : (
          <button onClick={() => setShowVideo(true)} className="play"></button>
        )}
      </div>
    </div>
  );
};

export default Ziferblat;
