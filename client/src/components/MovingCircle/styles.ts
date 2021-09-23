import styled, { keyframes } from "styled-components";

const animate = keyframes`
  0% {
    transform: rotate(360deg);
  }
100% {
  transform: rotate(0deg);
}
`;

export const Circle = styled.div`
  position: absolute;
  bottom: -18em;
  left: -15em;
  width: 25em;
  height: 25em;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 0;
  span:nth-child(1) {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: 2px solid #fff;
    border-radius: 38% 62% 63% 37% / 41% 44% 56% 59%;
    transition: 0.5s;
    animation: ${animate} 6s linear infinite;
    border: none;
    background: rgba(219, 132, 156, 0.8);
    z-index: 0;
  }
  span:nth-child(2) {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: 2px solid #fff;
    border-radius: 38% 62% 63% 37% / 41% 44% 56% 59%;
    transition: 0.5s;
    animation: ${animate} 4s linear infinite;
    border: none;
    background: rgba(219, 132, 156, 0.8);
    opacity: 0.8;
    z-index: 0;
  }
  span:nth-child(3) {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: 2px solid #fff;
    border-radius: 38% 62% 63% 37% / 41% 44% 56% 59%;
    transition: 0.5s;
    animation: ${animate} 10s linear infinite;
    border: none;
    background: rgba(219, 132, 156, 0.8);
    z-index: 0;
  }
`;

export const Circle2Container = styled.div`
  position: absolute;

  bottom: -18em;
  width: 25em;
  height: 25em;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 0;
  right: -14em;
  span:nth-child(1) {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: 2px solid #fff;
    border-radius: 38% 62% 63% 37% / 41% 44% 56% 59%;
    transition: 0.5s;
    animation: ${animate} 6s linear infinite;
    border: none;
    z-index: 0;
    background: rgba(223, 237, 128, 0.8);
  }
  span:nth-child(2) {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: 2px solid #fff;
    border-radius: 38% 62% 63% 37% / 41% 44% 56% 59%;
    transition: 0.5s;
    animation: ${animate} 4s linear infinite;
    border: none;
    opacity: 0.8;
    z-index: 0;
    background: rgba(223, 237, 128, 0.8);
  }
  span:nth-child(3) {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: 2px solid #fff;
    border-radius: 38% 62% 63% 37% / 41% 44% 56% 59%;
    transition: 0.5s;
    animation: ${animate} 10s linear infinite;
    border: none;
    z-index: 0;
    background: rgba(223, 237, 128, 0.8);
  }
`;
