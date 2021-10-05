import React, { useState, useEffect } from "react";
import styled from "styled-components";

const Container = styled.div`
  position: relative;
  height: 100vh;
  width: 100vw;
  text-align: center;
  justify-contents: center;
  background: #ffefe6;
  svg {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-35%, -70%);
  }
`;

const Text = styled.div`
  position: absolute;
  transform: translate(-60%, -50%);
  left: 50%;
  top: 60%;
  font-size: 30px;
`;
const Loading = () => {
  const [dots, setDots] = useState(0);
  const arr = [".", "..", "..."];
  useEffect(() => {
    setTimeout(() => {
      setDots(dots + 1);
    }, 300);
  }, [dots]);
  return (
    <Container>
      <svg viewBox="0 0 300 100" xmlns="http://www.w3.org/2000/svg">
        <path
          fill="none"
          stroke="lightgrey"
          d="M20,50 C20,-50 180,150 180,50 C180-50 20,150 20,50 z"
        />

        <image
          xlinkHref="https://i.ibb.co/xSZNWnp/shooting-Head.png"
          width={20}
          y={-3}
          x={-1}
        >
          <animateMotion
            dur="1.5s"
            rotate="auto"
            repeatCount="indefinite"
            path="M20,50 C20,-50 180,150 180,50 C180-50 20,150 20,50 z"
          />
        </image>
      </svg>
      <Text>로딩중{arr[dots % 3]}</Text>
      {/* <svg>
        <path
          fill="none"
          stroke="lightgrey"
          d="M20,50 C20,-50 180,150 180,50 C180-50 20,150 20,50 z"
        />

        <image
          xlinkHref="http://i.imgur.com/ANS7Rkc.png"
          x={0}
          y={72}
          width={120}
          height={50}
        >
          <animateMotion
            path="M20,50 C20,-50 180,150 180,50 C180-50 20,150 20,50 z"
            dur="5s"
            repeatCount="indefinite"
            rotate="auto"
          />
        </image>
      </svg> */}
    </Container>
  );
};

export default Loading;
