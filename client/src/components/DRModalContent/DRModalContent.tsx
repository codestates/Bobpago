import React, { useState, useEffect, useRef } from "react";
import { RootState } from "reducers";
import { useSelector, useDispatch } from "react-redux";
import axios, { AxiosError } from "axios";
import Profile from "components/Profile/Comment/Profile";
import CheckExpired from "utils/CheckExpired";
import { reissueAccessToken, removeAccessToken } from "actions/Accesstoken";
import {
  UserProfile,
  ProfileImage,
  UserEtcBox,
  UserName,
  UpdatedAt,
  CommentContent,
  CommentEdit,
  CommentImage,
  Container,
  RemoveIcon,
  EditIcon,
  EditCompleteIcon,
  LikeIcon,
  LikeContainer,
  LikeText,
} from "./styles";
import { useHistory } from "react-router-dom";

interface Props {
  comment: any;
  setCommentData: any;
}

const DRModalContent = ({ comment, setCommentData }: Props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const serverUrl = process.env.REACT_APP_SERVER_URL;
  const S3Url = process.env.REACT_APP_S3_IMG_URL;
  const {
    accessToken,
    tokenType,
    userId: myId,
  } = useSelector((state: RootState) => state.AccesstokenReducer);
  const [time, setTime] = useState("2021-01-01[월]");
  const [editCommentInput, setEditCommentInput] = useState<string>("");
  const [edit, setEdit] = useState<boolean>(false);
  const [reaction, setReaction] = useState<any>([]);

  const likeRef = useRef<any>(null);

  const loginState = useSelector(
    (state: RootState) => state.AccesstokenReducer
  );
  useEffect(() => {
    setTime(changeTime(comment.updatedAt));
    setEditCommentInput(comment.content);
  }, []);

  async function getData() {
    const data = await axios.get(
      `${serverUrl}/recipe/${comment.recipeId}/comment`,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    setCommentData(data.data.data);
  }

  const changeTime = (time: string) => {
    const week = ["일", "월", "화", "수", "목", "금", "토"];
    const year = time.slice(0, 4);
    const month = time.slice(5, 7);
    const data = time.slice(8, 10);
    const day = year + "-" + month + "-" + data;
    const DOW = week[new Date(day).getDay()];
    return `${day}(${DOW})`;
  };

  const handleDeleteComment = async () => {
    let newToken = null;
    if (accessToken) {
      newToken = await CheckExpired(accessToken, tokenType, myId);
      if (newToken) {
        dispatch(reissueAccessToken(newToken));
      }
    }
    try {
      const data = await axios.delete(
        `${serverUrl}/recipe/${comment.recipeId}/comment/${comment.id}?tokenType=${tokenType}`,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${newToken ? newToken : accessToken}`,
          },
        }
      );
      getData();
    } catch (err) {
      const error = err as AxiosError;
      if (error.response) {
        if (error.response.status === 401) {
          dispatch(removeAccessToken());
        }
      }
    }
  };

  const handleEditComment = async () => {
    let newToken = null;
    if (accessToken) {
      newToken = await CheckExpired(accessToken, tokenType, myId);
      if (newToken) {
        dispatch(reissueAccessToken(newToken));
      }
    }
    try {
      if (edit) {
        const data = await axios.patch(
          `${serverUrl}/recipe/${comment.recipeId}/comment/${comment.id}?tokenType=${tokenType}`,
          {
            content: editCommentInput,
          },
          {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
              authorization: `Bearer ${newToken ? newToken : accessToken}`,
            },
          }
        );
        setEdit(false);
        getData();
      } else {
        setEdit(true);
      }
    } catch (err) {
      const error = err as AxiosError;
      if (error.response) {
        if (error.response.status === 401) {
          dispatch(removeAccessToken());
        }
      }
    }
  };

  const handleCommentReactions = async () => {
    try {
      if (loginState.accessToken) {
        const newToken = await CheckExpired(
          loginState.accessToken,
          loginState.tokenType,
          loginState.userId
        );
        if (newToken) {
          dispatch(reissueAccessToken(newToken));
        }
      }

      const data = await axios.get(
        `${serverUrl}/recipe/${comment.recipeId}/comment`,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const newData = data.data.data.filter(
        (item: any) => comment.id === item.id
      );

      let nextReaction: number = 0;
      const isLiked =
        newData[0].commentReactions.filter(
          (item: { userId: number }) => item.userId === loginState.userId
        ).length >= 1;

      if (isLiked === true) {
        nextReaction = 0;
        likeRef.current.textContent--;
      } else if (isLiked === false) {
        nextReaction = 1;
        likeRef.current.textContent++;
      }

      const postReactionData = await axios.post(
        `${serverUrl}/recipe/${comment.recipeId}/comment/${comment.id}?reaction=${nextReaction}&tokenType=${loginState.tokenType}`,
        {},
        {
          withCredentials: true,
          headers: {
            authorization: `Bearer ${loginState.accessToken}`,
          },
        }
      );
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Container>
        <LikeContainer>
          <LikeIcon onClick={handleCommentReactions} />
          <LikeText ref={likeRef}>{comment.commentReactions.length}</LikeText>
        </LikeContainer>
        <UserProfile>
          <ProfileImage>
            <Profile
              size={3}
              src={
                comment &&
                comment.user.imageUrl &&
                S3Url + comment.user.imageUrl
              }
            />
          </ProfileImage>
          <UserEtcBox>
            <UserName>{comment && comment.user.nickname}</UserName>
            <UpdatedAt>{time}</UpdatedAt>
          </UserEtcBox>
        </UserProfile>
        {!edit ? (
          <CommentContent>{comment && comment.content}</CommentContent>
        ) : (
          <CommentEdit
            value={editCommentInput}
            onChange={(e) => setEditCommentInput(e.target.value)}
          />
        )}
        {comment.imageUrl && (
          <CommentImage src={S3Url + comment.imageUrl} alt="없는 이미지" />
        )}
        {comment && comment.user.id === myId && (
          <>
            <RemoveIcon onClick={() => handleDeleteComment()} />
            {!edit ? (
              <EditIcon onClick={() => handleEditComment()} />
            ) : (
              <EditCompleteIcon onClick={() => handleEditComment()} />
            )}
          </>
        )}
      </Container>
    </>
  );
};

export default DRModalContent;
