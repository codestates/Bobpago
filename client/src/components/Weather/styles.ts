import styled from "styled-components";
import { ArrowLongLeft } from "@styled-icons/entypo/ArrowLongLeft";
import { ArrowLongRight } from "@styled-icons/entypo/ArrowLongRight";
import { WeatherSqualls } from "@styled-icons/fluentui-system-regular/WeatherSqualls";

export const WeatherContainer = styled.div`
  display: flex;
  position: absolute;
  right: 3%;
  top: 10%;
`;

export const WeatherText = styled.div`
  font-size: 12px;
`;

export const WindContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

export const LeftArrow = styled(ArrowLongLeft)`
  width: 15px;
`;

export const RightArrow = styled(ArrowLongRight)`
  width: 15px;
`;

export const WindIcon = styled(WeatherSqualls)`
  width: 25px;
`;
