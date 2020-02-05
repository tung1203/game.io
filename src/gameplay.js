import Player from "./player.js";
import InputHandle from "gdxjs/lib/InputHandler";
import Vector2 from "gdxjs/lib/vector2";
import Input from "./input";
import Sword from "./sword.js";
import Bot from "./bot.js";

class GamePlay {
  constructor(canvas, worldWidth, worldHeight, cam) {
    this.canvas = canvas;
    this.worldHeight = worldHeight;
    this.worldWidth = worldWidth;
    this.cam = cam;
    this.player = new Player();
    this.bot = new Bot();
    this.sword = new Sword();

    this.tmp2 = [];
    this.tmp = new Vector2();
    this.tmp3 = new Vector2();
    this.tmp4 = new Vector2();
    this.test = new Vector2();

    this.inputHandler = new InputHandle(canvas);
    new Input(this.player);
  }

  checkCollide = () => {
    if (this.player.attacking) {
      this.tmp3.set(
        this.sword.position.x + this.sword.width,
        this.sword.position.y + this.sword.height
      );
      let farest = this.player.position.distance(this.tmp3);
      if (this.player.rotate < 0) {
        this.player.rotate = Math.PI * 2 + this.player.rotate;
      }
      this.tmp4.set(
        this.player.position.x + farest * Math.cos(this.sword.rotate),
        this.player.position.y + farest * Math.sin(this.sword.rotate)
      );
      // this.test.set(
      //   this.bot.position.x + 10 * Math.cos(this.player.rotate),
      //   this.bot.position.y + 10 * Math.sin(this.player.rotate)
      // );
      // console.log(this.player.rotate / Math.PI);
      console.log(this.player.position);
      console.log(this.tmp4);

      if (this.tmp4.distance(this.bot.position) <= this.bot.radius / 2) {
        this.bot.died = true;
        console.log("1");
      }
    }
  };

  playerTarget = () => {
    const worldPosition = [];
    const screenPosition = [];
    this.inputHandler.addEventListener("touchMove", (x, y) => {
      screenPosition[0] = x;
      screenPosition[1] = y;
      this.cam.unprojectVector2(worldPosition, screenPosition);
      this.player.target.set(worldPosition[0], worldPosition[1]);
    });
  };

  processPlayer = delta => {
    if (!this.player.shielding && !this.player.attacking) {
      this.tmp
        .setVector(this.player.target)
        .subVector(this.player.position)
        .nor()
        .scale(this.player.speed * delta);
      if (
        this.tmp.len2() >= this.player.target.distanceSqr(this.player.position)
      ) {
        this.player.position.setVector(this.player.target);
      } else {
        this.player.position.addVector(this.tmp);
      }
    } else {
      // this.sword.delay = Math.max(0, this.sword.delay - delta);
      if (this.sword.countAngle < (Math.PI * 5) / 6) {
        this.sword.rotate += Math.PI / this.sword.speed;
        this.sword.countAngle += Math.PI / this.sword.speed;
        this.tmp2.push(this.sword.rotate);
      }
      if (this.sword.countAngle >= (Math.PI * 5) / 6) {
        this.sword.rotate -= Math.PI / this.sword.speed;
        if (this.sword.rotate <= this.tmp2[0]) {
          this.sword.countAngle = 0;
          this.player.attacking = false;
          this.tmp2.splice(0, this.tmp2.length);
        }
      }
    }
  };

  draw = (delta, batch, whiteTex, imagePlayer) => {
    this.checkCollide();
    if (!this.player.died) {
      if (!this.player.attacking && !this.player.shielding) {
        this.sword.position.set(
          this.player.position.x,
          this.player.position.y + this.player.radius / 2
        );
        this.sword.target.set(
          this.player.target.x,
          this.player.target.y + this.player.radius / 2
        );
        this.sword.checkRotate();
        this.player.checkRotate();
      }
      this.player.drawPlayer(batch, imagePlayer, this.player.rotate, whiteTex);
      this.sword.drawSword(
        batch,
        whiteTex,
        this.sword.rotate - Math.PI / 2,
        0,
        -this.player.radius / 2
      );
    }
    if (!this.bot.died) {
      this.bot.drawBot(batch, imagePlayer, this.player.rotate);
    }
  };

  update = delta => {
    this.playerTarget();
    if (!this.player.died) {
      this.processPlayer(delta);
    }
  };
}

export default GamePlay;
