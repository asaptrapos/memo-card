import { useHotkeys } from "react-hotkeys-hook";
import { autorun } from "mobx";
import { UseMainButtonType } from "../platform.ts";
import { useEffect } from "react";
import { WebApp } from "./telegram-web-app.ts";

// Track visible state to avoid flickering
let isVisible = false;

const hide = (forceHide = false) => {
  if (
    forceHide ||
    (WebApp.platform !== "ios" && WebApp.platform !== "android")
  ) {
    WebApp.MainButton.hide();
    isVisible = false;
    return;
  }

  // Avoid flickering of the Telegram main button
  isVisible = false;
  setTimeout(() => {
    if (isVisible) {
      return;
    }
    WebApp.MainButton.hide();
    isVisible = false;
  }, 100);
};

export const useMainButtonTelegram: UseMainButtonType = (
  text,
  onClick,
  condition,
  deps = [],
  options,
) => {
  const hideMainButton = () => {
    hide(!!options?.forceHide);
    WebApp.MainButton.offClick(onClick);
    WebApp.MainButton.hideProgress();
  };

  useEffect(() => {
    const stopAutoRun = autorun(() => {
      if (condition !== undefined && !condition()) {
        hideMainButton();
        return;
      }

      isVisible = true;
      WebApp.MainButton.show();
      WebApp.MainButton.setText(typeof text === "string" ? text : text());
      WebApp.MainButton.onClick(onClick);
      if (options?.hasShineEffect) {
        // @ts-expect-error
        WebApp.MainButton.hasShineEffect = true;
      }
    });

    return () => {
      stopAutoRun();
      hideMainButton();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  useHotkeys("enter", () => {
    if (condition !== undefined) {
      if (!condition()) {
        return;
      }
    }

    onClick();
  });
};
