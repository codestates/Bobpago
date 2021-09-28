import styled from "styled-components";
import { Man } from "@styled-icons/entypo/Man/Man";
import { Pen } from "@styled-icons/fa-solid/Pen/Pen";
import { Pencil } from "@styled-icons/boxicons-solid/Pencil/Pencil";
import { CameraEdit } from "@styled-icons/fluentui-system-filled/CameraEdit/CameraEdit";

interface SizeProps {
  size?: number;
  src?: string;
}

export const ProfileContainer = styled.div<SizeProps>`
  width: ${(props) => (props.size ? (props.size * 2) / 3 + "em" : "1em")};
  height: ${(props) => (props.size ? (props.size * 2) / 3 + "em" : "1em")};
  border: ${(props) =>
    props.size ? (props.size * 4) / 9 + "px solid transparent" : "1em"};
  border-radius: 50%;
  overflow: hidden;
  background: ${(props) => (props.src ? "???" : "#969696")};
  box-shadow: 1px 1px 25px #e6e6e6;
`;

export const ProfileIcon = styled(Man)<SizeProps>`
  transform: translate(-18.9%, 18%);
  fill: #f2f2f2;
  width: ${(props) => (props.size ? props.size + "em" : "1em")};
  height: ${(props) => (props.size ? props.size + "em" : "1em")};
`;

interface FixProps {
  size?: number;
  fix?: boolean;
  src?: string;
}

export const PenIcon = styled(Pencil)<FixProps>`
  position: absolute;
  transform: translate(90%, -75%);
  display: ${(props) => (props.fix ? "block" : "none")};
  width: ${(props) => (props.size ? (props.size * 2) / 5 + "em" : "1em")};
  height: ${(props) => (props.size ? (props.size * 2) / 5 + "em" : "1em")};
  fill: ${(props) => (props.src ? "#575757" : "#65a3c2")}; ;
`;

export const ProfileImg = styled.img<SizeProps>`
  border: ${(props) =>
    props.size ? (props.size * 4) / 9 + "px solid transparent" : "1em"};
  box-shadow: 1px 1px 25px #e6e6e6;
  width: ${(props) => (props.size ? (props.size * 2) / 3 + "em" : "1em")};
  height: ${(props) => (props.size ? (props.size * 2) / 3 + "em" : "1em")};
  object-fit: cover;
  object-position: center right;
`;

export const EditContainer = styled.div<FixProps>`
  position: absolute;
  transform: translate(125%, -85%);
  display: ${(props) => (props.fix ? "block" : "none")};
  width: ${(props) => (props.size ? (props.size * 3) / 10 + "em" : "1em")};
  height: ${(props) => (props.size ? (props.size * 3) / 10 + "em" : "1em")};
  border-radius: 50%;
  cursor: pointer;
  background: #58a4c4;
`;

export const EditIcon = styled(CameraEdit)<FixProps>`
  transform: translateY(25%);
  fill: #e8e8e8;
  margin: 0 auto;
  display: ${(props) => (props.fix ? "block" : "none")};
  width: ${(props) => (props.size ? (props.size * 1) / 5 + "em" : "1em")};
  height: ${(props) => (props.size ? (props.size * 1) / 5 + "em" : "1em")};
`;

// export const name = styled.div``;
// CameraEdit;
