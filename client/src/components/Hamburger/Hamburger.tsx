import React, { useState } from "react";
import { MenuBtn, MenuBtnBurger } from "./styles";

const Hamburger = ({ sidebarOn, setSidebarOn }: any) => {
  const handleClick = () => {
    sidebarOn ? setSidebarOn(false) : setSidebarOn(true);
  };

  return (
    <MenuBtn className="menu-btn" onClick={() => handleClick()}>
      <MenuBtnBurger
        className={sidebarOn ? "menu-btn__burger open" : "menu-btn__burger"}
      ></MenuBtnBurger>
    </MenuBtn>
  );
};

export default Hamburger;
