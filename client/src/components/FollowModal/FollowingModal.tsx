import React, { Dispatch, SetStateAction, useState } from "react";
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
  setFollowingModal: Dispatch<SetStateAction<boolean>>;
}

const FollowingModal = ({ setFollowingModal }: Props) => {
  const [view, setView] = useState<number>(4);
  return (
    <FollowContainer>
      <Title>Following</Title>
      <XIcon onClick={() => setFollowingModal(false)} />
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

export default FollowingModal;
