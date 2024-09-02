import { useMount } from "../../react/use-mount.ts";
import { WebApp } from "./telegram-web-app.ts";

export const useSettingsButton = (fn: () => void) => {
  useMount(() => {
    if (!WebApp.isVersionAtLeast("7.0")) {
      return;
    }

    WebApp.SettingsButton.show();
    WebApp.SettingsButton.onClick(fn);

    return () => {
      WebApp.SettingsButton.hide();
      WebApp.SettingsButton.offClick(fn);
    };
  });
};
