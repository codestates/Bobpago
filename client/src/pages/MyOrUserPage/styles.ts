import styled, { keyframes } from "styled-components";
import { PlusLg } from "@styled-icons/bootstrap/PlusLg/PlusLg";
import { ThreeDotsVertical } from "@styled-icons/bootstrap/ThreeDotsVertical/ThreeDotsVertical";
import { Check } from "@styled-icons/bootstrap/Check/Check";
import { DashLg } from "@styled-icons/bootstrap/DashLg/DashLg";
import { main } from "theme";

export const Container = styled.div`
  position: relative;
  padding-top: 4em;
  width: 100%;
  min-height: 100vh;
  background-color: ${main.bg};
`;

export const PageContainer = styled.div`
  background-color: ${main.bg};
  margin: 0 auto;
  width: 50em;
  min-height: 10em;
  height: 100%;
  position: relative;
  @media screen and (max-width: 768px) {
    width: 90%;
  }
`;

export const UserProfileContainer = styled.div`
  display: flex;
  flex-direction: row;
  min-height: 5em;
  height: 15em;
  width: 100%;
  @media screen and (max-width: 480px) {
    flex-direction: column;
    height: 20em;
  }
`;

export const ProfileImgContainer = styled.div`
  width: 15em;
  padding: 3.5em 1em 3em 3em;
  @media screen and (max-width: 480px) {
    padding: 3em 1em 0em 0em;
    margin: 0 auto;
    text-align: center;
  }
`;

export const ProfileContentsContainer = styled.div`
  width: 40em;
  padding: 3.5em 0 2em 1em;
  @media screen and (max-width: 768px) {
    padding-top: 3.5em;
  }
  @media screen and (max-width: 480px) {
    padding-top: 1em;
    padding-bottom: 1em;
  }
`;

export const ProfileName = styled.p`
  display: inline-block;
  font-size: ${main.middleFont};
  font-weight: 350;
  margin-bottom: 0.2em;
  @media screen and (max-width: 480px) {
    font-size: 2.3em;
  }
`;

export const ProfileIntroduce = styled.div`
  width: 20em;
  font-size: 1.5em;
  word-break: keep-all;
  @media screen and (max-width: 480px) {
    font-size: 1.3em;
  }
`;

export const ProfileRecommend = styled.div`
  width: 20em;
  position: relative;
  top: 1em;
  left: 2em;
  color: dimgrey;
  font-size: 1.5em;
  word-break: keep-all;
`;

export const FollowContainer = styled.div`
  min-height: 5em;
  width: 100%;
  text-align: center;
`;

export const FollowBtn = styled.button`
  width: 7em;
  height: 2.5em;
  font-size: 1.2em;
  background-color: #167ece;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
  color: #ffffff;
  outline: none;
  border: none;
  cursor: pointer;
  border-radius: 26px;
  margin-right: 1em;
  margin-left: 3em;
  @media screen and (max-width: 768px) {
    font-size: 15px;
  }
  @media screen and (max-width: 480px) {
    width: 7em;
    margin-left: 1em;
  }
`;

export const FollowNum = styled.span`
  font-size: 1.5em;
`;

export const MyPostContainer = styled.div`
  min-height: 5em;
  width: 100%;
`;

export const MyPostTitle = styled.span`
  margin-left: 1em;
  font-size: 1.5em;
`;

export const EditBtn = styled.button`
  float: right;
  display: inline-block;
  width: 5em;
  height: 2em;
  font-size: 1em;
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
  margin: 0.8em auto 0;
  width: 97%;
  height: 2px;
  background: grey;
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
  @media screen and (max-width: 480px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

export const NoPostContainer = styled.div`
  display: flex;
  justify-content: center;
`;
export const NoPostText = styled.span`
  margin-top: 3em;
  margin-bottom: 3em;
  font-size: 2em;
  color: dimgrey;
`;

export const PlusIcon = styled(PlusLg)`
  width: 7em;
  height: 2.8em;
  position: relative;
  margin: 0.7em auto;
  cursor: pointer;
`;

export const IconContainer = styled.div`
  width: 100%;
  min-height: 1em;
  text-align: center;
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
  top: 5em;
  right: 1em;
  &:hover .menu {
    display: block;
    width: 7em;
    opacity: 1;
  }
  @media screen and (max-width: 480px) {
    top: 3em;
    right: 0em;
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
  font-size: 1em;
`;

export const Menu2 = styled(Menu)`
  border: none;
  font-size: 1em;
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
  background: #167ece;
  box-shadow: none;
`;

export const FollowBtn2 = styled(FollowBtn)`
  font-size: 1em;
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
  font-size: 1em;
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
    top: 35%;
    transform: scale(1);
  }
`;

export const ModalContainer = styled.div`
  position: fixed;
  top: 20%;
  margin: 0 auto;
  left: 0;
  right: 0;
  z-index: 10000;
`;

export const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background: grey;
  opacity: 0.5;
  z-index: 999;
`;

export const ModalTitle = styled.p`
  font-size: 22px;
  margin: 3em auto 2em;
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

export const MinusIcon = styled(DashLg)`
  width: 7em;
  height: 3em;
  position: relative;
  margin: 0.7em auto;
  cursor: pointer;
`;

export const CheckPassword = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  top: 30%;
  width: 20em;
  margin: 0 auto;
  height: 13em;
  background: #e3e3e3;
  z-index: 100;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  text-align: center;
`;

export const CheckPasswordInput = styled.input`
  text-align: center;
  margin: 0 auto;
  width: 80%;
  outline: none;
  height: 3em;
  font-size: 1em;
  background: #fff;
`;

export const ChangeUseInfoContainer = styled(CheckPassword)`
  width: 20em;
  height: 20em;
`;

export const CheckPasswordBtn = styled(EditCompleteBtn)`
  position: relative;
  text-align: center;
  top: 0.5em;
  transform: translateX(12em);
`;

export const CheckPasswordText = styled.p`
  font-size: 1.3em;
  margin: 1em auto;
`;

export const CheckWithDrawContainer = styled(CheckPassword)``;

export const BtnContainer = styled.div`
  padding: 0 3em;
  display: flex;
  flex-direction: row;
  margin-top: 3em;
`;

export const WithDrawBtn = styled.button`
  outline: none;
  width: 3em;
  height: 2em;
  font-size: 18px;
  background-color: #167ece;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
  color: #ffffff;
  outline: none;
  border: none;
  cursor: pointer;
  border-radius: 26px;
  margin-right: 1.5em;
  margin-left: 1.5em;
`;

export const EditInfoContainer = styled(CheckWithDrawContainer)`
  top: 10%;
  width: 30em;
  height: 30em;
`;

export const EditInfoImgContainer = styled.div`
  width: 100%;
`;

export const InputContainer = styled.div`
  margin-left: 3em;
  text-align: left;
`;

export const InputTitle = styled.p``;

export const EditInput = styled(CheckPasswordInput)``;

export const ModalBackground2 = styled(ModalBackground)`
  opacity: 0;
  z-index: 10;
`;

export const CheckEditBtn = styled(CheckPasswordBtn)`
  transform: translateX(18.5em);
`;

// export const name = styled.div``;
export const dummy = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "g",
  "g",
  "g",
  "g",
  "g",
  "g",
  "g",
  "g",
];
