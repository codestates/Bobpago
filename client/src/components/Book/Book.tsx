import React, { useState, useRef, useEffect } from "react";
import Page from "./Page";
import {
  BookContainer,
  Cover,
  FlipBook,
  FrontCoverImg,
  FrontCover,
  FrontCoverLogo,
  FrontCoverBack,
  FrontCoverFront,
  NextPageBtn,
  PrevPageBtn,
  BackCover,
  BackCoverBack,
  BackCoverFront,
} from "./styles";

const Book = () => {
  const [description, setDescription] = useState<any>([""]);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const frontCoverRef = useRef<any>(null);

  useEffect(() => {
    if (currentPage > 0) {
      frontCoverRef.current.style.transform =
        "rotateY(-179deg) translateX(0.2em)";
      setTimeout(() => {
        frontCoverRef.current.style.zIndex = -1;
      }, 350);
    } else {
      frontCoverRef.current.style.transform = "rotateY(-1deg)";
      setTimeout(() => {
        frontCoverRef.current.style.zIndex = 99;
      }, 310);
    }
  }, [currentPage]);

  //다음 페이지가 있으면 새로 만들고 이전 페이지는 넘기기 없으면 이전 페이지 넘기기
  const handleCreateOrTurnPage = () => {
    if (description.length === currentPage) {
      setDescription([...description, ""]);
    }
    setCurrentPage(currentPage + 1);
  };

  const handleChangeDescription = (page: number, value: string): void => {
    let copiedDescription = description.slice();
    copiedDescription[page - 1] = value;
    setDescription(copiedDescription);
  };
  // const [img, setImg] = useState<any>({
  //   detailImageFile: null,
  //   detailImageUrl: null,
  // });

  // const setImageFromFile = (event: any) => {
  //   const {
  //     target: { files },
  //   } = event;
  //   let reader = new FileReader();
  //   reader.onload = function () {
  //     setImg({ result: reader.result });
  //   };
  //   reader.readAsDataURL(file);
  // };

  return (
    <>
      <BookContainer>
        <Cover></Cover>
        <FlipBook>
          <FrontCover ref={frontCoverRef}>
            <FrontCoverBack className="back">
              {/* <input
              type="file"
              id="detail_image"
              accept="image/*"
              onChange={({ target: { files } }) => {
                if (files.length) {
                  setImageFromFile({
                    file: files[0],
                    setImageUrl: ({ result }) => setState({detailImageFile: files[0], detailImageUrl: result});
                }
          }}
            ></input> */}
              {/* <UploadedImg src={fileUrl} alt="없는 이미지" /> */}
            </FrontCoverBack>
            <FrontCoverFront className="front">
              <FrontCoverImg src="/img/ingredient.png" />
              <div id="book-title">
                <h2>레시피 순서를 작성해주세요</h2>
              </div>
              <FrontCoverLogo src="/img/BobpagoName.png" />
            </FrontCoverFront>
          </FrontCover>
          {description.map((el: any, i: number) => {
            return (
              <Page
                currentPage={currentPage}
                text={el}
                key={i}
                selfPage={i + 1}
                handleChangeDescription={handleChangeDescription}
              />
            );
          })}
          <BackCover>
            <BackCoverBack className="back"></BackCoverBack>
            <BackCoverFront className="front"></BackCoverFront>
          </BackCover>
        </FlipBook>
      </BookContainer>
      <NextPageBtn onClick={() => handleCreateOrTurnPage()}>다음</NextPageBtn>
      <PrevPageBtn onClick={() => setCurrentPage(currentPage - 1)}>
        이전
      </PrevPageBtn>
    </>
  );
};

export default Book;
