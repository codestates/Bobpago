import React from "react";
import { ProfileContainer, ProfileIcon, PenIcon, ProfileImg } from "./styles";

interface Props {
  size?: number;
  fix?: boolean;
  src?: string;
}

const Profile = ({ size, fix, src }: Props) => {
  return (
    <>
      <ProfileContainer src={src} size={size}>
        {src ? (
          <ProfileImg src={src} size={size} />
        ) : (
          <ProfileIcon size={size} />
        )}
      </ProfileContainer>
      <PenIcon src={src} size={size} fix={fix} />
    </>
  );
};

export default Profile;
