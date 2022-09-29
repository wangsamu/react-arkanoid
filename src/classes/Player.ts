class Player {
  width;
  height;
  color;
  posX = 140;
  posY = 450;
  speed = 4;
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
