import { CardPreview } from "../deck-form/card-form/card-preview.tsx";
import { useState } from "react";
import { createMockCardPreviewForm } from "../deck-form/card-form/create-mock-card-preview-form.ts";
import { DeckCardDbType } from "../../../functions/db/deck/decks-with-cards-schema.ts";

export const CardPreviewStory = (props: { card: DeckCardDbType }) => {
  const [form] = useState(createMockCardPreviewForm(props.card));

  return <CardPreview form={form} onBack={() => {}} />;
};
