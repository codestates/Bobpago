import React from "react";
import StarRating from "components/StarRating/StarRating";
import { useHistory } from "react-router-dom";
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
  index?: number;
  postData?: any;
  removeMyPost?: any;
}

const Card = ({ index, fix, postData, removeMyPost }: FixProps) => {
  let history = useHistory();
  return (
    <CardContainer
      onClick={() =>
        !fix &&
        history.push({
          pathname: `/detailrecipe/:${postData.id}`,
          state: postData.id,
        })
      }
    >
      <RemoveIcon
        src="/img/minus.png"
        onClick={() => removeMyPost(index, postData.id)}
        fix={fix}
      />
      <CardImage
        className="card__image"
        src={
          postData && postData.thumbnail
            ? process.env.REACT_APP_S3_IMG_URL + postData.thumbnail
            : undefined
        }
        alt=""
      />
      <CardOverlay className="card__overlay">
        <CardHeader className="card__header">
          {/* <CardArc>
            <path />
          </CardArc> */}
            {/* <CardThumb src="https://i.imgur.com/7D7I6dI.png" alt="" />
          <>
            <CardTitle>Jessica Parker</CardTitle>
            <CardStatus>1 hour ago</CardStatus> */}
            <CardTitle>{postData && postData.title}</CardTitle>
        </CardHeader>
        <CardDescription>
          난이도:{" "}
          <RatingContainer>
            <StarRating size={1} rate={postData && postData.level} />
          </RatingContainer>
          <LikeNum> &nbsp;{postData && postData.views}</LikeNum>
          {/* <HeartIcon /> */}
          &nbsp;
        </CardDescription>
      </CardOverlay>
    </CardContainer>
  );
};

export default Card;
