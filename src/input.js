class Input {
  constructor(player) {
    document.addEventListener("mousedown", () => {
      player.attacking = true;
    });

    document.addEventListener("keydown", e => {
      if (e.keyCode === 81) {
        player.shielding = true;
      }
    });
    document.addEventListener("keyup", e => {
      if (e.keyCode === 81) {
        player.shielding = false;
      }
    });
  }
}

export default Input;
