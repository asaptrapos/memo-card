import ContentLoader from "react-content-loader";
import { theme } from "../../ui/theme.tsx";
import React from "react";

export const DeckFolderInfoRowLoader = () => {
  return <div>
    <ContentLoader
      speed={1}
      width={"100%"}
      height={15}
      viewBox="0 0 80 15"
      backgroundColor={theme.bgColor}
      foregroundColor={theme.hintColor}
    >
      <rect x="0" y="0" rx="3" ry="3" width="100%" height="15" />
    </ContentLoader>
  </div>;
};
