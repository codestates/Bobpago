import React, { useState } from "react";
import Star from "./WriteRecipeStar";
import { StarRatingContainer } from "../styles";

interface RatingProps {
  size: number;
  rate: number;
  setDifficulty2?: any;
}

const StarRating = ({ size, rate, setDifficulty2 }: RatingProps) => {
  const [tempRate, setTempRate] = useState<number | null>(null);

  return (
    <StarRatingContainer>
      <Star
        setDifficulty={setDifficulty2}
        order={1}
        isOn={tempRate ? tempRate >= 1 : rate >= 1}
        size={size}
        startemp={1}
        setTempRate={setTempRate}
      />
      <Star
        setDifficulty={setDifficulty2}
        order={2}
        isOn={tempRate ? tempRate >= 2 : rate >= 2}
        size={size}
        startemp={2}
        setTempRate={setTempRate}
      />
      <Star
        setDifficulty={setDifficulty2}
        order={3}
        isOn={tempRate ? tempRate >= 3 : rate >= 3}
        size={size}
        startemp={3}
        setTempRate={setTempRate}
      />
    </StarRatingContainer>
  );
};

export default StarRating;
