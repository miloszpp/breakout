import { Controls } from "./controls";
import { DrawingContext } from "./draw";
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
}

export interface BricksState {
  data: Brick[][];
}

export interface GameState {
  ball: BallState;
  paddle: PaddleState;
  boundaries: {
    width: number;
    height: number;
  };
  bricks: BricksState;
}

export function getInitialState(
  { canvas }: DrawingContext,
  settings: GameSettigns
): GameState {
  const bricks: BricksState = { data: [] };
  for (let c = 0; c < settings.brickColumnCount; c++) {
    const brickRow: Brick[] = [];
    bricks.data.push(brickRow);
    for (let r = 0; r < settings.brickRowCount; r++) {
      const brickX =
        c * (settings.brickWidth + settings.brickPadding) +
        settings.brickOffsetLeft;
      const brickY =
        r * (settings.brickHeight + settings.brickPadding) +
        settings.brickOffsetTop;
      brickRow.push({
        x: brickX,
        y: brickY,
      });
    }
  }

  return {
    bricks,
    ball: {
      x: 50,
      y: 50,
      radius: 10,
      dx: 2,
      dy: 2,
    },
    paddle: {
      x: (canvas.width - 75) / 2,
      width: 75,
      height: 10,
      speed: 5,
    },
    boundaries: {
      width: canvas.width,
      height: canvas.height,
    },
  };
}

export function updateState(
  state: GameState,
  controls: Controls,
  onGameOver: () => void
) {
  const { ball, paddle, boundaries } = state;
  if (
    ball.x + ball.dx > boundaries.width - ball.radius ||
    ball.x + ball.dx < ball.radius
  ) {
    ball.dx = -ball.dx;
  }
  if (ball.y + ball.dy < ball.radius) {
    ball.dy = -ball.dy;
  } else if (ball.y + ball.dy > boundaries.height - ball.radius) {
    if (ball.x > paddle.x && ball.x < paddle.x + paddle.width) {
      ball.dy = -ball.dy;
    } else {
      onGameOver();
    }
  }

  ball.x += ball.dx;
  ball.y += ball.dy;

  if (controls.rightPressed && paddle.x + paddle.width <= boundaries.width) {
    paddle.x += paddle.speed;
  } else if (controls.leftPressed && paddle.x >= 0) {
    paddle.x -= paddle.speed;
  }
}
