import React, { useState, useRef, useEffect } from "react";
import useHover from "utils/useHover";
import { useDispatch, useSelector } from "react-redux";
import { goToNextPageEdit, goToPrevPageEdit } from "actions/EditRecipePage";
import { editTime, editServing } from "actions/EditRecipeContents";
import { notify } from "actions/Notification";
import {
  RecipeTimeSlide,
  ExpectedTime,
  TimeRadioButton,
  RadioContainer,
  LabelText,
  TheOtherTimeInput,
  TheOtherTimeContainer,
  TheOtherTimeTooltip,
  TheOtherTimeTooltipText,
  ExpectedTimeContainer,
  ExpectedTimeTooltip,
  ExpectedTimeTooltipText,
  NextButton,
  PrevButton,
  PeopleNumInput,
  ExpectedPeopleContainer,
} from "./styles";
import { RootState } from "reducers";

const Time = ({ page, scale, setCircle1IsHover, setCircle2IsHover }: any) => {
  const dispatch = useDispatch();
  const [time, setTimeRadio] = useState<any>(null);
  const [otherTime, setOtherTime] = useState<any>(null);
  const [people, setPeople] = useState<any>(null);
  const theOtherTimeRef = useRef<any>(null);
  const [circle1, circle1IsHover] = useHover();
  const [circle2, circle2IsHover] = useHover();
  const contents = useSelector(
    (state: RootState) => state.EditRecipeContentsReducer
  );

  useEffect(() => {
    if (contents.time === 10) setTimeRadio("10min");
    else if (contents.time === 20) setTimeRadio("20min");
    else if (contents.time === 30) setTimeRadio("30min");
    else if (contents.time === 40) setTimeRadio("40min");
    else if (contents.time === 50) setTimeRadio("50min");
    else setOtherTime(contents.time);
    setPeople(contents.serving);
  }, []);

  useEffect(() => {
    if (circle2IsHover) setCircle2IsHover(true);
    else setCircle2IsHover(false);
  }, [circle2IsHover]);

  useEffect(() => {
    if (circle1IsHover) setCircle1IsHover(true);
    else setCircle1IsHover(false);
  }, [circle1IsHover]);

  const handleChange = (event: any) => {
    const {
      target: { value },
    } = event;
    setTimeRadio(value);
  };

  const changeToTime = (time: string | number) => {
    if (typeof time === "string") return Number(time.slice(0, 3));
    else return Number(time);
  };

  const changeToNum = (time: string | number) => {
    if (typeof time === "string") return Number(time.slice(0, 2));
    else return Number(time);
  };

  const handleStoreTime = () => {
    let storedTime: number | undefined;
    otherTime
      ? (storedTime = changeToTime(otherTime))
      : (storedTime = changeToNum(time));
    if (otherTime && isNaN(storedTime)) {
      dispatch(notify("시간을 숫자로 입력해주세요"));
      return;
    }
    if (isNaN(Number(people))) {
      dispatch(notify("인분을 숫자로 입력해주세요"));
      return;
    }
    dispatch(editTime(storedTime));
    dispatch(editServing(Number(people)));
    dispatch(goToNextPageEdit());
  };

  useEffect(() => {
    time !== "other" && setOtherTime("");
  }, [time]);

  return (
    <>
      <RecipeTimeSlide page={page} scale={scale}>
        <ExpectedTimeContainer>
          <ExpectedTime>예상 조리시간을 말씀해 주세요</ExpectedTime>
        </ExpectedTimeContainer>
        <form>
          <RadioContainer>
            <label htmlFor="10min">
              <TimeRadioButton
                name="time"
                value="10min"
                checked={time === "10min"}
                onChange={handleChange}
              />
              <LabelText onClick={() => setTimeRadio("10min")}>
                10분 미만
              </LabelText>
            </label>
            <label htmlFor="20min">
              <TimeRadioButton
                name="time"
                value="20min"
                checked={time === "20min"}
                onChange={handleChange}
              />
              <LabelText onClick={() => setTimeRadio("20min")}>
                20분 미만
              </LabelText>
            </label>
            <label htmlFor="30min">
              <TimeRadioButton
                name="time"
                value="30min"
                checked={time === "30min"}
                onChange={handleChange}
              />
              <LabelText onClick={() => setTimeRadio("30min")}>
                30분 미만
              </LabelText>
            </label>
            <label htmlFor="40min">
              <TimeRadioButton
                name="time"
                value="40min"
                checked={time === "40min"}
                onChange={handleChange}
              />
              <LabelText onClick={() => setTimeRadio("40min")}>
                40분 미만
              </LabelText>
            </label>
            <label htmlFor="50min">
              <TimeRadioButton
                name="time"
                value="50min"
                checked={time === "50min"}
                onChange={handleChange}
              />
              <LabelText onClick={() => setTimeRadio("50min")}>
                50분 미만
              </LabelText>
            </label>
            <label htmlFor="other">
              <TimeRadioButton
                name="time"
                value="other"
                checked={time === "other"}
                onChange={handleChange}
              />
              <LabelText id="other" onClick={() => setTimeRadio("other")}>
                기타
              </LabelText>
            </label>
          </RadioContainer>
        </form>
        <TheOtherTimeContainer>
          <TheOtherTimeInput
            autoComplete="off"
            name="time"
            ref={theOtherTimeRef}
            placeholder="기타는 입력해주세요"
            value={otherTime}
            onChange={(e) => setOtherTime(e.target.value)}
            disabled={time !== "other" ? true : false}
          />

          <TheOtherTimeTooltip />
          <TheOtherTimeTooltipText>
            숫자로만 입력해주세요! 예) 2시간 = 120
          </TheOtherTimeTooltipText>
        </TheOtherTimeContainer>
        <ExpectedPeopleContainer>
          <ExpectedTime>몇 인분용 요리인지 적어주세요</ExpectedTime>
        </ExpectedPeopleContainer>
        <TheOtherTimeContainer>
          <PeopleNumInput
            autoComplete="off"
            placeholder="숫자로만 입력해주세요! 예) 4인분 = 4"
            onChange={(e) => setPeople(e.target.value)}
            value={people}
          />
        </TheOtherTimeContainer>
      </RecipeTimeSlide>
      <NextButton ref={circle2} page={page} onClick={() => handleStoreTime()}>
        Next
      </NextButton>
      <PrevButton
        ref={circle1}
        page={page}
        onClick={() => dispatch(goToPrevPageEdit())}
      >
        Prev
      </PrevButton>
    </>
  );
};

export default Time;
