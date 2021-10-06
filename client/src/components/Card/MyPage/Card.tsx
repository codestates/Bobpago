import React, {useEffect, useState} from "react";
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
import {ModalBackground2} from "../../../pages/MyOrUserPage/styles";
import {ModalBtn, ModalBtnNo, ModalContainer, ModalTitle} from "../../../pages/EditRecipe/styles";

interface FixProps {
  fix?: boolean;
  index?: number;
  postData?: any;
  removeMyPost?: any;
  deleteRecipeModal?: any;
  setDeleteRecipeModal?: any;
}

const Card = ({ index, fix, postData, removeMyPost,deleteRecipeModal, setDeleteRecipeModal }: FixProps) => {
  let history = useHistory();
  const [postId, setPostId] = useState(null)
  const [postIndex, setPostIndex] = useState(null)

  console.log(index, postData.id);
  async function handleState() {
    await setPostId(postData.id)
    await setPostIndex(index)
  }
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
        onClick={async () => {
         // removeMyPost(index, postData.id)
         // console.log(index, postData.id)
          await handleState()
          setDeleteRecipeModal(true)
        }}
        fix={fix}
      />
      {deleteRecipeModal && (
          <>
            <ModalBackground2 onClick={() => setDeleteRecipeModal(false)} />
            <ModalContainer>
              <ModalTitle>레시피를 정말 삭제하시겠습니까?</ModalTitle>
              <ModalBtn onClick={() =>{
                console.log('✅',postId, postIndex);
               //removeMyPost(index, postData.id)
              }}>네</ModalBtn>
              &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
              <ModalBtnNo onClick={() => setDeleteRecipeModal(false)}>아니요</ModalBtnNo>
            </ModalContainer>
          </>
      )}
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
