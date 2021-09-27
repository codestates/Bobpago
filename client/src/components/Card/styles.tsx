import styled from "styled-components";
import { SuitHeartFill } from "@styled-icons/bootstrap/SuitHeartFill/SuitHeartFill";
import { RemoveCircle } from "@styled-icons/ionicons-sharp/RemoveCircle/RemoveCircle";
export const CardContainer = styled.div`
  margin: 0 auto;
  margin-top: 1em;
  position: relative;
  display: block;
  height: 13em;
  width: 15em;
  border-radius: 40px;
  overflow: hidden;
  text-decoration: none;
  border: 1px solid #c9c9c9;
  &:hover .card__image {
    transform: scale(1.25);
  }
  &:hover .card__overlay {
    transform: translateY(10%);
  }
  &:hover .card__header {
    transform: translateY(0);
  }
`;

export const CardImage = styled.img`
  width: 100%;
  height: auto;
  transition: 0.3s ease-in-out;
  transform: scale(1.15);
  border-color: #fff;
`;

export const CardOverlay = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1;
  border-radius: 40px;
  background-color: #fff;
  transform: translateY(100%);
  transition: 0.2s ease-in-out;
  border: none;
  border-color: #fff;
`;

export const CardHeader = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  padding: 2em;
  padding-top: 1em;
  border-radius: 30px 30px 0 0;
  background-color: #fff;
  transform: translateY(-90%);
  transition: 0.2s ease-in-out;
  border: none;
  border-color: #fff;
`;

export const CardArc = styled.svg`
  width: 75px;
  height: 75px;
  position: absolute;
  bottom: 100%;
  right: 0;
  z-index: 1;
  border: none;
  fill: #fff;
  border-color: #fff;
  path {
    fill: #fff;
    d: path("M 40 80 c 22 0 40 -22 40 -40 v 40 Z");
  }
`;

export const CardThumb = styled.img`
  // flex-shrink: 0;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border-color: #fff;
`;

export const CardTitle = styled.div`
  font-size: 1.3em;
  margin: 0 auto;
  color: #6a515e;
  text-align: center;
  border-color: #fff;
`;

export const CardStatus = styled.div`
  font-size: 0.8em;
  color: #d7bdca;
  border-color: #fff;
`;

export const CardDescription = styled.div`
  padding: 0 2em 2em;
  margin: 0;
  color: #d7bdca;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
  background-color: #fff;
  border-color: #fff;
`;

export const RatingContainer = styled.div`
  display: inline-block;
`;

export const HeartIcon = styled(SuitHeartFill)`
  float: right;
  display: inline-block;
  width: 1em;
  fill: #eb6060;
  border-color: #fff;
`;

export const LikeNum = styled.span`
  float: right;
  display: inline-block;
`;

interface FixProps {
  fix?: boolean;
}

export const RemoveIcon = styled(RemoveCircle)<FixProps>`
  width: 2em;
  height: 2em;
  fill: #fff;
  z-index: 10;
  position: absolute;
  top: 0.6em;
  right: 0.8em;
  display: ${(props) => (props.fix ? "block" : "none")};
`;
