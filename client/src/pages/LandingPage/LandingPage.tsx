import styled from "styled-components";
import React, { useCallback, useEffect, useState } from "react";
import { main } from "theme";
import LandSection1 from "components/Landing/LandSection1";
import LandSection2 from "components/Landing/LandSection2";

interface LandingFour {
  opac?: boolean;
}

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
  z-index: 100;
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
  display: flex;
`;

const NavLi = styled.li`
  list-style: none;
  margin-right: 2em;
  font-size: 24px;
`;

const LandingContainer = styled.section`
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
`;

const LandingSectionThree = styled.section`
  width: 100%;
  height: 300vh;
  background-color: #feefe6;
  ::before {
    content: "";
    width: 30%;
    height: 181.5em;
    position: absolute;
    left: 0;
    top: 121.2vh;
    z-index: 1000;
    background: rgb(0, 0, 0);
    background: linear-gradient(
      90deg,
      rgba(0, 0, 0, 0.15) 0%,
      rgba(255, 255, 255, 0) 100%
    );
    border-bottom-right-radius: 50em;
  }
`;

const LandingSectionFour = styled.section`
  width: 100%;
  height: 250vh;
  background-color: #feefe6;
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-direction: column;
  position: relative;
`;

const LandingFourTitle = styled.div`
  position: absolute;
  top: 1em;
  font-size: 72px;
`;

const LandingSectionFourCard = styled.div`
  width: 100%;
  height: 58%;
  background-color: #feefe6;
  border-radius: 1em;
  margin-top: 7em;
  display: flex;
`;

const LandingFourCardLeft = styled.div<LandingFour>`
  flex: 1;
  background-color: #c94d4d;
  opacity: ${(props) => {
    return props.opac ? "1" : "0";
  }};
`;

const LandingFourCardRight = styled.div<LandingFour>`
  flex: 1;
  background-color: black;
  opacity: ${(props) => {
    return props.opac ? "1" : "0";
  }};
`;

const LandingFourCardContainer = styled.div``;

const LandingFourCardImg = styled.img``;

const LandingFourCardText = styled.div``;

const LandingSectionFive = styled.section`
  width: 100%;
  /* height: 100vh; */
`;

const LandingPage = () => {
  const [scrollPosition, setScrollPosition] = useState<number>(0);

  let positionEx: number = 0;

  const onScroll = useCallback((): void => {
    setScrollPosition(window.pageYOffset);
    positionEx = window.pageYOffset;
    console.log(positionEx);
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
      <LandingNav>
        <NavLogo>Bobpago</NavLogo>
        <NavUl>
          <NavLi>나만의 레시피</NavLi>
          <NavLi>뭐라할까</NavLi>
          <NavLi>시작하기</NavLi>
        </NavUl>
      </LandingNav>
      <LandSection1 />
      <LandSection2 scrollPosition={scrollPosition} />
      <LandingSectionThree></LandingSectionThree>
      <LandingSectionFour>
        <LandingFourTitle></LandingFourTitle>
        <LandingSectionFourCard>
          <LandingFourCardLeft opac={false}></LandingFourCardLeft>
          <LandingFourCardRight opac={true}>
            <LandingFourCardContainer>
              <LandingFourCardImg></LandingFourCardImg>
            </LandingFourCardContainer>
          </LandingFourCardRight>
        </LandingSectionFourCard>
        <LandingSectionFourCard>
          <LandingFourCardLeft opac={true}></LandingFourCardLeft>
          <LandingFourCardRight opac={false}></LandingFourCardRight>
        </LandingSectionFourCard>
        <LandingSectionFourCard>
          <LandingFourCardLeft opac={false}></LandingFourCardLeft>
          <LandingFourCardRight opac={true}></LandingFourCardRight>
        </LandingSectionFourCard>
      </LandingSectionFour>
      <LandingSectionFive></LandingSectionFive>
    </LandingContainer>
  );
};

export default LandingPage;
