import { links } from "./links";
import { userStore } from "../../src/store/user-store.ts";

export const getTelegramChannelLink = () => {
  const language = userStore.language;
  switch (language) {
    case "ru":
      return links.ruBotChannel;
    default:
      return links.botChannel;
  }
};
