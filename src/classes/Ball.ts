class Ball {
  width;
  height;
  color;
  posX = 80;
  posY = 3;
  speed = 3;
  directionY = 1;
  directionX = 1;
  constructor(width: number = 3, height: number = 3, color: string = "#0ff") {
    this.width = width;
    this.height = height;
    this.color = color;
  }
}

export default Ball;
