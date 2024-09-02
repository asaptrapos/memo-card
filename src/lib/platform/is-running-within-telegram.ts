import { WebApp } from "./telegram/telegram-web-app.ts";

export const isRunningWithinTelegram = () => {
  return WebApp.platform !== "unknown";
};
