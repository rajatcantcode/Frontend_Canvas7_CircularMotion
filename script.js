import utils from "./utils.js";

const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.width = innerWidth;
canvas.height = innerHeight;

const mouse = {
  x: innerWidth / 2,
  y: innerHeight / 2,
};
// Event Listeners
addEventListener("mousemove", (event) => {
  mouse.x = event.clientX;
  mouse.y = event.clientY;
});

//Mobile Event listener
// Mobile functionality
canvas.addEventListener("touchmove", (e) => {
  mouse.x = e.touches[0].clientX;
  mouse.y = e.touches[0].clientY;
});

const colors = ["#2185C5", "#7ECEFD", "#FFF6E5", "#FF7F66"];

// Objects
class Particle {
  constructor(x, y, radius, color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.radians = Math.random() * Math.PI * 2;
    this.velocity = 0.05;
    this.distanceFromCenter = utils.randomIntFromRange(50, 120);
    this.lastMousePosition = {
      x: x,
      y: y,
    };
  }

  draw(lastPosition) {
    c.beginPath();
    c.strokeStyle = this.color;
    c.lineWidth = this.radius;
    c.moveTo(lastPosition.x, lastPosition.y);
    c.lineTo(this.x, this.y);
    c.stroke();

    c.closePath();
  }

  update() {
    const lastPosition = { x: this.x, y: this.y };
    // move poins over time
    this.radians += this.velocity;

    //drag effect
    this.lastMousePosition.x += (mouse.x - this.lastMousePosition.x) * 0.05;
    this.lastMousePosition.y += (mouse.y - this.lastMousePosition.y) * 0.05;

    //circular motion
    this.x =
      this.lastMousePosition.x +
      Math.cos(this.radians) * this.distanceFromCenter;
    this.y =
      this.lastMousePosition.y +
      Math.sin(this.radians) * this.distanceFromCenter;

    this.draw(lastPosition);
  }
}

// Implementation
let particles;
function init() {
  particles = [];

  for (let i = 0; i < 70; i++) {
    const radius = Math.random() * 4;
    const color = utils.randomColor(colors);
    particles.push(
      new Particle(canvas.width / 2, canvas.height / 2, radius, color)
    );
  }
}

// Animation Loop
function animate() {
  requestAnimationFrame(animate);
  //to show the trail effect
  //We are drawing rectangle which have a transparency
  c.fillStyle = "rgba(255,255,255,0.05)";
  c.fillRect(0, 0, canvas.width, canvas.height);

  particles.forEach((particle) => {
    particle.update();
  });
}

init();
animate();

//Resize
addEventListener("resize", () => {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
  init();
});
