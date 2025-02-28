import { observer } from "mobx-react-lite";
import { CardFormStoreInterface } from "../deck-form/store/card-form-store-interface.ts";
import { GeneratedCardFormView } from "./generated-card-form-view.tsx";
import { ManualCardFormView } from "./manual-card-form-view.tsx";
import { assert } from "../../../../shared/typescript/assert.ts";

type Props = { cardFormStore: CardFormStoreInterface };

export const CardFormView = observer((props: Props) => {
  const { cardFormStore } = props;
  const { cardForm } = cardFormStore;

  assert(cardForm, "Card should not be empty before editing");
  assert(
    cardFormStore.deckForm,
    "Deck form should not be empty before editing",
  );

  if (cardFormStore.deckForm.cardInputModeId === null || cardForm.id) {
    return <ManualCardFormView {...props} />;
  }
  return <GeneratedCardFormView {...props} />;
});
