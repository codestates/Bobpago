import React, { useState } from "react";
import Nav from "components/Nav/Nav";
import MyPageProfileImg from "components/Profile/MyPage/MyPageProfileImg";
import Card from "components/Card/MyPage/Card";
import {
  PageContainer,
  ModalContainer,
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
  Menu,
  Menu1,
  Menu2,
  dummy,
  NameFixInput,
  FollowBtn2,
  FollowedBtn,
  CheckIcon,
  ModalBackground,
} from "./styles";

const UserPage = () => {
  const [myPostNum, setMyPostNum] = useState<number>(6);
  const [standardNum, setStandardNum] = useState<number>(6);
  const [showFollowing, setShowFollowing] = useState<boolean>(false);
  const [showFollower, setShowFollower] = useState<boolean>(false);

  return (
    <>
      <Nav opac={false} />
      <PageContainer>
        <UserProfileContainer>
          <ProfileImgContainer>
            <MyPageProfileImg
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQEZrATmgHOi5ls0YCCQBTkocia_atSw0X-Q&usqp=CAU"
              size={15}
            />
          </ProfileImgContainer>
          <ProfileContentsContainer>
            <ProfileName>안치원</ProfileName>
            {/* <FollowBtn2>Follow</FollowBtn2> */}
            <FollowedBtn>
              <CheckIcon />
              Following
            </FollowedBtn>
            <ProfileIntroduce>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. In
              provident aperiam incidunt adipisci quas maxime harum recusandae
              inventore. Facilis impedit nemo distinctio quod eveniet voluptas
              alias atque sed nam. Qui.
            </ProfileIntroduce>
          </ProfileContentsContainer>
        </UserProfileContainer>
        <FollowContainer>
          <FollowBtn>Following</FollowBtn>
          <FollowNum>123</FollowNum>
          <FollowBtn>Follower</FollowBtn>
          <FollowNum>234</FollowNum>
        </FollowContainer>
        <MyPostContainer>
          <MyPostTitle>작성 글 목록</MyPostTitle>
          <DivisionLine />
          <GridContainer>
            {dummy.slice(0, myPostNum).map(() => (
              <Card />
            ))}
          </GridContainer>
          <IconContainer>
            <PlusIcon onClick={() => setMyPostNum(myPostNum + standardNum)} />
          </IconContainer>
        </MyPostContainer>
      </PageContainer>
      <ModalBackground />
      <ModalContainer>follower</ModalContainer>
    </>
  );
};

export default UserPage;
