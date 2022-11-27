import { setupControls } from "./controls";
import { draw, DrawingContext } from "./draw";
import { GameSettigns } from "./settings";
import { getInitialState, updateState } from "./state";
import "./style.css";
import { ensureDefined } from "./utils";

const getCanvas = () =>
  ensureDefined(
    document.querySelector<HTMLCanvasElement>("#mainCanvas"),
    "Could not get canvas"
  );

const getContext = (canvas: HTMLCanvasElement) =>
  ensureDefined(canvas.getContext("2d"), "Could not get 2d context");

const settings: GameSettigns = {
  brickRowCount: 3,
  brickColumnCount: 5,
  brickWidth: 75,
  brickHeight: 20,
  brickPadding: 10,
  brickOffsetTop: 30,
  brickOffsetLeft: 30,
};

function main() {
  const canvas = getCanvas();
  const ctx = getContext(canvas);
  const drawingContext: DrawingContext = { canvas, ctx };
  const controls = setupControls();

  const state = getInitialState(drawingContext, settings);

  let shouldContinue = true;
  let updateStateInterval: number;
  draw(drawingContext, state, settings, () => shouldContinue);

  updateStateInterval = setInterval(
    () =>
      updateState(state, controls, () => {
        shouldContinue = false;
        clearInterval(updateStateInterval);
        alert("GAME OVER");
      }),
    10
  );
}

main();
