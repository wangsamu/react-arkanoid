import { useEffect, useRef, useCallback, useState } from "react";
import GameStyled from "./GameStyled";
import Player from "../../classes/Player";
import useFrame from "../../hooks/useFrame";
import Ball from "../../classes/Ball";

const Game = (): JSX.Element => {
  const [movement, setMovement] = useState<number>();
  const frameTime = useFrame();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const [player, setPlayer] = useState(new Player());
  const [ball, setBall] = useState(new Ball());

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d") as CanvasRenderingContext2D;
    ctx.imageSmoothingEnabled = false;
    ctxRef.current = ctx;
    ctxRef.current.fillStyle = "black";
    ctxRef.current.fillRect(0, 0, canvas!.width, canvas!.height);
    ctxRef.current.stroke();
    canvas!.focus();
  }, []);

  const render = useCallback(() => {
    ctxRef.current!.drawImage(
      player.sprite,
      player.spritePosX,
      player.spritePosY,
      player.spriteWidth,
      player.spriteHeight,
      player.posX,
      player.posY,
      player.spriteWidth,
      player.spriteHeight
    );
    ctxRef.current!.stroke();
    ctxRef.current!.fillStyle = ball.color;
    ctxRef.current!.fillRect(ball.posX, ball.posY, ball.width, ball.height);
    ctxRef.current!.stroke();
  }, [player, ball]);

  const moveBall = useCallback(() => {
    ball.posY += ball.directionY * ball.speed;
    ball.posX += ball.directionX * ball.speed;
    setBall(ball);
  }, [ball]);

  const clearScreen = useCallback(() => {
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
  }, []);

  const changeBallDirectionY = useCallback(
    (playerHit: boolean) => {
      if (playerHit) ball.posY = player.posY - ball.height;
      ball.directionY = ball.directionY * -1;
      setBall(ball);
    },
    [ball, player]
  );

  const changeBallDirectionX = useCallback(() => {
    ball.directionX = ball.directionX * -1;
    setBall(ball);
  }, [ball]);

  const checkForPlayerCollision = useCallback(() => {
    if (
      ball.posY + ball.height >= player.posY &&
      ball.posY <= player.posY + player.spriteHeight
    ) {
      if (
        ball.posX <= player.posX + player.spriteWidth &&
        ball.posX + ball.width >= player.posX
      ) {
        changeBallDirectionY(true);
        return;
      }
      return;
    }
  }, [ball, changeBallDirectionY, player]);

  const checkForWallCollision = useCallback(() => {
    if (ball.posX + ball.width >= canvasRef.current!.width) {
      changeBallDirectionX();
      return;
    }
    if (ball.posX <= 0) {
      changeBallDirectionX();
      return;
    }
    if (ball.posY <= 0) {
      changeBallDirectionY(false);
      return;
    }
  }, [ball, changeBallDirectionX, changeBallDirectionY]);

  const checkForCollision = useCallback(() => {
    checkForPlayerCollision();
    checkForWallCollision();
  }, [checkForPlayerCollision, checkForWallCollision]);

  const movePlayer = useCallback(() => {
    if (movement === -1) {
      player.rightMoveAnimation();
      player.posX -= player.speed;
      setPlayer(player);
      return;
    }
    if (movement === +1) {
      player.leftMoveAnimation();
      player.posX += player.speed;
      setPlayer(player);
      return;
    }
  }, [player, movement]);

  const gameLoop = useCallback(() => {
    movePlayer();
    clearScreen();
    checkForCollision();
    moveBall();

    render();
  }, [clearScreen, moveBall, render, checkForCollision, movePlayer]);

  useEffect(() => {
    gameLoop();
  }, [frameTime, gameLoop]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLCanvasElement>) => {
    if (event.key === "d") {
      player.rightMoveAnimation();
      setMovement(+1);
      return;
    }
    if (event.key === "a") {
      player.leftMoveAnimation();
      setMovement(-1);
      return;
    }
  };

  const handleKeyUp = (event: React.KeyboardEvent<HTMLCanvasElement>) => {
    if (event.key === "d" || event.key === "a") {
      setMovement(0);
      return;
    }
  };

  return (
    <GameStyled className="game">
      <h2 className="game__title">GAME</h2>

      <canvas
        tabIndex={0}
        className={"game__canvas"}
        onKeyDown={(event) => handleKeyDown(event)}
        onKeyUp={(event) => handleKeyUp(event)}
        ref={canvasRef}
        width={320}
        height={400}
      />
    </GameStyled>
  );
};

export default Game;
