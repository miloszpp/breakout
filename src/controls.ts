export interface Controls {
  leftPressed: boolean;
  rightPressed: boolean;
}

export function setupControls() {
  const controls: Controls = {
    leftPressed: false,
    rightPressed: false,
  };
  document.addEventListener(
    "keydown",
    (e) => {
      if (e.key === "Right" || e.key === "ArrowRight") {
        controls.rightPressed = true;
      } else if (e.key === "Left" || e.key === "ArrowLeft") {
        controls.leftPressed = true;
      }
    },
    false
  );
  document.addEventListener(
    "keyup",
    (e) => {
      if (e.key === "Right" || e.key === "ArrowRight") {
        controls.rightPressed = false;
      } else if (e.key === "Left" || e.key === "ArrowLeft") {
        controls.leftPressed = false;
      }
    },
    false
  );
  return controls;
}
