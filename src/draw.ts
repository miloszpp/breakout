import { GameSettigns } from "./settings";
import { BallState, BricksState, GameState, PaddleState } from "./state";

export interface DrawingContext {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
}

export function drawBall(
  { ctx }: DrawingContext,
  ball: BallState,
  settings: GameSettigns
) {
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
  ctx.fillStyle = settings.ballColor;
  ctx.fill();
  ctx.closePath();
}

function drawPaddle(
  { ctx }: DrawingContext,
  paddle: PaddleState,
  settings: GameSettigns
) {
  ctx.beginPath();
  ctx.rect(
    paddle.x,
    settings.canvasHeight - paddle.height,
    paddle.width,
    paddle.height
  );
  ctx.fillStyle = settings.paddleColor;
  ctx.fill();
  ctx.closePath();
}

function drawBricks(
  { ctx }: DrawingContext,
  bricks: BricksState,
  settings: GameSettigns
) {
  for (let c = 0; c < settings.brickColumnCount; c++) {
    for (let r = 0; r < settings.brickRowCount; r++) {
      if (bricks.data[c][r].isDestroyed) {
        continue;
      }
      ctx.beginPath();
      ctx.rect(
        bricks.data[c][r].x,
        bricks.data[c][r].y,
        settings.brickWidth,
        settings.brickHeight
      );
      ctx.fillStyle = settings.brickColor;
      ctx.fill();
      ctx.closePath();
    }
  }
}

export function draw(
  context: DrawingContext,
  state: GameState,
  settings: GameSettigns,
  shouldContinue: () => boolean
) {
  const { ctx } = context;

  ctx.clearRect(0, 0, settings.canvasWidth, settings.canvasHeight);

  drawBall(context, state.ball, settings);
  drawPaddle(context, state.paddle, settings);
  drawBricks(context, state.bricks, settings);

  if (shouldContinue()) {
    requestAnimationFrame(() => draw(context, state, settings, shouldContinue));
  }
}
