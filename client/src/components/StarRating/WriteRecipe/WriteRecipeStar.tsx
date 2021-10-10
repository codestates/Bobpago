import React, { useEffect } from "react";
import useHover from "utils/useHover";
import { StarFillIcon, StarIcon } from "../styles";

interface StarProps {
  size?: number;
  isOn?: boolean;
  setDifficulty?: any;
  order?: number;
  startemp?: any;
  setTempRate?: any;
}

const Star = ({
  size,
  isOn,
  setDifficulty,
  order,
  startemp,
  setTempRate,
}: StarProps) => {
  const [star, starIsHover] = useHover();

  useEffect(() => {
    starIsHover ? setTempRate(startemp) : setTempRate(null);
  }, [starIsHover]);
  return (
    <>
      {isOn ? (
        <StarFillIcon
          ref={star}
          onClick={() => setDifficulty(order)}
          size={size}
        />
      ) : (
        <StarIcon ref={star} onClick={() => setDifficulty(order)} size={size} />
      )}
    </>
  );
};

export default Star;
