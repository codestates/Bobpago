import React, { useState, useEffect } from "react";
import Nav from "components/Nav/Nav";
import MyPageProfileImg from "components/Profile/MyPage/MyPageProfileImg";
import Card from "components/Card/MyPage/Card";
import FollowingModal from "components/FollowModal/FollowingModal";
import FollowerModal from "components/FollowModal/FollowerModal";
import {
  PageContainer,
  UserProfileContainer,
  ProfileImgContainer,
  ProfileContentsContainer,
  ProfileName,
  ProfileIntroduce,
  FollowContainer,
  FollowBtn,
  FollowNum,
  MyPostContainer,
  MyPostTitle,
  EditBtn,
  DivisionLine,
  GridContainer,
  PlusIcon,
  IconContainer,
  DotsIcon,
  MenuContainer,
  DropDownContainer,
  Menu1,
  Menu2,
  dummy,
  NameFixInput,
  IntroduceFixInput,
  EditCompleteBtn,
  ModalBackground,
  MinusIcon,
  CheckPassword,
  CheckPasswordInput,
  CheckPasswordBtn,
  CheckPasswordText,
  CheckWithDrawContainer,
  BtnContainer,
  WithDrawBtn,
  EditInfoContainer,
  EditInfoImgContainer,
  InputContainer,
  InputTitle,
  EditInput,
  ModalBackground2,
} from "./styles";

const MyPage = () => {
  const [passwordModalEdit, setPasswordModalEdit] = useState<boolean>(false);
  const [passwordModalWithDraw, setPasswordModalWithDraw] =
    useState<boolean>(false);
  const [myPostFix, setMyPostFix] = useState<boolean>(false);
  const [bookmarkFix, setBookmarkFix] = useState<boolean>(false);
  const [myPostNum, setMyPostNum] = useState<number>(6);
  const [bookmarkNum, setBookmarkNum] = useState<number>(6);
  const [standardNum, setStandardNum] = useState<number>(6);
  const [nickname, setNickname] = useState<string>("Lorem");
  const [followingModal, setFollowingModal] = useState<boolean>(false);
  const [followerModal, setFollowerModal] = useState<boolean>(false);
  const [editInfoModal, setEditInfoModal] = useState<boolean>(false);
  const [checkWithDrawModal, setCheckWithDrawModal] = useState<boolean>(false);
  const [password, setPassword] = useState<string>("");
  const [passwordWithDraw, setPasswordWithDraw] = useState<string>("");
  const [editNickName, setEditNickName] = useState<string>("");
  const [editPassword, setEditPassword] = useState<string>("");
  const [editIntroduce, setEditIntroduce] = useState<string>("");
  const [introduce, setIntroduce] = useState<string>(
    "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Inprovident aperiam incidunt adipisci quas maxime harum recusandae inventore. Facilis impedit nemo distinctio quod eveniet voluptas alias atque sed nam. Qui."
  );

  // 반응형 웹 : 너비가 줄어들면 줄어든 만큼 조금 보여주기
  // useEffect(() => {
  //   window.innerWidth
  // }, [window.innerWidth])

  const ModalOff = () => {
    setFollowingModal(false);
    setFollowerModal(false);
  };

  const passwordCheckEdit = () => {
    setPasswordModalEdit(false);
    setEditInfoModal(true);
  };

  const passwordCheckWithDraw = () => {
    setPasswordModalWithDraw(false);
    setCheckWithDrawModal(true);
  };

  return (
    <>
      <Nav opac={false} />
      <PageContainer>
        <UserProfileContainer>
          <ProfileImgContainer>
            <MyPageProfileImg
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLHvzyqlpe7Aw_qH5ZR5fvjErwjzNuqIlc6A&usqp=CAU"
              size={15}
            />
          </ProfileImgContainer>
          <ProfileContentsContainer>
            <ProfileName>{nickname}</ProfileName>
            <ProfileIntroduce>{introduce}</ProfileIntroduce>
            <DropDownContainer>
              <DotsIcon />
              <MenuContainer className="menu">
                <Menu1 onClick={() => setPasswordModalEdit(true)}>
                  개인정보수정
                </Menu1>
                <Menu2 onClick={() => setPasswordModalWithDraw(true)}>
                  회원탈퇴
                </Menu2>
              </MenuContainer>
            </DropDownContainer>
          </ProfileContentsContainer>
        </UserProfileContainer>
        <FollowContainer>
          <FollowBtn onClick={() => setFollowingModal(true)}>
            Following
          </FollowBtn>
          <FollowNum>123</FollowNum>
          <FollowBtn onClick={() => setFollowerModal(true)}>Follower</FollowBtn>
          <FollowNum>234</FollowNum>
        </FollowContainer>
        <MyPostContainer>
          <MyPostTitle>내 글 목록</MyPostTitle>
          <EditBtn
            onClick={() =>
              myPostFix ? setMyPostFix(false) : setMyPostFix(true)
            }
          >
            수정
          </EditBtn>
          <DivisionLine />
          <GridContainer>
            {dummy.slice(0, myPostNum).map((el, i) => (
              <Card key={i} fix={myPostFix} />
            ))}
          </GridContainer>
          <IconContainer>
            {myPostNum > standardNum && dummy.length > standardNum && (
              <MinusIcon
                onClick={() => setMyPostNum(myPostNum - standardNum)}
              />
            )}
            {dummy.length > myPostNum && (
              <PlusIcon onClick={() => setMyPostNum(myPostNum + standardNum)} />
            )}
          </IconContainer>
        </MyPostContainer>
        <MyPostContainer>
          <MyPostTitle>북마크 목록</MyPostTitle>
          <EditBtn
            onClick={() =>
              bookmarkFix ? setBookmarkFix(false) : setBookmarkFix(true)
            }
          >
            수정
          </EditBtn>
          <DivisionLine />
          <GridContainer>
            {dummy.slice(0, bookmarkNum).map((el, i) => (
              <Card key={i} fix={bookmarkFix} />
            ))}
          </GridContainer>
          <IconContainer>
            {myPostNum > standardNum && dummy.length > standardNum && (
              <MinusIcon
                onClick={() => setBookmarkNum(bookmarkNum - standardNum)}
              />
            )}
            {dummy.length >= bookmarkNum && (
              <PlusIcon
                onClick={() => setBookmarkNum(bookmarkNum + standardNum)}
              />
            )}
          </IconContainer>
        </MyPostContainer>
      </PageContainer>
      {followingModal || followerModal ? (
        <ModalBackground onClick={() => ModalOff()} />
      ) : null}
      {followingModal && (
        <FollowingModal setFollowingModal={setFollowingModal} />
      )}
      {followerModal && <FollowerModal setFollowerModal={setFollowerModal} />}
      {passwordModalEdit && (
        <>
          <ModalBackground2 onClick={() => setPasswordModalEdit(false)} />
          <CheckPassword>
            <CheckPasswordText>비밀번호 확인</CheckPasswordText>
            <CheckPasswordInput
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <CheckPasswordBtn onClick={() => passwordCheckEdit()}>
              확인
            </CheckPasswordBtn>
          </CheckPassword>
        </>
      )}
      {passwordModalWithDraw && (
        <>
          <ModalBackground2 onClick={() => setPasswordModalWithDraw(false)} />
          <CheckPassword>
            <CheckPasswordText>비밀번호 확인</CheckPasswordText>
            <CheckPasswordInput
              value={passwordWithDraw}
              onChange={(e) => setPasswordWithDraw(e.target.value)}
            />
            <CheckPasswordBtn onClick={() => passwordCheckWithDraw()}>
              확인
            </CheckPasswordBtn>
          </CheckPassword>
        </>
      )}
      {checkWithDrawModal && (
        <>
          <ModalBackground2 onClick={() => setCheckWithDrawModal(false)} />
          <CheckWithDrawContainer>
            <CheckPasswordText>탈퇴하시겠습니까?</CheckPasswordText>
            <BtnContainer>
              <WithDrawBtn>네</WithDrawBtn>
              <WithDrawBtn onClick={() => setCheckWithDrawModal(false)}>
                아니요
              </WithDrawBtn>
            </BtnContainer>
          </CheckWithDrawContainer>
        </>
      )}
      {editInfoModal && (
        <>
          <ModalBackground2 onClick={() => setEditInfoModal(false)} />
          <EditInfoContainer>
            <CheckPasswordText>개인정보 수정</CheckPasswordText>
            <EditInfoImgContainer>
              <MyPageProfileImg
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLHvzyqlpe7Aw_qH5ZR5fvjErwjzNuqIlc6A&usqp=CAU"
                size={12}
                fix={true}
              />
            </EditInfoImgContainer>
            <InputContainer>
              <InputTitle>닉네임</InputTitle>
              <EditInput
                value={editNickName}
                onChange={(e) => setEditNickName(e.target.value)}
              />
            </InputContainer>
            <InputContainer>
              <InputTitle>비밀번호</InputTitle>
              <EditInput
                value={editPassword}
                onChange={(e) => setEditPassword(e.target.value)}
              />
            </InputContainer>
            <InputContainer>
              <InputTitle>소개글</InputTitle>
              <EditInput
                value={editIntroduce}
                onChange={(e) => setEditIntroduce(e.target.value)}
              />
            </InputContainer>
            <CheckPasswordBtn>확인</CheckPasswordBtn>
          </EditInfoContainer>
        </>
      )}
    </>
  );
};

export default MyPage;
