import React, { useState, useEffect } from "react";
import Nav from "components/Nav/Nav";
import MyPageProfileImg from "components/Profile/MyPage/MyPageProfileImg";
import MyPageEditProfileImg from "components/Profile/MyPage/MyPageEditProfileImg";
import Card from "components/Card/MyPage/Card";
import BookmarkCard from "components/Card/MyPage/BookmarkCard";
import FollowingModal from "components/FollowModal/FollowingModal";
import FollowerModal from "components/FollowModal/FollowerModal";
import { useDispatch, useSelector } from "react-redux";
import { removeAccessToken } from "actions/Accesstoken";
import { useHistory } from "react-router";
import axios from "axios";
import { RootState } from "reducers";
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
  EditBtn,
  DivisionLine,
  GridContainer,
  PlusIcon,
  IconContainer,
  DotsIcon,
  MenuContainer,
  DropDownContainer,
  Menu1,
  Menu2,
  dummy,
  NameFixInput,
  IntroduceFixInput,
  EditCompleteBtn,
  ModalBackground,
  MinusIcon,
  CheckPassword,
  CheckPasswordInput,
  CheckPasswordBtn,
  CheckPasswordText,
  CheckWithDrawContainer,
  BtnContainer,
  WithDrawBtn,
  EditInfoContainer,
  EditInfoImgContainer,
  InputContainer,
  InputTitle,
  EditInput,
  ModalBackground2,
  Container,
} from "./styles";

interface Post {
  amount: number;
  createdAt: string;
  estTime: number;
  id: number;
  level: number;
  thumbnail: string;
  title: string;
  updatedAt: string;
  userId: number;
  views: number;
}

interface EditInfo {
  password?: string | undefined;
  nickname?: string | undefined;
  profile?: string | undefined;
}

const MyPage = () => {
  const [passwordModalEdit, setPasswordModalEdit] = useState<boolean>(false);
  const [passwordModalWithDraw, setPasswordModalWithDraw] =
    useState<boolean>(false);
  const [myPostFix, setMyPostFix] = useState<boolean>(false);
  const [bookmarkFix, setBookmarkFix] = useState<boolean>(false);
  const [myPostNum, setMyPostNum] = useState<number>(6);
  const [bookmarkNum, setBookmarkNum] = useState<number>(6);
  const [standardNum, setStandardNum] = useState<number>(6);
  const [nickname, setNickname] = useState<string>("");
  const [followingNum, setFollowingNum] = useState<number>(0);
  const [followerNum, setFollowerNum] = useState<number>(0);
  const [followingModal, setFollowingModal] = useState<boolean>(false);
  const [followerModal, setFollowerModal] = useState<boolean>(false);
  const [editInfoModal, setEditInfoModal] = useState<boolean>(false);
  const [checkWithDrawModal, setCheckWithDrawModal] = useState<boolean>(false);
  const [password, setPassword] = useState<string>("");
  const [passwordWithDraw, setPasswordWithDraw] = useState<string>("");
  const [editNickName, setEditNickName] = useState<string>("");
  const [editPassword, setEditPassword] = useState<string>("");
  const [editIntroduce, setEditIntroduce] = useState<string>("");
  const [profileImg, setProfileImg] = useState<string | null>("");
  const [myPostData, setMyPostData] = useState<any>([]);
  const [bookmarkData, setBookmarkData] = useState<any>([]);
  const [introduce, setIntroduce] = useState<string>("");
  const [id, setId] = useState<number | null>(null);
  const [followeeInfo, setFolloweeInfo] = useState<any>([]);
  const [followerInfo, setFollowerInfo] = useState<any>([]);
  const [temporaryImg, setTemporaryImg] = useState<string>("");
  const { accessToken, tokenType } = useSelector(
    (state: RootState) => state.AccesstokenReducer
  );
  const history = useHistory();
  const dispatch = useDispatch();

  async function getData() {
    const response = await axios.get(
      `${process.env.REACT_APP_SERVER_URL}/me?tokenType=${tokenType}`,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${accessToken}`,
        },
      }
    );
    const data = response.data.data;
    setNickname(data.nickname);
    setIntroduce(data.profile);
    data.imageUrl &&
      setProfileImg(`${process.env.REACT_APP_S3_IMG_URL}${data.imageUrl}`);
    setMyPostData(data.recipes);
    setFollowingNum(data.followees);
    setFollowerNum(data.followers);
    setId(data.id);
  }

  useEffect(() => {
    getData();
    !accessToken && history.push("/");
  }, []);

  // 반응형 웹 : 너비가 줄어들면 줄어든 만큼 조금 보여주기
  // useEffect(() => {
  //   window.innerWidth
  // }, [window.innerWidth])

  // 팔로우 팔로워 모달 끄기
  const ModalOff = () => {
    setFollowingModal(false);
    setFollowerModal(false);
  };

  // 개인정보 수정 비밀번호 확인
  const passwordCheckEdit = async () => {
    try {
      const data = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/checkMyInfo?tokenType=${tokenType}`,
        {
          password: password,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setPasswordModalEdit(false);
      setEditInfoModal(true);
      setEditNickName(nickname);
      setEditIntroduce(introduce);
      setEditPassword(password);
    } catch (err) {
      alert("비밀번호가 틀렸습니다");
    }
  };

  // 회원탈퇴 비밀번호 확인
  const passwordCheckWithDraw = async () => {
    const data = await axios.post(
      `${process.env.REACT_APP_SERVER_URL}/checkMyInfo?tokenType=${tokenType}`,
      {
        password: password,
      },
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${accessToken}`,
        },
      }
    );
    if (data) {
      setPasswordModalWithDraw(false);
      setCheckWithDrawModal(true);
    } else {
      alert("비밀번호가 틀렸습니다");
    }
  };

  // 회원정보 수정
  const handleChangeMyInfo = async () => {
    if (temporaryImg) {
      const formData = new FormData();
      formData.append("files", temporaryImg);
      const uploadImg = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/image/${id}/?tokenType=${tokenType}&path=user`,
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
            authorization: `Bearer ${accessToken}`,
          },
        }
      );
      const url = uploadImg.data.data.imageUrl;
      setProfileImg(`${process.env.REACT_APP_S3_IMG_URL}${url}`);
    }
    const editedInfo: EditInfo = {};
    if (editPassword !== password) editedInfo.password = editPassword;
    if (editNickName !== nickname) editedInfo.nickname = editNickName;
    if (editIntroduce !== introduce) editedInfo.profile = editIntroduce;
    if (Object.keys(editedInfo).length !== 0) {
      await axios.patch(
        `${process.env.REACT_APP_SERVER_URL}/me?tokenType=${tokenType}`,
        editedInfo,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${accessToken}`,
          },
        }
      );
      getData();
      setEditInfoModal(false);
    } else if (temporaryImg) {
      setEditInfoModal(false);
    } else {
      setEditInfoModal(false);
      alert("바뀐 정보가 없습니다");
    }
  };

  // 회원탈퇴
  const handleWithDraw = async () => {
    try {
      const data = await axios.delete(
        `${process.env.REACT_APP_SERVER_URL}/me?tokenType=${tokenType}`,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${accessToken}`,
          },
        }
      );
      history.push("/");
      dispatch(removeAccessToken());
    } catch (err) {
      console.log(err);
    }
  };

  //팔로잉 모달 켜기
  const handleFollowingModalOn = async () => {
    const data = await axios.get(
      `${process.env.REACT_APP_SERVER_URL}/user/${id}/followee?tokenType=${tokenType}`,
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

  //팔로워 모달 켜기
  const handleFollowerModalOn = async () => {
    const data = await axios.get(
      `${process.env.REACT_APP_SERVER_URL}/user/${id}/follower?tokenType=${tokenType}`,
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

  // 내 글 삭제
  const removeMyPost = async (i: number, id: number) => {
    const copiedData = myPostData.slice();
    copiedData.splice(i, 1);
    setMyPostData(copiedData);
    const data = await axios.delete(
      `${process.env.REACT_APP_SERVER_URL}/recipe/${id}?tokenType=${tokenType}`,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${accessToken}`,
        },
      }
    );
  };

  // 북마크 삭제
  const removeBookmarkCheck = async (i: number, id: number) => {
    const copiedData = bookmarkData.slice();
    copiedData.splice(i, 1);
    setBookmarkData(copiedData);
    const data = await axios.delete(
      `${process.env.REACT_APP_SERVER_URL}/${id}/bookmarks?tokenType=${tokenType}`,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${accessToken}`,
        },
      }
    );
  };

  // 토큰타입이 jwt면 비밀번호 확인
  const handleOpenModalEdit = () => {
    if (tokenType === "jwt") setPasswordModalEdit(true);
    else {
      setEditInfoModal(true);
      setEditNickName(nickname);
      setEditIntroduce(introduce);
    }
  };

  // 토큰타입이 jwt면 비밀번호 확인
  const handleOpenModalWithDraw = () => {
    if (tokenType === "jwt") setPasswordModalWithDraw(true);
    else {
      setCheckWithDrawModal(true);
    }
  };

  return (
    <>
      <Nav opac={true} />
      <Container>
        <PageContainer>
          <UserProfileContainer>
            <ProfileImgContainer>
              <MyPageProfileImg
                src={profileImg ? profileImg : undefined}
                size={15}
              />
            </ProfileImgContainer>
            <ProfileContentsContainer>
              <ProfileName>{nickname}</ProfileName>
              <ProfileIntroduce>{introduce}</ProfileIntroduce>
              <DropDownContainer>
                <DotsIcon />
                <MenuContainer className="menu">
                  <Menu1 onClick={() => handleOpenModalEdit()}>
                    개인정보수정
                  </Menu1>
                  <Menu2 onClick={() => handleOpenModalWithDraw()}>
                    회원탈퇴
                  </Menu2>
                </MenuContainer>
              </DropDownContainer>
            </ProfileContentsContainer>
          </UserProfileContainer>
          <FollowContainer>
            <FollowBtn onClick={() => handleFollowingModalOn()}>
              Following
            </FollowBtn>
            <FollowNum>{followingNum}</FollowNum>
            <FollowBtn onClick={() => handleFollowerModalOn()}>
              Follower
            </FollowBtn>
            <FollowNum>{followerNum}</FollowNum>
          </FollowContainer>
          <MyPostContainer>
            <MyPostTitle>내 글 목록</MyPostTitle>
            <EditBtn
              onClick={() =>
                myPostFix ? setMyPostFix(false) : setMyPostFix(true)
              }
            >
              수정
            </EditBtn>
            <DivisionLine />
            <GridContainer>
              {myPostData.slice(0, myPostNum).map((el: any, i: number) => (
                <Card
                  removeMyPost={removeMyPost}
                  index={i}
                  key={i}
                  postData={el}
                  fix={myPostFix}
                />
              ))}
            </GridContainer>
            <IconContainer>
              {myPostNum > standardNum && myPostData.length > standardNum && (
                <MinusIcon
                  onClick={() => setMyPostNum(myPostNum - standardNum)}
                />
              )}
              {myPostData.length > myPostNum && (
                <PlusIcon
                  onClick={() => setMyPostNum(myPostNum + standardNum)}
                />
              )}
            </IconContainer>
          </MyPostContainer>
          <MyPostContainer>
            <MyPostTitle>북마크 목록</MyPostTitle>
            <EditBtn
              onClick={() =>
                bookmarkFix ? setBookmarkFix(false) : setBookmarkFix(true)
              }
            >
              수정
            </EditBtn>
            <DivisionLine />
            <GridContainer>
              {bookmarkData &&
                bookmarkData
                  .slice(0, bookmarkNum)
                  .map((el: any, i: number) => (
                    <BookmarkCard
                      removeBookmarkCheck={removeBookmarkCheck}
                      index={i}
                      key={i}
                      postData={el}
                      fix={bookmarkFix}
                    />
                  ))}
            </GridContainer>
            <IconContainer>
              {bookmarkData &&
                bookmarkNum > standardNum &&
                bookmarkData.length > standardNum && (
                  <MinusIcon
                    onClick={() => setBookmarkNum(bookmarkNum - standardNum)}
                  />
                )}
              {bookmarkData.length >= bookmarkNum && (
                <PlusIcon
                  onClick={() => setBookmarkNum(bookmarkNum + standardNum)}
                />
              )}
            </IconContainer>
          </MyPostContainer>
        </PageContainer>
      </Container>
      {followingModal || followerModal ? (
        <ModalBackground onClick={() => ModalOff()} />
      ) : null}
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
      {passwordModalEdit && (
        <>
          <ModalBackground2 onClick={() => setPasswordModalEdit(false)} />
          <CheckPassword>
            <CheckPasswordText>비밀번호 확인</CheckPasswordText>
            <CheckPasswordInput
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <CheckPasswordBtn onClick={() => passwordCheckEdit()}>
              확인
            </CheckPasswordBtn>
          </CheckPassword>
        </>
      )}
      {passwordModalWithDraw && (
        <>
          <ModalBackground2 onClick={() => setPasswordModalWithDraw(false)} />
          <CheckPassword>
            <CheckPasswordText>비밀번호 확인</CheckPasswordText>
            <CheckPasswordInput
              value={passwordWithDraw}
              onChange={(e) => setPasswordWithDraw(e.target.value)}
            />
            <CheckPasswordBtn onClick={() => passwordCheckWithDraw()}>
              확인
            </CheckPasswordBtn>
          </CheckPassword>
        </>
      )}
      {checkWithDrawModal && (
        <>
          <ModalBackground2 onClick={() => setCheckWithDrawModal(false)} />
          <CheckWithDrawContainer>
            <CheckPasswordText>탈퇴하시겠습니까?</CheckPasswordText>
            <BtnContainer>
              <WithDrawBtn onClick={() => handleWithDraw()}>네</WithDrawBtn>
              <WithDrawBtn onClick={() => setCheckWithDrawModal(false)}>
                아니요
              </WithDrawBtn>
            </BtnContainer>
          </CheckWithDrawContainer>
        </>
      )}
      {editInfoModal && (
        <>
          <ModalBackground2 onClick={() => setEditInfoModal(false)} />
          <EditInfoContainer>
            <CheckPasswordText>개인정보 수정</CheckPasswordText>
            <EditInfoImgContainer>
              <MyPageEditProfileImg
                userId={id}
                setTemporaryImg={setTemporaryImg}
                setProfileImg={setProfileImg}
                src={profileImg ? profileImg : undefined}
                size={12}
                fix={true}
              />
            </EditInfoImgContainer>
            <InputContainer>
              <InputTitle>닉네임</InputTitle>
              <EditInput
                value={editNickName}
                onChange={(e) => setEditNickName(e.target.value)}
              />
            </InputContainer>
            {tokenType === "jwt" && (
              <InputContainer>
                <InputTitle>비밀번호</InputTitle>
                <EditInput
                  value={editPassword}
                  onChange={(e) => setEditPassword(e.target.value)}
                />
              </InputContainer>
            )}
            <InputContainer>
              <InputTitle>소개글</InputTitle>
              <EditInput
                value={editIntroduce}
                onChange={(e) => setEditIntroduce(e.target.value)}
              />
            </InputContainer>
            <CheckPasswordBtn onClick={() => handleChangeMyInfo()}>
              확인
            </CheckPasswordBtn>
          </EditInfoContainer>
        </>
      )}
    </>
  );
};

export default MyPage;
