import styled from "styled-components";

export const MenuBtn = styled.div`
  position: relative;
  z-index; 200;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80px;
  height: 80px;
  cursor: pointer;
  transition: all 0.5s ease-in-out;
  /* border: 3px solid #fff; */
  background-color: transparent;
  .open {
    background: transparent;
    box-shadow: none;
  }
  .open::before {
    z-index: 300;
    transform: rotate(45deg);
  }
  .open::after {
    z-index: 300;
    transform: rotate(-45deg);
  }
`;

export const MenuBtnBurger = styled.div`
  width: 50px;
  height: 6px;
  background: black;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(255, 101, 47, 0.2);
  transition: all 0.5s ease-in-out;
  z-index: 300;
  ::before,
  ::after {
    z-index: 300;
    content: "";
    position: absolute;
    width: 50px;
    height: 6px;
    background: black;
    border-radius: 5px;
    box-shadow: 0 2px 5px rgba(255, 101, 47, 0.2);
    transition: all 0.5s ease-in-out;
    transform: translateX(10px);
  }
  ::before {
    transform: translate(0px, -16px);
  }
  ::after {
    transform: translate(0px, 16px);
  }
`;
