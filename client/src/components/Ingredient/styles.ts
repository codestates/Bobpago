import styled from "styled-components";

interface CookerRecipeType {
  check: string;
}

export const CookerRecipeContainer = styled.div<CookerRecipeType>`
  /* flex: 8; */
  height: 50em;
  margin-bottom: 10em;
  display: flex;
  flex-wrap: wrap;
  overflow: ${({ check }): any => {
    if (check === "Good") {
      return "scroll";
    } else {
      return "auto";
    }
  }};
  overflow-x: ${({ check }): any => {
    if (check === "Good") {
      return "hidden";
    } else {
      return "auto";
    }
  }}; ;
`;
