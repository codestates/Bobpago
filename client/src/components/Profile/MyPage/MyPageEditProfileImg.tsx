import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "reducers";
import axios from "axios";
import {
  ProfileEditContainer,
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
  userId: number | null;
  setTemporaryImg?: any;
}

const MyPageEditProfileImg = ({
  userId,
  size,
  fix,
  src,
  setProfileImg,
  setTemporaryImg,
}: Props) => {
  const InputImgRef = useRef<any>(null);
  const [img, setImg] = useState("");

  const handleInputClick = () => {
    InputImgRef.current && InputImgRef.current.click();
  };

  const handleImgChange = async (e: any) => {
    setTemporaryImg(e.target.files[0]);
    setImg(URL.createObjectURL(e.target.files[0]));
  };

  return (
    <>
      {!img ? (
        <ProfileEditContainer src={src} size={size}>
          <ProfileIcon size={size} />
        </ProfileEditContainer>
      ) : (
        <ProfileImg src={img ? img : undefined} size={size} />
      )}
      <EditContainer
        onClick={() => handleInputClick()}
        src={src}
        size={size}
        fix={fix}
      >
        <EditIcon src={src} size={size} fix={fix} />
      </EditContainer>
      {/* <PenIcon src={src} size={size} fix={fix} /> */}
      <input type="file" ref={InputImgRef} hidden onChange={handleImgChange} />
    </>
  );
};

export default MyPageEditProfileImg;
