import { useMount } from "../../react/use-mount.ts";
import { autorun } from "mobx";
import { WebApp } from "./telegram-web-app.ts";

export const useProgressTelegram = (cb: () => boolean) => {
  return useMount(() => {
    return autorun(() => {
      if (cb()) {
        WebApp.MainButton.showProgress();
      } else {
        WebApp.MainButton.hideProgress();
      }
    });
  });
};
