import Vector2 from "gdxjs/lib/vector2";

class Sword {
  constructor() {
    this.width = 30;
    this.height = 4;
    this.position = new Vector2();
    this.target = new Vector2();
    this.speed = 15;
    this.velocity = 0;
    this.attacking = false;
    this.delay = 1;
    this.countAngle = 0;
    this.died = false;
    this.rotate = 0;
  }

  checkRotate = () => {
    let angle = Math.acos(
      (this.target.x - this.position.x) / this.target.distance(this.position)
    );
    if (this.target.y >= this.position.y && this.target.x !== this.position.x) {
      this.rotate = angle - Math.PI / 2;
    }
    if (this.target.y < this.position.y) {
      this.rotate = -(angle + Math.PI / 2);
    }
  };

  drawSword = (batch, whiteText, rotation, x, y) => {
    batch.begin();
    batch.setColor(1, 1, 1, 1);
    batch.draw(
      whiteText,
      this.position.x,
      this.position.y,
      this.width,
      this.height,
      x,
      y,
      rotation
    );
    batch.end();
  };
}

export default Sword;
