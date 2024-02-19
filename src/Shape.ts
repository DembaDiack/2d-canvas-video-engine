export class Shape {
  public acceleration: number = 5;
  public speed: number = 1;
  public maxSpeed: number = 20;
  public minSpeed: number = -1 * this.maxSpeed;
  constructor(
    public ctx: CanvasRenderingContext2D,
    public x: number,
    public y: number,
    public width: number,
    public height: number
  ) {}

  public setPosition(x: number, y: number) {
    this.x = x;
    this.y = y;
    return this;
  }
  draw(): this {
    throw new Error("Method not implemented.");
  }
  update() {
    this.x += this.speed;
  }
  increaseSpeed() {
    if (this.speed < this.maxSpeed) {
      this.speed += this.acceleration;
    }
  }
  decreaseSpeed() {
    if (this.speed > this.minSpeed) {
      this.speed -= this.acceleration;
    }
  }
  stop() {
    this.speed = 0;
  }
}
