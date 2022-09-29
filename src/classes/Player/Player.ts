class Player {
  width;
  height;
  color;
  startPosX = 100;
  startPosY = 400;
  constructor(
    width: number = 40,
    height: number = 10,
    color: string = "#3f00ff"
  ) {
    this.width = width;
    this.height = height;
    this.color = color;
  }
}

export default Player;
