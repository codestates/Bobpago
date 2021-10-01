import DRModalContent from "components/DRModalContent/DRModalContent";
import axios from "axios";
import { TotalSudoContainer } from "components/DRModalContent/styles";
import { useSelector } from "react-redux";
import { RootState } from "reducers";
import React, { useState, useEffect, useRef } from "react";
import {
  CommentModal,
  CommentContainer,
  SudoContainer,
  PostCommentContainer,
  PostCommentInput,
  ButtonContainer,
  CommentPostButton,
  CloseIcon,
  CameraIcon,
} from "./styles";

interface DRModalProps {
  handleModalClose: VoidFunction;
  recipeId: any;
}

const DRModal: React.FC<DRModalProps> = ({ handleModalClose, recipeId }) => {
  const { accessToken, tokenType } = useSelector(
    (state: RootState) => state.AccesstokenReducer
  );
  const serverUrl = process.env.REACT_APP_SERVER_URL;
  const [commentData, setCommentData] = useState<any>([]);
  const [commentInput, setCommentInput] = useState<string>("");
  const [imgInput, setImgInput] = useState<any>("");
  const inputImgRef = useRef<any>(null);

  async function getData() {
    const data = await axios.get(`${serverUrl}/recipe/${recipeId}/comment`, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    });
    setCommentData(data.data.data);
    console.log(data);
  }

  useEffect(() => {
    getData();
  }, []);

  //댓글 누를 때 토큰 없으면 로그인 화면 띄움
  const handleShowLogin = () => {};

  // 댓글 작성
  const handlePostComment = async () => {
    try {
      const data = await axios.post(
        `${serverUrl}/recipe/${recipeId}/comment?tokenType=${tokenType}`,
        {
          content: commentInput,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${accessToken}`,
          },
        }
      );
      const commentId = data.data.data.id;
      console.log(data.data.data);
      if (imgInput) {
        const formData = new FormData();
        formData.append("files", imgInput);
        const uploadImg = await axios.post(
          `${serverUrl}/image/${commentId}?tokenType=${tokenType}&path=comment`,
          formData,
          {
            withCredentials: true,
            headers: {
              "Content-Type": "multipart/form-data",
              authorization: `Bearer ${accessToken}`,
            },
          }
        );
      }
      setCommentInput("");
      setImgInput("");
      getData();
    } catch (err) {
      console.log(err);
    }
  };

  const handleImgInputClick = () => {
    if (inputImgRef.current) inputImgRef.current.click();
  };

  const handleImgChange = (e: any) => {
    setImgInput(e.target.files[0]);
  };

  return (
    <CommentModal>
      <TotalSudoContainer onClick={handleModalClose} />
      <CommentContainer>
        <CloseIcon onClick={handleModalClose} />
        <SudoContainer>
          {commentData
            ? commentData.map((el: any, i: number) => (
                <DRModalContent
                  setCommentData={setCommentData}
                  key={i}
                  comment={el}
                />
              ))
            : "아직 댓글이 없습니다"}
        </SudoContainer>
        <PostCommentContainer>
          <PostCommentInput
            value={commentInput}
            onChange={(e) => setCommentInput(e.target.value)}
            onClick={() => handleShowLogin()}
            placeholder={
              accessToken
                ? "공개 댓글 추가..."
                : "로그인을 해야 댓글을 달 수 있습니다"
            }
          ></PostCommentInput>
          <input
            type="file"
            ref={inputImgRef}
            hidden
            onChange={handleImgChange}
          />
          <CameraIcon onClick={() => handleImgInputClick()} />
          <ButtonContainer>
            <CommentPostButton color="transparent">취소</CommentPostButton>
            <CommentPostButton
              onClick={() => handlePostComment()}
              color="#3DA6FF"
            >
              댓글
            </CommentPostButton>
          </ButtonContainer>
        </PostCommentContainer>
      </CommentContainer>
    </CommentModal>
  );
};

export default DRModal;
