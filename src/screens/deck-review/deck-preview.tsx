import { observer } from "mobx-react-lite";
import { deckListStore } from "../../store/deck-list-store.ts";
import { css } from "@emotion/css";
import { theme } from "../../ui/theme.tsx";
import React from "react";
import { useReviewStore } from "./store/review-store-context.tsx";
import { screenStore } from "../../store/screen-store.ts";
import { Hint } from "../../ui/hint.tsx";
import { useBackButton } from "../../lib/platform/use-back-button.ts";
import { useMainButton } from "../../lib/platform/use-main-button.ts";
import { showConfirm } from "../../lib/platform/show-confirm.ts";
import { ButtonSideAligned } from "../../ui/button-side-aligned.tsx";
import { useProgress } from "../../lib/platform/use-progress.tsx";
import { t } from "../../translations/t.ts";
import { ButtonGrid } from "../../ui/button-grid.tsx";
import { Button } from "../../ui/button.tsx";
import { DeckFolderDescription } from "../shared/deck-folder-description.tsx";
import { useScrollToTopOnMount } from "../../lib/react/use-scroll-to-top-mount.ts";
import { userStore } from "../../store/user-store.ts";
import { shareMemoCardUrl } from "../share-deck/share-memo-card-url.tsx";
import { Flex } from "../../ui/flex.tsx";
import { BrowserBackButton } from "../shared/browser-platform/browser-back-button.tsx";
import { MoreFeaturesButton } from "../shared/feature-preview/more-features-button.tsx";
import { DeckFolderInfoRowLoader } from "../shared/deck-folder-info-row-loader.tsx";
import { useHotkeys } from "react-hotkeys-hook";
import { platform } from "../../lib/platform/platform.ts";
import { BrowserPlatform } from "../../lib/platform/browser/browser-platform.ts";
import { ListHeader } from "../../ui/list-header.tsx";

type Props = { onCardListPreview: () => void };

export const DeckPreview = observer((props: Props) => {
  const reviewStore = useReviewStore();

  useBackButton(() => {
    screenStore.back();
  });

  useProgress(() => deckListStore.deckWithCardsRequest.isLoading);
  useScrollToTopOnMount();

  const onStart = () => {
    if (deckListStore.canReview) {
      deckListStore.startDeckReview(reviewStore);
    }
  };

  useHotkeys("enter", onStart);

  useMainButton(t("review_deck"), onStart, () => deckListStore.canReview);

  const deck = deckListStore.selectedDeck;
  if (!deck) {
    return null;
  }

  return (
    <Flex direction={"column"} gap={16} pb={82}>
      <div>
        <ListHeader text={t("deck")} />
        <div
          className={css({
            display: "flex",
            flexDirection: "column",
            gap: 16,
            borderRadius: theme.borderRadius,
            padding: "8px 16px",
            paddingTop: 0,
            paddingBottom: 16,
            background: theme.bgColor,
          })}
        >
          <div
            className={css({
              position: "relative",
            })}
          >
            <div className={css({ position: "absolute", left: 0, top: 6 })}>
              <BrowserBackButton />
            </div>
            <h3
              className={css({
                paddingTop: 12,
                paddingLeft: platform instanceof BrowserPlatform ? 32 : 0,
              })}
            >
              {deck.name}
            </h3>
          </div>
          <div>
            <DeckFolderDescription deck={deck} />
          </div>
          {
            <div
              className={css({
                display: "flex",
                gap: 4,
                flexDirection: "column",
                borderTop: `1px solid ${theme.divider}`,
                paddingTop: 8,
              })}
            >
              <Flex gap={4}>
                <span>{t("cards_to_repeat")}: </span>
                <h4 className={css({ color: theme.orange })}>
                  {deckListStore.deckWithCardsRequest.isLoading ? (
                    <DeckFolderInfoRowLoader />
                  ) : (
                    deck.cardsToReview.filter((card) => card.type === "repeat")
                      .length
                  )}
                </h4>
              </Flex>
              <Flex gap={4}>
                <span>{t("cards_new")}: </span>
                <h4 className={css({ color: theme.success })}>
                  {deckListStore.deckWithCardsRequest.isLoading ? (
                    <DeckFolderInfoRowLoader />
                  ) : (
                    deck.cardsToReview.filter((card) => card.type === "new")
                      .length
                  )}
                </h4>
              </Flex>
              <Flex gap={4}>
                <span>{t("cards_total")}: </span>
                <h4>
                  {deckListStore.deckWithCardsRequest.isLoading ? (
                    <DeckFolderInfoRowLoader />
                  ) : (
                    deck.deck_card.length
                  )}
                </h4>
              </Flex>
            </div>
          }

          <ButtonGrid>
            {deckListStore.canEditDeck ? (
              <ButtonSideAligned
                icon={"mdi-plus-circle mdi-24px"}
                outline
                onClick={() => {
                  screenStore.goOnce({
                    type: "cardQuickAddForm",
                    deckId: deck.id,
                  });
                }}
              >
                {t("add_card_short")}
              </ButtonSideAligned>
            ) : null}

            {!deckListStore.canEditDeck && (
              <ButtonSideAligned
                icon={"mdi-eye-circle mdi-24px"}
                outline
                onClick={() => {
                  props.onCardListPreview();
                }}
              >
                {t("view")}
              </ButtonSideAligned>
            )}

            {deckListStore.canDuplicateSelectedDeck && (
              <ButtonSideAligned
                icon={"mdi-content-duplicate mdi-24px"}
                outline
                onClick={() => {
                  deckListStore.onDuplicateDeck(deck.id);
                }}
              >
                {t("duplicate")}
              </ButtonSideAligned>
            )}
            {deckListStore.canEditDeck ? (
              <ButtonSideAligned
                icon={"mdi-pencil-circle mdi-24px"}
                outline
                onClick={() => {
                  screenStore.goToDeckForm({ deckId: deck.id });
                }}
              >
                {t("edit")}
              </ButtonSideAligned>
            ) : null}

            {deckListStore.canShareDeck && (
              <ButtonSideAligned
                icon={"mdi-share-circle mdi-24px"}
                outline
                onClick={() => {
                  if (userStore.canAdvancedShare) {
                    screenStore.go({
                      type: "shareDeck",
                      deckId: deck.id,
                      shareId: deck.share_id,
                    });
                  } else {
                    shareMemoCardUrl(deck.share_id);
                  }
                }}
              >
                {t("share")}
              </ButtonSideAligned>
            )}

            {screenStore.screen.type === "deckMine" ? (
              <ButtonSideAligned
                icon={"mdi-delete-circle mdi-24px"}
                outline
                onClick={async () => {
                  const isConfirmed = await showConfirm(
                    t("delete_deck_confirm"),
                  );
                  if (isConfirmed) {
                    deckListStore.removeDeck();
                  }
                }}
              >
                {t("delete")}
              </ButtonSideAligned>
            ) : null}

            <MoreFeaturesButton />
          </ButtonGrid>
        </div>
      </div>

      {!deckListStore.deckWithCardsRequest.isLoading &&
      deck.cardsToReview.length === 0 &&
      deck.deck_card.length > 0 ? (
        <>
          <Hint>
            <Flex direction={"column"} gap={10} mb={4}>
              <div>{t("no_cards_to_review_in_deck")}</div>
              <Button
                outline
                icon={"mdi-cached"}
                onClick={() => {
                  reviewStore.startDeckReviewAnyway(deckListStore.selectedDeck);
                }}
              >
                {t("repeat_cards_anyway")}
              </Button>
            </Flex>
          </Hint>
        </>
      ) : null}
    </Flex>
  );
});
