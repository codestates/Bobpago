import styled from "styled-components";

interface DRStylesProps {
  color?: string;
}

export const DetailRecipeContainer = styled.div`
  height: 100vh;
  position: relative;
  display: flex;
`;

export const LeftContainer = styled.section`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

export const LeftTopDiv = styled.div`
  flex: 2.5;
  background-color: rosybrown;
`;

export const LeftBottomContainer = styled.div`
  flex: 1;
  background-color: rosybrown;
  display: flex;
`;

export const LeftBottomLeftDiv = styled.div<DRStylesProps>`
  flex: 1;
  background-color: ${({ color }) => {
    return color ? color : "rosybrown";
  }};
`;

export const LeftBottomRightDiv = styled.div`
  flex: 1;
  background-color: rosybrown;
`;

export const RightContainer = styled.section`
  background-color: #ececaa;
  flex: 1;
`;
