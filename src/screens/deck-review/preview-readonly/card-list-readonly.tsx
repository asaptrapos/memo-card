import { observer } from "mobx-react-lite";
import { DeckCardDbType } from "../../../../functions/db/deck/decks-with-cards-schema.ts";
import { Screen } from "../../shared/screen.tsx";
import { t } from "../../../translations/t.ts";
import { css } from "@emotion/css";
import { theme } from "../../../ui/theme.tsx";
import { tapScale } from "../../../lib/animations/tap-scale.ts";
import { CardNumber } from "../../../ui/card-number.tsx";
import { removeAllTags } from "../../../lib/sanitize-html/remove-all-tags.ts";
import React from "react";
import { useBackButton } from "../../../lib/platform/use-back-button.ts";

type Props = {
  onBack: () => void;
  cards: DeckCardDbType[];
  onClick: (card: DeckCardDbType) => void;
};

export const CardListReadonly = observer((props: Props) => {
  const { cards, onClick, onBack } = props;

  useBackButton(() => {
    onBack();
  });

  return (
    <Screen title={t("cards")}>
      {cards.map((cardForm, i) => (
        <div
          key={i}
          className={css({
            cursor: "pointer",
            backgroundColor: theme.bgColor,
            borderRadius: theme.borderRadius,
            padding: 12,
            // If the card content is too big then hide it
            maxHeight: 120,
            overflow: "hidden",
            ...tapScale,
          })}
          onClick={() => {
            onClick(cardForm);
          }}
        >
          <div>
            <CardNumber number={i + 1} />
            {removeAllTags(cardForm.front)}
          </div>
          <div className={css({ color: theme.hintColor })}>
            {removeAllTags(cardForm.back)}
          </div>
        </div>
      ))}
    </Screen>
  );
});
