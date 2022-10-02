class Brick {
  width = 8;
  height = 4;
  border = 1;
  color;
  posX: number;
  posY: number;
  gridPosX: number;
  gridPosY: number;
  constructor(
    color: string,
    posX: number,
    posY: number,
    gridPosX: number,
    gridPosY: number
  ) {
    this.color = color;
    this.posX = posX;
    this.posY = posY;
    this.gridPosX = posX;
    this.gridPosY = posY;
  }
}

export default Brick;
