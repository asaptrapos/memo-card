import { translateHowMassCreationWorksText } from "../../ai-mass-creation/translations.ts";
import { observer } from "mobx-react-lite";
import { BottomSheet } from "../../../ui/bottom-sheet/bottom-sheet.tsx";
import { BottomSheetTitle } from "../../../ui/bottom-sheet/bottom-sheet-title.tsx";
import { t } from "../../../translations/t.ts";
import { css } from "@emotion/css";
import { theme } from "../../../ui/theme.tsx";
import React from "react";
import { UpgradeProBlock } from "./upgrade-pro-block.tsx";

type Props = {
  onClose: () => void;
  isOpen: boolean;
  showUpgrade?: boolean;
};

export const MassCreationPreview = observer((props: Props) => {
  const { onClose, isOpen, showUpgrade } = props;
  const translations = translateHowMassCreationWorksText();

  return (
    <BottomSheet isOpen={isOpen} onClose={onClose}>
      <BottomSheetTitle title={t("how")} onClose={onClose} />
      <div
        className={css({
          display: "flex",
          flexDirection: "column",
          gap: 16,
          padding: 16,
          paddingBottom: 48,
          background: theme.bgColor,
          borderRadius: theme.borderRadius,
        })}
      >
        <div>{translations.description}</div>
        <div>
          <span>{translations.example1}:</span>
          <ul
            className={css({
              paddingLeft: 24,
              marginTop: 0,
              marginBottom: 0,
            })}
          >
            <li>
              <b>{t("ai_cards_prompt")}</b>: {translations.promptExample1}
            </li>
            <li>
              <b>{t("ai_cards_prompt_front")}</b>: {translations.frontExample1}
            </li>
            <li>
              <b>{t("ai_cards_prompt_back")}</b>: {translations.backExample1}
            </li>
          </ul>
          <div>{translations.resultExample1}</div>
        </div>

        <div>
          <span>{translations.example2}</span>
          <ul
            className={css({
              paddingLeft: 24,
              marginTop: 0,
              marginBottom: 0,
            })}
          >
            <li>
              <b>{t("ai_cards_prompt")}</b>: {translations.promptExample2}
            </li>
            <li>
              <b>{t("ai_cards_prompt_front")}</b>: {translations.frontExample2}
            </li>
            <li>
              <b>{t("ai_cards_prompt_back")}</b>: {translations.backExample2}
            </li>
          </ul>
          <div>{translations.resultExample2}</div>
        </div>
      </div>
      {showUpgrade && <UpgradeProBlock />}
    </BottomSheet>
  );
});
