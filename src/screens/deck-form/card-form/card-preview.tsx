import { observer } from "mobx-react-lite";
import { useBackButton } from "../../../lib/platform/use-back-button.ts";
import { css } from "@emotion/css";
import { CardReviewWithControls } from "../../deck-review/card-review-with-controls.tsx";
import React, { useState } from "react";
import { CardPreviewStore } from "../../deck-review/store/card-preview-store.ts";
import { CardFormStoreInterface } from "../deck-form/store/card-form-store-interface.ts";
import { createPortal } from "react-dom";
import { platform } from "../../../lib/platform/platform.ts";
import { BrowserPlatform } from "../../../lib/platform/browser/browser-platform.ts";
import { BrowserBackButton } from "../../shared/browser-platform/browser-back-button.tsx";

type Props = {
  form: CardFormStoreInterface;
  onBack: () => void;
};

export const CardPreview = observer((props: Props) => {
  const { form, onBack } = props;
  const [cardPreviewStore] = useState(() => new CardPreviewStore(form));

  useBackButton(() => {
    onBack();
  });

  const component = (
    <div
      className={css({
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        position: "relative",
        overflowX: "hidden",
      })}
    >
      {platform instanceof BrowserPlatform && (
        <div
          className={css({
            position: "absolute",
            top: 12,
            left: 12,
          })}
        >
          <BrowserBackButton />
        </div>
      )}
      {cardPreviewStore.isOpened && (
        <div
          className={css({
            position: "absolute",
            top: 12,
            right: 12,
            cursor: "pointer",
          })}
        >
          <i
            className={"mdi mdi-backup-restore mdi-24px"}
            onClick={() => {
              cardPreviewStore.revert();
            }}
          />
        </div>
      )}

      <CardReviewWithControls
        onWrong={() => {}}
        onCorrect={() => {}}
        onShowAnswer={() => {
          cardPreviewStore.open();
        }}
        card={cardPreviewStore}
        onReviewCardWithAnswers={() => {}}
        onHideCardForever={() => {}}
      />
    </div>
  );

  return cardPreviewStore.isOverflowing.value
    ? createPortal(component, document.body)
    : component;
});
