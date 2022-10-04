import { useEffect, useRef, useCallback, useState } from "react";
import GameStyled from "./GameStyled";
import Player from "../../classes/Player";
import useFrame from "../../hooks/useFrame";
import Ball from "../../classes/Ball";
import Mob from "../../classes/Mob";
import Particle from "../../classes/Particle";
import useSound from "../../hooks/useSound";

const Game = (): JSX.Element => {
  const { playSound } = useSound();
  const [movement, setMovement] = useState<number>();
  const frameTime = useFrame();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const [player, setPlayer] = useState(new Player());
  const [ball, setBall] = useState(new Ball());
  const [mob, setMob] = useState(new Mob(10, 0, 0));
  const [particles, setParticles] = useState<Particle[]>([]);
  const [score, setScore] = useState(0);
  const backgroundColor = "#070F09";

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d") as CanvasRenderingContext2D;
    ctx.imageSmoothingEnabled = false;
    ctxRef.current = ctx;
    if (mob.bricks.length === 0) {
      mob.drawMob(ctxRef.current!);
      mob.getSpriteData(ctx);
      mob.saveBricks();
    }
    ctxRef.current.fillStyle = backgroundColor;
    ctxRef.current.fillRect(0, 0, canvas!.width, canvas!.height);
    ctxRef.current.stroke();
    ctxRef.current!.stroke();
    canvas!.focus();
  }, [mob]);

  const render = useCallback(() => {
    player.drawPlayer(ctxRef.current!);
    mob.drawBricks(ctxRef.current!);
    ball.drawBall(ctxRef.current!);
    particles.forEach((particle) => {
      particle.drawParticles(ctxRef.current!);
    });
  }, [player, ball, mob, particles]);

  const moveBall = useCallback(() => {
    ball.posY += ball.directionY * ball.speed;
    ball.posX += ball.directionX * ball.speed;
    ball.gridPosX = Math.round(ball.posX);
    ball.gridPosY = Math.round(ball.posY);
    setBall(ball);
  }, [ball]);

  const clearScreen = useCallback(() => {
    ctxRef.current!.fillStyle = backgroundColor;
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
        ball.posX <= player.posX + player.barWidth &&
        ball.posX + ball.width >= player.posX
      ) {
        playSound("hit");
        changeBallDirectionY(player.posY - ball.height);
        return;
      }
      return;
    }
  }, [ball, changeBallDirectionY, player, playSound]);

  const checkForWallCollision = useCallback(() => {
    if (ball.posX + ball.width >= canvasRef.current!.width) {
      playSound("hit");
      changeBallDirectionX(canvasRef.current!.width - ball.width);
      return;
    }
    if (ball.posX <= 0) {
      playSound("hit");
      changeBallDirectionX(0);
      return;
    }
    if (ball.posY <= 0) {
      playSound("hit");
      changeBallDirectionY(0);
      return;
    }
  }, [ball, changeBallDirectionX, changeBallDirectionY, playSound]);

  const checkForBrickCollision = useCallback(() => {
    let touchingTop = false;
    let touchingBot = false;
    let touchingRight = false;
    let touchingLeft = false;
    ball.getColliderPos(ball.posX, ball.posY);
    for (let i = 0; i < mob.bricks.length; i++) {
      if (
        ball.topColliderX >= mob.bricks[i].posX &&
        ball.topColliderX <= mob.bricks[i].posX + mob.bricks[i].width &&
        ball.topColliderY <= mob.bricks[i].posY + mob.bricks[i].height &&
        ball.topColliderY >= mob.bricks[i].posY
      ) {
        console.log("TOP HIT");
        touchingTop = true;
      }
      if (
        ball.botColliderX >= mob.bricks[i].posX &&
        ball.botColliderX <= mob.bricks[i].posX + mob.bricks[i].width &&
        ball.botColliderY <= mob.bricks[i].posY + mob.bricks[i].height &&
        ball.botColliderY >= mob.bricks[i].posY
      ) {
        touchingBot = true;
      }
      if (
        ball.rightColliderX >= mob.bricks[i].posX &&
        ball.rightColliderX <= mob.bricks[i].posX + mob.bricks[i].width &&
        ball.rightColliderY >= mob.bricks[i].posY &&
        ball.rightColliderY <= mob.bricks[i].posY + mob.bricks[i].height
      ) {
        touchingRight = true;
      }
      if (
        ball.leftColliderX >= mob.bricks[i].posX &&
        ball.leftColliderX <= mob.bricks[i].posX + mob.bricks[i].width &&
        ball.leftColliderY >= mob.bricks[i].posY &&
        ball.leftColliderY <= mob.bricks[i].posY + mob.bricks[i].height
      ) {
        touchingLeft = true;
      }
      if (touchingTop || touchingBot || touchingLeft || touchingRight) {
        if (touchingTop)
          changeBallDirectionY(mob.bricks[i].posY + mob.bricks[i].height);
        else if (touchingBot)
          changeBallDirectionY(mob.bricks[i].posY - ball.height);
        else if (touchingRight)
          changeBallDirectionX(mob.bricks[i].posX - ball.width);
        else if (touchingLeft)
          changeBallDirectionX(mob.bricks[i].posX + mob.bricks[i].width);
        const newParticles = [];
        for (let x = 0; x < 4; x++) {
          newParticles[x] = new Particle(
            mob.bricks[i].posX + x,
            mob.bricks[i].posY,
            mob.bricks[i].color,
            Math.round(Math.random() * (3 - 2) + 2),
            Math.random() * (1.5 - 1) + 1
          );
        }
        setParticles([...particles, ...newParticles]);
        mob.destroyBrick(mob.bricks[i]);
        setScore(score + 10);
        playSound("brick");
        return;
      }
    }
  }, [
    ball,
    mob,
    changeBallDirectionX,
    changeBallDirectionY,
    particles,
    score,
    playSound,
  ]);

  const checkForParticleCollision = useCallback(() => {
    for (let i = 0; i < particles.length; i++) {
      if (
        particles[i].posY + particles[i].height >= player.posY &&
        particles[i].posY <= player.posY + player.height
      ) {
        if (
          particles[i].posX <= player.posX + player.barWidth &&
          particles[i].posX + particles[i].width >= player.posX
        ) {
          playSound("coin");
          setScore(score + 1);
          setParticles(
            particles.filter((particle) => particle !== particles[i])
          );
          return;
        }
        return;
      }
    }
  }, [player, particles, score, playSound]);

  const checkForCollision = useCallback(() => {
    checkForPlayerCollision();
    checkForParticleCollision();
    checkForBrickCollision();
    checkForWallCollision();
  }, [
    checkForPlayerCollision,
    checkForWallCollision,
    checkForBrickCollision,
    checkForParticleCollision,
  ]);

  const movePlayer = useCallback(() => {
    if (movement === -1) {
      player.walkAnimation(movement);
      player.posX -= player.speed;
      setPlayer(player);
      return;
    }
    if (movement === +1) {
      player.walkAnimation(movement);
      player.posX += player.speed;
      setPlayer(player);
      return;
    }
  }, [player, movement]);

  const moveParticles = useCallback(() => {
    particles.forEach((particle) => {
      particle.moveParticles();
    });
  }, [particles]);

  const destroyItems = useCallback(() => {
    for (let i = 0; i < particles.length; i++) {
      if (particles[i].posY >= canvasRef.current!.height) {
        setParticles(particles.filter((particle) => particle !== particles[i]));
      }
    }
  }, [particles]);

  const gameLoop = useCallback(() => {
    destroyItems();
    movePlayer();
    clearScreen();
    checkForCollision();
    moveParticles();
    moveBall();

    render();
  }, [
    clearScreen,
    moveBall,
    render,
    checkForCollision,
    movePlayer,
    destroyItems,
    moveParticles,
  ]);

  useEffect(() => {
    gameLoop();
  }, [frameTime, gameLoop]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLCanvasElement>) => {
    if (event.key === "d") {
      setMovement(+1);
      return;
    }
    if (event.key === "a") {
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
      <div className="game__wrap">
        <canvas
          tabIndex={0}
          className={"game__canvas"}
          onKeyDown={(event) => handleKeyDown(event)}
          onKeyUp={(event) => handleKeyUp(event)}
          ref={canvasRef}
          width={320}
          height={240}
        />
        <div className="game__score">
          <ul>
            <li>
              <h2>SCORE</h2>
              <span>{score}</span>
            </li>
          </ul>
        </div>
      </div>
    </GameStyled>
  );
};

export default Game;
