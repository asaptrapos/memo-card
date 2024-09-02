import { WebApp } from "./telegram-web-app.ts";

export const showAlertTelegram = (text: string) => {
  WebApp.showAlert(text);
};
