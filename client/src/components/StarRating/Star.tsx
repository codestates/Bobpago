import React from "react";
import { StarFillIcon, StarIcon } from "./styles";

interface StarProps {
  size?: number;
  isOn?: boolean;
}

const Star = ({ size, isOn }: StarProps) => {
  return <>{isOn ? <StarFillIcon size={size} /> : <StarIcon size={size} />}</>;
};

export default Star;
