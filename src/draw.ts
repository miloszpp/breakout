import { GameSettigns, settings } from "./settings";
import {
  BallState,
  BricksState,
  GameState,
  GameStatus,
  PaddleState,
} from "./state";

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
  ctx.fillStyle = settings.colors[1];
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
  ctx.fillStyle = settings.colors[2];
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
      ctx.fillStyle = settings.colors[0];
      ctx.fill();
      ctx.closePath();
    }
  }
}

function drawScore({ ctx }: DrawingContext, score: number) {
  ctx.font = "16px Arial";
  ctx.fillStyle = settings.colors[1];
  ctx.fillText(`Score: ${score}`, 8, 20);
}

function drawGameEnd(
  { ctx }: DrawingContext,
  status: GameStatus,
  settings: GameSettigns
) {
  if (status === "InProgress") {
    return;
  }

  ctx.font = "48px Arial";
  ctx.fillStyle = settings.colors[1];
  ctx.textAlign = "center";
  ctx.fillText(
    status === "Fail" ? "GAME OVER" : "CONGRATULATIONS",
    settings.canvasWidth / 2,
    settings.canvasHeight / 2
  );
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
  drawScore(context, state.score);
  drawGameEnd(context, state.status, settings);

  if (shouldContinue()) {
    requestAnimationFrame(() => draw(context, state, settings, shouldContinue));
  }
}
