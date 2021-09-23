import styled from "styled-components";

interface BoxProps {
  color?: string;
  length?: number;
}

export const DRTotalContainer = styled.div`
  height: 100%;
`;

export const RightScroll = styled.div`
  position: fixed;
  width: 40%;
  height: 300px;
  right: 5%;
  top: 33%;
  overflow: hidden;
`;

export const RightScrollContainer = styled.div`
  transition: 1s;
`;

export const RightScrollContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 300px;
`;

export const TopBoxScroll = styled.section`
  position: fixed;
  width: 50%;
  height: 75%;
  top: 0;
  left: 0;
  background-color: #dadada;
  overflow: hidden;
  transition: 1s;
`;

export const TopBoxContainer = styled.div`
  width: 100%;
  transition: 1s;
  height: 100%;
  position: relative;
  transform: translateY(0%);
`;

export const TopBoxContent = styled.div<BoxProps>`
  width: 100%;
  height: 100%;
  background-color: ${({ color }) => {
    return color ? color : "ececec";
  }};
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const LeftBoxScroll = styled.section`
  position: fixed;
  left: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.1);
  height: 25%;
  width: 25%;
  overflow: hidden;
`;

export const LeftBoxContainer = styled.div<BoxProps>`
  width: ${({ length }) => {
    return length ? `${length * 100}%` : `100%`;
  }};
  transition: 1s;
  height: 100%;
  position: relative;
  transform: translateX(0%);
  display: flex;
`;

export const LeftBoxContent = styled.div<BoxProps>`
  width: 100%;
  height: 100%;
  background-color: ${({ color }) => {
    return color ? color : "ececec";
  }};
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const RightBoxScroll = styled.section`
  position: fixed;
  left: 25%;
  bottom: 0;
  width: 25.05%;
  height: 25%;
  overflow: hidden;
`;

export const RightBoxContainer = styled.div<BoxProps>`
  width: ${({ length }) => {
    return length ? `${length * 100}%` : `100%`;
  }};
  transition: 1s;
  height: 100%;
  position: relative;
  transform: translateX(-100%);
  display: flex;
`;

export const RightBoxContent = styled.div<BoxProps>`
  width: 100%;
  height: 100%;
  background-color: ${({ color }) => {
    return color ? color : "ececec";
  }};
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ImageScroll = styled.div`
  position: fixed;
  width: 40%;
  height: 80%;
  background-color: #ececec;
  top: 6.5em;
  left: 5%;
  z-index: 10;
  border-radius: 10px;
  box-shadow: 0 5px 30px rgba(0, 0, 0, 0.5);
  overflow: hidden;
`;

export const ImageContainer = styled.div`
  width: 100%;
  transition: 1s;
  height: 100%;
  position: relative;
  transform: translateY(0%);
`;

export const ImageContent = styled.div`
  width: 100%;
  height: 100%;
  background-color: #ececec;
  display: flex;
  justify-content: center;
  align-items: center;
`;
