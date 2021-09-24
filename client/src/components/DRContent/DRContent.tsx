import React from "react";
import {
  RightContent,
  RightContentBasic,
  RightContentWriter,
  RightContentTitle,
  RightContentTime,
  RightContentDifficulty,
  RightMainContent,
  RightMainFooter,
  CommentButton,
} from "./styles";

interface DRContentProps {
  handleModalOpen: VoidFunction;
}

const DRContent: React.FC<DRContentProps> = ({ handleModalOpen }) => {
  return (
    <RightContent>
      <RightContentBasic>
        <RightContentWriter>김우석</RightContentWriter>
        <RightContentTitle>달걀볶음밥</RightContentTitle>
        <RightContentTime>10분</RightContentTime>
        <RightContentDifficulty>2단계</RightContentDifficulty>
      </RightContentBasic>
      <RightMainContent>
        <RightMainFooter>
          <CommentButton onClick={handleModalOpen}>댓글 달기</CommentButton>
        </RightMainFooter>
      </RightMainContent>
    </RightContent>
  );
};

export default DRContent;
