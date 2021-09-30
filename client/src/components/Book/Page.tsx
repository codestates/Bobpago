import React, { useState, useRef, useEffect } from "react";
import {
  Flip,
  Text,
  Front,
  BackgroundImg,
  Back,
  DescriptionText,
  orderArr,
  UploadIcon,
  UploadImg,
  UploadImgText,
} from "./styles";

const Page = ({
  imgFile,
  text,
  currentPage,
  selfPage,
  handleChangeDescription,
  handleImgChange,
}: any) => {
  const pageRef = useRef<any>(null);
  const inputFileRef = useRef<any>(null);

  useEffect(() => {
    if (pageRef.current) {
      if (currentPage > selfPage) {
        pageRef.current.style.transform = `rotateY(${selfPage * 0.5 - 179}deg)`;
        setTimeout(() => {
          pageRef.current.style.zIndex = selfPage + 1;
        }, 350);
      } else {
        pageRef.current.style.boxShadow = "none";
        pageRef.current.style.transform = "rotateY(-1deg)";
        setTimeout(() => {
          if (pageRef.current) pageRef.current.style.zIndex = -selfPage + 99;
        }, 310);
      }
    }
  }, [currentPage]);

  const handleClickInput = () => {
    if (inputFileRef.current) {
      inputFileRef.current.click();
    }
  };

  return (
    <Flip ref={pageRef}>
      <Back>
        <input
          type="file"
          multiple
          hidden
          ref={inputFileRef}
          onChange={(e) => handleImgChange(e, selfPage)}
        />
        {imgFile && (
          <img
            className="food"
            src={imgFile && URL.createObjectURL(imgFile)}
            alt="없는이미지"
          />
        )}
        <UploadImg
          className={imgFile ? "uploaded" : "not_yet"}
          onClick={() => handleClickInput()}
          src="/img/uploadicon.png"
        />
        {!imgFile && <UploadImgText>이미지 업로드</UploadImgText>}
      </Back>
      <Front>
        <DescriptionText
          value={text}
          lineHeight={window.innerHeight * 0.0033 + 0.0398}
          onChange={(e) => handleChangeDescription(selfPage, e.target.value)}
          placeholder={
            "→ " + orderArr[selfPage - 1] + "번째 순서를 작성해주세요"
          }
        />
        <BackgroundImg src="/img/LineNote.png" />
      </Front>
    </Flip>
  );
};

export default Page;
