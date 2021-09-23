import React, { useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
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
} from "./styles";

const Time = ({ page, scale }: any) => {
  const [time, setTime] = useState<any>(null);
  const [otherTime, setOtherTime] = useState<any>(null);
  const theOtherTimeRef = useRef<any>(null);

  const handleChange = (event: any) => {
    const {
      target: { value },
    } = event;
    setTime(value);
  };

  useEffect(() => {
    time !== "other" && setOtherTime("");
  }, [time]);

  return (
    <RecipeTimeSlide page={page} scale={scale}>
      <ExpectedTimeContainer>
        <ExpectedTime>예상 조리시간을 말씀해 주세요</ExpectedTime>
        <ExpectedTimeTooltip />
        <ExpectedTimeTooltipText>
          숫자로만 입력해주세요! 예) 2시간 = 120
        </ExpectedTimeTooltipText>
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
            <LabelText onClick={() => setTime("10min")}>10분 미만</LabelText>
          </label>
          <label htmlFor="20min">
            <TimeRadioButton
              name="time"
              value="20min"
              checked={time === "20min"}
              onChange={handleChange}
            />
            <LabelText onClick={() => setTime("20min")}>20분 미만</LabelText>
          </label>
          <label htmlFor="30min">
            <TimeRadioButton
              name="time"
              value="30min"
              checked={time === "30min"}
              onChange={handleChange}
            />
            <LabelText onClick={() => setTime("30min")}>30분 미만</LabelText>
          </label>
          <label htmlFor="40min">
            <TimeRadioButton
              name="time"
              value="40min"
              checked={time === "40min"}
              onChange={handleChange}
            />
            <LabelText onClick={() => setTime("40min")}>40분 미만</LabelText>
          </label>
          <label htmlFor="50min">
            <TimeRadioButton
              name="time"
              value="50min"
              checked={time === "50min"}
              onChange={handleChange}
            />
            <LabelText onClick={() => setTime("50min")}>50분 미만</LabelText>
          </label>
          <label htmlFor="other">
            <TimeRadioButton
              name="time"
              value="other"
              checked={time === "other"}
              onChange={handleChange}
            />
            <LabelText id="other" onClick={() => setTime("other")}>
              기타
            </LabelText>
          </label>
        </RadioContainer>
      </form>
      <TheOtherTimeContainer>
        <TheOtherTimeInput
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
    </RecipeTimeSlide>
  );
};

export default Time;
