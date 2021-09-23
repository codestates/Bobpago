import React from "react";
import {
  UserProfile,
  ProfileImage,
  UserEtcBox,
  UserName,
  UpdatedAt,
  CommentContent,
  CommentImage,
} from "./styles";

const DRModalContent = () => {
  return (
    <>
      <UserProfile>
        <ProfileImage />
        <UserEtcBox>
          <UserName>김우석</UserName>
          <UpdatedAt>2021-09-23(목)</UpdatedAt>
        </UserEtcBox>
      </UserProfile>
      <CommentContent>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum eaque
        commodi corrupti magnam, blanditiis aspernatur! Dolore, provident
        perferendis. Fugit est nobis et animi consequatur expedita, dolorum
        tempore beatae deserunt nam.
      </CommentContent>
      <CommentImage>This is Image position</CommentImage>
    </>
  );
};

export default DRModalContent;
