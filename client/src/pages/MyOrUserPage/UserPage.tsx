import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";
import { useSelector } from "react-redux";
import { RootState } from "reducers";
import Nav from "components/Nav/Nav";
import MyPageProfileImg from "components/Profile/MyPage/MyPageProfileImg";
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
  ProfileRecommend,
  FollowContainer,
  FollowBtn,
  FollowNum,
  MyPostContainer,
  MyPostTitle,
  DivisionLine,
  GridContainer,
  NoPostContainer,
  NoPostText,
  PlusIcon,
  IconContainer,
  FollowBtn2,
  FollowedBtn,
  CheckIcon,
  ModalBackground,
  MinusIcon,
  Container,
} from "./styles";

const UserPage = () => {
  const {
    accessToken,
    tokenType,
    userId: myId,
  } = useSelector((state: RootState) => state.AccesstokenReducer);
  const [myPostNum, setMyPostNum] = useState<number>(6);
  const [standardNum, setStandardNum] = useState<number>(6);
  const [followeeInfo, setFolloweeInfo] = useState<any>([]);
  const [followerInfo, setFollowerInfo] = useState<any>([]);
  const [followingModal, setFollowingModal] = useState<boolean>(false);
  const [followerModal, setFollowerModal] = useState<boolean>(false);
  const [userPosts, setUserPosts] = useState<any>([]);
  const [follow, setFollow] = useState<boolean>(false);
  const [userInfo, setUserInfo] = useState<any>([]);
  const profileS3Url = process.env.REACT_APP_S3_IMG_URL;
  const serverUrl = process.env.REACT_APP_SERVER_URL;
  let { userId } = useParams<{ userId: string | undefined }>();

  async function getData() {
    const response = await axios.get(
      `${process.env.REACT_APP_SERVER_URL}/user/${userId}?tokenType=${tokenType}`,
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
  }

  async function checkFollow() {
    try {
      const followerData = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/user/${userId}/follower?tokenType=${tokenType}`,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${accessToken}`,
          },
        }
      );
      const followers = followerData.data.data;
      setFollowerInfo(followers);
      followerData &&
        followers.some((el: any) => el.id === myId) &&
        setFollow(true);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getData();
    checkFollow();
  }, []);

  const ModalOff = () => {
    setFollowingModal(false);
    setFollowerModal(false);
  };

  const handleFollow = async () => {
    try {
      if (follow) {
        const data = await axios.delete(
          `${serverUrl}/user/${userId}/follow?tokenType=${tokenType}`,
          {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
              authorization: `Bearer ${accessToken}`,
            },
          }
        );
        setFollow(false);
      } else {
        const data = await axios.post(
          `${serverUrl}/user/${userId}/follow?tokenType=${tokenType}`,
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
    } catch (err) {
      console.log(err);
    }
  };

  const handleFolloweeModalOn = async () => {
    const data = await axios.get(
      `${process.env.REACT_APP_SERVER_URL}/user/${userId}/followee?tokenType=${tokenType}`,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${accessToken}`,
        },
      }
    );
    setFolloweeInfo(data.data.data);
    setFollowingModal(true);
  };

  const handleFollowerModalOn = async () => {
    const data = await axios.get(
      `${process.env.REACT_APP_SERVER_URL}/user/${userId}/follower?tokenType=${tokenType}`,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${accessToken}`,
        },
      }
    );
    setFollowerInfo(data.data.data);
    setFollowerModal(true);
  };

  return (
    <>
      <Nav opac={true} />
      <Container>
        <PageContainer>
          <UserProfileContainer>
            <ProfileImgContainer>
              <MyPageProfileImg
                src={
                  userInfo.imageUrl
                    ? profileS3Url + userInfo.imageUrl
                    : undefined
                }
                size={15}
              />
            </ProfileImgContainer>
            <ProfileContentsContainer>
              <ProfileName>{userInfo && userInfo.nickname}</ProfileName>
              {!follow ? (
                <FollowBtn2 onClick={() => handleFollow()}>팔로우하기</FollowBtn2>
              ) : (
                <FollowedBtn onClick={() => handleFollow()}>
                  <CheckIcon />
                  팔로우중
                </FollowedBtn>
              )}
              {
                userInfo.profile ?
                    <ProfileIntroduce>
                      {userInfo && userInfo.profile}
                    </ProfileIntroduce> :
                    <ProfileRecommend>아직 {userInfo.nickname}님의 소개글이 없어요😢</ProfileRecommend>
              }

            </ProfileContentsContainer>
          </UserProfileContainer>
          <FollowContainer>
            <FollowBtn onClick={() => handleFolloweeModalOn()}>
              팔로잉
            </FollowBtn>
            <FollowNum>{userInfo && userInfo.followees}</FollowNum>
            <FollowBtn onClick={() => handleFollowerModalOn()}>
              팔로워
            </FollowBtn>
            <FollowNum>{userInfo && userInfo.followers}</FollowNum>
          </FollowContainer>
          <MyPostContainer>
            <MyPostTitle>작성 레시피 목록</MyPostTitle>
            <DivisionLine />
            {
              userPosts.length !== 0 ?
                  <>
                    <GridContainer>
                      {
                        userPosts
                            .slice(0, myPostNum).reverse()
                            .map((el: any, i: number) => (
                                <Card index={i} key={i} postData={el} />
                            ))
                      }
                    </GridContainer>
                    <IconContainer>
                      {myPostNum > standardNum && userPosts.length > standardNum && (
                          <MinusIcon
                              onClick={() => setMyPostNum(myPostNum - standardNum)}
                          />
                      )}
                      {userPosts.length > myPostNum && (
                          <PlusIcon
                              onClick={() => setMyPostNum(myPostNum + standardNum)}
                          />
                      )}
                    </IconContainer>
                  </> :
                  <NoPostContainer>
                    <NoPostText>아직 레시피가 없네요!</NoPostText>
                  </NoPostContainer>
            }
          </MyPostContainer>
        </PageContainer>
      </Container>
      {(followingModal || followerModal) && (
        <ModalBackground onClick={() => ModalOff()} />
      )}
      {followingModal && (
        <FollowingModal
          follow={followeeInfo}
          setFollowingModal={setFollowingModal}
        />
      )}
      {followerModal && (
        <FollowerModal
          follow={followerInfo}
          setFollowerModal={setFollowerModal}
        />
      )}
    </>
  );
};

export default UserPage;
