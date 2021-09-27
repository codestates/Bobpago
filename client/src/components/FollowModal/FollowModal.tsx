import React from "react";
import Profile from "components/Profile/FollowList/Profile";
import {
  FollowContainer,
  Title,
  ProfileImgContainer,
  ProfileContainer,
  ProfileTextContainer,
  NameContainer,
} from "./styles";

const FollowList = () => {
  return (
    <ProfileContainer>
      <ProfileImgContainer>
        <Profile size={5.7} />
      </ProfileImgContainer>
      <ProfileTextContainer>
        <NameContainer>안치원</NameContainer>
      </ProfileTextContainer>
    </ProfileContainer>
  );
};

const FollowModal = () => {
  return (
    <FollowContainer>
      <Title>Following</Title>
      <FollowList />
    </FollowContainer>
  );
};

export default FollowModal;
