import Vector2 from "gdxjs/lib/vector2";

class Player {
  constructor() {
    this.position = new Vector2(20, 20);
    this.target = new Vector2(20, 20);
    this.speed = 50;
    this.velocity = 0;
    this.radius = 20;
    this.attacking = false;
    this.shielding = false;
    this.exp = 0;
    this.level = 0;
    this.name = null;
    this.rotate = 0;
    this.died = false;
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

  drawPlayer = (batch, image, rotate) => {
    batch.begin();
    batch.setColor(1, 1, 1, 1);
    batch.draw(
      image,
      this.position.x - this.radius / 2,
      this.position.y - this.radius / 2,
      this.radius,
      this.radius,
      this.radius / 2,
      this.radius / 2,
      rotate
    );
    batch.end();
  };
}

export default Player;
