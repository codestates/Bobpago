import { useRef, useEffect, useState } from "react";
import {
  WholeContainer,
  Container,
  Background,
  BackgroundImg,
  InputContainer,
  InputWrapper,
  ButtonWrapper,
  ButtonText,
  IconClose,
  ErrMsg,
  OAuthContainer,
  OAuthIconContainer,
  EmailIcon,
  Placeholder,
  Ask,
  Logo,
  SignInBackground,
} from "./styles";
import gsap from "gsap";
import Loading from "components/Loading/LoginLoading";
import { useSelector, useDispatch } from "react-redux";
import { showSignUp, showNothing } from "actions/SignUpAndSignIn";
import { RootState } from "reducers";
import { setAccessToken } from "actions/Accesstoken";
import axios from "axios";

const SignIn = () => {
  const state = useSelector((state: RootState) => state.SignUpAndSignInReducer);
  const signinState = useSelector(
    (state: RootState) => state.AccesstokenReducer
  );
  const { loginDisplay } = state;
  const dispatch = useDispatch();
  const LoginRef = useRef<any>(null);
  const ContainerRef = useRef<any>(null);
  const emailError = useRef<any>(null);
  const passwordError = useRef<any>(null);
  const emailPlaceholderRef = useRef<any>(null);
  const passwordlPlaceholderRef = useRef<any>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState<boolean>(false);

  const googleUri = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.REACT_APP_GOOGLE_CLIENT_ID}&response_type=code&redirect_uri=${process.env.REACT_APP_REDIRECT_URI}/google&scope=https://www.googleapis.com/auth/userinfo.email+https://www.googleapis.com/auth/userinfo.profile+openid&access_type=offline`;
  const kakaoUri = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${process.env.REACT_APP_KAKAO_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_REDIRECT_URI}/kakao`;
  const naverUri = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${process.env.REACT_APP_NAVER_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_REDIRECT_URI}/naver&state=${process.env.REACT_APP_NAVER_STATE}`;

  useEffect((): any => {
    if (loginDisplay) {
      gsap.to(LoginRef.current, { display: "" });
      ContainerRef.current.style.display = "block";
      gsap.to(LoginRef.current, { top: "70%" });
    } else {
      LoginRef.current.style.display = "none";
      gsap.to(LoginRef.current, { top: "130%" });
      ContainerRef.current.style.display = "none";
    }
  }, [loginDisplay]);

  const handleLogin = async (e: any) => {
    e.preventDefault();
    try {
      const signIn = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/auth/signin`,
        {
          email: email,
          password: password,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const { accessToken, tokenType, id } = signIn.data.data;
      dispatch(setAccessToken(accessToken, tokenType, id));
      setLoading(true);
      dispatch(showNothing());
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    } catch (err) {
      emailError.current.style.display = "inline-block";
      passwordError.current.style.display = "inline-block";
      setTimeout(() => {
        emailError.current.style.display = "none";
        passwordError.current.style.display = "none";
      }, 2000);
    }
  };

  const handleEmailPlaceholderActive = () => {
    emailPlaceholderRef.current.style.fontSize = "22px";
    emailPlaceholderRef.current.style.backgroundColor = "transparent";
    emailPlaceholderRef.current.style.transform = "translate(-0.5em,0.7em)";
  };

  const handleEmailPlaceholderNotActive = () => {
    emailPlaceholderRef.current.style.fontSize = "12px";
    emailPlaceholderRef.current.style.transform = "translate(2.5em,0.8em)";
  };

  const handlePasswordPlaceholderActive = () => {
    passwordlPlaceholderRef.current.style.fontSize = "22px";
    passwordlPlaceholderRef.current.style.transform = "translate(-0.5em,0.7em)";
    passwordlPlaceholderRef.current.style.backgroundColor = "transparent";
  };

  const handlePasswordPlaceholderNotActive = () => {
    passwordlPlaceholderRef.current.style.fontSize = "12px";
    passwordlPlaceholderRef.current.style.transform = "translate(2.5em,0.8em)";
  };

  useEffect(() => {
    if (email === "") {
      handleEmailPlaceholderActive();
    } else {
      handleEmailPlaceholderNotActive();
    }
  }, [email]);

  useEffect(() => {
    if (password === "") {
      handlePasswordPlaceholderActive();
    } else {
      handlePasswordPlaceholderNotActive();
    }
  }, [password]);

  return (
    <>
      <WholeContainer ref={ContainerRef}>
        <Container ref={LoginRef}>
          <InputContainer>
            {/* <Title>로그인</Title> */}
            <Logo src="/img/BobpagoRow.png" width="200" />
            <Placeholder ref={emailPlaceholderRef}>이메일</Placeholder>
            <InputWrapper
              onFocus={() => handleEmailPlaceholderNotActive()}
              onBlur={() =>
                email === "" ? handleEmailPlaceholderActive() : null
              }
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <ErrMsg>
              <span ref={emailError}>잘못된 아이디입니다</span>
            </ErrMsg>
            <Placeholder ref={passwordlPlaceholderRef}>비밀번호</Placeholder>
            <InputWrapper
              type="password"
              onFocus={() => handlePasswordPlaceholderNotActive()}
              onBlur={() =>
                password === "" ? handlePasswordPlaceholderActive() : null
              }
              onChange={(e) => setPassword(e.target.value)}
            />
            <ErrMsg>
              <span ref={passwordError}>잘못된 비밀번호입니다</span>
            </ErrMsg>
            <ButtonWrapper onClick={(e) => handleLogin(e)}>
              <ButtonText>
                <EmailIcon />
                이메일로 로그인
              </ButtonText>
            </ButtonWrapper>
            <Ask>
              아직 회원이 아니신가요?{" "}
              <a href="#" onClick={() => dispatch(showSignUp())}>
                회원가입
              </a>
            </Ask>
            <OAuthContainer>
              <p>소셜계정으로 간편 로그인</p>
              <OAuthIconContainer>
                <a href={googleUri}>
                  <img
                    className="google"
                    src="/img/google.png"
                    alt="구글로그인"
                    width="45"
                  />
                </a>
                &nbsp;&nbsp;&nbsp;
                <a href={kakaoUri}>
                  <img
                    className="kakao"
                    src="/img/kakao.png"
                    alt="카카오로그인"
                    width="42"
                  />
                </a>
                &nbsp;&nbsp;&nbsp;
                <a href={naverUri}>
                  <img
                    className="naver"
                    src="/img/naver.png"
                    alt="네이버로그인"
                    width="42"
                  />
                </a>
              </OAuthIconContainer>
            </OAuthContainer>
          </InputContainer>
          <IconClose
            onClick={() => dispatch(showNothing())}
            viewBox="0 0 24 24"
            width="16"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M22.7914 3.62571C23.4589 2.95824 23.4589 1.87605 22.7914 1.20857C22.124 0.541096 21.0418 0.541096 20.3743 1.20857L12 9.58286L3.62571 1.20857C2.95824 0.541096 1.87605 0.541096 1.20857 1.20857C0.541096 1.87605 0.541096 2.95824 1.20857 3.62571L9.58286 12L1.20857 20.3743C0.541096 21.0418 0.541096 22.124 1.20857 22.7914C1.87605 23.4589 2.95824 23.4589 3.62571 22.7914L12 14.4171L20.3743 22.7914C21.0418 23.4589 22.124 23.4589 22.7914 22.7914C23.4589 22.124 23.4589 21.0418 22.7914 20.3743L14.4171 12L22.7914 3.62571Z"></path>
          </IconClose>
          <Background>
            <BackgroundImg src="/img/loginWallpaper.png" alt="배경" />
          </Background>
        </Container>
        {/* <SignInBackground2 /> */}
        <SignInBackground />
      </WholeContainer>
      {loading && <Loading />}
    </>
  );
};

export default SignIn;
