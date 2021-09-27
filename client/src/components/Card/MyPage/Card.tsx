import React, { useRef } from "react";
import StarRating from "components/StarRating/StarRating";
import {
  CardContainer,
  CardImage,
  CardOverlay,
  CardHeader,
  CardArc,
  CardTitle,
  CardStatus,
  CardThumb,
  CardDescription,
  RatingContainer,
  HeartIcon,
  RemoveIcon,
  LikeNum,
} from "../styles";

interface FixProps {
  fix?: boolean;
}

const Card = ({ fix }: FixProps) => {
  return (
    <CardContainer>
      <RemoveIcon fix={fix} />
      <CardImage
        className="card__image"
        src="https://image.freepik.com/free-photo/cheesy-tokbokki-korean-traditional-food-black-board-background-lunch-dish_1150-42988.jpg"
        alt=""
      />
      <CardOverlay className="card__overlay">
        <CardHeader className="card__header">
          {/* <CardArc>
            <path />
          </CardArc> */}
          <div>
            {/* <CardThumb src="https://i.imgur.com/7D7I6dI.png" alt="" />
          <>
            <CardTitle>Jessica Parker</CardTitle>
            <CardStatus>1 hour ago</CardStatus> */}
            <CardTitle>맛있는 떡볶이</CardTitle>
          </div>
        </CardHeader>
        <CardDescription>
          난이도:{" "}
          <RatingContainer>
            <StarRating size={1} rate={1} />
          </RatingContainer>
          <LikeNum> &nbsp;123</LikeNum>
          <HeartIcon />
          &nbsp;
        </CardDescription>
      </CardOverlay>
    </CardContainer>
  );
};

export default Card;
