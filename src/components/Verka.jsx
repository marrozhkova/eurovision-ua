import React, { useState } from "react";

const Verka = () => {
  const [showVideo, setShowVideo] = useState(false);

  return (
    <div className="verka page-transition">
      <h1>Verka Serduchka 2007</h1>
      <div className="youtube-imitate">
        {showVideo ? (
          <iframe
            className="video"
            src="https://www.youtube.com/embed/hfjHJneVonE"
          ></iframe>
        ) : (
          <button onClick={() => setShowVideo(true)} className="play"></button>
        )}
      </div>
    </div>
  );
};

export default Verka;
