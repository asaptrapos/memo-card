import { ReactNode } from "react";

type Props = { children: ReactNode };

export const Hint = (props: Props) => {
  return (
    <div className="text-sm px-3 py-2 rounded-xl text-hint bg-bg">
      {props.children}
    </div>
  );
};
