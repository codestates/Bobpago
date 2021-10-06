import React from "react";
import {
  WeatherContainer,
  WindIcon,
  WindContainer,
  WeatherText,
  RightArrow,
  LeftArrow,
} from "./styles";

interface WeatherProps {
  rotateMaker: number;
}

const Weather: React.FC<WeatherProps> = ({ rotateMaker }) => {
  console.log(rotateMaker);

  const windDirection = rotateMaker;
  return (
    <WeatherContainer>
      <WindIcon />
      <WindContainer>
        <WeatherText>
          {windDirection < 0 ? windDirection * -1 : windDirection}m/s
        </WeatherText>
        {windDirection < 0 ? <RightArrow /> : <LeftArrow />}
      </WindContainer>
    </WeatherContainer>
  );
};

export default Weather;
