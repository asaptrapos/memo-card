import React from "react";
import { cn } from "./cn.ts";

type ListRightTextParams = {
  text: string;
  cut?: boolean;
};

export const ListRightText = (props: ListRightTextParams) => {
  const { text, cut } = props;
  if (!text) {
    return null;
  }

  const textFormatted =
    text.length > 10 && cut ? `${text.slice(0, 10)}...` : text;

  return <div className={cn("color-hint text-base")}>{textFormatted}</div>;
};
