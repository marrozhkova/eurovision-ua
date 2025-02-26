import confetti from "../js/confetti";
import { useEffect } from "react";

const Ruslana = () => {
  useEffect(() => {
    confetti.start(3000);
    return () => confetti.remove();
  }, []);
  return (
    <div className="ruslana page-transition">
      <h1>Ruslana 2004</h1>
      <img
        className="trophy"
        src="https://i.ibb.co/kVZ3CN6/trophy.png"
        alt="trophy"
      ></img>
      <iframe
        className="video"
        src="https://www.youtube.com/embed/10XR67NQcAc"
      ></iframe>
    </div>
  );
};

export default Ruslana;
