import { observer } from "mobx-react-lite";
import { css, cx } from "@emotion/css";
import { Label } from "../../../ui/label.tsx";
import { Input } from "../../../ui/input.tsx";
import React, { useEffect, useState } from "react";
import { useMainButton } from "../../../lib/platform/use-main-button.ts";
import { useDeckFormStore } from "./store/deck-form-store-context.tsx";
import { screenStore } from "../../../store/screen-store.ts";
import { useMount } from "../../../lib/react/use-mount.ts";
import { useBackButton } from "../../../lib/platform/use-back-button.ts";
import { useProgress } from "../../../lib/platform/use-progress.tsx";
import { CardRow } from "../../../ui/card-row.tsx";
import { Button } from "../../../ui/button.tsx";
import { theme } from "../../../ui/theme.tsx";
import { t } from "../../../translations/t.ts";
import { deckListStore } from "../../../store/deck-list-store.ts";
import { reset } from "../../../ui/reset.ts";
import { Screen } from "../../shared/screen.tsx";
import { CenteredUnstyledButton } from "../../../ui/centered-unstyled-button.tsx";
import { ListHeader } from "../../../ui/list-header.tsx";
import { List } from "../../../ui/list.tsx";
import { FilledIcon } from "../../../ui/filled-icon.tsx";
import { ListRightText } from "../../../ui/list-right-text.tsx";
import { Flex } from "../../../ui/flex.tsx";
import { boolNarrow } from "../../../lib/typescript/bool-narrow.ts";
import { isFormValid } from "mobx-form-lite";
import { userStore } from "../../../store/user-store.ts";
import { assert } from "../../../../shared/typescript/assert.ts";
import { WithProIcon } from "../../shared/with-pro-icon.tsx";
import { IndividualCardAiPreview } from "../../shared/feature-preview/individual-card-ai-preview.tsx";
import { MassCreationPreview } from "../../shared/feature-preview/mass-creation-preview.tsx";
import { suitableCardInputModeStore } from "../../../store/suitable-card-input-mode-store.ts";

type PreviewType = "bulk_ai_cards" | "individual_ai_card";

export const DeckForm = observer(() => {
  const deckFormStore = useDeckFormStore();
  const screen = screenStore.screen;
  const [previewType, setPreviewType] = useState<PreviewType | null>(null);
  assert(screen.type === "deckForm");

  useMount(() => {
    suitableCardInputModeStore.load();
  });

  useEffect(() => {
    deckFormStore.loadForm();
  }, [deckFormStore, screen.index]);

  useMainButton(
    t("save"),
    () => {
      deckFormStore.onDeckSave((deck) => {
        screenStore.restoreHistory();
        screenStore.goToDeckForm({ deckId: deck.id });
      });
    },
    undefined,
    [screen.index],
  );

  useBackButton(() => {
    deckFormStore.onDeckBack(() => {
      screenStore.back();
    });
  });
  useProgress(() => deckFormStore.isSending);

  if (!deckFormStore.deckForm) {
    console.log("Deck form is not loaded");
    return null;
  }

  return (
    <Screen
      title={screen.deckId ? t("edit_deck") : t("add_deck")}
      subtitle={
        screen.folder ? (
          <div className={css({ textAlign: "center", fontSize: 14 })}>
            {t("folder")}{" "}
            <button
              onClick={() => {
                deckFormStore.onDeckBack(() => {
                  assert(screen.folder, "Folder should be defined");
                  screenStore.go({
                    type: "folderPreview",
                    folderId: screen.folder.id,
                  });
                });
              }}
              className={cx(
                reset.button,
                css({ fontSize: "inherit", color: theme.linkColor }),
              )}
            >
              {screen.folder.name}
            </button>
          </div>
        ) : undefined
      }
    >
      <Label text={t("title")} isRequired>
        <Input field={deckFormStore.deckForm.title} />
      </Label>

      <Label text={t("description")}>
        <Input
          field={deckFormStore.deckForm.description}
          rows={3}
          type={"textarea"}
        />
      </Label>

      {deckFormStore.deckForm.cards.length > 0 && (
        <CardRow
          onClick={() => {
            deckFormStore.goToCardList();
          }}
        >
          <Flex gap={8} alignItems={"center"}>
            <FilledIcon
              backgroundColor={theme.icons.violet}
              icon={"mdi-cards"}
            />
            {t("cards")}
          </Flex>
          <span
            className={css({
              color: theme.hintColor,
            })}
          >
            {deckFormStore.deckForm.cards.length}
          </span>
        </CardRow>
      )}

      {deckFormStore.deckForm.id && (
        <div>
          <ListHeader text={t("advanced")} />
          <List
            items={[
              {
                text: t("speaking_cards"),
                icon: (
                  <FilledIcon
                    icon={"mdi-account-voice"}
                    backgroundColor={theme.icons.blue}
                  />
                ),
                onClick: () => {
                  deckFormStore.goToSpeakingCards();
                },
                right: (
                  <ListRightText
                    text={
                      deckFormStore.deckForm.speakingCardsLocale.value
                        ? t("is_on")
                        : t("is_off")
                    }
                  />
                ),
              },
              {
                text: t("ai_cards_title"),
                icon: (
                  <FilledIcon
                    backgroundColor={theme.icons.turquoise}
                    icon={"mdi-robot"}
                  />
                ),
                onClick: () => {
                  if (!userStore.isPaid) {
                    setPreviewType("bulk_ai_cards");
                    return;
                  }

                  if (
                    !deckFormStore.deckForm ||
                    !isFormValid(deckFormStore.deckForm)
                  ) {
                    return;
                  }
                  const deckId = deckFormStore.deckForm.id;
                  assert(deckId, "Deck id should be defined");
                  screenStore.go({
                    type: "aiMassCreation",
                    deckId: deckId,
                    deckTitle: deckFormStore.deckForm.title.value,
                  });
                },
                right: <WithProIcon />,
              },
              {
                text: t("card_input_mode_screen"),
                icon: (
                  <FilledIcon
                    backgroundColor={theme.icons.sea}
                    icon={"mdi-keyboard"}
                  />
                ),
                onClick: () => {
                  if (!userStore.isPaid) {
                    setPreviewType("individual_ai_card");
                    return;
                  }
                  deckFormStore.goCardInputMode();
                },
                right: <WithProIcon />,
              },
              userStore.canUpdateCatalogSettings
                ? {
                    text: "Catalog",
                    icon: (
                      <FilledIcon
                        backgroundColor={theme.orange}
                        icon={"mdi-view-list-outline"}
                      />
                    ),
                    onClick: () => {
                      const deckId = deckFormStore.deckForm?.id;
                      assert(deckId, "Deck id should be defined");
                      screenStore.go({
                        type: "catalogSettings",
                        itemType: "deck",
                        id: deckId,
                      });
                    },
                  }
                : undefined,
            ].filter(boolNarrow)}
          />
        </div>
      )}

      <div className={css({ marginTop: 18 })} />

      <Button
        icon={"mdi mdi-plus"}
        outline
        onClick={() => {
          deckFormStore.openNewCardForm();
        }}
      >
        {t("add_card")}
      </Button>
      {deckFormStore.deckForm.id ? (
        <CenteredUnstyledButton
          onClick={() => {
            assert(deckFormStore.deckForm);
            assert(deckFormStore.deckForm.id);
            deckListStore.goDeckById(deckFormStore.deckForm.id);
          }}
        >
          {t("deck_preview")}
        </CenteredUnstyledButton>
      ) : null}

      <IndividualCardAiPreview
        showUpgrade
        viewMode={suitableCardInputModeStore.viewMode}
        isOpen={previewType === "individual_ai_card"}
        onClose={() => setPreviewType(null)}
      />

      <MassCreationPreview
        showUpgrade
        onClose={() => setPreviewType(null)}
        isOpen={previewType === "bulk_ai_cards"}
      />
    </Screen>
  );
});
