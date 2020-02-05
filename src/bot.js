import Vector2 from "gdxjs/lib/vector2";

class Bot {
  constructor() {
    this.position = new Vector2(50, 50);
    this.radius = 20;
    this.died = false;
  }

  drawBot = (batch, image, rotate) => {
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

export default Bot;
