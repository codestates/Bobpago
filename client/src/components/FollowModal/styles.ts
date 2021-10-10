import styled from "styled-components";
import { X } from "@styled-icons/bootstrap/X/X";

export const FollowContainer = styled.div`
  margin: 0 auto;
  width: 23em;
  max-height: 34em;
  border-radius: 15px;
  background: #ebebeb;
  padding-bottom: 0.7em;
  overflow: auto;
  position: fixed;
  top: 20%;
  left: 0;
  right: 0;
  float: center;
  z-index: 10000;
`;

export const Title = styled.p`
  padding-top: 0.5em;
  margin-left: 1.2em;
  font-size: 21px;
  font-weight: 400;
`;

export const ProfileImgContainer = styled.div`
  margin: 1em;
  margin-bottom: 0.3em;
  display: inline-block;
  vertical-align: middle;
  cursor: pointer;
`;

export const ProfileContainer = styled.div`
  vertical-align: middle;
  width: 100%;
`;

export const ProfileTextContainer = styled.div`
  margin-left: 0.3em;
  display: inline-block;
  vertical-align: middle;
`;

export const NameContainer = styled.p`
  font-size: 20px;
  display: inline-block;
  cursor: pointer;
`;

export const dummy = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17,
];

export const ViewAllContainer = styled.div`
  margin-top: 0.5em;
  font-weight: 600;
  text-align: center;
`;

export const XIcon = styled(X)`
  position: absolute;
  top: 0.5em;
  right: 0.5em;
  width: 2em;
  height: 2em;
`;
