import { useState, useRef, useEffect } from "react";
import { Circle2Container } from "./styles";

interface Props {
  circle2IsHover: boolean;
}

const Circle2 = ({ circle2IsHover }: Props) => {
  const Circle1Ref = useRef<any>(null);
  const Circle2Ref = useRef<any>(null);
  const Circle3Ref = useRef<any>(null);

  useEffect(() => {
    Circle1Ref.current.style.animationPlayState = circle2IsHover
      ? "running"
      : "paused";
    Circle2Ref.current.style.animationPlayState = circle2IsHover
      ? "running"
      : "paused";
    Circle3Ref.current.style.animationPlayState = circle2IsHover
      ? "running"
      : "paused";
  }, [circle2IsHover]);

  return (
    <Circle2Container>
      <span ref={Circle1Ref} />
      <span ref={Circle2Ref} />
      <span ref={Circle3Ref} />
    </Circle2Container>
  );
};

export default Circle2;
