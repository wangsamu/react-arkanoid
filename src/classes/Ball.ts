class Ball {
  width;
  height;
  color;
  posX = 158;
  posY = 300;
  speed = 4;
  constructor(width: number = 5, height: number = 5, color: string = "#fff") {
    this.width = width;
    this.height = height;
    this.color = color;
  }
}

export default Ball;
