import React, { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { ArrowToTop } from "@styled-icons/boxicons-regular/ArrowToTop";
import { useHistory } from "react-router";

const LandingSectionFive = styled.section`
  width: 100%;
  background-color: #feefe6;
  height: 1300vh;
`;

const LandingFiveContainer = styled.div<Landing5Props>`
  width: 100%;
  height: 150vh;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;

  .active {
    background-color: #ffffff;
    position: fixed;
    top: 16%;
    transition: 2s;
    transform: ${(props) => {
      if (props.position < 5700) {
        return "scale(1)";
      } else if (props.position > 5700) {
        return "scale(2)";
      }
    }};
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const LandingFivePaper = styled.div<Landing5Props>`
  width: 70%;
  height: 70vh;
  background-color: #ffffff;
  position: absolute;
  transition: 1s;
  /* top: 14%; */
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LandingFiveText1 = styled.div<Landing5Props>`
  opacity: 0;
  height: 100%;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 2s;
  font-size: 72px;
`;

const LandingFiveText2 = styled.div<Landing5Props>`
  opacity: 0;
  height: 100%;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 2s;
  font-size: 72px;
  span {
    ::before {
      content: "";
      position: absolute;
      width: ${(props) => {
        return props.position > 8200 ? "28%" : "0%";
      }};
      transition: 0.5s;
      height: 0.5%;
      background-color: #f01d1d;
      bottom: 45%;
      border-radius: 20px;
    }
  }
`;

const BobpagoHorizental = styled.img`
  opacity: 0;
  width: 50%;
  height: 50%;
  position: fixed;
  top: 20%;
  left: 25%;
  object-fit: contain;
  transform: translateY(100%);
  transition: all 1500ms cubic-bezier(0.725, -0.565, 0.19, 1.645);
`;

const PageMoveButton = styled.button`
  position: fixed;
  width: 33%;
  height: 4%;
  background-color: #f75f4e;
  font-size: 18px;
  top: 62%;
  left: 34%;
  outline: none;
  border: none;
  background-image: url("/img/background2.png");
  transition: all 1500ms cubic-bezier(0.725, -0.565, 0.19, 1.645);
  border-radius: 12px;
  background-position: 20% 35%;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
  cursor: pointer;
  z-index: 1000;
  opacity: 0;
  ::before {
    content: "";
    width: 33%;
    height: 1px;
    position: absolute;
    top: 90%;
    left: 34%;
    opacity: 0;
    transition: 1.5s;
  }
  &:hover {
    background-position: 20% 0%;
    color: #ffffff;
    ::before {
      opacity: 1;
    }
  }
`;

const ToTopContainer = styled.div`
  position: fixed;
  width: 5em;
  height: 5em;
  display: flex;
  justify-content: center;
  align-items: center;
  right: 3em;
  bottom: 3em;
  z-index: 10000;
  flex-direction: column;
  color: #ffffff;
  background-color: #b14747ce;
  border-radius: 50%;
  transition: 0.3s;
  cursor: pointer;
  &:hover {
    transform: scale(1.2);
  }
`;

const ToTopIcon = styled(ArrowToTop)`
  width: 40px;
`;

const ToTopText = styled.div`
  font-size: 24px;
`;

const Footer = styled.div`
  position: fixed;
  width: 100%;
  height: 45%;
  background-color: black;
  bottom: 0;
  left: 0;
  transform: translateY(80%);
  transition: all 1500ms cubic-bezier(0.725, -0.565, 0.19, 1.645);
  background-color: #ececec;
  display: flex;
  flex-direction: column;
  opacity: 0;
`;

const FooterTopContainer = styled.div`
  width: 100%;
  height: 70%;
  /* position: fixed; */
  display: flex;
  justify-content: center;
  ::before {
    content: "";
    background-color: #696969;
    position: absolute;
    width: 38%;
    height: 0.1%;
    bottom: 42%;
    left: 31%;
  }
`;

const FooterTopLeftContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 1em;
`;

const FooterTopLeftBox = styled.div`
  display: flex;
  align-items: center;
`;

const BobpagoLogo = styled.img`
  width: 25px;
  margin-right: 1em;
`;

const BobpagoLogoText = styled.div`
  font-size: 32px;
  color: #5eb6d1;
`;

const LeftLocationText = styled.div`
  font-size: 8px;
`;

const FooterTopCenterContainer = styled.div`
  margin: 1em;
`;

const FooterTopCenterTitle = styled.div`
  font-size: 32px;
`;

const FooterTopCenterUl = styled.ul``;

const FooterTopCenterLi = styled.li`
  list-style: none;
`;

const FooterTopCenterA = styled.a`
  text-decoration: none;
  color: black;
  position: relative;
  transition: 1s;
  font-size: 12px;

  ::before {
    position: absolute;
    content: "";
    width: 0%;
    height: 1%;
    bottom: 16%;
    left: 1%;
    background-color: #299fff;
    transition: 1s;
  }
  &:hover {
    color: #299fff;

    ::before {
      width: 98%;
    }
  }
`;

const FooterTopRightContainer = styled.div`
  margin: 1em;
`;

const FooterTopRightTitle = styled.div`
  font-size: 32px;
`;

const FooterTopRightUl = styled.ul``;

const FooterTopRightLi = styled.li`
  list-style: none;
`;

const FooterTopRightA = styled.a`
  text-decoration: none;
  color: black;
  position: relative;
  transition: 1s;
  font-size: 12px;

  ::before {
    position: absolute;
    content: "";
    width: 0%;
    height: 1%;
    bottom: 16%;
    left: 1%;
    background-color: #299fff;
    transition: 1s;
  }
  &:hover {
    color: #299fff;

    ::before {
      width: 98%;
    }
  }
`;

const FooterBottomContainer = styled.div`
  width: 100%;
  height: 100%;
  background-color: #ececec;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const FooterBottomCopyright = styled.div`
  font-size: 8px;
  position: absolute;
  top: -1em;
`;

interface Landing5Props {
  position: number;
}

const LandSection4: React.FC<Landing5Props> = ({ position }) => {
  const history = useHistory();

  const [bounding, setBounding] = useState<number>(0);

  const containerRef = useRef<any>(null);
  const text1Ref = useRef<any>(null);
  const text2Ref = useRef<any>(null);
  const paperRef = useRef<any>(null);
  const LinearRef = useRef<any>(null);
  const BobpagoRef = useRef<any>(null);
  const ButtonRef = useRef<any>(null);
  const FooterRef = useRef<any>(null);

  const handleToTop = () => {
    window.scrollTo(0, 0);
  };

  const handlePageMove = () => {
    history.push("/survey");
  };

  useEffect(() => {
    console.log(bounding);

    if (containerRef) {
      setBounding(containerRef.current.getBoundingClientRect().top);
    }

    if (position < 5000) {
      text1Ref.current.style.opacity = "0";
      text1Ref.current.style.transition = "0.2s";
    } else if (position > 6000) {
      text1Ref.current.style.opacity = "1";
      text1Ref.current.style.transition = "0.5s";
    }
    if (position > 7100) {
      text1Ref.current.style.opacity = "0";
    }
    if (position > 7500) {
      text2Ref.current.style.opacity = "1";
    } else if (position < 7500) {
      text2Ref.current.style.opacity = "0";
      text2Ref.current.style.transition = "0.5s";
      // LinearRef.current.style.width = "0%";
    }
    if (position > 8900) {
      text2Ref.current.style.opacity = "0";
    }
    if (position > 9300) {
      BobpagoRef.current.style.opacity = "1";
      BobpagoRef.current.style.transform = "translateY(0%)";
      ButtonRef.current.style.opacity = "1";
      ButtonRef.current.style.transform = "translateY(0%)";
      FooterRef.current.style.transform = "translateY(80%)";
    } else if (position < 9300) {
      BobpagoRef.current.style.opacity = "0";
      BobpagoRef.current.style.transform = "translateY(100%)";
      ButtonRef.current.style.opacity = "0";
      ButtonRef.current.style.transform = "translateY(500%)";
      FooterRef.current.style.opacity = "0";
    }
    if (position > 12400) {
      BobpagoRef.current.style.transform = "translateY(-25%)";
      ButtonRef.current.style.transform = "translateY(-300%)";
      FooterRef.current.style.transform = "translateY(0%)";
      FooterRef.current.style.opacity = "1";
    }
  }, [position]);

  return (
    <LandingSectionFive>
      <LandingFiveContainer ref={containerRef} position={position}>
        <LandingFivePaper
          className={bounding < -171 ? "active" : "basic"}
          ref={paperRef}
          position={position}
          // boundingRect={paperRef.current.getBoundingClientRect().top}
        >
          <LandingFiveText1 ref={text1Ref} position={position}>
            너의 냉장고에서 재료만 골라줘!
          </LandingFiveText1>
          <LandingFiveText2 position={position} ref={text2Ref}>
            <span ref={LinearRef}>레시피</span>는 내가 찾아줄게!
          </LandingFiveText2>
          <BobpagoHorizental ref={BobpagoRef} src="/img/BobpagoRow.png" />
          <PageMoveButton onClick={handlePageMove} ref={ButtonRef}>
            지금 시작하기.
          </PageMoveButton>
          <Footer ref={FooterRef}>
            <FooterTopContainer>
              <FooterTopLeftContainer>
                <FooterTopLeftBox>
                  <BobpagoLogo src="/img/BobpagoNosub.png" />
                  <BobpagoLogoText>Bobpago</BobpagoLogoText>
                </FooterTopLeftBox>
                <LeftLocationText>
                  서울특별시 서초구 서초대로 396, 강남빌딩 400층
                </LeftLocationText>
              </FooterTopLeftContainer>
              <FooterTopCenterContainer>
                <FooterTopCenterTitle>Services</FooterTopCenterTitle>
                <FooterTopCenterUl>
                  <FooterTopCenterLi>
                    <FooterTopCenterA href="https://github.com/codestates/Bobpago/wiki">
                      WIKI
                    </FooterTopCenterA>
                  </FooterTopCenterLi>
                  <FooterTopCenterLi>
                    <FooterTopCenterA href="https://github.com/codestates/Bobpago">
                      Client & Server
                    </FooterTopCenterA>
                  </FooterTopCenterLi>
                  <FooterTopCenterLi>
                    <FooterTopCenterA href="https://github.com/codestates/Bobpago/wiki/Tech-Stack">
                      Tech Stack
                    </FooterTopCenterA>
                  </FooterTopCenterLi>
                </FooterTopCenterUl>
              </FooterTopCenterContainer>
              <FooterTopRightContainer>
                <FooterTopRightTitle>Contacts</FooterTopRightTitle>
                <FooterTopRightUl>
                  <FooterTopRightLi>
                    <FooterTopRightA href="https://github.com/tjdgns5272">
                      Seonghun Park
                    </FooterTopRightA>
                  </FooterTopRightLi>
                  <FooterTopRightLi>
                    <FooterTopRightA href="https://github.com/pinion7">
                      Minsoo Park
                    </FooterTopRightA>
                  </FooterTopRightLi>
                  <FooterTopRightLi>
                    <FooterTopRightA href="https://github.com/Freetargeter">
                      Chiwon Ahn
                    </FooterTopRightA>
                  </FooterTopRightLi>
                  <FooterTopRightLi>
                    <FooterTopRightA href="https://github.com/VVSOGI/Bobpago">
                      Wooseok Kim
                    </FooterTopRightA>
                  </FooterTopRightLi>
                </FooterTopRightUl>
              </FooterTopRightContainer>
            </FooterTopContainer>
            <FooterBottomContainer>
              <FooterBottomCopyright>
                © Copyright 2021 Bobpago Inc. All rights reserved.
              </FooterBottomCopyright>
            </FooterBottomContainer>
          </Footer>
        </LandingFivePaper>
      </LandingFiveContainer>
      <ToTopContainer onClick={handleToTop}>
        <ToTopIcon />
        <ToTopText>맨위로</ToTopText>
      </ToTopContainer>
    </LandingSectionFive>
  );
};

export default LandSection4;
