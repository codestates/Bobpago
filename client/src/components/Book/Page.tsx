import React, { useState, useRef, useEffect } from "react";
import {
  Flip,
  Text,
  Front,
  BackgroundImg,
  Back,
  DescriptionText,
  orderArr,
} from "./styles";

const Page = ({
  text,
  currentPage,
  selfPage,
  handleChangeDescription,
}: // imgFile,
any) => {
  const pageRef = useRef<any>(null);

  useEffect(() => {
    if (currentPage > selfPage) {
      pageRef.current.style.transform = `rotateY(${selfPage * 0.5 - 179}deg)`;
      setTimeout(() => {
        pageRef.current.style.zIndex = selfPage + 1;
      }, 350);
    } else {
      pageRef.current.style.boxShadow = "none";
      pageRef.current.style.transform = "rotateY(-1deg)";
      setTimeout(() => {
        pageRef.current.style.zIndex = -selfPage + 99;
      }, 310);
    }
  }, [currentPage]);

  return (
    <Flip ref={pageRef}>
      <Back>
        {/* <img width={100} src={imgFile && imgFile} alt="없는이미지" /> */}
        <Text>{selfPage}</Text>
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
