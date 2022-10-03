class Ball {
  width;
  height;
  color;
  posX = 50;
  posY = 200;
  gridPosX = 0;
  gridPosY = 0;
  speed = 1.5;
  directionY = 1;
  directionX = 1;
  topColliderX: number = 0;
  topColliderY: number = 0;
  botColliderX: number = 0;
  botColliderY: number = 0;
  leftColliderX: number = 0;
  leftColliderY: number = 0;
  rightColliderX: number = 0;
  rightColliderY: number = 0;

  constructor(width: number = 3, height: number = 3, color: string = "#0ff") {
    this.width = width;
    this.height = height;
    this.color = color;
  }

  getSound(audioFile: string) {
    const soundFX = new Audio(audioFile);
    return soundFX;
  }

  getColliderPos(ballX: number, ballY: number) {
    this.topColliderX = ballX + 2;
    this.topColliderY = ballY;
    this.botColliderX = ballX + 2;
    this.botColliderY = ballY + this.height;
    this.leftColliderX = ballX - 1;
    this.leftColliderY = ballY + 2;
    this.rightColliderX = ballX + this.width + 1;
    this.rightColliderY = ballY + 2;
  }

  drawBall(context: CanvasRenderingContext2D) {
    context.fillStyle = this.color;
    context.fillRect(this.posX, this.posY, this.width, this.height);
    context.stroke();
  }
}

export default Ball;
