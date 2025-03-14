import { CardReviewType } from "../../../../functions/db/deck/get-cards-to-review-db.ts";
import { makeAutoObservable } from "mobx";
import {
  DeckCardDbTypeWithType,
  DeckListItem,
  deckListStore,
  DeckWithCardsWithReviewType,
} from "../../../store/deck-list-store.ts";
import { makePersistable, stopPersisting } from "mobx-persist-store";
import { storageAdapter } from "../../../lib/platform/storage-adapter.ts";

type RepeatCustomForm = {
  reviewTypes: CardReviewType[];
  selectedDecksIds: number[];
};

export class RepeatCustomSelectorStore {
  form: RepeatCustomForm = {
    reviewTypes: ["new", "repeat"],
    selectedDecksIds: [],
  };

  constructor() {
    makeAutoObservable(
      this,
      {
        isListRootItemOn: false,
      },
      { autoBind: true },
    );

    makePersistable(this, {
      name: "repeatCustomFormV1",
      properties: ["form"],
      storage: storageAdapter,
    });
  }

  toggleCardType(type: CardReviewType) {
    if (this.form.reviewTypes.includes(type)) {
      const index = this.form.reviewTypes.indexOf(type);
      if (index !== -1) {
        this.form.reviewTypes.splice(index, 1);
      }
    } else {
      this.form.reviewTypes.push(type);
    }
  }

  toggleListRoot(deckListItem: DeckListItem) {
    if (deckListItem.type === "deck") {
      this.toggleDeckId(deckListItem.id);
    } else if (deckListItem.type === "folder") {
      // if we're trying to toggle folder, we should toggle all decks inside it
      const ids = deckListItem.decks.map((deck) => deck.id);
      const isFolderOn = ids.every((id) =>
        this.form.selectedDecksIds.includes(id),
      );
      if (isFolderOn) {
        // Remove all deck ids from the folder
        for (let i = this.form.selectedDecksIds.length - 1; i >= 0; i--) {
          if (ids.includes(this.form.selectedDecksIds[i])) {
            this.form.selectedDecksIds.splice(i, 1);
          }
        }
      } else {
        // Add missing deck ids from the folder
        for (const id of ids) {
          if (!this.form.selectedDecksIds.includes(id)) {
            this.form.selectedDecksIds.push(id);
          }
        }
      }
    }
  }

  toggleDeckId(deckId: number) {
    if (this.form.selectedDecksIds.includes(deckId)) {
      const index = this.form.selectedDecksIds.indexOf(deckId);
      if (index !== -1) {
        this.form.selectedDecksIds.splice(index, 1);
      }
    } else {
      this.form.selectedDecksIds.push(deckId);
    }
  }

  isListRootItemOn(deckListItem: DeckListItem) {
    if (deckListItem.type === "deck") {
      return this.form.selectedDecksIds.includes(deckListItem.id);
    } else if (deckListItem.type === "folder") {
      return deckListItem.decks.every((deck) =>
        this.form.selectedDecksIds.includes(deck.id),
      );
    }
    return false;
  }

  get customCardsToReview() {
    const result: Array<[DeckCardDbTypeWithType, DeckWithCardsWithReviewType]> =
      [];

    deckListStore.myDecks.forEach((deck) => {
      if (!this.form.selectedDecksIds.includes(deck.id)) {
        return;
      }

      deck.cardsToReview.forEach((card) => {
        if (this.form.reviewTypes.includes(card.type)) {
          result.push([card, deck]);
        }
      });
    });

    return result;
  }

  get customCardsToReviewCount() {
    return this.customCardsToReview.length;
  }

  get isReviewButtonVisible() {
    return this.customCardsToReviewCount > 0;
  }

  dispose() {
    stopPersisting(this);
  }
}
