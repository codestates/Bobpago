import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import useHover from "utils/useHover";
import Tag from "components/Tag/Tag";
import WriteRecipeStarRating from "components/StarRating/WriteRecipe/WriteRecipeStarRating";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "reducers";
import { goToNextPageEdit, goToPrevPageEdit } from "actions/EditRecipePage";
import { editDifficulty, editIngredient } from "actions/EditRecipeContents";
import { notify } from "actions/Notification";
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
  const contents = useSelector(
    (state: RootState) => state.EditRecipeContentsReducer
  );

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
    const selectedData = options.filter(
      (el: any) => contents.ingredient.indexOf(el.id) !== -1
    );
    setSelected(selectedData);
  }

  useEffect(() => {
    getData();
    setDifficulty2(contents.difficulty);
  }, [contents.difficulty]);

  useEffect(() => {
    const alreadySelected = options.filter(
      (el: any) => contents.ingredient.indexOf(el.id) !== -1
    );
    setSelected(alreadySelected);
  }, [options]);

  useEffect(() => {
    if (circle2IsHover) setCircle2IsHover(true);
    else setCircle2IsHover(false);
  }, [circle2IsHover]);

  useEffect(() => {
    if (circle1IsHover) setCircle1IsHover(true);
    else setCircle1IsHover(false);
  }, [circle1IsHover]);

  const handleStoreIngredient = () => {
    if (selected.length === 0) {
      dispatch(notify("????????? ?????? ?????? ???????????????"));
      return;
    }
    const filteredSelected = selected.map((el: any) => el.id);
    dispatch(editDifficulty(difficulty));
    dispatch(editIngredient(filteredSelected));
    dispatch(goToNextPageEdit());
  };

  useEffect(() => {
    window.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("mousedown", handleClickOutside);
    };
  });

  //??????????????? ???????????? ???????????? ??????
  const handleClickOutside = (event: any): void => {
    const { current: wrap } = wrapperRef;

    if (!wrap.contains(event.target)) {
      setDisplay(false);
    }
  };

  //?????? ?????? ???????????? ????????? ????????? ???????????? ?????? ????????? push
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

  //???????????? ????????? ????????? ????????? ?????? ??????????????? ??????, index??????
  const idFiltered = (id: number | undefined) => {
    let idFiltered = selected.map((el: any) => el.id);
    let indexOfTarget = idFiltered.indexOf(id);
    return indexOfTarget;
  };

  //????????? ????????? ????????? ?????? ????????? ???????????? ?????? ??????????????? ???????????? ?????? ????????? ?????? ????????? ??????
  const nameFiltered = (name: string) => {
    let selectedName = selected.map((el: Option) => el.name);
    let selectedTarget = selectedName.indexOf(name);
    let optionName = options.map((el: Option) => el.name);
    let indexOfTarget = optionName.indexOf(name);
    return [selectedTarget, indexOfTarget];
  };

  //React.KeyboardEvent<object> ??? key????????? ??????
  const enterKey = (e: any) => {
    e.preventDefault();
    // if (e.keyCode === 13 && e.target.value === "") {
    //   handleStoreIngredient();
    //   return;
    // }
    if (e.keyCode === 13 && e.target.value) {
      const [selectIndex, optionIndex] = nameFiltered(e.target.value);
      if (selectIndex === -1 && optionIndex !== -1) {
        updateDex(options[optionIndex]);
      }
    }
    //???????????? ????????? ????????? ??? advanced??? ?????????
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
        <DifficultyTitle>?????? ???????????? ??????????????????</DifficultyTitle>
        <StarContainer>
          <WriteRecipeStarRating
            size={3}
            rate={difficulty}
            setDifficulty2={setDifficulty2}
          />
        </StarContainer>
        <IngredientTitle>????????? ????????? ????????? ???????????????</IngredientTitle>
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
        ??????
      </NextButton>
      <PrevButton
        ref={circle1}
        page={page}
        self={2}
        onClick={() => dispatch(goToPrevPageEdit())}
      >
        ??????
      </PrevButton>
    </>
  );
};

export default Ingredient;
