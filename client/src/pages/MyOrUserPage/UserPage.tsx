import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";
import { useSelector } from "react-redux";
import { RootState } from "reducers";
import Nav from "components/Nav/Nav";
import MyPageProfileImg from "components/Profile/MyPage/MyPageProfileImg";
import BookmarkCard from "components/Card/MyPage/BookmarkCard";
import Card from "components/Card/MyPage/Card";
import FollowingModal from "components/FollowModal/FollowingModal";
import FollowerModal from "components/FollowModal/FollowerModal";
import {
  PageContainer,
  UserProfileContainer,
  ProfileImgContainer,
  ProfileContentsContainer,
  ProfileName,
  ProfileIntroduce,
  FollowContainer,
  FollowBtn,
  FollowNum,
  MyPostContainer,
  MyPostTitle,
  DivisionLine,
  GridContainer,
  PlusIcon,
  IconContainer,
  dummy,
  FollowBtn2,
  FollowedBtn,
  CheckIcon,
  ModalBackground,
  MinusIcon,
} from "./styles";

const UserPage = () => {
  const accessToken = useSelector(
    (state: RootState) => state.AccesstokenReducer.accesstoken
  );
  const [myPostNum, setMyPostNum] = useState<number>(6);
  const [bookmarkNum, setBookmarkNum] = useState<number>(6);
  const [standardNum, setStandardNum] = useState<number>(6);
  const [showFollowing, setShowFollowing] = useState<boolean>(false);
  const [showFollower, setShowFollower] = useState<boolean>(false);
  const [followingModal, setFollowingModal] = useState<boolean>(false);
  const [followerModal, setFollowerModal] = useState<boolean>(false);
  const [userPosts, setUserPosts] = useState<any>([]);
  const [bookmarks, setBookmarks] = useState<any>([]);
  const [follow, setFollow] = useState<boolean>(false);
  const [userInfo, setUserInfo] = useState<any>([]);
  const profileS3Url = process.env.REACT_APP_S3_IMG_URL;
  const serverUrl = process.env.REACT_APP_SERVER_URL;
  let { userId } = useParams();
  console.log(profileS3Url + userInfo.imageUrl);

  async function getData() {
    const response = await axios.get(
      `${process.env.REACT_APP_SERVER_URL}/user/${userId}?tokenType=jwt`,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${accessToken}`,
        },
      }
    );

    const data = response.data.data;
    setUserInfo(data);
    setUserPosts(data.recipes);
    setUserPosts(data.bookmarks);
    console.log(data);
  }

  useEffect(() => {
    getData();
  }, []);

  const ModalOff = () => {
    setFollowingModal(false);
    setFollowerModal(false);
  };

  const handleFollow = async () => {
    if (follow) {
      setFollow(false);
    } else {
      const data = await axios.post(
        `${serverUrl}/user/${userId}/follow?tokenType=jwt`,
        {},
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setFollow(true);
    }
  };

  return (
    <>
      <Nav opac={false} />
      <PageContainer>
        <UserProfileContainer>
          <ProfileImgContainer>
            <MyPageProfileImg
              src={
                userInfo.imageUrl ? profileS3Url + userInfo.imageUrl : undefined
              }
              size={15}
            />
          </ProfileImgContainer>
          <ProfileContentsContainer>
            <ProfileName>{userInfo && userInfo.nickname}</ProfileName>
            {!follow ? (
              <FollowBtn2 onClick={() => handleFollow()}>Follow</FollowBtn2>
            ) : (
              <FollowedBtn onClick={() => handleFollow()}>
                <CheckIcon />
                Following
              </FollowedBtn>
            )}
            <ProfileIntroduce>{userInfo && userInfo.profile}</ProfileIntroduce>
          </ProfileContentsContainer>
        </UserProfileContainer>
        <FollowContainer>
          <FollowBtn onClick={() => setFollowingModal(true)}>
            Following
          </FollowBtn>
          <FollowNum>{userInfo && userInfo.followees}</FollowNum>
          <FollowBtn onClick={() => setFollowerModal(true)}>Follower</FollowBtn>
          <FollowNum>{userInfo && userInfo.followers}</FollowNum>
        </FollowContainer>
        <MyPostContainer>
          <MyPostTitle>작성 글 목록</MyPostTitle>
          <DivisionLine />
          <GridContainer>
            {userPosts.slice(0, myPostNum).map((el: any, i: number) => (
              <Card index={i} key={i} postData={el} />
            ))}
          </GridContainer>
          <IconContainer>
            {myPostNum > standardNum && userPosts.length > standardNum && (
              <MinusIcon
                onClick={() => setMyPostNum(myPostNum - standardNum)}
              />
            )}
            {userPosts.length > myPostNum && (
              <PlusIcon onClick={() => setMyPostNum(myPostNum + standardNum)} />
            )}
          </IconContainer>
        </MyPostContainer>
        <MyPostContainer>
          <MyPostTitle>북마크 목록</MyPostTitle>
          <DivisionLine />
          <GridContainer>
            {bookmarks.slice(0, myPostNum).map(() => (
              <BookmarkCard />
            ))}
          </GridContainer>
          <IconContainer>
            {bookmarkNum > standardNum && bookmarks.length > standardNum && (
              <MinusIcon
                onClick={() => setMyPostNum(bookmarkNum - standardNum)}
              />
            )}
            {bookmarks.length > myPostNum && (
              <PlusIcon
                onClick={() => setMyPostNum(bookmarkNum + standardNum)}
              />
            )}
          </IconContainer>
        </MyPostContainer>
      </PageContainer>
      {(followingModal || followerModal) && (
        <ModalBackground onClick={() => ModalOff()} />
      )}
      {followingModal && (
        <FollowingModal setFollowingModal={setFollowingModal} />
      )}
      {followerModal && <FollowerModal setFollowerModal={setFollowerModal} />}
    </>
  );
};

export default UserPage;
