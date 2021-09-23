import React from "react";
import { DetailRecipeContainer, LeftContainer, RightContainer } from "./styles";

interface DRProps {
  color?: string;
}

const DRContainer: React.FC<DRProps> = () => {
  return (
    <DetailRecipeContainer className="lol">
      <LeftContainer></LeftContainer>
      <RightContainer></RightContainer>
    </DetailRecipeContainer>
  );
};

export default DRContainer;
