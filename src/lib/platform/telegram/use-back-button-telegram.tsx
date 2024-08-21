import WebApp from "@twa-dev/sdk";
import { UseBackButtonType } from "../platform.ts";
import { useEffect } from "react";

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
