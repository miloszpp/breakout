export const settings = {
  canvasWidth: 800,
  canvasHeight: 600,
  brickRowCount: 6,
  brickColumnCount: 5,
  brickHeight: 20,
  brickPadding: 10,
  brickOffsetTop: 30,
  brickOffsetLeft: 30,
  brickColor: "#00a878",
  ballSpeed: 3,
  ballRadius: 10,
  ballColor: "#fe5e41",
  paddleSpeed: 5,
  paddleColor: "#f3c178",

  get brickWidth() {
    return (
      (this.canvasWidth - 2 * this.brickOffsetLeft) / this.brickColumnCount -
      this.brickPadding
    );
  },
};

export type GameSettigns = typeof settings;
