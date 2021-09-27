import styled, { keyframes } from "styled-components";
import { PlusLg } from "@styled-icons/bootstrap/PlusLg/PlusLg";
import { ThreeDotsVertical } from "@styled-icons/bootstrap/ThreeDotsVertical/ThreeDotsVertical";
import { Check } from "@styled-icons/bootstrap/Check/Check";

export const PageContainer = styled.div`
  position: relative;
  top: 5em;

  margin: 0 auto;
  width: 50em;
  min-height: 10em;
`;

export const UserProfileContainer = styled.div`
  display: flex;
  flex-direction: row;
  min-height: 5em;
  background: #fff;
  width: 100%;
`;

export const ProfileImgContainer = styled.div`
  width: 40em;
  padding: 3em;
`;

export const ProfileContentsContainer = styled.div`
  padding: 2em;
  padding-top: 4.5em;
  padding-right: 0;
`;

export const ProfileName = styled.p`
  display: inline-block;
  font-size: 30px;
  font-weight: 350;
  margin-bottom: 0.2em;
`;

export const ProfileIntroduce = styled.p`
  width: 30.5em;
`;

export const FollowContainer = styled.div`
  min-height: 5em;
  width: 100%;
  text-align: center;
`;

export const FollowBtn = styled.button`
  width: 9em;
  height: 3em;

  font-size: 18px;
  background-color: #167ece;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
  color: #ffffff;
  outline: none;
  border: none;
  cursor: pointer;
  border-radius: 26px;
  margin-right: 1em;
  margin-left: 3em;
`;

export const FollowNum = styled.span`
  font-size: 20px;
`;

export const MyPostContainer = styled.div`
  min-height: 5em;
  width: 100%;
`;

export const MyPostTitle = styled.span`
  margin-left: 1em;
  font-size: 33px;
`;

export const EditBtn = styled.button`
  float: right;
  display: inline-block;
  width: 5em;
  height: 2em;
  font-size: 16px;
  margin-top: 0.3em;
  margin-right: 1em;
  background-color: #167ece;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
  color: #ffffff;
  outline: none;
  border: none;
  cursor: pointer;
  border-radius: 26px;
`;

export const DivisionLine = styled.div`
  margin: 0 auto;
  margin-top: 0.8em;
  width: 97%;
  height: 2px;
  background: #000;
`;

const gridAnime = keyframes`
   0%{
        height: 0;
    }
    100%{
        height: 30em;
    }
`;

export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  margin-bottom: 1em;
  // animation: ${gridAnime} 5s;
  // &::-webkit-scrollbar {
  //   display: none;
  // }
  // overflow: auto;
  // transition: max-height 0.8s;
  @media screen and (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

export const PlusIcon = styled(PlusLg)`
  width: 2.5em;
  height: 3em;
  position: relative;
  margin: 0.7em auto;
  cursor: pointer;
`;

export const IconContainer = styled.div`
  width: 100%;
  min-height: 1em;
  text-align: center;
  align-item: center;
  justify-content: center;
  path {
    fill: #424242;
  }
`;

export const DotsIcon = styled(ThreeDotsVertical)`
  width: 3em;
  height: 2.3em;
  fill: #7a7a7a;
  cursor: pointer;
`;

const fadeInRight = keyframes`
   0%{
        opacity:0.5;
        height: 1em;
        // transform: translateX(-1.5em);
    }
    100%{
        opacity:1;
      height: 4.2em;
        // transform: translateX(-3em);
    }
`;

export const DropDownContainer = styled.div`
  position: absolute;
  top: 3em;
  right: -1em;
  &:hover .menu {
    display: block;
    width: 7em;
    opacity: 1;
  }
`;

export const MenuContainer = styled.div`
  position: absolute;
  width: 1em;
  display: none;
  border: 1.5px solid #9e9e9e;
  overflow: hidden;
  border-radius: 10px;
  transform: translateX(-3em);
  animation: ${fadeInRight} 0.5s;
  background: #fff;
  opacity: 0;
`;

export const Menu = styled.div`
  margin: 0.3em 0.2em;
  padding: 0.2em;
  border-radius: 10px;
  background: #fff;
  text-align: center;
  cursor: pointer;
  &:hover {
    background: #b5b5b3;
    color: white;
  }
`;

export const Menu1 = styled(Menu)`
  border: none;
`;

export const Menu2 = styled(Menu)`
  border: none;

  color: #d16262;
`;

export const NameFixInput = styled.input`
  font-size: 30px;
  font-weight: 350;
  margin-bottom: 0.2em;
  outline: none;
  font-family: sans-serif;
`;

export const IntroduceFixInput = styled.textarea`
  outline: none;
  resize: none;
  width: 30.5em;
  font-size: 16px;
  height: 5em;
  font-family: sans-serif;
`;

export const EditCompleteBtn = styled(EditBtn)`
  position: absolute;
  top: 3em;
  right: -1em;
  border-radius: 10px;
  background: #949494;
  box-shadow: none;
`;

export const FollowBtn2 = styled(FollowBtn)`
  font-size: 16px;
  display: inline-block;
  border-radius: 10px;
  width: 5em;
  height: 2em;
  margin-left: 1em;
  transform: translateY(-0.4em);
  // background: #ed9c28;
`;

export const FollowedBtn = styled.div`
  text-align: center;
  background: #16ce69;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
  color: #ffffff;
  outline: none;
  border: none;
  cursor: pointer;
  font-size: 16px;
  display: inline-block;
  border-radius: 10px;
  width: 7em;
  height: 2em;
  margin-left: 1em;
  transform: translateY(-0.4em);
  vertical-align: middle;
  line-height: 2em;
`;

const showModal = keyframes`
  from {
    top: 85%;
    right: -90%;
    transform: scale(0) ;
  }
  to {
    top: 35%
    transform: scale(1);
  }
`;

export const ModalContainer = styled.div`
  position: fixed;
  top: 35%;
  margin: 0 auto;
  left: 0;
  right: 0;
  float: center;
  width: 25em;
  animation: ${showModal} 0.5s;
  z-index: 10000;
  background: #f5f5f5;
  border-radius: 15px;
`;

export const ModalBackground = styled.div`
  position: fixed;
  top: 0%;
  width: 100%;
  height: 100%;
  background: grey;
  opacity: 0.5;
  z-index: 999;
`;

export const ModalTitle = styled.p`
  font-size: 22px;
  margin: 3em auto;
  margin-bottom: 2em;
`;

export const ModalBtn = styled.button`
  outline: none;
  border-radius: 10px;
  border: none;
  height: 1.5em;
  font-size: 18px;
  min-width: 3em;
  background: #42a5c9;
  color: #fff;
  cursor: pointer;
`;

export const ModalBtnNo = styled(ModalBtn)`
  background: #42a5c9;
`;

export const CheckIcon = styled(Check)`
  width: 1.3em;
  height: 1.3em;
  fill: #fff;
  display: inline-block;
  transform: translate(-0.2em, -0.05em);
`;
// export const name = styled.div``;

// export const name = styled.div``;

// export const name = styled.div``;

// export const name = styled.div``;

// export const name = styled.div``;
export const dummy = ["a", "b", "c", "d", "e", "f", "g", "g", "g", "g"];
