import { GameSettigns } from "./settings";
import { BallState, BricksState, GameState, PaddleState } from "./state";

export interface DrawingContext {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
}

export function drawBall({ ctx }: DrawingContext, ball: BallState) {
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
}

function drawPaddle({ ctx, canvas }: DrawingContext, paddle: PaddleState) {
  ctx.beginPath();
  ctx.rect(
    paddle.x,
    canvas.height - paddle.height,
    paddle.width,
    paddle.height
  );
  ctx.fillStyle = "#0095DD";
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
      ctx.beginPath();
      ctx.rect(
        bricks.data[c][r].x,
        bricks.data[c][r].y,
        settings.brickWidth,
        settings.brickHeight
      );
      ctx.fillStyle = "#0095DD";
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
  const { canvas, ctx } = context;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawBall(context, state.ball);
  drawPaddle(context, state.paddle);
  drawBricks(context, state.bricks, settings);

  if (shouldContinue()) {
    requestAnimationFrame(() => draw(context, state, settings, shouldContinue));
  }
}
