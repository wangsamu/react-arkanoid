import { useEffect, useRef, useCallback, useState } from "react";
import GameStyled from "./GameStyled";
import Player from "../../classes/Player";
import useFrame from "../../hooks/useFrame";
import Ball from "../../classes/Ball";
import Mob from "../../classes/Mob";

const Game = (): JSX.Element => {
  const [movement, setMovement] = useState<number>();
  const frameTime = useFrame();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const [player, setPlayer] = useState(new Player());
  const [ball, setBall] = useState(new Ball());
  const [mob, setMob] = useState(new Mob(15, 0));

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d") as CanvasRenderingContext2D;
    ctx.imageSmoothingEnabled = false;
    ctxRef.current = ctx;
    ctxRef.current!.drawImage(
      mob.sprite,
      0,
      0,
      mob.spriteWidth,
      mob.spriteHeight
    );
    mob.getSpriteData(ctx);
    mob.saveBricks();
    ctxRef.current.fillStyle = "black";
    ctxRef.current.fillRect(0, 0, canvas!.width, canvas!.height);
    ctxRef.current.stroke();
    ctxRef.current!.stroke();
    canvas!.focus();
  }, [mob]);
  const render = useCallback(() => {
    //player
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
    //mob
    mob.drawBricks(ctxRef.current!);
    //ball
    ctxRef.current!.fillStyle = ball.color;
    ctxRef.current!.fillRect(ball.posX, ball.posY, ball.width, ball.height);
    ctxRef.current!.stroke();
  }, [player, ball, mob]);

  const moveBall = useCallback(() => {
    ball.posY += ball.directionY * ball.speed;
    ball.posX += ball.directionX * ball.speed;
    ball.gridPosX = Math.round(ball.posX);
    ball.gridPosY = Math.round(ball.posY);
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
    (transformLocation: number) => {
      ball.posY = transformLocation;
      ball.directionY = ball.directionY * -1;
      setBall(ball);
    },
    [ball]
  );

  const changeBallDirectionX = useCallback(
    (transformLocation: number) => {
      ball.posX = transformLocation;
      ball.directionX = ball.directionX * -1;
      setBall(ball);
    },
    [ball]
  );

  const checkForPlayerCollision = useCallback(() => {
    if (
      ball.posY + ball.height >= player.posY &&
      ball.posY <= player.posY + player.height
    ) {
      if (
        ball.posX <= player.posX + player.spriteWidth &&
        ball.posX + ball.width >= player.posX
      ) {
        changeBallDirectionY(player.posY - ball.height);
        return;
      }
      return;
    }
  }, [ball, changeBallDirectionY, player]);

  const checkForWallCollision = useCallback(() => {
    if (ball.posX + ball.width >= canvasRef.current!.width) {
      changeBallDirectionX(canvasRef.current!.width - ball.width);
      return;
    }
    if (ball.posX <= 0) {
      changeBallDirectionX(0);
      return;
    }
    if (ball.posY <= 0) {
      changeBallDirectionY(0);
      return;
    }
  }, [ball, changeBallDirectionX, changeBallDirectionY]);

  const checkForBrickCollision = useCallback(() => {
    ball.getColliderPos(ball.posX, ball.posY);

    for (let i = 0; i < mob.bricks.length; i++) {
      //top
      if (
        ball.topColliderX >= mob.bricks[i].posX &&
        ball.topColliderX <= mob.bricks[i].posX + mob.bricks[i].width &&
        ball.topColliderY <= mob.bricks[i].posY + mob.bricks[i].height &&
        ball.topColliderY >= mob.bricks[i].posY
      ) {
        console.log("TOP COLLISION");
        changeBallDirectionY(mob.bricks[i].posY + mob.bricks[i].height);
        return;
      }
      //top
      if (
        ball.botColliderX >= mob.bricks[i].posX &&
        ball.botColliderX <= mob.bricks[i].posX + mob.bricks[i].width &&
        ball.botColliderY <= mob.bricks[i].posY + mob.bricks[i].height &&
        ball.botColliderY >= mob.bricks[i].posY
      ) {
        console.log("BOT COLLISION");
        changeBallDirectionY(mob.bricks[i].posY - ball.height);
        return;
      }
      //right
      if (
        ball.rightColliderX >= mob.bricks[i].posX &&
        ball.rightColliderX <= mob.bricks[i].posX + mob.bricks[i].width &&
        ball.rightColliderY >= mob.bricks[i].posY &&
        ball.rightColliderY <= mob.bricks[i].posY + mob.bricks[i].height
      ) {
        console.log("Right COLLISION");
        changeBallDirectionX(mob.bricks[i].posX - ball.width);
        return;
      }
      //left
      if (
        ball.leftColliderX >= mob.bricks[i].posX &&
        ball.leftColliderX <= mob.bricks[i].posX + mob.bricks[i].width &&
        ball.leftColliderY >= mob.bricks[i].posY &&
        ball.leftColliderY <= mob.bricks[i].posY + mob.bricks[i].height
      ) {
        console.log("LEFT COLLISION");
        changeBallDirectionX(mob.bricks[i].posX + mob.bricks[i].width);
        return;
      }
    }
  }, [ball, mob, changeBallDirectionX, changeBallDirectionY]);

  const checkForCollision = useCallback(() => {
    checkForPlayerCollision();
    checkForBrickCollision();
    checkForWallCollision();
  }, [checkForPlayerCollision, checkForWallCollision, checkForBrickCollision]);

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
        height={320}
      />
    </GameStyled>
  );
};

export default Game;
