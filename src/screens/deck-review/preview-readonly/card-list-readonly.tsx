import { observer } from "mobx-react-lite";
import { DeckCardDbType } from "../../../../functions/db/deck/decks-with-cards-schema.ts";
import { Screen } from "../../shared/screen.tsx";
import { t } from "../../../translations/t.ts";
import { css, cx } from "@emotion/css";
import { theme } from "../../../ui/theme.tsx";
import { tapScale } from "../../../lib/animations/tap-scale.ts";
import { CardNumber } from "../../../ui/card-number.tsx";
import { removeAllTags } from "../../../lib/sanitize-html/remove-all-tags.ts";
import React from "react";
import { useBackButton } from "../../../lib/platform/use-back-button.ts";
import { DeckWithCardsWithReviewType } from "../../../store/deck-list-store.ts";
import { List } from "../../../ui/list.tsx";
import { ListHeader } from "../../../ui/list-header.tsx";
import { DeckFolderDescription } from "../../shared/deck-folder-description.tsx";
import { reset } from "../../../ui/reset.ts";

type Props = {
  onBack: () => void;
  cards: DeckCardDbType[];
  onClick: (card: DeckCardDbType) => void;
  deck?: DeckWithCardsWithReviewType;
  folderName?: string;
};

export const CardListReadonly = observer((props: Props) => {
  const { cards, onClick, onBack, deck, folderName } = props;

  useBackButton(() => {
    onBack();
  });

  return (
    <Screen
      title={deck ? "" : t("cards")}
      subtitle={
        deck ? (
          <div
            className={css({
              textAlign: "center",
              fontSize: 14,
            })}
          >
            <button
              onClick={() => {
                onBack();
              }}
              className={cx(
                reset.button,
                css({ fontSize: "inherit", color: theme.linkColor }),
              )}
            >
              {folderName}
            </button>
          </div>
        ) : undefined
      }
    >
      {deck && (
        <div>
          {deck && <ListHeader text={t("deck")} />}
          <div
            className={css({
              display: "flex",
              flexDirection: "column",
              gap: 8,
              borderRadius: theme.borderRadius,
              padding: "8px 16px",
              paddingBottom: 16,
              background: theme.bgColor,
            })}
          >
            <h3
              className={css({
                paddingTop: 8,
                display: "flex",
                alignItems: "center",
                gap: 6,
              })}
            >
              <i className={"mdi mdi-cards-outline"} title={t("deck")} />
              {deck.name}
            </h3>

            <DeckFolderDescription isExpanded deck={deck} />
          </div>
        </div>
      )}
      <div>
        {deck && <ListHeader text={t("cards")} />}
        <List
          items={cards.map((card, i) => ({
            onClick: () => {
              onClick(card);
            },
            text: (
              <div
                key={i}
                className={css({
                  cursor: "pointer",
                  backgroundColor: theme.bgColor,
                  borderRadius: theme.borderRadius,
                  // If the card content is too big then hide it
                  maxHeight: 120,
                  overflow: "hidden",
                  ...tapScale,
                })}
              >
                <div>
                  <CardNumber number={i + 1} />
                  {removeAllTags(card.front)}
                </div>
                <div className={css({ color: theme.hintColor })}>
                  {removeAllTags(card.back)}
                </div>
              </div>
            ),
          }))}
        />
      </div>
    </Screen>
  );
});
