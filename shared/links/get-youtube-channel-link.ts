import { platform } from "../../src/lib/platform/platform";
import { links } from "./links";

export const getYouTubeChannelLink = () => {
  const language = platform.getLanguage();
  switch (language) {
    case "ru":
      return links.youtubeChannelRu;
    default:
      return links.youtubeChannelEn;
  }
};
