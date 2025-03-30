// Animation configuration constants
const FPS = 40; // Frames per second // Animation frame rate
const RIPPLE_MAX = 500; // Maximum number of ripples// Maximum number of ripples allowed on screen
const INIT_SIZE = 10; // Initial ripple size
const MAX_SIZE = 50; // Maximum ripple size
const STEP = 0.5; // Growth rate of ripples

/**
 * Main function to initialize the caterpillar animation
 * @param {HTMLCanvasElement} canvasElement - The canvas element to draw on
 * @returns {Function} cleanup function to remove event listeners
 */
export function initCaterpillar(canvasElement) {
  // State variables
  let timer; // Animation timer
  let canvas = canvasElement;
  let ctx; // Canvas context
  let mouseX, mouseY; // Mouse coordinates
  let ripples = []; // Array to store ripple objects
  let isAutoMode; // Auto animation mode flag
  let autoCnt; // Counter for auto animation

  // Detect if user is on iOS device
  const isiPhone = !!navigator.userAgent.match(/[iPhone|iPad|iPod].*Mobile/);

  /**
   * Ripple class to create individual ripple objects
   * @param {number} x - X coordinate of the ripple
   * @param {number} y - Y coordinate of the ripple
   */
  function Ripple(x, y) {
    this.x = x;
    this.y = y;
    this.size = INIT_SIZE;
    // Random color generation (50-255 range)
    this.r = Math.floor(Math.random() * 206) + 50;
    this.g = Math.floor(Math.random() * 206) + 50;
    this.b = Math.floor(Math.random() * 206) + 50;
  }

  /**
   * Updates canvas dimensions when window is resized
   * Maintains aspect ratio and clears canvas
   */
  // Canvas resize handler
  function updateCanvasSize() {
    const parent = canvas.parentElement;
    const windowHeight = window.innerHeight;
    // getBoundingClientRect() returns element's size and position
    const parentHeight = parent.getBoundingClientRect().height;

    // width/height: Set canvas dimensions. This clears the canvas and
    // resets all canvas properties
    canvas.width = parent.clientWidth;
    canvas.height = Math.min(windowHeight, parentHeight);

    // Reset canvas transform matrix to default
    // setTransform(a, b, c, d, e, f): Resets current transform to the identity matrix
    // Parameters represent: horizontal scaling, horizontal skewing,
    // vertical skewing, vertical scaling, horizontal moving, vertical moving
    // Parameters:
    // a: Horizontal scaling
    // b: Horizontal skewing
    // c: Vertical skewing
    // d: Vertical scaling
    // e: Horizontal translation
    // f: Vertical translation
    ctx.setTransform(1, 0, 0, 1, 0, 0);

    // Clear entire canvas
    // clearRect(x, y, width, height): Clears the specified rectangular area
    // making it fully transparent
    // Parameters:
    // x: X coordinate of rectangle's starting point
    // y: Y coordinate of rectangle's starting point
    // width: Rectangle's width
    // height: Rectangle's height
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  /**
   * Handle mouse down events by triggering mouse move
   * @param {Event} e - Mouse/Touch event object
   */
  function oMouseDown(e) {
    oMouseMove(e);
  }

  /**
   * Handle mouse/touch movement events
   * Updates mouse position and disables auto mode
   * @param {Event} e - Mouse/Touch event object
   */
  function oMouseMove(e) {
    autoCnt = 0;
    isAutoMode = false;
    e.preventDefault();

    // Get canvas position relative to viewport
    const rect = canvas.getBoundingClientRect();
    // Returns: {
    //   x: number,      // X coordinate relative to viewport
    //   y: number,      // Y coordinate relative to viewport
    //   width: number,  // Element's width
    //   height: number, // Element's height
    //   top: number,    // Distance from top of viewport
    //   right: number,  // Distance from left of viewport + width
    //   bottom: number, // Distance from top of viewport + height
    //   left: number    // Distance from left of viewport
    // }

    // Calculate mouse position relative to canvas   // Handle touch events differently than mouse events
    if (isiPhone) {
      mouseX = e.touches[0].pageX - rect.left - INIT_SIZE / 2;
      mouseY = e.touches[0].pageY - rect.top - INIT_SIZE / 2;
    } else {
      mouseX = e.clientX - rect.left - INIT_SIZE / 2;
      mouseY = e.clientY - rect.top - INIT_SIZE / 2;
    }
  }

  /**
   * Creates a new ripple at specified coordinates
   * Maintains maximum ripple limit by removing oldest ripple
   * @param {number} x - X coordinate for new ripple
   * @param {number} y - Y coordinate for new ripple
   */
  // Add new ripple to array
  function addCircle(x, y) {
    if (ripples.length >= RIPPLE_MAX) {
      ripples.shift(); // Remove oldest ripple
    }
    ripples.push(new Ripple(x, y));
  }

  /**
   * Main animation loop
   * Handles ripple creation, animation, and auto-mode movement
   */
  // Main animation loop
  function doAnimation() {
    // Create new ripple at mouse position if defined
    if (typeof mouseX !== "undefined" && typeof mouseY !== "undefined") {
      addCircle(mouseX, mouseY);
    }

    // Animate existing ripples
    for (let i = 0; i < ripples.length; i++) {
      const obj = ripples[i];
      // beginPath(): Starts a new path by emptying the list of sub-paths.
      // Call this method when you want to create a new path.
      ctx.beginPath();
      const alpha = 0.9 - obj.size / MAX_SIZE;
      const color = `rgba(${obj.r},${obj.g},${obj.b},${alpha})`;

      // fillStyle: Sets the color, gradient, or pattern used to fill the drawing
      ctx.fillStyle = color;
      // strokeStyle: Sets the color, gradient, or pattern used for strokes
      ctx.strokeStyle = color;

      // arc(x, y, radius, startAngle, endAngle, counterclockwise)
      // Draws a circular arc or circle at (x,y) with specified radius
      // Math.PI * 2 creates a full circle (360 degrees)
      ctx.arc(obj.x, obj.y, obj.size, 0, Math.PI * 2, false);
      // fill(): Fills the current path with the current fillStyle
      ctx.fill();
      // stroke(): Actually draws the path that was defined by beginPath() and arc()
      // using the current strokeStyle
      ctx.stroke();

      // Increase ripple size and remove if too large
      obj.size += STEP;
      if (obj.size > MAX_SIZE) {
        ripples.splice(i, 1);
        continue;
      }
    }

    // Handle auto-mode animation
    autoCnt += 2;
    if (autoCnt > 400 || isAutoMode) {
      isAutoMode = true;
      // Calculate circular movement
      const rad = (Math.PI / 180) * (autoCnt % 360);
      const radius = Math.min(canvas.width, canvas.height) * 0.4;
      // Move in circular pattern
      mouseX = canvas.width / 2 + radius * Math.cos(rad);
      mouseY = canvas.height / 2 + radius * Math.sin(rad);
    }
  }

  /**
   * Initialize the animation
   * Sets up canvas context and event listeners
   * @returns {boolean} false if canvas initialization fails
   */
  // Initialization
  function init() {
    if (!canvas || !canvas.getContext) return false;
    // Get 2D rendering context
    // getContext('2d'): Returns a drawing context on the canvas
    // '2d' creates a CanvasRenderingContext2D object representing a
    // two-dimensional rendering context
    // Returns a CanvasRenderingContext2D object for 2D rendering
    // Used for all drawing operations on the canvas
    ctx = canvas.getContext("2d");

    updateCanvasSize();
    window.addEventListener("resize", updateCanvasSize);

    isAutoMode = true;
    autoCnt = 0;

    // event listeners based on device type
    if (isiPhone) {
      canvas.addEventListener("touchstart", oMouseDown, false);
      canvas.addEventListener("touchmove", oMouseMove, false);
    } else {
      canvas.addEventListener("mousedown", oMouseDown, false);
      canvas.addEventListener("mousemove", oMouseMove, false);
    }

    // Start animation loop
    timer = setInterval(doAnimation, 1000 / FPS);
  }

  /**
   * Cleanup function to remove event listeners and stop animation
   * Called when component unmounts
   */
  function cleanup() {
    window.removeEventListener("resize", updateCanvasSize);
    // Remove event listeners
    if (isiPhone) {
      canvas.removeEventListener("touchstart", oMouseDown);
      canvas.removeEventListener("touchmove", oMouseMove);
    } else {
      canvas.removeEventListener("mousedown", oMouseDown);
      canvas.removeEventListener("mousemove", oMouseMove);
    }
    // Stop animation loop
    clearInterval(timer);
  }

  // Initialize and return cleanup function
  init();
  return cleanup;
}
