import React from "react";
import styled from "styled-components";

interface Props {
  width: string;
  height: string;
  fill: string;
  top: number;
  left: number;
  opac: boolean;
}

const Svg = styled.svg<Props>`
  position: absolute;
  z-index: 0;
  top: ${(props) => (props.top ? props.top : 0)}em;
  left: ${(props) => (props.left ? props.left : 0)}em;
  background-color: none;
  opacity: ${(props) => (props.opac ? "1" : "0")};
  transition: 1s;
`;

const Ball = (props: Props) => {
  return (
    <Svg
      width={props.width ? props.width : "165"}
      height={props.height ? props.height : "157"}
      top={props.top}
      left={props.left}
      opac={props.opac}
      viewBox="0 0 165 157"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <ellipse
        cx="82.5"
        cy="78.5"
        rx="82.5"
        ry="78.5"
        fill={props.fill ? props.fill : "#F2C6C6"}
      />
    </Svg>
  );
};

export default Ball;
