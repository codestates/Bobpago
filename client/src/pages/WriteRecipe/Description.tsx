import React, { useState, useEffect, useRef } from "react";
import useHover from "utils/useHover";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { resetWritePage, goToPrevPage } from "actions/WriteRecipePage";
import { setDescription, resetAllContents } from "actions/WriteRecipeContents";
import CheckExpired from "utils/CheckExpired";
import { reissueAccessToken, removeAccessToken } from "actions/Accesstoken";
import { RootState } from "reducers";
import axios, { AxiosError } from "axios";
import {
  DescriptionSlide,
  NextButton,
  PrevButton,
  ModalContainer,
  ModalBackground,
  ModalTitle,
  ModalBtn,
  ModalBtnNo,
  HiddenPage,
} from "./styles";
import Page from "components/Book/Page";
import {
  BookContainer,
  UploadImgText,
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
  UploadImg,
} from "./descriptionStyles";

const Description = ({
  page,
  scale,
  setCircle1IsHover,
  setCircle2IsHover,
}: any) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [circle1, circle1IsHover] = useHover();
  const [circle2, circle2IsHover] = useHover();
  const [description, setDescriptionPage] = useState<any>([""]);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [modalOn, setModalOn] = useState<boolean>(false);
  const [imgFiles, setImgFiles] = useState<any>([]);
  const frontCoverRef = useRef<any>(null);
  const inputFileRef = useRef<any>(null);
  const hiddenRef1 = useRef<any>(null);
  const { accessToken, tokenType, userId } = useSelector(
    (state: RootState) => state.AccesstokenReducer
  );
  const contents = useSelector(
    (state: RootState) => state.WriteRecipeContentsReducer
  );

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
        if (frontCoverRef.current) frontCoverRef.current.style.zIndex = 99;
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

  const handleSubmitRecipe = async () => {
    hiddenRef1.current.classList.add("leftmove1");

    let newToken = null;
    if (accessToken) {
      newToken = await CheckExpired(accessToken, tokenType, userId);
      if (newToken) {
        dispatch(reissueAccessToken(newToken));
      }
    }
    try {
      const data = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/recipe?tokenType=${tokenType}`,
        {
          title: contents.title,
          amount: contents.serving,
          level: contents.difficulty,
          estTime: contents.time,
          ingredientId: contents.ingredient,
          description: contents.description,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${newToken ? newToken : accessToken}`,
          },
        }
      );
      const recipeId = data.data.data.recipe.id;
      const formData = new FormData();
      for (let i = 0; i < imgFiles.length; i++) {
        formData.append("files", imgFiles[i]);
      }
      const uploadImg = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/image/${recipeId}?tokenType=${tokenType}&path=recipe`,
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
            authorization: `Bearer ${newToken ? newToken : accessToken}`,
          },
        }
      );
      setTimeout(() => {
        history.push({
          pathname: `/detailrecipe/:${recipeId}`,
          state: recipeId,
        });
      }, 700);

      dispatch(resetWritePage());
      dispatch(resetAllContents());
    } catch (err) {
      const error = err as AxiosError;
      if (error.response) {
        if (error.response.status === 401) {
          dispatch(removeAccessToken());
          history.push("/");
        }
      }
      console.log(err);
    }
  };

  const handleImgChange = (e: any, j: number) => {
    let copiedDescription = description.slice();
    let copiedImgFiles = imgFiles.slice();
    for (let i = 0; i < e.target.files.length; i++) {
      if (copiedDescription.length < i + j) copiedDescription.push("");
      copiedImgFiles[i + j] = e.target.files[i];
    }
    setDescription(copiedDescription);
    setImgFiles(copiedImgFiles);
  };

  const handleClickInput = () => {
    if (inputFileRef.current) {
      inputFileRef.current.click();
    }
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
                  ref={inputFileRef}
                  hidden
                  onChange={(e) => handleImgChange(e, 0)}
                />
                {imgFiles[0] && (
                  <img
                    className="food"
                    src={
                      imgFiles[0] ? URL.createObjectURL(imgFiles[0]) : undefined
                    }
                    alt="이미지 없음"
                  />
                )}
                <UploadImg
                  className={imgFiles[0] ? "uploaded" : "not_yet"}
                  onClick={() => handleClickInput()}
                  src="/img/uploadicon.png"
                />
                {!imgFiles[0] && <UploadImgText>이미지 업로드</UploadImgText>}
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
                  imgFile={imgFiles[i + 1] && imgFiles[i + 1]}
                  currentPage={currentPage}
                  text={el}
                  key={i}
                  selfPage={i + 1}
                  handleChangeDescription={handleChangeDescription}
                  handleImgChange={handleImgChange}
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
      </DescriptionSlide>
      <NextButton
        ref={circle2}
        page={page}
        self={3}
        onClick={() => handleStoreIngredient()}
      >
        완료
      </NextButton>
      <PrevButton
        ref={circle1}
        page={page}
        onClick={() => dispatch(goToPrevPage())}
      >
        이전
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
      <HiddenPage ref={hiddenRef1} />
    </>
  );
};

export default Description;
