import React from "react";
import { observer } from "mobx-react-lite";
import { cn } from "../../../ui/cn.ts";

type Props = {
  items: Array<unknown>;
  color: string;
};

export const CardsToReviewCount = observer((props: Props) => {
  const { items, color } = props;

  return items.length > 0 ? (
    <div
      className={cn("font-semibold")}
      style={{ color }}
    >
      {items.length}
    </div>
  ) : null;
});
