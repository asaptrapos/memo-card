import { observer } from "mobx-react-lite";
import React, { useState } from "react";
import {
  DeckCardDbType
} from "../../../../functions/db/deck/decks-with-cards-schema.ts";
import {
  CardPreviewFromListReadonly
} from "./card-preview-from-list-readonly.tsx";
import { CardListReadonly } from "./card-list-readonly.tsx";
import { DeckWithCardsWithReviewType } from "../../../store/deck-list-store.ts";
import {
  useScrollToTopOnMount
} from "../../../lib/react/use-scroll-to-top-mount.ts";

type Props = {
  onBack: () => void;
  cards: DeckCardDbType[];
  deck?: DeckWithCardsWithReviewType;
  folderName?: string;
};

export const CardListWithPreviewReadonly = observer((props: Props) => {
  const { deck, onBack, cards, folderName } = props;
  const [selectedCardId, setSelectedCardId] = useState<number | null>(null);

  useScrollToTopOnMount();

  if (!selectedCardId) {
    return (
      <CardListReadonly
        folderName={folderName}
        deck={deck}
        onClick={(card) => {
          setSelectedCardId(card.id);
        }}
        onBack={onBack}
        cards={cards}
      />
    );
  }

  const selectedCard = cards.find((card) => card.id === selectedCardId);
  if (!selectedCard) {
    return null;
  }

  return (
    <CardPreviewFromListReadonly
      card={selectedCard}
      onBack={() => {
        setSelectedCardId(null);
      }}
    />
  );
});
