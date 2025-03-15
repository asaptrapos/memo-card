import { observer } from "mobx-react-lite";
import { ReactNode } from "react";

export const MenuButton = observer(
  (props: { onClick: () => void; children: ReactNode }) => {
    const { children, onClick } = props;
    return (
      <button
        onClick={onClick}
        className="w-full bg-bg whitespace-nowrap text-left text-base px-4 py-3 hover:bg-secondary-bg flex items-center justify-between gap-3"
      >
        {children}
      </button>
    );
  },
);
