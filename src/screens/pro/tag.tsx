import React, { ReactNode } from "react";
import { observer } from "mobx-react-lite";

type Props = { text: ReactNode };

export const Tag = observer(({ text }: Props) => (
  <div className="text-button-text bg-success font-semibold rounded text-xs py-0 px-1 flex justify-center items-center">
    {text}
  </div>
));
