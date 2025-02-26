import React, { useState, useEffect } from "react";
import heartRain from "../js//heartRain";

const Verka = () => {
  const [showVideo, setShowVideo] = useState(false);
  useEffect(() => {
    heartRain();
  }, []);

  return (
    <div className="verka page-transition">
      <h1>Verka Serduchka 2007</h1>
      <div className="absolut">
        <div className="heart-container">
          <div className="heart"></div>
        </div>
      </div>
      <div className="youtube-imitate">
        {showVideo ? (
          <iframe
            className="video"
            src="https://www.youtube.com/embed/hfjHJneVonE"
            title="Verka Serduchka - Dancing Lasha Tumbai"
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        ) : (
          <button onClick={() => setShowVideo(true)} className="play"></button>
        )}
      </div>
    </div>
  );
};

export default Verka;
