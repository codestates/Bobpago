import styled from "styled-components";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { main } from "theme";
import LandSection1 from "components/Landing/LandSection1";
import LandSection2 from "components/Landing/LandSection2";
import LandSection3 from "components/Landing/LandSection3";
import LandSection4 from "components/Landing/LandSection4";

interface LandingFour {
  opac?: boolean;
}

const LandingContainer = styled.section`
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  .navActive {
    position: fixed;
    padding-top: 2.5em;
    padding-bottom: 2.5em;
    background-color: #feefe6;
    transition: 1.5s;
    top: 0;
    z-index: 1000000;
  }
`;

const LandingNav = styled.div`
  width: 100%;
  height: 3em;
  padding: 6em;
  padding-top: 4em;
  padding-bottom: 4em;
  background-color: #feefe6ce;
  position: absolute;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: 1.5s;
  z-index: 100;
  .logoActive {
    font-size: 32px;
    transition: 1.5s;
  }

  .listActive {
    font-size: 18px;
    transition: 1.5s;
  }
`;

const Tobbar = styled.div`
  width: 100%;
  height: 10px;
  background-color: #f75f4e;
  /* position: fixed; */
  top: 0;
  z-index: 150;
`;

const NavLogo = styled.div`
  transition: 1.5s;
  margin-left: 1em;
  font-size: ${main.bigFont};
  position: relative;
  ::before {
    width: 2px;
    height: 40%;
    position: absolute;
    content: "";
    left: -0.1em;
    top: 0.38em;
    background-color: #000000;
  }
`;

const NavUl = styled.ul`
  transition: 1.5s;
  display: flex;
  font-size: 24px;
`;

const NavLi = styled.li`
  list-style: none;
  margin-right: 2em;
`;

const LandingSectionThree = styled.section`
  width: 100%;
  height: 300vh;
  background-color: #feefe6;
`;

const LandingPage = () => {
  const [scrollPosition, setScrollPosition] = useState<number>(0);
  const NavRef = useRef<any>(null);
  const NavlogoRef = useRef<any>(null);
  const NavlistRef = useRef<any>(null);

  let positionEx: number = 0;

  const onScroll = useCallback((): void => {
    positionEx = window.pageYOffset;
    console.log(positionEx, "land");
    if (positionEx > 10000) {
      NavRef.current.style.backgroundColor = "#feefe6ce";
    }
    if (positionEx > 0) {
      NavRef.current.classList.add("navActive");
      NavlogoRef.current.classList.add("logoActive");
      NavlistRef.current.classList.add("listActive");
    } else {
      NavRef.current.classList.remove("navActive");
      NavlogoRef.current.classList.remove("logoActive");
      NavlistRef.current.classList.remove("listActive");
    }

    setScrollPosition(window.pageYOffset);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <LandingContainer>
      <Tobbar />
      <LandingNav ref={NavRef}>
        <NavLogo ref={NavlogoRef}>Bobpago</NavLogo>
        <NavUl ref={NavlistRef}>
          <NavLi>나만의 레시피</NavLi>
          <NavLi>뭐라할까</NavLi>
          <NavLi>시작하기</NavLi>
        </NavUl>
      </LandingNav>
      <LandSection1 />
      <LandSection2 scrollPosition={scrollPosition} />
      <LandingSectionThree></LandingSectionThree>
      <LandSection3 scrollPosition={scrollPosition} />
      <LandSection4 position={scrollPosition} />
    </LandingContainer>
  );
};

export default LandingPage;
