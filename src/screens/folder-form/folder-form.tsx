import { observer } from "mobx-react-lite";
import { Screen } from "../shared/screen.tsx";
import { Label } from "../../ui/label.tsx";
import { t } from "../../translations/t.ts";
import { Input } from "../../ui/input.tsx";
import React from "react";
import { useBackButton } from "../../lib/platform/use-back-button.ts";
import { screenStore } from "../../store/screen-store.ts";
import { useProgress } from "../../lib/platform/use-progress.tsx";
import { useMount } from "../../lib/react/use-mount.ts";
import { useMainButton } from "../../lib/platform/use-main-button.ts";
import { reset } from "../../ui/reset.ts";
import { css, cx } from "@emotion/css";
import { theme } from "../../ui/theme.tsx";
import { Loader } from "../../ui/loader.tsx";
import { useFolderFormStore } from "./store/folder-form-store-context.tsx";
import { EmptyState } from "../../ui/empty-state.tsx";
import { List } from "../../ui/list.tsx";
import { ValidationError } from "../../ui/validation-error.tsx";
import { userStore } from "../../store/user-store.ts";
import { FilledIcon } from "../../ui/filled-icon.tsx";
import { assert } from "../../../shared/typescript/assert.ts";
import { Flex } from "../../ui/flex.tsx";
import { FormattingSwitcher } from "../deck-form/card-form/formatting-switcher.tsx";
import { WysiwygField } from "../../ui/wysiwyg-field/wysiwig-field.tsx";

export const FolderForm = observer(() => {
  const folderStore = useFolderFormStore();
  const { folderForm } = folderStore;
  const screen = screenStore.screen;
  assert(screen.type === "folderForm");

  useMount(() => {
    folderStore.loadForm();
  });

  useMainButton(t("save"), () => {
    folderStore.onFolderSave();
  });

  useBackButton(() => {
    folderStore.onBack();
  });

  useProgress(() => folderStore.folderUpsertRequest.isLoading);

  if (!folderForm) {
    return null;
  }

  return (
    <Screen title={screen.folderId ? t("edit_folder") : t("add_folder")}>
      <Label text={t("title")} isRequired>
        <Input field={folderForm.title} />
      </Label>

      <Label isPlain text={t("description")} slotRight={<FormattingSwitcher />}>
        {userStore.isCardFormattingOn.value ? (
          <WysiwygField field={folderForm.description} />
        ) : (
          <Input field={folderForm.description} type={"textarea"} rows={3} />
        )}
      </Label>

      {userStore.canUpdateCatalogSettings && screen.folderId ? (
        <Label text={t("advanced")} isPlain>
          <List
            items={[
              {
                text: "Catalog",
                icon: (
                  <FilledIcon
                    backgroundColor={theme.orange}
                    icon={"mdi-view-list-outline"}
                  />
                ),
                onClick: () => {
                  const folderId = screen.folderId;
                  assert(folderId, "Folder id must be defined");
                  screenStore.go({
                    type: "catalogSettings",
                    itemType: "folder",
                    id: folderId,
                  });
                },
              },
            ]}
          />
        </Label>
      ) : null}

      <Label text={t("decks")} isPlain>
        {folderForm.decks.value.length === 0 && (
          <div className={css({ marginBottom: 10 })}>
            <EmptyState>{t("folder_form_no_decks")}</EmptyState>
          </div>
        )}
        {folderForm.decks.isTouched && folderForm.decks.error && (
          <ValidationError error={folderForm.decks.error} />
        )}
        <List
          items={folderForm.decks.value.map((deck, i) => {
            return {
              text: deck.name,
              onClick: () => {
                folderStore.onSelectDeck(deck.id);
              },
              right: (
                <button
                  className={cx(
                    reset.button,
                    css({ paddingTop: 4, fontSize: 16 }),
                  )}
                  onClick={(e) => {
                    e.stopPropagation();
                    assert(folderForm);
                    return folderForm.decks.removeByIndex(i);
                  }}
                >
                  <i
                    className={cx(
                      "mdi mdi-delete-circle mdi-24px",
                      css({ color: theme.danger }),
                    )}
                  />
                </button>
              ),
            };
          })}
        />
      </Label>

      <Label text={t("add_deck_to_folder")} isPlain>
        {folderStore.decksMineRequest.isLoading && <Loader />}
        {folderStore.decksMineRequest.result.status === "success" &&
        folderStore.decksAvailableFiltered.length === 0 ? (
          <EmptyState>{t("no_decks_to_add")}</EmptyState>
        ) : null}

        <List
          items={folderStore.decksAvailableFiltered.map((deck) => {
            return {
              text: deck.name,
              right: (
                <button
                  className={cx(
                    reset.button,
                    css({ paddingTop: 4, fontSize: 16 }),
                  )}
                  onClick={() => {
                    assert(folderForm);
                    folderForm.decks.push({
                      id: deck.id,
                      name: deck.name,
                    });
                  }}
                >
                  <i
                    className={cx(
                      "mdi mdi-plus-circle mdi-24px",
                      css({ color: theme.buttonColor }),
                    )}
                  />
                </button>
              ),
            };
          })}
        />
      </Label>

      {folderStore.decksNotAvailable.length > 0 && (
        <Label text={t("decks_in_other_folders")} isPlain>
          <List
            items={folderStore.decksNotAvailable.map((deck) => {
              return {
                text: (
                  <Flex
                    className={css({
                      textAlign: userStore.isRtl ? "right" : undefined,
                    })}
                    direction={"column"}
                    gap={4}
                  >
                    <div>{deck.name}</div>
                    <div
                      className={css({
                        fontSize: 14,
                        color: theme.hintColor,
                      })}
                    >
                      {deck.folder_title}
                    </div>
                  </Flex>
                ),
              };
            })}
          />
        </Label>
      )}
    </Screen>
  );
});
