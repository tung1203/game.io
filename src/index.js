import "./index.css";
import GamePlay from "./gameplay.js";
import resizeCanvas from "gdxjs/lib/resizeCanvas";
import createBatch from "gdxjs/lib/createBatch";
import createCamera from "gdxjs/lib/orthoCamera";
import loadTexture from "gdxjs/lib/loadTexture";
import InputHandler from "gdxjs/lib/InputHandler";
import inputHandle from "./input.js";
import createWhiteTex from "gl-white-texture";
import loadAtlas from "gdxjs/lib/loadAtlas";

const init = async () => {
  const info = document.getElementById("info");
  const canvas = document.getElementById("canvas");
  const [width, height] = resizeCanvas(canvas);
  const worldWidth = 150;
  const worldHeight = 75;

  const gl = canvas.getContext("webgl");
  const cam = createCamera(worldWidth, worldHeight, width, height);
  const batch = createBatch(gl);

  //new game
  const game = new GamePlay(canvas, worldWidth, worldHeight, cam);
  const imagePlayer = await loadTexture(gl, "./smile.png");
  // const imageBot = await loadTexture(gl, "./Hull_06.png");
  // const imageBullet = await loadTexture(gl, "./Heavy_Shell.png");
  // const imageTankGun = await loadTexture(gl, "./guntank.png");
  // const imageBotGun = await loadTexture(gl, "./gunbot.png");
  // const explosionEffect = await loadAtlas(gl, "./effect.atlas");
  const whiteTex = createWhiteTex(gl);
  let lastTime = Date.now();
  let fps = 0;

  gl.clearColor(0, 0, 0, 1);
  (function loop() {
    const delta = Date.now() - lastTime;
    lastTime = Date.now();
    fps = Math.floor(1000 / delta);

    gl.clear(gl.COLOR_BUFFER_BIT);
    // batch.begin();
    // batch.setColor(1, 1, 1, 1);
    // batch.end();
    game.update(delta / 1000);
    batch.setProjection(cam.combined);
    // batch.begin();
    game.draw(delta / 1000, batch, whiteTex, imagePlayer);

    // batch.draw(whiteTex, 60, 50, 10, 10);
    // batch.end();
    requestAnimationFrame(loop);
  })();

  setInterval(() => {
    info.innerHTML = `FPS: ${fps}`;
  }, 1000);
};

init();
