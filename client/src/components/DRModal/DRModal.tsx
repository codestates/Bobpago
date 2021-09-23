import DRModalContent from "components/DRModalContent/DRModalContent";
import { TotalSudoContainer } from "components/DRModalContent/styles";
import React from "react";
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
