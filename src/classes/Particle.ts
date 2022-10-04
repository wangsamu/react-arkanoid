class Particle {
  width;
  height;
  color;
  brightColor = "#66ccff50";
  posX;
  posY;
  speed;
  frame = 0;

  constructor(
    posX: number,
    posY: number,
    color: string,
    size: number,
    speed: number
  ) {
    this.color = color;
    this.posX = posX;
    this.posY = posY;
    this.width = size;
    this.height = size;
    this.speed = speed;
  }

  moveParticles() {
    this.posY += this.speed;
  }
  drawParticles(context: CanvasRenderingContext2D) {
    this.frame++;
    context.fillStyle = this.color;
    if (this.frame >= 8) {
      context.fillStyle = this.brightColor;
      this.frame = 0;
    }

    context.fillRect(this.posX, this.posY, this.width, this.height);
  }
}

export default Particle;
