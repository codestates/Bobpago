import React, { useState, Dispatch, SetStateAction } from "react";
import { useHistory } from "react-router";
import Profile from "components/Profile/FollowList/Profile";
import {
  FollowContainer,
  Title,
  ProfileImgContainer,
  ProfileContainer,
  ProfileTextContainer,
  NameContainer,
  ViewAllContainer,
  XIcon,
} from "./styles";

interface ListProps {
  follow?: any;
}

const FollowList: React.FC<ListProps> = ({ follow }) => {
  const history = useHistory();

  const moveToUserPage = () => {
    history.push({
      pathname: `/userpage/${follow.id}`,
      state: follow.id,
    });
  };
  return (
    <ProfileContainer>
      <ProfileImgContainer onClick={() => moveToUserPage()}>
        <Profile
          size={5.7}
          src={
            follow.imageUrl &&
            `${process.env.REACT_APP_S3_IMG_URL}${follow.imageUrl}`
          }
        />
      </ProfileImgContainer>
      <ProfileTextContainer>
        <NameContainer onClick={() => moveToUserPage()}>
          {follow.nickname}
        </NameContainer>
      </ProfileTextContainer>
    </ProfileContainer>
  );
};

interface Props {
  setFollowerModal: Dispatch<SetStateAction<boolean>>;
  follow?: any;
}

const FollowerModal = ({ setFollowerModal, follow }: Props) => {
  const [view, setView] = useState<number>(4);
  return (
    <FollowContainer>
      <Title>팔로워</Title>
      <XIcon onClick={() => setFollowerModal(false)} />
      {follow &&
        follow.slice(0, view).map((el: any, i: number) => {
          return <FollowList follow={follow[i]} key={i} />;
        })}
      {follow && (follow.length <= 3 || view === follow.length) ? null : (
        <ViewAllContainer onClick={() => setView(follow.length)}>
          {follow && "VIEW ALL"}
        </ViewAllContainer>
      )}
    </FollowContainer>
  );
};

export default FollowerModal;
