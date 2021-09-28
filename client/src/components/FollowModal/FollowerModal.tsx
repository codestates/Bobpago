import React, { useState, Dispatch, SetStateAction } from "react";
import Profile from "components/Profile/FollowList/Profile";
import {
  FollowContainer,
  Title,
  ProfileImgContainer,
  ProfileContainer,
  ProfileTextContainer,
  NameContainer,
  dummy,
  ViewAllContainer,
  XIcon,
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

interface Props {
  setFollowerModal: Dispatch<SetStateAction<boolean>>;
}

const FollowerModal = ({ setFollowerModal }: Props) => {
  const [view, setView] = useState<number>(4);
  return (
    <FollowContainer>
      <Title>Follower</Title>
      <XIcon onClick={() => setFollowerModal(false)} />
      {dummy.slice(0, view).map((el: any, i: number) => {
        return <FollowList key={i} />;
      })}
      {dummy.length <= 3 || view === dummy.length ? null : (
        <ViewAllContainer onClick={() => setView(dummy.length)}>
          VIEW ALL
        </ViewAllContainer>
      )}
    </FollowContainer>
  );
};

export default FollowerModal;
