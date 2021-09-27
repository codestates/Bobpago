import React, { useEffect, useState } from "react";
import { Notification } from "./styles";

const Toast = ({ text, dismissTime }: any) => {
  const [isFading, setIsFading] = useState<any>(false);

  useEffect(() => {
    let mounted = true;
    setTimeout(() => {
      if (mounted) {
        setIsFading(true);
      }
    }, dismissTime - 2100);
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <Notification className={isFading ? "fade-out" : ""}>{text}</Notification>
  );
};

export default Toast;
