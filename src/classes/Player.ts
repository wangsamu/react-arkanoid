import image from "../img/warrior.png";

class Player {
  width;
  height;
  spriteWidth = 56;
  spriteHeight = 26;
  spritePosX = 0;
  spritePosY = 0;
  spritePositions = [
    [0, 0],
    [56, 0],
    [112, 0],
    [168, 0],
    [0, 26],
    [56, 26],
    [112, 26],
    [168, 26],
    [0, 52],
    [56, 52],
    [112, 52],
    [168, 52],
  ];
  currentSprite = 0;
  posX = 80;
  posY = 374;
  speed = 2;
  sprite = this.getImage();
  constructor() {
    this.width = this.sprite.width;
    this.height = this.sprite.height;
  }
  getImage() {
    const img = new Image();
    img.src = image;
    return img;
  }
  leftMoveAnimation() {
    if (this.currentSprite > 0) {
      this.currentSprite -= 1;
    } else {
      this.currentSprite = 11;
    }
    console.log(this.currentSprite, this.spritePositions[this.currentSprite]);
    this.spritePosX = this.spritePositions[this.currentSprite][0];
    this.spritePosY = this.spritePositions[this.currentSprite][1];

    console.log(this.spritePosX, this.spritePosY);
  }

  rightMoveAnimation() {
    if (this.currentSprite < 11) {
      this.currentSprite += 1;
    } else {
      this.currentSprite = 0;
    }
    this.spritePosX = this.spritePositions[this.currentSprite][0];
    this.spritePosY = this.spritePositions[this.currentSprite][1];

    console.log(this.spritePosX, this.spritePosY);
  }
}

export default Player;
