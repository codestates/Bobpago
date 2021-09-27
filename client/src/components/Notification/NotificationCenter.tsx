import { useSelector } from "react-redux";
import Toast from "./Toast";
import { NotificationContainer } from "./styles";
import { RootState } from "reducers/index";

function NofiticationCenter() {
  const state = useSelector((state: RootState) => state.NotificationReducer);

  return (
    <NotificationContainer>
      {state.notifications.map((n) => (
        <Toast key={n.uuid} text={n.message} dismissTime={n.dismissTime} />
      ))}
    </NotificationContainer>
  );
}

export default NofiticationCenter;
