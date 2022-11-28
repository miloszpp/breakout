import { setupControls } from "./controls";
import { draw, DrawingContext } from "./draw";
import { settings } from "./settings";
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

function main() {
  const canvas = getCanvas();
  const ctx = getContext(canvas);
  const drawingContext: DrawingContext = { canvas, ctx };
  const controls = setupControls();

  const state = getInitialState(settings);

  let shouldContinue = true;
  let updateStateInterval: number;

  canvas.setAttribute("width", String(settings.canvasWidth));
  canvas.setAttribute("height", String(settings.canvasHeight));

  draw(drawingContext, state, settings, () => shouldContinue);

  updateStateInterval = setInterval(
    () =>
      updateState(state, controls, settings, () => {
        shouldContinue = false;
        clearInterval(updateStateInterval);
      }),
    10
  );
}

main();
