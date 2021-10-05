import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  Navigation,
  NavigationInner,
  ListContainer,
  ListEl,
  LogoutEl,
  LogoutIcon,
  ListText,
  LogoutWrapper,
} from "./styles";

const SideBar = ({ sidebarOn, setLogoutModal, setSidebarOn }: any) => {
  const containerRef = useRef<any>(null);

  useEffect(() => {
    if (containerRef.current) {
      if (sidebarOn) {
        containerRef.current.classList.add("active");
      } else {
        containerRef.current.classList.remove("active");
      }
    }
  }, [sidebarOn]);

  return (
    <>
      <Navigation ref={containerRef}>
        <NavigationInner className="navigation__inner">
          {/*   마이페이지,게시글 작성, 로그아웃   */}
          <ListContainer>
            <Link to="/mypage">
              <ListEl onClick={() => setSidebarOn(false)}>
                <ListText>마이페이지</ListText>
              </ListEl>
            </Link>
            <Link to="/writerecipe">
              <ListEl onClick={() => setSidebarOn(false)}>
                <ListText>게시글작성</ListText>
              </ListEl>
            </Link>
          </ListContainer>
          <LogoutEl onClick={() => setLogoutModal(true)}>
            <LogoutWrapper>
              <ListText>로그아웃</ListText>
              <LogoutIcon />
            </LogoutWrapper>
          </LogoutEl>
        </NavigationInner>
      </Navigation>
    </>
  );
};

export default SideBar;
