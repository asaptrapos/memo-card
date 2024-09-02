import { UseBackButtonType } from "../platform.ts";
import { useEffect } from "react";
import { WebApp } from "./telegram-web-app.ts";

export const useBackButtonTelegram: UseBackButtonType = (
  fn: () => void,
  deps = [],
) => {
  useEffect(() => {
    WebApp.BackButton.show();
    WebApp.BackButton.onClick(fn);

    return () => {
      WebApp.BackButton.offClick(fn);
      WebApp.BackButton.hide();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
};
