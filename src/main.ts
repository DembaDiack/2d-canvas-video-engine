import { AnimatedSprite } from "./AnimatedSprite";
import { Background } from "./Background";

const canvas = document.querySelector("#canvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
const PADDING = 10;
const CANVAS_WIDTH = window.innerWidth - PADDING;
const CANVAS_HEIGHT = window.innerHeight - PADDING;

ctx.canvas.width = CANVAS_WIDTH;
ctx.canvas.height = CANVAS_HEIGHT;

document.addEventListener("resize", () => {
  ctx.canvas.width = CANVAS_WIDTH;
  ctx.canvas.height = CANVAS_HEIGHT;
});

const scott = new AnimatedSprite(ctx, 0, 0, 108, 140, "src/animation.png", {
  animations: 2,
  frames: 8,
});
const bg = new Background(ctx, "src/background.jpg");
scott
  .setPosition(0, canvas.height - scott.height - 172)
  .setAnimationMap(
    new Map<number, number>([
      [0, 8],
      [1, 8],
    ])
  )
  .setAnimation(0);

document.addEventListener("keydown", (ev) => {
  switch (ev.code) {
    case "ArrowRight":
      if (scott.speed < 0) {
        scott.stop();
      } else {
        scott.increaseSpeed();
      }
      break;
    case "ArrowLeft":
      if (scott.speed > 0) {
        scott.stop();
      } else {
        scott.decreaseSpeed();
      }
      break;
    default:
      break;
  }
});

/**
 *
 *
 *
 *
 *
 */
// ANIMATION //
let frames = 0;
const SCATTER_FRAMES = 5;
function draw() {
  if (frames % SCATTER_FRAMES === 0) {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    bg.draw().update();
    scott.draw().update();
    frames = 0;
  }

  frames++;
  requestAnimationFrame(draw);
}

draw();
