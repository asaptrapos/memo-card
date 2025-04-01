import { ReactNode } from "react";

type Props = {
  title: ReactNode;
  onClose: () => void;
};

export function BottomSheetTitle(props: Props) {
  const { title, onClose } = props;

  return (
    <h2 className="w-full text-center relative self-center pt-2 pb-6">
      {title}
      <span
        className="absolute right-2 top-[10px] cursor-pointer bg-secondary-bg rounded-full w-[35px] h-[35px] flex justify-center items-center"
        onClick={() => {
          onClose();
        }}
      >
        <i className="mdi mdi-close" />
      </span>
    </h2>
  );
}
