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
  TimeIcon,
} from "./styles";

interface DRContentProps {}

const DRContent: React.FC<DRContentProps> = () => {
  return (
    <RightContent>
      <RightContentWriter>김우석</RightContentWriter>
      <RightContentTitle>달걀볶음밥</RightContentTitle>
      <RightContentBasic>
        <RightContentTime>
          <TimeIcon /> 10분
        </RightContentTime>
        <RightContentDifficulty>난이도: 2단계</RightContentDifficulty>
      </RightContentBasic>
      <RightMainContent>
        <RightMainFooter></RightMainFooter>
      </RightMainContent>
    </RightContent>
  );
};

export default DRContent;
