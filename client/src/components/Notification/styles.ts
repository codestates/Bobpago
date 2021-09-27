import styled, { keyframes } from "styled-components";

export const NotificationContainer = styled.div`
  font-size: 1rem;
  position: fixed;
  z-index: 999999;
  top: 1em;
  right: 12px;
  transition: all 4s;
  .fade-out {
    opacity: 0;
    transform: opacity 2s;
  }
`;
const toastInRight = keyframes`
  0% {
    transform: translateX(100%);
  }
  20% {
    transform: translateX(20%);
  }
  50% {
    transform: translateX(20%);
  }
  70% {
    transform: translateX(20%);
  }
  100% {
    transform: translateX(100%);
  }
`;
export const Notification = styled.div`
  transform: translateX(90%);
  transition: all 1s ease-in-out;
  animation: ${toastInRight} 3.2s;
  background: #4000c7;
  border-radius: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.6);
  color: #000;
  opacity: 0.9;
  font-weight: 600;
  height: 3em;
  width: 15em;
  color: #fff;
  padding: 15px;
  margin: 10px;
`;
