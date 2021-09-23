import styled from "styled-components";

export const TotalSudoContainer = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`;

export const UserProfile = styled.div`
  display: flex;
  margin-bottom: 2em;
  position: relative;
  ::before {
    content: "";
    position: absolute;
    bottom: -0.7em;
    left: 0;
    width: 100%;
    height: 1px;
    background-color: gray;
  }
`;

export const ProfileImage = styled.div`
  width: 2em;
  height: 2em;
  border-radius: 50%;
  background-color: #cecece;
  margin-right: 1em;
`;

export const UserEtcBox = styled.div``;

export const UserName = styled.div`
  font-size: 18px;
  margin-bottom: 5px;
`;

export const UpdatedAt = styled.div`
  font-size: 12px;
`;

export const CommentContent = styled.div`
  width: 80%;
  background-color: #ffffff;
  margin-bottom: 1em;
  font-size: 14px;
`;

export const CommentImage = styled.div`
  width: 50%;
  height: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: salmon;
  margin-bottom: 5em;
`;
