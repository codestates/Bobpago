import styled from "styled-components";
import { X } from "@styled-icons/bootstrap/X/X";

interface Props {
  color: string;
}
export const Container = styled.div<Props>`
  background: ${(props) => props.color || "#a6e4e7"};
  border: medium none;
  height: 1.8em;
  font-size: 22px;
  font-weight: bold;
  letter-spacing: 1px;
  text-shadow: 1px 1px 1px rgb(0 0 0 / 14%);
  text-transform: uppercase;
  box-shadow: 0 1px 1px 0 rgb(0 0 0 / 20%);
  display: inline-block;
  font-weight: 400;
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  border: 1px solid transparent;
  line-height: 1.5;
  border-radius: 0.7em;
  color: #e8e8e8;
  padding-top: 0.15em;
  padding-left: 0.5em;
  padding-right: 0.15em;
  margin-top: 0.3em;
  margin-left: 0.4em;
  display: inline-block;
`;

export const Xicon = styled(X)`
  transform: translateY(-0.1em);
  width: 1em;
  cursor: pointer;
`;
