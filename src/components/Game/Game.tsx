import { useEffect, useRef } from "react";
import GameStyled from "./GameStyled";

const Game = (): JSX.Element => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d") as CanvasRenderingContext2D;
    ctx.imageSmoothingEnabled = false;
    ctxRef.current = ctx;
    ctxRef.current.fillStyle = "black";
    ctxRef.current.fillRect(0, 0, canvas!.width, canvas!.height);
    ctxRef.current.stroke();
  }, []);

  return (
    <GameStyled className="game">
      <h2 className="game__title">GAME</h2>
      <canvas
        className={"game__canvas"}
        ref={canvasRef}
        width={320}
        height={480}
      />
    </GameStyled>
  );
};

export default Game;
