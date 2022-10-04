class Ball {
  width;
  height;
  color;
  posX = 70;
  posY = 200;
  gridPosX = 0;
  gridPosY = 0;
  speed = 1;
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

  constructor(width: number = 2, height: number = 2, color: string = "#0ff") {
    this.width = width;
    this.height = height;
    this.color = color;
  }

  getColliderPos(ballX: number, ballY: number) {
    this.topColliderX = ballX + this.width / 2;
    this.topColliderY = ballY;
    this.botColliderX = ballX + this.width / 2;
    this.botColliderY = ballY + this.height;
    this.leftColliderX = ballX;
    this.leftColliderY = ballY + this.height / 2;
    this.rightColliderX = ballX + this.width;
    this.rightColliderY = ballY + this.height / 2;
  }

  drawBall(context: CanvasRenderingContext2D) {
    context.fillStyle = this.color;
    context.fillRect(this.posX, this.posY, this.width, this.height);
    context.stroke();
  }
}

export default Ball;
