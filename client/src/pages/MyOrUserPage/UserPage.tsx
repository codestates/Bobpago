import React, { useState } from "react";
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
  DivisionLine,
  GridContainer,
  PlusIcon,
  IconContainer,
  dummy,
  FollowBtn2,
  FollowedBtn,
  CheckIcon,
  ModalBackground,
  MinusIcon,
} from "./styles";

const UserPage = () => {
  const [myPostNum, setMyPostNum] = useState<number>(6);
  const [standardNum, setStandardNum] = useState<number>(6);
  const [showFollowing, setShowFollowing] = useState<boolean>(false);
  const [showFollower, setShowFollower] = useState<boolean>(false);
  const [followingModal, setFollowingModal] = useState<boolean>(false);
  const [followerModal, setFollowerModal] = useState<boolean>(false);
  const [follow, setFollow] = useState<boolean>(false);

  const ModalOff = () => {
    setFollowingModal(false);
    setFollowerModal(false);
  };

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
            {!follow ? (
              <FollowBtn2 onClick={() => setFollow(true)}>Follow</FollowBtn2>
            ) : (
              <FollowedBtn onClick={() => setFollow(false)}>
                <CheckIcon />
                Following
              </FollowedBtn>
            )}
            <ProfileIntroduce>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. In
              provident aperiam incidunt adipisci quas maxime harum recusandae
              inventore. Facilis impedit nemo distinctio quod eveniet voluptas
              alias atque sed nam. Qui.
            </ProfileIntroduce>
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
          <MyPostTitle>작성 글 목록</MyPostTitle>
          <DivisionLine />
          <GridContainer>
            {dummy.slice(0, myPostNum).map(() => (
              <Card />
            ))}
          </GridContainer>
          <IconContainer>
            {dummy.length > myPostNum && (
              <PlusIcon onClick={() => setMyPostNum(myPostNum + standardNum)} />
            )}
            {myPostNum > standardNum && dummy.length > standardNum && (
              <MinusIcon
                onClick={() => setMyPostNum(myPostNum - standardNum)}
              />
            )}
          </IconContainer>
        </MyPostContainer>
      </PageContainer>
      {(followingModal || followerModal) && (
        <ModalBackground onClick={() => ModalOff()} />
      )}
      {followingModal && (
        <FollowingModal setFollowingModal={setFollowingModal} />
      )}
      {followerModal && <FollowerModal setFollowerModal={setFollowerModal} />}
    </>
  );
};

export default UserPage;
