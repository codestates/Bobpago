import styled from "styled-components";
import { StarFill } from "@styled-icons/bootstrap/StarFill/StarFill";
import { Star } from "@styled-icons/bootstrap/Star/Star";
import { StarHalf } from "@styled-icons/bootstrap/StarHalf/StarHalf";

interface SizeProps {
  size?: number;
}

export const StarFillIcon = styled(StarFill)<SizeProps>`
  width: ${(props) => (props.size ? props.size + "em" : "1em")};
  height: ${(props) => (props.size ? props.size + "em" : "1em")};
  margin-right: ${(props) => (props.size ? props.size / 5 + "em" : "1em")};
  fill: #fcba03;
  z-index: 3;
`;

export const StarIcon = styled(Star)<SizeProps>`
  width: ${(props) => (props.size ? props.size + "em" : "1em")};
  height: ${(props) => (props.size ? props.size + "em" : "1em")};
  fill: #fcba03;
  margin-right: ${(props) => (props.size ? props.size / 5 + "em" : "1em")};
  z-index: 3;
`;

export const StarRatingContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

// export const name = styled.div``;
