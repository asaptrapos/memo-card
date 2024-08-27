import { observer } from "mobx-react-lite";
import { useState } from "react";
import { createMockCardPreviewForm } from "../../deck-form/card-form/create-mock-card-preview-form.ts";
import { CardPreview } from "../../deck-form/card-form/card-preview.tsx";
import { DeckCardDbType } from "../../../../functions/db/deck/decks-with-cards-schema.ts";
import { DeckWithCardsWithReviewType } from "../../../store/deck-list-store.ts";

type Props = {
  card: DeckCardDbType;
  deck?: DeckWithCardsWithReviewType;
  onBack: () => void;
};

export const CardPreviewFromListReadonly = observer((props: Props) => {
  const { card, onBack, deck } = props;
  const [form] = useState(createMockCardPreviewForm(card, deck));

  return (
    <CardPreview
      form={form}
      onBack={() => {
        onBack();
      }}
    />
  );
});
