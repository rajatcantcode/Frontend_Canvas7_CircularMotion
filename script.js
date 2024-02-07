import utils from "./utils.js";
console.log(utils);

const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.width = innerWidth;
canvas.height = innerHeight;

const mouse = {
  x: innerWidth / 2,
  y: innerHeight / 2,
};

const colors = ["#2185C5", "#7ECEFD", "#FFF6E5", "#FF7F66"];

// Objects
class Particle {
  constructor(x, y, radius, color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.radians = 0;
    this.velocity = 0.05;
  }

  draw() {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fillStyle = this.color;
    c.fill();
    c.closePath();
  }

  update() {
    this.radians += this.velocity;
    this.x = this.x + Math.cos(this.radians) * 10;

    this.y = this.y + Math.sin(this.radians) * 10;

    this.draw();
  }
}

// Implementation
let particles;
function init() {
  particles = [];

  for (let i = 0; i < 1; i++) {
    particles.push(
      new Particle(canvas.width / 2, canvas.height / 2, 10, "blue")
    );
  }
}

// Animation Loop
function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, canvas.width, canvas.height);

  particles.forEach((particle) => {
    particle.update();
  });
}

init();
animate();

// Event Listeners
addEventListener("mousemove", (event) => {
  mouse.x = event.clientX;
  mouse.y = event.clientY;
});

//Resize
addEventListener("resize", () => {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
  init();
});
