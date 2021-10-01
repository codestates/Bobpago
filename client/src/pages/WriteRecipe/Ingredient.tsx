import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import useHover from "utils/useHover";
import Tag from "components/Tag/Tag";
import WriteRecipeStarRating from "components/StarRating/WriteRecipe/WriteRecipeStarRating";
import { useDispatch } from "react-redux";
import { goToNextPage, goToPrevPage } from "actions/WriteRecipePage";
import { setDifficulty, setIngredient } from "actions/WriteRecipeContents";
import {
  IngredientSlide,
  IngredientTitle,
  Container,
  SearchBarWrapper,
  AutoContainer,
  TagContainer,
  NextButton,
  PrevButton,
  DifficultyTitle,
  StarContainer,
} from "./styles";

interface Option {
  id?: number;
  name?: string;
}

const Ingredient = ({
  page,
  scale,
  setCircle1IsHover,
  setCircle2IsHover,
}: any) => {
  const dispatch = useDispatch();
  const [circle1, circle1IsHover] = useHover();
  const [circle2, circle2IsHover] = useHover();
  const [display, setDisplay] = useState<boolean>(false);
  const [difficulty, setDifficulty2] = useState<number>(1);
  const [options, setOptions] = useState<any>([]);
  const [search, setSearch] = useState<any>("");
  const [selected, setSelected] = useState<any>([]);
  const wrapperRef = useRef<any>(null);
  const autoRef = useRef<any>(null);

  async function getData() {
    const data = await axios.get(
      `${process.env.REACT_APP_SERVER_URL}/ingredient`,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    setOptions(data.data.data);
  }

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (circle2IsHover) setCircle2IsHover(true);
    else setCircle2IsHover(false);
  }, [circle2IsHover]);

  useEffect(() => {
    if (circle1IsHover) setCircle1IsHover(true);
    else setCircle1IsHover(false);
  }, [circle1IsHover]);

  const handleStoreIngredient = () => {
    const filteredSelected = selected.map((el: Option) => el.id);
    dispatch(setDifficulty(difficulty));
    dispatch(setIngredient(filteredSelected));
    dispatch(goToNextPage());
  };

  useEffect(() => {
    window.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("mousedown", handleClickOutside);
    };
  });

  //바깥부분을 클릭하면 없어지는 함수
  const handleClickOutside = (event: any): void => {
    const { current: wrap } = wrapperRef;
    // console.log(wrap && !wrap.contains(event.target));
    if (!wrap.contains(event.target)) {
      setDisplay(false);
    }
  };

  //이미 값이 포함되어 있으면 없애고 포함되어 있지 않으면 push
  const updateDex = (value: any): any => {
    let copiedSelected = selected.slice();
    if (value.id) {
      const indexOfTarget = idFiltered(value.id);
      if (indexOfTarget === -1) {
        copiedSelected.push(value);
      } else {
        copiedSelected.splice(indexOfTarget, 1);
      }
      setSelected(copiedSelected);
    }
  };

  //아이디를 받아서 선택된 재료에 있는 아이디인지 확인, index추출
  const idFiltered = (id: number | undefined) => {
    let idFiltered = selected.map((el: any) => el.id);
    let indexOfTarget = idFiltered.indexOf(id);
    return indexOfTarget;
  };

  //이름을 받아서 이름이 재료 목록에 포함되어 있고 선택지에는 포함되어 있지 않다는 것을 동시에 확인
  const nameFiltered = (name: string) => {
    let selectedName = selected.map((el: Option) => el.name);
    let selectedTarget = selectedName.indexOf(name);
    let optionName = options.map((el: Option) => el.name);
    let indexOfTarget = optionName.indexOf(name);
    return [selectedTarget, indexOfTarget];
  };

  //React.KeyboardEvent<object> 로 key부분은 해결
  const enterKey = (e: any) => {
    e.preventDefault();
    if (e.keyCode === 13 && e.target.value) {
      const [selectIndex, optionIndex] = nameFiltered(e.target.value);
      if (selectIndex === -1 && optionIndex !== -1) {
        updateDex(options[optionIndex]);
      }
    }
    //키보드로 검색어 바꾸는 것 advanced로 해보기
    // else if (e.keyCode === 38) {
    //   console.log(autoRef.current.children[0].children[0].textContent);
    // }
    // else if (e.keyCode === 40) {
    //   setSearch(autoRef.current.children[0].children[0].textContent);
    // }
  };
  const handleDelete = (id: number | undefined): void | undefined => {
    const indexOfTarget = idFiltered(id);
    let copiedSelected = selected.slice();
    copiedSelected.splice(indexOfTarget, 1);
    setSelected(copiedSelected);
  };

  return (
    <>
      <IngredientSlide page={page} scale={scale}>
        <DifficultyTitle>요리 난이도를 입력해주세요</DifficultyTitle>
        <StarContainer>
          <WriteRecipeStarRating
            size={3}
            rate={difficulty}
            setDifficulty2={setDifficulty2}
          />
        </StarContainer>
        <IngredientTitle>요리에 들어갈 재료를 담아주세요</IngredientTitle>
        <TagContainer ref={wrapperRef}>
          <Container>
            {/* {selected} */}
            {selected.map((item: Option) => {
              return (
                <Tag
                  id={item.id}
                  name={item.name}
                  key={item.id}
                  handleDelete={handleDelete}
                />
              );
            })}
            <SearchBarWrapper
              id="auto"
              onClick={() => setDisplay(!display)}
              placeholder=" Type here"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              autoComplete="off"
              onKeyUp={enterKey}
            />
          </Container>
          {display && (
            <AutoContainer ref={autoRef}>
              {options
                .filter(({ name }: Option) => {
                  if (name) {
                    return name.indexOf(search) > -1;
                  }
                })
                .map((value: Option) => {
                  return (
                    <div
                      onClick={(e) => updateDex(value)}
                      className={
                        idFiltered(value.id) === -1
                          ? "option"
                          : "option selected"
                      }
                      key={value.id}
                    >
                      <span>{value.name}</span>
                    </div>
                  );
                })}
            </AutoContainer>
          )}
        </TagContainer>
      </IngredientSlide>
      <NextButton
        ref={circle2}
        page={page}
        self={2}
        onClick={() => handleStoreIngredient()}
      >
        Next
      </NextButton>
      <PrevButton
        ref={circle1}
        page={page}
        self={2}
        onClick={() => dispatch(goToPrevPage())}
      >
        Prev
      </PrevButton>
    </>
  );
};

export default Ingredient;
