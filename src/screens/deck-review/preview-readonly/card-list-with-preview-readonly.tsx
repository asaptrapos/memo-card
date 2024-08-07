import { observer } from "mobx-react-lite";
import React, { useState } from "react";
import { DeckCardDbType } from "../../../../functions/db/deck/decks-with-cards-schema.ts";
import { CardPreviewFromListReadonly } from "./card-preview-from-list-readonly.tsx";
import { CardListReadonly } from "./card-list-readonly.tsx";

type Props = {
  onBack: () => void;
  cards: DeckCardDbType[];
};

export const CardListWithPreviewReadonly = observer((props: Props) => {
  const cards = props.cards;
  const [selectedCardId, setSelectedCardId] = useState<number | null>(null);

  if (!selectedCardId) {
    return (
      <CardListReadonly
        onClick={(card) => {
          setSelectedCardId(card.id);
        }}
        onBack={props.onBack}
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
