import DRModalContent from "components/DRModalContent/DRModalContent";
import axios from "axios";
import { TotalSudoContainer } from "components/DRModalContent/styles";
import { useSelector } from "react-redux";
import { RootState } from "reducers";
import React, { useState, useEffect } from "react";
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
}

const DRModal: React.FC<DRModalProps> = ({ handleModalClose }) => {
  const accessToken = useSelector(
    (state: RootState) => state.AccesstokenReducer.accessToken
  );
  const serverUrl = process.env.REACT_APP_SERVER_URL;
  const id = 70;

  async function getData() {
    const data = await axios.get(`${serverUrl}/recipe/${id}/comment`, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(data);
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <CommentModal>
      <TotalSudoContainer onClick={handleModalClose} />
      <CommentContainer>
        <CloseIcon onClick={handleModalClose} />
        <SudoContainer>
          <DRModalContent />
          <DRModalContent />
          <DRModalContent />
        </SudoContainer>
        <PostCommentContainer>
          <PostCommentInput placeholder="공개 댓글 추가..."></PostCommentInput>
          <CameraIcon />
          <ButtonContainer>
            <CommentPostButton color="transparent">취소</CommentPostButton>
            <CommentPostButton color="#3DA6FF">댓글</CommentPostButton>
          </ButtonContainer>
        </PostCommentContainer>
      </CommentContainer>
    </CommentModal>
  );
};

export default DRModal;
