export class Background {
  private image: HTMLImageElement;
  public x: number = 0;
  public y: number = 0;
  public speed: number = -10;
  constructor(public ctx: CanvasRenderingContext2D, image: string) {
    const img = new Image();
    img.src = image;
    this.image = img;
  }

  draw() {
    this.ctx.drawImage(
      this.image,
      this.x,
      0,
      this.ctx.canvas.width,
      this.ctx.canvas.height
    );
    this.ctx.drawImage(
      this.image,
      this.x + this.ctx.canvas.width,
      0,
      this.ctx.canvas.width,
      this.ctx.canvas.height
    );
    return this;
  }
  update() {
    if (this.x < -this.ctx.canvas.width) {
      this.x = 0;
    }
    this.x += this.speed;
  }
}
