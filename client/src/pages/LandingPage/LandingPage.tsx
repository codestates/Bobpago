import styled from "styled-components";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { main } from "theme";
import Loading from "components/Loading/Loading";
import LandSection1 from "components/Landing/LandSection1";
import LandSection2 from "components/Landing/LandSection2";
import LandSection3 from "components/Landing/LandSection3";
import LandSection4 from "components/Landing/LandSection4";
import { useHistory } from "react-router";

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
    z-index: 900;
  }
  .landHiddenActive {
    left: 0;
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
  @media screen and (max-width: 768px) {
    padding: 2em;
    padding-top: 4em;
    padding-bottom: 4em;
  }
`;

const Tobbar = styled.div`
  width: 100%;
  height: 10px;
  background-color: #f75f4e;
  /* position: fixed; */
  top: 0;
  z-index: 150;
  @media screen and (max-width: 768px) {
    position: absolute;
    background-color: #f75f4e77;
  }
`;

const NavLogo = styled.div`
  transition: 1.5s;
  margin-left: 1em;
  font-size: ${main.bigFont};
  position: relative;
  cursor: pointer;
  ::before {
    width: 2px;
    height: 40%;
    position: absolute;
    content: "";
    left: -0.1em;
    top: 0.38em;
    background-color: #000000;
  }
  @media screen and (max-width: 768px) {
    font-size: 42px;
    margin-right: 0.5em;
  }

  @media screen and (max-width: 600px) {
    font-size: 24px;
    /* margin-right: 1em; */
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
  cursor: pointer;
  position: relative;
  ::before {
    width: 0%;
    position: absolute;
    content: "";
    height: 2px;
    background-color: red;
    border-radius: 10px;
    bottom: 0;
    left: 0;
    transition: 0.4s;
  }

  &:hover {
    ::before {
      width: 100%;
    }
  }
  @media screen and (max-width: 600px) {
    font-size: 18px;
  }
`;

const LandingSectionThree = styled.section`
  width: 100%;
  height: 300vh;
  background-color: #feefe6;
`;

export const HiddenContainer = styled.div`
  width: 100%;
  height: 200vh;
  transform: scale(1.5);
  position: fixed;
  top: 0;
  background-color: #ffc69b;
  z-index: 10000000;
  border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
  transition: 2s;
  left: 150%;
`;

const LandingPage = () => {
  const [scrollPosition, setScrollPosition] = useState<number>(0);

  const history = useHistory();
  const [position1, setPosition1] = useState<number>(0);
  const [position2, setPosition2] = useState<number>(0);
  const [position3, setPosition3] = useState<number>(0);
  const [position4, setPosition4] = useState<number>(0);
  const [position5, setPosition5] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [onOff, setOnOff] = useState<boolean>(false);

  const NavRef = useRef<any>(null);
  const NavlogoRef = useRef<any>(null);
  const NavlistRef = useRef<any>(null);

  let positionEx: number = 0;

  const handlePosition1 = () => {
    const sectionTwo1 = document.querySelector(".section2-1") as HTMLElement;
    return scrollPosition + sectionTwo1.getBoundingClientRect().top;
  };

  const handlePosition2 = () => {
    const sectionTwo2 = document.querySelector(".section2-2") as HTMLElement;
    return scrollPosition + sectionTwo2.getBoundingClientRect().top - 50;
  };

  const handlePosition3 = () => {
    const sectionTwo3 = document.querySelector(".section2-3") as HTMLElement;
    return scrollPosition + sectionTwo3.getBoundingClientRect().top - 100;
  };

  const handlePosition4 = () => {
    const sectionTwo4 = document.querySelector(".section2-4") as HTMLElement;
    return scrollPosition + sectionTwo4.getBoundingClientRect().top - 150;
  };

  const handlePosition5 = () => {
    const sectionThree1 = document.querySelector("#section3") as HTMLElement;
    return scrollPosition + sectionThree1.getBoundingClientRect().top;
  };

  const handlePageTransition = () => {
    setOnOff(!onOff);
  };

  const onScroll = useCallback((): void => {
    positionEx = window.pageYOffset;
    setPosition1(handlePosition1);
    setPosition2(handlePosition2);
    setPosition3(handlePosition3);
    setPosition4(handlePosition4);
    setPosition5(handlePosition5);

    if (NavRef.current && NavlogoRef.current && NavlistRef.current) {
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
    }

    setScrollPosition(window.pageYOffset);
  }, []);

  useEffect(() => {
    if (!loading) {
      setTimeout(() => {
        setLoading(true);
      }, 2000);
    }
    window.addEventListener("scroll", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return !loading ? (
    <Loading></Loading>
  ) : (
    <LandingContainer>
      <HiddenContainer
        className={onOff ? "landHiddenActive" : "landHiddenBasic"}
      />
      <Tobbar />
      <LandingNav ref={NavRef}>
        <NavLogo
          ref={NavlogoRef}
          onClick={() => {
            window.scrollTo(0, 0);
          }}
        >
          Bobpago
        </NavLogo>
        <NavUl ref={NavlistRef}>
          <NavLi
            onClick={() => {
              const section2 = document.querySelector(
                "#section2"
              ) as HTMLElement;
              const section2Position: number =
                section2.getBoundingClientRect().top + window.scrollY;
              window.scrollTo(0, section2Position + 200);
            }}
          >
            나만의 레시피
          </NavLi>
          <NavLi
            onClick={() => {
              const section3 = document.querySelector(
                "#section3"
              ) as HTMLElement;
              const section3Position: number =
                section3.getBoundingClientRect().top + window.scrollY;
              window.scrollTo(0, section3Position);
            }}
          >
            상세한 설명
          </NavLi>
          <NavLi
            onClick={() => {
              history.push("/survey");
            }}
          >
            시작하기
          </NavLi>
        </NavUl>
      </LandingNav>
      <LandSection1 handlePageTransition={handlePageTransition} />
      <LandSection2
        position1={position1}
        position2={position2}
        position3={position3}
        position4={position4}
        scrollPosition={scrollPosition}
      />
      <LandingSectionThree></LandingSectionThree>
      <LandSection3 position5={position5} scrollPosition={scrollPosition} />
      <LandSection4
        handlePageTransition={handlePageTransition}
        position={scrollPosition}
      />
    </LandingContainer>
  );
};

export default LandingPage;
