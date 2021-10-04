import React, { useEffect, useRef } from "react";
import {
  Navigation,
  NavigationInner,
  ListContainer,
  ListEl,
  LogoutEl,
  LogoutIcon,
  ListText,
} from "./styles";

const SideBar = ({ sidebarOn }: any) => {
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
            <ListEl>
              <ListText>마이페이지</ListText>
            </ListEl>
            <ListEl>
              <ListText>게시글작성</ListText>
            </ListEl>
          </ListContainer>
          <LogoutEl>
            <ListText>로그아웃</ListText>
            <LogoutIcon />
          </LogoutEl>
        </NavigationInner>
      </Navigation>
    </>
  );
};

export default SideBar;
