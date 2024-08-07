import { observer } from "mobx-react-lite";
import { useState } from "react";
import { createMockCardPreviewForm } from "../../deck-form/card-form/create-mock-card-preview-form.ts";
import { CardPreview } from "../../deck-form/card-form/card-preview.tsx";

type Props = {
  card: { front: string; back: string; example?: string | null };
  onBack: () => void;
};

export const CardPreviewFromListReadonly = observer((props: Props) => {
  const { card, onBack } = props;
  const [form] = useState(createMockCardPreviewForm(card));

  return (
    <CardPreview
      form={form}
      onBack={() => {
        onBack();
      }}
    />
  );
});
