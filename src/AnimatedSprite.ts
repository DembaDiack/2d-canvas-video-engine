import { Shape } from "./Shape";

interface IAnimatedSpriteOptions {
  animations: number;
  frames: number;
  offset_x?: number;
  offset_y?: number;
}

export class AnimatedSprite extends Shape {
  private AnimationMap: Map<number, number> = new Map();
  private image: HTMLImageElement;
  private maxFrames: number;
  private maxAnimations: number;
  private currentAnimation: number;
  private currentFrame: number;
  public scale: number = 1;

  constructor(
    public ctx: CanvasRenderingContext2D,
    public x: number,
    public y: number,
    public width: number,
    public height: number,
    image: string,
    options: IAnimatedSpriteOptions
  ) {
    super(ctx, x, y, width, height);
    const img = new Image();
    img.src = image;
    this.image = img;
    this.maxFrames = options.frames;
    this.maxAnimations = options.animations;
    this.currentAnimation = 0;
    this.currentFrame = 0;
  }

  update(): void {
    super.update();
    this.goToNextFrame();
    if (this.speed >= 0) {
      this.setAnimation(0);
    }
    if (this.speed < 0) {
      this.setAnimation(1);
    }
  }

  draw() {
    this.ctx.drawImage(
      this.image,
      this.width * this.currentFrame,
      this.height * this.currentAnimation,
      this.width,
      this.height,
      this.x,
      this.y,
      this.width * this.scale,
      this.height * this.scale
    );
    return this;
  }
  setAnimationMap(map: Map<number, number>) {
    this.AnimationMap = map;
    return this;
  }
  goToNextFrame() {
    this.currentFrame++;
    if (this.currentFrame >= this.getNumberOfFramesForCurrentAnimation()) {
      this.currentFrame = 0;
    }
    return this;
  }
  goToNextAnimation() {
    this.currentAnimation++;
    if (this.currentAnimation >= this.maxAnimations) {
      this.currentAnimation = 0;
    }
    return this;
  }
  private getNumberOfFramesForCurrentAnimation() {
    let last_frame = this.maxFrames;
    if (this.AnimationMap && this.AnimationMap.get(this.currentAnimation)) {
      last_frame =
        this.AnimationMap.get(this.currentAnimation) || this.maxFrames;
    }
    return last_frame;
  }
  public hasHitLastFrame() {
    return (
      this.currentFrame === this.getNumberOfFramesForCurrentAnimation() - 1
    );
  }
  public setAnimation(animation: number) {
    if (animation > this.maxAnimations) {
      throw new Error("Animation out of bounds");
    }
    this.currentAnimation = animation;
    return this;
  }
}
