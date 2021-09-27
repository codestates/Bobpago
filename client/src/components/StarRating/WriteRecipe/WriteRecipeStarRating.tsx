import React from "react";
import Star from "./WriteRecipeStar";
import { StarRatingContainer } from "../styles";

interface RatingProps {
  size: number;
  rate: number;
  setDifficulty2?: any;
}

const StarRating = ({ size, rate, setDifficulty2 }: RatingProps) => {
  return (
    <StarRatingContainer>
      <Star
        setDifficulty={setDifficulty2}
        order={1}
        isOn={rate >= 1}
        size={size}
      />
      <Star
        setDifficulty={setDifficulty2}
        order={2}
        isOn={rate >= 2}
        size={size}
      />
      <Star
        setDifficulty={setDifficulty2}
        order={3}
        isOn={rate >= 3}
        size={size}
      />
    </StarRatingContainer>
  );
};

export default StarRating;
