import { ShowConfirmType } from "../platform.ts";
import { WebApp } from "./telegram-web-app.ts";

export const showConfirmTelegram: ShowConfirmType = (text) => {
  return new Promise((resolve) => {
    WebApp.showConfirm(text, (confirmed) => {
      resolve(confirmed);
    });
  });
};
