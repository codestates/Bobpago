import React from "react";
import {
  ProfileContainer,
  ProfileIcon,
  PenIcon,
  ProfileImg,
  EditContainer,
  EditIcon,
} from "../styles";

interface Props {
  size?: number;
  fix?: boolean;
  src?: string;
}

const MyPageProfileImg = ({ size, fix, src }: Props) => {
  return (
    <>
      {!src ? (
        <ProfileContainer src={src} size={size}>
          <ProfileIcon size={size} />
        </ProfileContainer>
      ) : (
        <ProfileImg src={src} size={size} />
      )}
      <EditContainer src={src} size={size} fix={fix}>
        <EditIcon src={src} size={size} fix={fix} />
      </EditContainer>
      {/* <PenIcon src={src} size={size} fix={fix} /> */}
    </>
  );
};

export default MyPageProfileImg;
