class Ball {
  width;
  height;
  color;
  posX = 158;
  posY = 100;
  speed = 5;
  directionY = 1;
  directionX = 1;
  constructor(width: number = 5, height: number = 5, color: string = "#fff") {
    this.width = width;
    this.height = height;
    this.color = color;
  }
}

export default Ball;
