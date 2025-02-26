export default function heartRain() {
  const raining = () => {
    let heart = document.querySelector(".heart");
    let e = document.createElement("div");
    e.classList.add("drop");

    if (heart) {
      heart.appendChild(e);
      let maxWidth = window.innerWidth * 0.3;
      let left = Math.floor(Math.random() * maxWidth);
      let duration = Math.random() * 2;

      e.style.left = left + "px";
      e.style.animationDuration = 3 + duration + "s";

      setTimeout(function () {
        heart.removeChild(e);
      }, 5000);
    }
  };

  setInterval(function () {
    raining();
  }, 200);
}
