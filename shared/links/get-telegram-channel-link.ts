import { platform } from "../../src/lib/platform/platform";
import { links } from "./links";

export const getTelegramChannelLink = () => {
  const language = platform.getLanguage();
  switch (language) {
    case "ru":
      return links.ruBotChannel;
    default:
      return links.botChannel;
  }
};
