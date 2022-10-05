import { useEffect, useState } from "react";

const useFrame = () => {
  const [frame, setFrame] = useState<number>();
  useEffect(() => {
    let frameId: number;
    const frame = (time: number) => {
      setFrame(time);
      frameId = requestAnimationFrame(frame);
      console.log(frameId, time);
    };

    requestAnimationFrame(frame);
    return () => cancelAnimationFrame(frameId);
  }, []);
  return frame;
};

export default useFrame;
