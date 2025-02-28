import { observer } from "mobx-react-lite";
import {
  deckListStore,
  DeckWithCardsWithReviewType,
} from "../../store/deck-list-store.ts";
import { screenStore } from "../../store/screen-store.ts";
import { Hint } from "../../ui/hint.tsx";
import { useBackButton } from "../../lib/platform/use-back-button.ts";
import { useMainButton } from "../../lib/platform/use-main-button.ts";
import { ButtonSideAligned } from "../../ui/button-side-aligned.tsx";
import { useProgress } from "../../lib/platform/use-progress.tsx";
import { t } from "../../translations/t.ts";
import { useReviewStore } from "../deck-review/store/review-store-context.tsx";
import { ListHeader } from "../../ui/list-header.tsx";
import { ButtonGrid } from "../../ui/button-grid.tsx";
import { DeckFolderDescription } from "../shared/deck-folder-description.tsx";
import { useScrollToTopOnMount } from "../../lib/react/use-scroll-to-top-mount.ts";
import { shareMemoCardUrl } from "../share-deck/share-memo-card-url.tsx";
import { userStore } from "../../store/user-store.ts";
import { Flex } from "../../ui/flex.tsx";
import { List } from "../../ui/list.tsx";
import { CardsToReview } from "../../ui/cards-to-review.tsx";
import { BrowserBackButton } from "../shared/browser-platform/browser-back-button.tsx";
import { MoreFeaturesButton } from "../shared/feature-preview/more-features-button.tsx";
import { DeckFolderInfoRowLoader } from "../shared/deck-folder-info-row-loader.tsx";
import { useMount } from "../../lib/react/use-mount.ts";
import { platform } from "../../lib/platform/platform.ts";
import { BrowserPlatform } from "../../lib/platform/browser/browser-platform.ts";
import { cn } from "../../ui/cn.ts";

type Props = {
  onDeckPreviewOpen: (deck: DeckWithCardsWithReviewType) => void;
};

export const FolderPreview = observer((props: Props) => {
  const reviewStore = useReviewStore();

  useBackButton(() => {
    screenStore.back();
  });

  useMount(() => {
    deckListStore.checkFolderRequiresUpdating();
  });

  useProgress(() => deckListStore.isCatalogItemLoading);
  useScrollToTopOnMount();

  useMainButton(
    t("review_folder"),
    () => {
      deckListStore.reviewFolder(reviewStore);
    },
    () => deckListStore.isFolderReviewVisible,
    [],
    { forceHide: true },
  );

  const folder = deckListStore.selectedFolder;
  if (!folder) {
    return null;
  }

  const cardsTotal = folder.decks.reduce(
    (acc, cur) => cur.deck_card.length + acc,
    0,
  );

  return (
    <Flex direction={"column"} pb={82}>
      <ListHeader text={t("folder")} />
      <div
        className="flex flex-col gap-4 rounded-[12px] px-4 pb-4 pt-0 bg-bg"
      >
        <div
          className="relative"
        >
          <div className="absolute left-0 top-1.5">
            <BrowserBackButton />
          </div>
          <h3
            className={cn(
              "pt-3",
              platform instanceof BrowserPlatform ? "pl-8" : "pl-0"
            )}
          >
            {folder.name}
          </h3>
        </div>
        <div>
          <DeckFolderDescription deck={folder} />
        </div>
        {
          <div
            className="flex flex-col gap-1 border-t border-divider pt-2"
          >
            <Flex gap={4}>
              <span>{t("cards_to_repeat")}: </span>
              <h4 className="text-orange">
                {deckListStore.getFolderWithDecksCards.isLoading ? (
                  <DeckFolderInfoRowLoader />
                ) : (
                  folder.cardsToReview.filter((card) => card.type === "repeat")
                    .length
                )}
              </h4>
            </Flex>
            <Flex gap={4}>
              <span>{t("cards_new")}: </span>
              <h4 className="text-success">
                {deckListStore.getFolderWithDecksCards.isLoading ? (
                  <DeckFolderInfoRowLoader />
                ) : (
                  folder.cardsToReview.filter((card) => card.type === "new")
                    .length
                )}
              </h4>
            </Flex>
            <Flex gap={4}>
              <span>{t("cards_total")}: </span>
              <h4>
                {deckListStore.getFolderWithDecksCards.isLoading ? (
                  <DeckFolderInfoRowLoader />
                ) : (
                  cardsTotal
                )}
              </h4>
            </Flex>
          </div>
        }

        <ButtonGrid>
          {deckListStore.canEditFolder ? (
            <ButtonSideAligned
              icon={"mdi-plus-circle mdi-24px"}
              outline
              onClick={() => {
                screenStore.goToDeckForm({
                  folder: {
                    id: folder.id,
                    name: folder.name,
                  },
                });
              }}
            >
              {t("add_deck_short")}
            </ButtonSideAligned>
          ) : null}
          {deckListStore.canDuplicateSelectedFolder && (
            <ButtonSideAligned
              icon={"mdi-content-duplicate mdi-24px"}
              outline
              onClick={() => {
                deckListStore.onDuplicateFolder(folder.id);
              }}
            >
              {t("duplicate")}
            </ButtonSideAligned>
          )}
          {deckListStore.canEditFolder && (
            <>
              <ButtonSideAligned
                icon={"mdi-pencil-circle mdi-24px"}
                outline
                onClick={() => {
                  screenStore.go({ type: "folderForm", folderId: folder.id });
                }}
              >
                {t("edit")}
              </ButtonSideAligned>
              <ButtonSideAligned
                icon={"mdi-share-circle mdi-24px"}
                outline
                onClick={() => {
                  if (userStore.canAdvancedShare) {
                    screenStore.go({
                      type: "shareFolder",
                      folderId: folder.id,
                      shareId: folder.shareId,
                    });
                  } else {
                    shareMemoCardUrl(folder.shareId);
                  }
                }}
              >
                {t("share")}
              </ButtonSideAligned>
            </>
          )}
          {deckListStore.isDeckFolderAdded({ id: folder.id, type: "folder" })
            .isMineFolder && (
            <ButtonSideAligned
              icon={"mdi-delete-circle mdi-24px"}
              outline
              onClick={async () => {
                deckListStore.deleteFolder();
              }}
            >
              {t("delete")}
            </ButtonSideAligned>
          )}

          <MoreFeaturesButton />
        </ButtonGrid>
      </div>

      {folder.decks.length > 0 && (
        <Flex pt={6} direction={"column"} gap={8}>
          <div>
            <ListHeader text={t("decks")} />
            <List
              items={folder.decks.map((deck) => ({
                onClick: () => {
                  const found = deckListStore.goDeckById(deck.id);
                  if (!found) {
                    props.onDeckPreviewOpen(deck);
                  }
                },
                text: deck.name,
                right: (
                  <div
                    className="relative -mr-3"
                  >
                    <CardsToReview item={deck} />
                  </div>
                ),
              }))}
            />
          </div>
        </Flex>
      )}

      {cardsTotal > 0 &&
      deckListStore.isDeckFolderAdded({ id: folder.id, type: "folder" })
        .isMineFolder &&
      folder.cardsToReview.length === 0 &&
      !deckListStore.isCatalogItemLoading ? (
        <div className="mt-2">
          <Hint>{t("no_cards_to_review_in_deck")}</Hint>
        </div>
      ) : null}
    </Flex>
  );
});
