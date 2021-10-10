import styled from "styled-components";
import { main } from "theme";

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

export const RightContainer = styled.section`
  background-color: ${main.bg};
  flex: 1;
`;
