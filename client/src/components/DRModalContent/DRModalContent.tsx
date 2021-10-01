import React, { useState, useEffect } from "react";
import { RootState } from "reducers";
import { useSelector } from "react-redux";
import axios from "axios";
import Profile from "components/Profile/Comment/Profile";
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
} from "./styles";

interface Props {
  comment: any;
  setCommentData: any;
}

const DRModalContent = ({ comment, setCommentData }: Props) => {
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
    try {
      const data = await axios.delete(
        `${serverUrl}/recipe/${comment.recipeId}/comment/${comment.id}?tokenType=${tokenType}`,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${accessToken}`,
          },
        }
      );
      getData();
    } catch (err) {
      console.log(err);
    }
  };

  const handleEditComment = async () => {
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
              authorization: `Bearer ${accessToken}`,
            },
          }
        );
        setEdit(false);
        getData();
      } else {
        setEdit(true);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Container>
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
            <EditIcon onClick={() => handleEditComment()} />
          </>
        )}
      </Container>
    </>
  );
};

export default DRModalContent;
