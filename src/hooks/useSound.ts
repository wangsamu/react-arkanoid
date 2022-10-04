import coinSound from "../sound/coin.wav";
import brickSound from "../sound/brick.wav";
import hitSound from "../sound/hit.wav";

const useSound = () => {
  const playSound = (name: "hit" | "brick" | "coin") => {
    let soundFX: HTMLAudioElement = new Audio();

    if (name === "hit") soundFX.src = hitSound;
    else if (name === "brick") soundFX.src = brickSound;
    else if (name === "coin") soundFX.src = coinSound;

    soundFX.play();

    soundFX.onended = () => {
      soundFX.src = "";
      soundFX.remove();
      soundFX.srcObject = null;
    };
  };

  return { playSound };
};

export default useSound;
