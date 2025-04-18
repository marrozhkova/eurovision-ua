import confetti from "../js/confetti";
import { useEffect, useState } from "react";
const Jamala = () => {
  useEffect(() => {
    confetti.start(3000);
    return () => confetti.remove();
  }, []);
  const [showVideo, setShowVideo] = useState(false);
  return (
    <div className="jamala page-transition ">
      <h1>Jamala 2016</h1>
      <img
        className="trophy"
        src="https://i.ibb.co/kVZ3CN6/trophy.png"
        alt="trophy"
      ></img>
      <div className="youtube-imitate">
        {showVideo ? (
          <iframe
            className="video"
            src="https://www.youtube.com/embed/B-rnM-MwRHY"
          ></iframe>
        ) : (
          <button onClick={() => setShowVideo(true)} className="play"></button>
        )}
      </div>
    </div>
  );
};

export default Jamala;
