import image from "../img/warrior.png";

class Player {
  barColor = "#ffff00";
  barHeight = 4;
  barWidth = 45;
  width;
  height;
  spriteWidth = 56;
  spriteHeight = 21;
  spritePosX = 0;
  spritePosY = 0;
  spritePositions = [
    [0, 0],
    [56, 0],
    [112, 0],
    [168, 0],
    [0, 21],
    [56, 21],
    [112, 21],
    [168, 21],
    [0, 42],
    [56, 42],
    [112, 42],
    [168, 42],
  ];
  currentSprite = 0;
  posX = 80;
  posY = 212;
  speed = 2;
  sprite = this.getImage();
  constructor() {
    this.width = this.sprite.width;
    this.height = 4;
  }
  getSound(sound: string) {
    console.log("hi");
    const soundFX = new Audio(sound);
    return soundFX;
  }

  getImage() {
    const img = new Image();
    img.src = image;
    return img;
  }
  walkAnimation(direction: number) {
    if (direction === -1) {
      if (this.currentSprite > 0) {
        this.currentSprite += direction;
      } else {
        this.currentSprite = 11;
      }
    }
    if (direction === +1) {
      if (this.currentSprite < 11) {
        this.currentSprite += direction;
      } else {
        this.currentSprite = 0;
      }
    }
    this.spritePosX = this.spritePositions[this.currentSprite][0];
    this.spritePosY = this.spritePositions[this.currentSprite][1];
  }

  drawPlayer(context: CanvasRenderingContext2D) {
    context.drawImage(
      this.sprite,
      this.spritePosX,
      this.spritePosY,
      this.spriteWidth,
      this.spriteHeight,
      this.posX,
      this.posY + this.barHeight + 1,
      this.spriteWidth,
      this.spriteHeight
    );
    context.fillStyle = "#000000";
    context.fillRect(this.posX, this.posY, this.barWidth, this.barHeight);
    context.fillStyle = this.barColor;
    context.fillRect(
      this.posX + 2,
      this.posY + 2,
      this.barWidth - 2,
      this.barHeight - 2
    );
    context!.stroke();
  }
}

export default Player;
