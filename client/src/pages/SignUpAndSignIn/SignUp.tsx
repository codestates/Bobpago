import { useRef, useState, useEffect } from "react";
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
  EyeIcon,
  Ask,
  Logo,
  SignInBackground,
} from "./styles";
import gsap from "gsap";
import Eye from "../../components/Eye/Eye";
import { useSelector, useDispatch } from "react-redux";
import { showSignIn, showNothing } from "actions/SignUpAndSignIn";
import { RootState } from "reducers";
import axios from "axios";

const SignUp = () => {
  const state = useSelector((state: RootState) => state.SignUpAndSignInReducer);
  const { signUpDisplay } = state;
  const dispatch = useDispatch();
  const signUpRef = useRef<any>(null);
  const passwordRef = useRef<any>(null);
  const passwordConfirmRef = useRef<any>(null);
  const emailError = useRef<any>(null);
  const nicknameError = useRef<any>(null);
  const passwordError = useRef<any>(null);
  const passwordConfirmError = useRef<any>(null);
  const [email, setEmail] = useState("");
  const [nickName, setNickName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

  const handleSignUp = async () => {
    try {
      const signUp = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/signup`,
        {
          email: email,
          password: password,
          nickname: nickName,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      alert("로그인해주세요");
      dispatch(showSignIn());
    } catch (err) {
      console.log(err);
    }
  };

  useEffect((): any => {
    if (signUpDisplay) {
      gsap.to(signUpRef.current, { display: "" });
      gsap.to(signUpRef.current, { top: "20%" });
    } else {
      signUpRef.current.style.top = "100%";
      signUpRef.current.style.display = "none";
    }
  }, [signUpDisplay]);

  useEffect(() => {
    var emailExp =
      /^[0-9a-zA-Z]([-_]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;
    if (email === "") {
      emailError.current.style.display = "none";
    } else if (emailExp.test(email)) {
      emailError.current.style.display = "none";
    } else {
      emailError.current.style.display = "inline-block";
    }
  }, [email]);

  useEffect(() => {
    var nicknameExp = /^[a-zA-z0-9가-힣]{3,12}$/;
    if (nickName === "") {
      nicknameError.current.style.display = "none";
    } else if (nicknameExp.test(nickName)) {
      nicknameError.current.style.display = "none";
    } else {
      nicknameError.current.style.display = "inline-block";
    }
  }, [nickName]);

  useEffect(() => {
    var nicknameExp = /^[a-zA-z0-9]{4,12}$/;
    if (password === "") {
      passwordError.current.style.display = "none";
    } else if (nicknameExp.test(password)) {
      passwordError.current.style.display = "none";
    } else {
      passwordError.current.style.display = "inline-block";
    }
  }, [password]);

  useEffect(() => {
    if (password === passwordConfirm) {
      passwordConfirmError.current.style.display = "none";
    } else {
      passwordConfirmError.current.style.display = "inline-block";
    }
  }, [passwordConfirm]);

  useEffect(() => {
    showPassword
      ? (passwordRef.current.type = "text")
      : (passwordRef.current.type = "password");
  }, [showPassword]);

  useEffect(() => {
    showPasswordConfirm
      ? (passwordConfirmRef.current.type = "text")
      : (passwordConfirmRef.current.type = "password");
  }, [showPasswordConfirm]);

  return (
    <WholeContainer ref={signUpRef}>
      <Container>
        <InputContainer>
          {/* <Title>회원가입</Title> */}
          <Logo src="/img/BobpagoRow.png" width="200" />
          <InputWrapper
            onChange={(e) => setEmail(e.target.value)}
            placeholder="이메일"
          />
          <ErrMsg>
            <span ref={emailError}>이메일 형식이 올바르지 않습니다</span>
          </ErrMsg>
          <InputWrapper
            onChange={(e) => setNickName(e.target.value)}
            placeholder="닉네임"
          />
          <ErrMsg>
            <span ref={nicknameError}>
              닉네임은 특수문자 미포함 3글자 이상입니다.
            </span>
          </ErrMsg>
          <InputWrapper
            type="password"
            ref={passwordRef}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="비밀번호"
          />
          <EyeIcon
            onClick={() => {
              showPassword ? setShowPassword(false) : setShowPassword(true);
            }}
          >
            <Eye open={showPassword} />
          </EyeIcon>
          <ErrMsg>
            <span ref={passwordError}>
              비밀번호는 영어 대소문자, 숫자 포함 4~12글자입니다
            </span>
          </ErrMsg>
          <InputWrapper
            type="password"
            ref={passwordConfirmRef}
            onChange={(e) => setPasswordConfirm(e.target.value)}
            placeholder="비밀번호 확인"
          ></InputWrapper>
          <EyeIcon
            onClick={() => {
              showPasswordConfirm
                ? setShowPasswordConfirm(false)
                : setShowPasswordConfirm(true);
            }}
          >
            <Eye open={showPasswordConfirm} />
          </EyeIcon>
          <ErrMsg>
            <span ref={passwordConfirmError}>비밀번호가 일치하지 않습니다</span>
          </ErrMsg>
          <ButtonWrapper
            onClick={(e: any) => {
              e.preventDefault();
              handleSignUp();
            }}
          >
            <ButtonText>회원가입</ButtonText>
          </ButtonWrapper>
          <Ask>
            계정이 이미 있으신가요?{" "}
            <a href="#" onClick={() => dispatch(showSignIn())}>
              로그인
            </a>
          </Ask>
        </InputContainer>
        <IconClose
          viewBox="0 0 24 24"
          width="16"
          xmlns="http://www.w3.org/2000/svg"
          onClick={() => dispatch(showNothing())}
        >
          <path d="M22.7914 3.62571C23.4589 2.95824 23.4589 1.87605 22.7914 1.20857C22.124 0.541096 21.0418 0.541096 20.3743 1.20857L12 9.58286L3.62571 1.20857C2.95824 0.541096 1.87605 0.541096 1.20857 1.20857C0.541096 1.87605 0.541096 2.95824 1.20857 3.62571L9.58286 12L1.20857 20.3743C0.541096 21.0418 0.541096 22.124 1.20857 22.7914C1.87605 23.4589 2.95824 23.4589 3.62571 22.7914L12 14.4171L20.3743 22.7914C21.0418 23.4589 22.124 23.4589 22.7914 22.7914C23.4589 22.124 23.4589 21.0418 22.7914 20.3743L14.4171 12L22.7914 3.62571Z"></path>
        </IconClose>
        <Background>
          <BackgroundImg src="/img/loginWallpaper.png" alt="배경" />
        </Background>
      </Container>
      <SignInBackground />
    </WholeContainer>
  );
};

export default SignUp;
