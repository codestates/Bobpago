import React from "react";
import Star from "./Star";
import { StarRatingContainer } from "./styles";

interface RatingProps {
  size: number;
  rate: number;
}

const StarRating = ({ size, rate }: RatingProps) => {
  return (
    <StarRatingContainer>
      <Star isOn={rate >= 1} size={size} />
      <Star isOn={rate >= 2} size={size} />
      <Star isOn={rate >= 3} size={size} />
    </StarRatingContainer>
  );
};

export default StarRating;
