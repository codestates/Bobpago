import axios, { Method } from "axios";
import getLoginInfo from "./getLogininfo";
import { useSelector } from "react-redux";
import { RootState } from "reducers";

const serverURL = process.env.REACT_APP_SERVER_URL;

export const axiosRequest = async <D>(
  method: Method,
  endPoint: string,
  data?: D
): Promise<D | void> => {
  const accesstoken = useSelector(
    (state: RootState) => state.AccesstokenReducer.accesstoken
  );

  try {
    const response = await axios({
      method: method,
      url: `${serverURL}${endPoint}`,
      data,
      headers: {
        authorization: `Bearer ${accessToken}`,
        // loginType: loginType,
      },
    });

    return response.data;
  } catch (error) {
    console.log(error);
  }
};

axiosRequest.defaultProps = {
  data: {},
};
