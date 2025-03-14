import { t } from "../../translations/t.ts";
import { cn } from "../../ui/cn.ts";

export const DeckAddedLabel = () => {
  return (
    <div
      title={t("deck_has_been_added")}
      className="absolute right-0 top-0 rounded-[12px] bg-bg"
    >
      <i className={cn("mdi mdi-check-circle", "text-link")} />
    </div>
  );
};
