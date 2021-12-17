var footerCanvasArea = document.getElementById("customfooter");
const canvas = document.getElementById("footercanvas");
canvas.width = footerCanvasArea.clientWidth;
canvas.height = footerCanvasArea.clientHeight;

const ctx = canvas.getContext("2d");

let numberOfPizzas = 50;
var PizzasArray = [];

var image = new Image();
image.src = "img/pizza/fveg.png";

class Pizza {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.radius = Math.random() * 10 + 2;
    this.speedX = Math.random() * 3 - 1.5;
    this.speedY = Math.random() * 3 - 1.5;
    this.size = 30;
  }
  draw() {
    ctx.drawImage(
      image,
      0,
      0,
      image.height,
      image.width,
      this.x,
      this.y,
      this.radius * 5,
      this.radius * 5
    );
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
      this.speedX = -this.speedX;
    }
    if (this.y + this.radius > canvas.height || this.y + this.radius < 0) {
      this.speedY = -this.speedY;
    }
    this.draw();
  }
}
function init() {
  for (let i = 0; i < numberOfPizzas; i++) {
    PizzasArray.push(new Pizza());
  }
}
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < PizzasArray.length; i++) {
    PizzasArray[i].update();
  }
  requestAnimationFrame(animate);
}
init();
animate();

window.addEventListener("resize", function () {
  canvas.width = footerCanvasArea.clientWidth;
  canvas.height = footerCanvasArea.clientHeight;
  PizzasArray = [];
  init();
});