import React, { useRef } from "react";
import { useSelector } from "react-redux";
import { RootState } from "reducers";
import axios from "axios";
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
  setProfileImg?: any;
}

const MyPageProfileImg = ({ size, fix, src, setProfileImg }: Props) => {
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
    </>
  );
};

export default MyPageProfileImg;
