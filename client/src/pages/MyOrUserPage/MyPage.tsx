import React, { useState, useEffect } from "react";
import Nav from "components/Nav/Nav";
import MyPageProfileImg from "components/Profile/MyPage/MyPageProfileImg";
import Card from "components/Card/MyPage/Card";
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
} from "./styles";

const MyPage = () => {
  const [profileFix, setProfileFix] = useState<boolean>(false);
  const [myPostFix, setMyPostFix] = useState<boolean>(false);
  const [bookmarkFix, setBookmarkFix] = useState<boolean>(false);
  const [myPostNum, setMyPostNum] = useState<number>(6);
  const [bookmarkNum, setBookmarkNum] = useState<number>(6);
  const [standardNum, setStandardNum] = useState<number>(6);
  const [nickname, setNickname] = useState<string>("Lorem");
  const [introduce, setIntroduce] = useState<string>(
    "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Inprovident aperiam incidunt adipisci quas maxime harum recusandae inventore. Facilis impedit nemo distinctio quod eveniet voluptas alias atque sed nam. Qui."
  );

  // 반응형 웹 : 너비가 줄어들면 줄어든 만큼 조금 보여주기
  // useEffect(() => {
  //   window.innerWidth
  // }, [window.innerWidth])

  return (
    <>
      <Nav />
      <PageContainer>
        <UserProfileContainer>
          <ProfileImgContainer>
            <MyPageProfileImg
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLHvzyqlpe7Aw_qH5ZR5fvjErwjzNuqIlc6A&usqp=CAU"
              size={15}
              fix={profileFix}
            />
          </ProfileImgContainer>
          <ProfileContentsContainer>
            {profileFix ? (
              <NameFixInput
                defaultValue={nickname}
                onChange={(e) => setNickname(e.target.value)}
              />
            ) : (
              <ProfileName>{nickname}</ProfileName>
            )}
            {profileFix ? (
              <IntroduceFixInput
                defaultValue={introduce}
                onChange={(e) => setIntroduce(e.target.value)}
              />
            ) : (
              <ProfileIntroduce>{introduce}</ProfileIntroduce>
            )}
            {profileFix ? (
              <EditCompleteBtn onClick={() => setProfileFix(false)}>
                수정 완료
              </EditCompleteBtn>
            ) : (
              <DropDownContainer>
                <DotsIcon />
                <MenuContainer className="menu">
                  <Menu1 onClick={() => setProfileFix(true)}>
                    개인정보수정
                  </Menu1>
                  <Menu2>회원탈퇴</Menu2>
                </MenuContainer>
              </DropDownContainer>
            )}
          </ProfileContentsContainer>
        </UserProfileContainer>
        <FollowContainer>
          <FollowBtn>Following</FollowBtn>
          <FollowNum>123</FollowNum>
          <FollowBtn>Follower</FollowBtn>
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
            <PlusIcon onClick={() => setMyPostNum(myPostNum + standardNum)} />
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
            <PlusIcon
              onClick={() => setBookmarkNum(bookmarkNum + standardNum)}
            />
          </IconContainer>
        </MyPostContainer>
      </PageContainer>
    </>
  );
};

export default MyPage;
