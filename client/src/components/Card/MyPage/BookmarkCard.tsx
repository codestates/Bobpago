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
  removeBookmarkCheck?: any;
}

const BookmarkCard = ({
  index,
  fix,
  postData,
  removeBookmarkCheck,
}: FixProps) => {
  let history = useHistory();
  return (
    <CardContainer
      onClick={() =>
        !fix &&
        history.push({
          pathname: `/detailrecipe/:${postData.recipeId}`,
          state: postData.recipeId,
        })
      }
    >
      <RemoveIcon
        src="/img/minus.png"
        onClick={() => removeBookmarkCheck(index, postData.recipeId)}
        fix={fix}
      />
      <CardImage
        className="card__image"
        src={
          postData && postData.thumbnail
            ? `${process.env.REACT_APP_S3_IMG_URL}${postData.thumbnail}`
            : undefined
        }
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
            <CardTitle>{postData && postData.title}</CardTitle>
          </div>
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

export default BookmarkCard;
