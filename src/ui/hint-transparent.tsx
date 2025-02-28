import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export const HintTransparent = (props: Props) => {
  const { children } = props;

  return (
    <div className="text-sm px-3 rounded-xl text-hint normal-case">
      {children}
    </div>
  );
};
