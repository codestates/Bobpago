import React, { useState, useEffect, useRef } from "react";
import useHover from "utils/useHover";
import { useDispatch } from "react-redux";
import { goToNextPage, goToPrevPage } from "actions/WriteRecipePage";
import { setDescription } from "actions/WriteRecipeContents";
import {
  DescriptionSlide,
  NextButton,
  PrevButton,
  CompleteButton,
  ModalContainer,
  ModalBackground,
  ModalTitle,
  ModalBtn,
  ModalBtnNo,
} from "./styles";
import Page from "components/Book/Page";
import {
  BookContainer,
  Cover,
  FlipBook,
  FrontCoverImg,
  FrontCover,
  FrontCoverLogo,
  FrontCoverBack,
  FrontCoverFront,
  BackCover,
  BackCoverBack,
  BackCoverFront,
  PrevPageBtn,
  NextPageBtn,
} from "./descriptionStyles";

const Description = ({
  page,
  scale,
  setCircle1IsHover,
  setCircle2IsHover,
}: any) => {
  const dispatch = useDispatch();
  const [circle1, circle1IsHover] = useHover();
  const [circle2, circle2IsHover] = useHover();
  const [description, setDescriptionPage] = useState<any>([""]);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [imgFiles, setImgFiles] = useState<any>([]);
  const [modalOn, setModalOn] = useState<boolean>(false);
  const frontCoverRef = useRef<any>(null);

  useEffect(() => {
    setImgFiles([
      "https://bobpago-depoloy-images.s3.ap-northeast-2.amazonaws.com/recipe/29/1632665672739",
      "https://bobpago-depoloy-images.s3.ap-northeast-2.amazonaws.com/recipe/29/1632665672761",
    ]);
  }, []);

  useEffect(() => {
    currentPage < 0 && setCurrentPage(0);
  }, [currentPage]);

  useEffect(() => {
    if (circle2IsHover) setCircle2IsHover(true);
    else setCircle2IsHover(false);
  }, [circle2IsHover]);

  useEffect(() => {
    if (circle1IsHover) setCircle1IsHover(true);
    else setCircle1IsHover(false);
  }, [circle1IsHover]);

  const handleStoreIngredient = () => {
    dispatch(setDescription(description));
    setModalOn(true);
  };

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
      setDescriptionPage([...description, ""]);
    }
    setCurrentPage(currentPage + 1);
  };

  const handleChangeDescription = (page: number, value: string): void => {
    let copiedDescription = description.slice();
    copiedDescription[page - 1] = value;
    setDescriptionPage(copiedDescription);
  };

  const handleSubmitRecipe = () => {};

  const handleImgChange = (e: any, i: number) => {
    let copiedDescription = description.slice();
    let copiedImgFiles = imgFiles.slice();
    for (let i = 0; i < e.target.files.length; i++) {
      copiedDescription.push("");
      copiedImgFiles[i] = URL.createObjectURL(e.target.files[i]);
    }
    setDescription(copiedDescription);
    setImgFiles(copiedImgFiles);
  };
  return (
    <>
      <DescriptionSlide page={page} scale={scale}>
        <BookContainer>
          <Cover></Cover>
          <FlipBook>
            <FrontCover ref={frontCoverRef}>
              <FrontCoverBack className="back">
                <input
                  type="file"
                  multiple
                  onChange={(e) => handleImgChange(e, 0)}
                />
                <img src={imgFiles[0] && imgFiles[0]} alt="이미지 없음" />
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
                  imgFile={imgFiles[i + 1]}
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
        <NextPageBtn onClick={() => handleCreateOrTurnPage()}>next</NextPageBtn>
        <PrevPageBtn onClick={() => setCurrentPage(currentPage - 1)}>
          prev
        </PrevPageBtn>
      </DescriptionSlide>
      <NextButton
        ref={circle2}
        page={page}
        self={3}
        onClick={() => handleStoreIngredient()}
      >
        Complete
      </NextButton>
      <PrevButton
        ref={circle1}
        page={page}
        onClick={() => dispatch(goToPrevPage())}
      >
        Prev
      </PrevButton>
      {modalOn && (
        <>
          <ModalBackground onClick={() => setModalOn(false)} />
          <ModalContainer>
            <ModalTitle>글 작성을 완료하시겠습니까?</ModalTitle>
            <ModalBtn onClick={() => handleSubmitRecipe()}>네</ModalBtn>
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
            <ModalBtnNo onClick={() => setModalOn(false)}>아니요</ModalBtnNo>
          </ModalContainer>
        </>
      )}
    </>
  );
};

export default Description;
