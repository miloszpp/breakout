import { Controls } from "./controls";
import { GameSettigns } from "./settings";

export interface BallState {
  x: number;
  y: number;
  radius: number;
  dx: number;
  dy: number;
}

export interface PaddleState {
  x: number;
  width: number;
  height: number;
  speed: number;
}

interface Brick {
  x: number;
  y: number;
  isDestroyed: boolean;
}

export interface BricksState {
  data: Brick[][];
}

export interface GameState {
  ball: BallState;
  paddle: PaddleState;
  bricks: BricksState;
}

export function getInitialState(settings: GameSettigns): GameState {
  const bricks: BricksState = { data: [] };
  for (let c = 0; c < settings.brickColumnCount; c++) {
    const column: Brick[] = [];
    bricks.data.push(column);
    for (let r = 0; r < settings.brickRowCount; r++) {
      const brickX =
        c * (settings.brickWidth + settings.brickPadding) +
        settings.brickOffsetLeft;
      const brickY =
        r * (settings.brickHeight + settings.brickPadding) +
        settings.brickOffsetTop;
      column.push({
        x: brickX,
        y: brickY,
        isDestroyed: false,
      });
    }
  }

  return {
    bricks,
    ball: {
      x: settings.canvasWidth * Math.random(),
      y: settings.canvasHeight / 3,
      radius: settings.ballRadius,
      dx: settings.ballSpeed,
      dy: settings.ballSpeed,
    },
    paddle: {
      x: (settings.canvasWidth - settings.canvasWidth / 7) / 2,
      width: settings.canvasWidth / 7,
      height: 10,
      speed: settings.paddleSpeed,
    },
  };
}

function getCollidingBrick(
  state: GameState,
  settings: GameSettigns
): Brick | undefined {
  for (let c = 0; c < settings.brickColumnCount; c++) {
    for (let r = 0; r < settings.brickRowCount; r++) {
      const b = state.bricks.data[c][r];
      if (
        !b.isDestroyed &&
        state.ball.x > b.x &&
        state.ball.x < b.x + settings.brickWidth &&
        state.ball.y > b.y &&
        state.ball.y < b.y + settings.brickHeight
      ) {
        return b;
      }
    }
  }
  return undefined;
}

export function updateState(
  state: GameState,
  controls: Controls,
  settings: GameSettigns,
  onGameOver: () => void
) {
  const { ball, paddle } = state;
  if (
    ball.x + ball.dx > settings.canvasWidth - ball.radius ||
    ball.x + ball.dx < ball.radius
  ) {
    ball.dx = -ball.dx;
  }
  if (ball.y + ball.dy < ball.radius) {
    ball.dy = -ball.dy;
  } else if (ball.y + ball.dy > settings.canvasHeight - ball.radius) {
    if (ball.x > paddle.x && ball.x < paddle.x + paddle.width) {
      ball.dy = -ball.dy;
    } else {
      onGameOver();
    }
  }

  const collidingBrick = getCollidingBrick(state, settings);
  if (collidingBrick !== undefined) {
    ball.dy = -ball.dy;
    collidingBrick.isDestroyed = true;
  }

  ball.x += ball.dx;
  ball.y += ball.dy;

  if (
    controls.rightPressed &&
    paddle.x + paddle.width <= settings.canvasWidth
  ) {
    paddle.x += paddle.speed;
  } else if (controls.leftPressed && paddle.x >= 0) {
    paddle.x -= paddle.speed;
  }
}
