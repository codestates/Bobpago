import React from "react";
import { StarFillIcon, StarIcon } from "../styles";

interface StarProps {
  size?: number;
  isOn?: boolean;
  setDifficulty?: any;
  order?: number;
}

const Star = ({ size, isOn, setDifficulty, order }: StarProps) => {
  return (
    <>
      {isOn ? (
        <StarFillIcon onClick={() => setDifficulty(order)} size={size} />
      ) : (
        <StarIcon onClick={() => setDifficulty(order)} size={size} />
      )}
    </>
  );
};

export default Star;
