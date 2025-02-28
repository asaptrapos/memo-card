import { observer } from "mobx-react-lite";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  onClick?: () => void;
};

export const Card = observer((props: Props) => {
  return (
    <label
      onClick={props.onClick}
      className="bg-bg rounded-xl box-border p-3 flex justify-between items-center cursor-pointer"
    >
      {props.children}
    </label>
  );
});