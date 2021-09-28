import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Toast from "./Toast";
import { NotificationContainer } from "./styles";
import { RootState } from "reducers/index";
import { resetNotification } from "actions/Notification";

function NofiticationCenter() {
  const dispatch = useDispatch();
  const state = useSelector((state: RootState) => state.NotificationReducer);

  useEffect(() => {
    return () => {
      dispatch(resetNotification());
    };
  }, []);

  return (
    <NotificationContainer>
      {state.notifications.map((n) => (
        <Toast key={n.uuid} text={n.message} dismissTime={n.dismissTime} />
      ))}
    </NotificationContainer>
  );
}

export default NofiticationCenter;
