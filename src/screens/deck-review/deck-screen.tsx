import { useState } from "react";
import { observer } from "mobx-react-lite";
import { Review } from "./review.tsx";
import { DeckPreview } from "./deck-preview.tsx";
import { useReviewStore } from "./store/review-store-context.tsx";
import { DeckFinished } from "./deck-finished.tsx";
import { CardListWithPreviewReadonly } from "./preview-readonly/card-list-with-preview-readonly.tsx";
import { deckListStore } from "../../store/deck-list-store.ts";
import { BooleanToggle } from "mobx-form-lite";

export const DeckScreen = observer(() => {
  const reviewStore = useReviewStore();
  const [previewStore] = useState(() => new BooleanToggle(false));

  if (reviewStore.isFinished) {
    return <DeckFinished type={"deck"} />;
  } else if (reviewStore.currentCardId) {
    return <Review />;
  }

  if (previewStore.value) {
    const cards = deckListStore.selectedDeck?.deck_card ?? [];
    const subtitle = deckListStore.selectedDeck?.name || "";
    return (
      <CardListWithPreviewReadonly
        onBack={previewStore.setFalse}
        cards={cards}
        subtitle={subtitle}
      />
    );
  }

  return <DeckPreview onCardListPreview={previewStore.setTrue} />;
});
