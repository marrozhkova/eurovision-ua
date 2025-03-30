const confetti = {
  maxCount: 150,
  speed: 2,
  frameInterval: 15,
  alpha: 1,
  gradient: false,
};

(() => {
  let isRunning = false;
  let isPaused = false;
  let lastTime = Date.now();
  let particles = [];
  let angle = 0;
  let context = null;

  const colors = [
    "rgba(30,144,255,", // dodger blue
    "rgba(107,142,35,", // olive drab
    "rgba(255,215,0,", // gold
    "rgba(255,192,203,", // pink
    "rgba(106,90,205,", // slate blue
    "rgba(173,216,230,", // light blue
    "rgba(238,130,238,", // violet
    "rgba(152,251,152,", // pale green
    "rgba(70,130,180,", // steel blue
    "rgba(244,164,96,", // sandy brown
    "rgba(210,105,30,", // chocolate
    "rgba(220,20,60,", // crimson
  ];

  const requestAnimFrame =
    window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    ((callback) => window.setTimeout(callback, confetti.frameInterval));

  const createParticle = (options, width, height) => ({
    color: colors[(Math.random() * colors.length) | 0] + (confetti.alpha + ")"),
    color2:
      colors[(Math.random() * colors.length) | 0] + (confetti.alpha + ")"),
    x: Math.random() * width,
    y: Math.random() * height - height,
    diameter: Math.random() * 10 + 5,
    tilt: Math.random() * 10 - 10,
    tiltAngleIncrement: Math.random() * 0.07 + 0.05,
    tiltAngle: Math.random() * Math.PI,
    ...options,
  });

  const updateParticles = () => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    angle += 0.01;

    particles.forEach((particle, i) => {
      if (!isRunning && particle.y < -15) {
        particle.y = height + 100;
      } else {
        particle.tiltAngle += particle.tiltAngleIncrement;
        particle.x += Math.sin(angle) - 0.5;
        particle.y +=
          (Math.cos(angle) + particle.diameter + confetti.speed) * 0.5;
        particle.tilt = Math.sin(particle.tiltAngle) * 15;
      }

      if (particle.x > width + 20 || particle.x < -20 || particle.y > height) {
        if (isRunning && particles.length <= confetti.maxCount) {
          particles[i] = createParticle({}, width, height);
        } else {
          particles.splice(i, 1);
        }
      }
    });
  };

  const drawParticles = (ctx) => {
    particles.forEach((particle) => {
      ctx.beginPath();
      ctx.lineWidth = particle.diameter;
      const x2 = particle.x + particle.tilt;
      const x1 = x2 + particle.diameter / 2;
      const y2 = particle.y + particle.tilt + particle.diameter / 2;

      if (confetti.gradient) {
        const gradient = ctx.createLinearGradient(x1, particle.y, x2, y2);
        gradient.addColorStop("0", particle.color);
        gradient.addColorStop("1.0", particle.color2);
        ctx.strokeStyle = gradient;
      } else {
        ctx.strokeStyle = particle.color;
      }

      ctx.moveTo(x1, particle.y);
      ctx.lineTo(x2, y2);
      ctx.stroke();
    });
  };

  const animateConfetti = () => {
    if (!isPaused) {
      if (particles.length === 0) {
        context.clearRect(0, 0, window.innerWidth, window.innerHeight);
        return;
      }

      const now = Date.now();
      const delta = now - lastTime;

      if (delta > confetti.frameInterval) {
        context.clearRect(0, 0, window.innerWidth, window.innerHeight);
        updateParticles();
        drawParticles(context);
        lastTime = now - (delta % confetti.frameInterval);
      }

      requestAnimFrame(animateConfetti);
    }
  };

  const setupCanvas = () => {
    let canvas = document.getElementById("confetti-canvas");
    if (!canvas) {
      canvas = document.createElement("canvas");
      canvas.setAttribute("id", "confetti-canvas");
      canvas.setAttribute(
        "style",
        "display:block;z-index:999999;pointer-events:none;position:fixed;top:0"
      );
      document.body.prepend(canvas);
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      window.addEventListener(
        "resize",
        () => {
          canvas.width = window.innerWidth;
          canvas.height = window.innerHeight;
        },
        true
      );
      context = canvas.getContext("2d");
    } else if (!context) {
      context = canvas.getContext("2d");
    }
    return { width: canvas.width, height: canvas.height };
  };

  // Public methods
  confetti.start = (timeout = 5000) => {
    if (window.confettiTimeout) {
      clearTimeout(window.confettiTimeout);
    }
    confetti.remove();
    const { width, height } = setupCanvas();
    const particleCount = confetti.maxCount;
    particles = Array.from({ length: particleCount }, () =>
      createParticle({}, width, height)
    );
    isRunning = true;
    isPaused = false;
    animateConfetti();

    if (timeout) {
      window.confettiTimeout = setTimeout(() => {
        confetti.remove();
      }, timeout);
    }
  };

  // Add the stop method
  confetti.stop = () => {
    isRunning = false;
  };

  confetti.remove = () => {
    if (window.confettiTimeout) {
      clearTimeout(window.confettiTimeout);
      window.confettiTimeout = null;
    }
    confetti.stop();
    isPaused = false;
    particles = [];

    // Clear the canvas
    if (context) {
      context.clearRect(0, 0, window.innerWidth, window.innerHeight);
    }
  };

  confetti.toggle = () => (isRunning ? confetti.stop() : confetti.start());
  confetti.pause = () => (isPaused = true);
  confetti.resume = () => {
    isPaused = false;
    animateConfetti();
  };
  confetti.togglePause = () =>
    isPaused ? confetti.resume() : confetti.pause();
  confetti.isPaused = () => isPaused;
  confetti.isRunning = () => isRunning;
})();

export default confetti;
