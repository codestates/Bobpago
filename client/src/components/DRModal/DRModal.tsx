import DRModalContent from "components/DRModalContent/DRModalContent";
import axios, { AxiosError } from "axios";
import { TotalSudoContainer } from "components/DRModalContent/styles";
import { useDispatch, useSelector } from "react-redux";
import CheckExpired from "utils/CheckExpired";
import { reissueAccessToken, removeAccessToken } from "actions/Accesstoken";
import { RootState } from "reducers";
import React, { useState, useEffect, useRef } from "react";
import { showSignUp } from "actions/SignUpAndSignIn";
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
  ImgText,
  NoCommentText,
  NoCommentContainer,
} from "./styles";
import { useHistory } from "react-router-dom";

interface DRModalProps {
  handleModalClose: VoidFunction;
  recipeId: any;
}

const DRModal: React.FC<DRModalProps> = ({ handleModalClose, recipeId }) => {
  const dispatch = useDispatch();
  const { accessToken, tokenType, userId } = useSelector(
    (state: RootState) => state.AccesstokenReducer
  );
  const serverUrl = process.env.REACT_APP_SERVER_URL;
  const [commentData, setCommentData] = useState<any>([]);
  const [commentInput, setCommentInput] = useState<string>("");
  const [imgInput, setImgInput] = useState<any>("");
  const inputImgRef = useRef<any>(null);
  const history = useHistory();

  async function getData() {
    const data = await axios.get(`${serverUrl}/recipe/${recipeId}/comment`, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    });
    setCommentData(data.data.data);
  }

  useEffect(() => {
    getData();
  }, []);

  //댓글 누를 때 토큰 없으면 로그인 화면 띄움
  const handleShowLogin = () => {
    if (!accessToken) dispatch(showSignUp());
  };

  // 댓글 작성
  const handlePostComment = async () => {
    let newToken = null;
    if (accessToken) {
      newToken = await CheckExpired(accessToken, tokenType, userId);
      if (newToken) {
        dispatch(reissueAccessToken(newToken));
      }
    }
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
            authorization: `Bearer ${newToken ? newToken : accessToken}`,
          },
        }
      );
      const commentId = data.data.data.id;
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
              authorization: `Bearer ${newToken ? newToken : accessToken}`,
            },
          }
        );
      }
      setCommentInput("");
      setImgInput("");
      getData();
    } catch (err) {
      const error = err as AxiosError;
      if (error.response) {
        if (error.response.status === 401) {
          dispatch(removeAccessToken());
          // history.push("/landing");
        }
      }
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
          {
            commentData.length !==0
            ? commentData.map((el: any, i: number) => (
                <DRModalContent
                  setCommentData={setCommentData}
                  key={i}
                  comment={el}
                />
              ))
            : <NoCommentContainer>
                  <NoCommentText>레시피에 대한 의견과 후기 사진을 공유하세요🍳</NoCommentText>
            </NoCommentContainer>
          }
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
          {imgInput && <ImgText>{imgInput.name}</ImgText>}
          <ButtonContainer>
            {/*<CommentPostButton color="transparent">취소</CommentPostButton>*/}
            <CommentPostButton
              onClick={() => handlePostComment()}
              color="#3DA6FF"
            >
              작성하기
            </CommentPostButton>
          </ButtonContainer>
        </PostCommentContainer>
      </CommentContainer>
    </CommentModal>
  );
};

export default DRModal;
