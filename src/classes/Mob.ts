import image from "../img/mob_37x39.png";
import Brick from "./Brick";

class Mob {
  spriteWidth = 37;
  spriteHeight = 39;
  spawnPosX;
  spawnPosY;
  bricks: Brick[] = [];
  sprite = this.getSprite();
  spriteData: Array<Array<number>> = [];
  constructor(spawnPosX: number, spawnPosY: number) {
    this.spawnPosX = spawnPosX;
    this.spawnPosY = spawnPosY;
  }
  getSprite() {
    const img = new Image();
    img.src = image;
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

  saveBricks() {
    let currentX = 0;
    let currentY = 0;
    let counter = 0;
    for (let i = 0; i < this.spriteData.length; i++) {
      currentX = i - currentY * this.spriteWidth;
      const colorArray: number[] = [];
      for (let x = 0; x < 4; x++) {
        colorArray[x] = this.spriteData[i][x];
      }
      const hexColor =
        "#" +
        (
          (1 << 24) +
          (colorArray[0] << 16) +
          (colorArray[1] << 8) +
          colorArray[2]
        )
          .toString(16)
          .slice(1);
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
      if (currentX === 36) currentY++;
    }
  }

  drawBricks(context: CanvasRenderingContext2D) {
    for (let i = 0; i < this.bricks.length; i++) {
      context.fillStyle = "#000";

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
}
export default Mob;
