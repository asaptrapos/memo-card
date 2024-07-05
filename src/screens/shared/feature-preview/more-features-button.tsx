import { userStore } from "../../../store/user-store.ts";
import { ButtonSideAligned } from "../../../ui/button-side-aligned.tsx";
import { screenStore } from "../../../store/screen-store.ts";
import { t } from "../../../translations/t.ts";
import React from "react";

export const MoreFeaturesButton = () => {
  return userStore.isPaid ? null : (
    <ButtonSideAligned
      icon={"mdi-star-circle mdi-24px"}
      outline
      onClick={() => {
        screenStore.go({ type: "plans" });
      }}
    >
      {t("more_features")}
    </ButtonSideAligned>
  );
};
