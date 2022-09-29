import { useEffect, useRef, useCallback, useState } from "react";
import GameStyled from "./GameStyled";
import Player from "../../classes/Player/Player";
import useFrame from "../../hooks/useFrame";

const Game = (): JSX.Element => {
  const frameTime = useFrame();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const [player, setPlayer] = useState(new Player());

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d") as CanvasRenderingContext2D;
    ctx.imageSmoothingEnabled = false;
    ctxRef.current = ctx;
    ctxRef.current.fillStyle = "black";
    ctxRef.current.fillRect(0, 0, canvas!.width, canvas!.height);
    ctxRef.current.stroke();
  }, []);

  const renderPlayer = useCallback(() => {
    clearScreen();
    ctxRef.current!.fillStyle = player.color;
    ctxRef.current!.fillRect(
      player.startPosX,
      player.startPosY,
      player.width,
      player.height
    );
    ctxRef.current!.stroke();
  }, [player]);

  const gameLoop = useCallback(() => {
    clearScreen();
    renderPlayer();
  }, [renderPlayer]);

  useEffect(() => {
    gameLoop();
  }, [frameTime, gameLoop]);

  const clearScreen = () => {
    ctxRef.current!.fillStyle = "black";
    ctxRef.current!.clearRect(
      0,
      0,
      canvasRef.current!.width,
      canvasRef.current!.height
    );
    ctxRef.current!.fillRect(
      0,
      0,
      canvasRef.current!.width,
      canvasRef.current!.height
    );
  };

  const movePlayer = (direction: number) => {
    player.startPosX += direction;
    setPlayer(player);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLCanvasElement>) => {
    if (event.key === "d") movePlayer(player.speed);
    if (event.key === "a") movePlayer(player.speed * -1);
  };

  return (
    <GameStyled className="game">
      <h2 className="game__title">GAME</h2>
      <canvas
        tabIndex={0}
        className={"game__canvas"}
        onKeyDown={(event) => handleKeyDown(event)}
        ref={canvasRef}
        width={320}
        height={480}
      />
    </GameStyled>
  );
};

export default Game;
