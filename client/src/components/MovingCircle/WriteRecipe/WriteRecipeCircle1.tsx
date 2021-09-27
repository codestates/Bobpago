import { useState, useRef, useEffect } from "react";
import { Circle } from "./styles";

interface Props {
  circle1IsHover: boolean;
}

const Circle1 = ({ circle1IsHover }: Props) => {
  const Circle1Ref = useRef<any>(null);
  const Circle2Ref = useRef<any>(null);
  const Circle3Ref = useRef<any>(null);

  useEffect(() => {
    Circle1Ref.current.style.animationPlayState = circle1IsHover
      ? "running"
      : "paused";
    Circle2Ref.current.style.animationPlayState = circle1IsHover
      ? "running"
      : "paused";
    Circle3Ref.current.style.animationPlayState = circle1IsHover
      ? "running"
      : "paused";
  }, [circle1IsHover]);

  return (
    <Circle>
      <span ref={Circle1Ref} />
      <span ref={Circle2Ref} />
      <span ref={Circle3Ref} />
    </Circle>
  );
};

export default Circle1;
