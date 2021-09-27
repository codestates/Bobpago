import { useSelector } from "react-redux";
import Toast from "./Toast";
import { NotificationContainer } from "./styles";

function NofiticationCenter() {
  const state = useSelector((state) => state.NotificationReducer);

  return (
    <NotificationContainer>
      {state.notifications.map((n) => (
        <Toast key={n.uuid} text={n.message} dismissTime={n.dismissTime} />
      ))}
    </NotificationContainer>
  );
}

export default NofiticationCenter;
