import { css } from "@emotion/css";
import { UpgradeButton } from "../../../ui/upgrade-button.tsx";
import { t } from "../../../translations/t.ts";
import React from "react";
import { screenStore } from "../../../store/screen-store.ts";

export const UpgradeProBlock = () => {
  return (
    <div className={css({ marginTop: 36, alignSelf: "stretch" })}>
      <UpgradeButton
        onClick={() => {
          screenStore.go({ type: "plans" });
        }}
      >
        {t("upgrade_pro")}
      </UpgradeButton>
    </div>
  );
};
