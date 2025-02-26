export default function heartRain() {
  const raining = () => {
    let heart = document.querySelector(".heart");
    let e = document.createElement("div");
    e.classList.add("drop");

    if (heart) {
      heart.appendChild(e);
      let left = Math.floor(Math.random() * 30);
      let duration = Math.random() * 2;

      e.style.left = left + "rem";
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
