export interface loginResponseDataType {
  accessToken: string;
  email: string;
  loginType: string;
}

const getLoginInfo = (): loginResponseDataType => {
  const loginInfo = window.localStorage.getItem("loginInfo") as string;
  if (loginInfo) {
    return JSON.parse(loginInfo);
  }

  return {
    accessToken: "",
    email: "",
    loginType: "",
  };
};

export default getLoginInfo;
