import pharaoh00 from "../img/pharaoh00.png";

import Brick from "./Brick";

class Mob {
  enemyList = [pharaoh00];
  enemy;
  spriteWidth = 38;
  spriteHeight = 39;
  spawnPosX;
  spawnPosY;
  bricks: Brick[] = [];
  sprite;
  spriteData: Array<Array<number>> = [];
  constructor(spawnPosX: number, spawnPosY: number, enemy: number) {
    this.spawnPosX = spawnPosX;
    this.spawnPosY = spawnPosY;
    this.enemy = enemy;
    this.sprite = this.getSprite();
  }
  getSprite() {
    const img = new Image();
    img.src = this.enemyList[this.enemy];
    return img;
  }
  getSpriteData(context: CanvasRenderingContext2D) {
    const data = context.getImageData(
      0,
      0,
      this.spriteWidth,
      this.spriteHeight
    );
    const pixels: Array<Array<number>> = [];
    for (let i = 0; i < data.data.length / 4; i++) {
      pixels[i] = [];
      for (let x = 0; x < 4; x++) {
        pixels[i][x] = data.data[i * 4 + x];
      }
    }
    this.spriteData = pixels;
  }

  getHexValue(colorValues: number[]) {
    return (
      "#" +
      (
        (1 << 24) +
        (colorValues[0] << 16) +
        (colorValues[1] << 8) +
        colorValues[2]
      )
        .toString(16)
        .slice(1)
    );
  }

  drawMob(context: CanvasRenderingContext2D) {
    context.drawImage(this.sprite, 0, 0, this.spriteWidth, this.spriteHeight);
  }

  saveBricks() {
    let currentX = 0;
    let currentY = 0;
    let counter = 0;
    for (let i = 0; i < this.spriteData.length; i++) {
      currentX = i - currentY * this.spriteWidth;
      const colorValues: number[] = [];
      for (let x = 0; x < 4; x++) {
        colorValues[x] = this.spriteData[i][x];
      }

      const hexColor = this.getHexValue(colorValues);

      if (hexColor !== "#000000") {
        this.bricks[counter] = new Brick(
          hexColor,
          currentX * 8 + this.spawnPosX,
          currentY * 4 + this.spawnPosY,
          currentX,
          currentY
        );
        counter++;
      }

      if (currentX === this.spriteWidth - 1) currentY++;
    }
  }

  drawBricks(context: CanvasRenderingContext2D) {
    for (let i = 0; i < this.bricks.length; i++) {
      context.fillStyle = "#000000";
      context.fillRect(
        this.bricks[i].posX,
        this.bricks[i].posY,
        this.bricks[i].width,
        this.bricks[i].height
      );
      context.fillStyle = this.bricks[i].color;
      context.fillRect(
        this.bricks[i].posX + this.bricks[i].border,
        this.bricks[i].posY + this.bricks[i].border,
        this.bricks[i].width - this.bricks[i].border,
        this.bricks[i].height - this.bricks[i].border
      );
    }
  }

  destroyBrick(brick: Brick) {
    this.bricks = this.bricks.filter((element: Brick) => brick !== element);
  }
}
export default Mob;
