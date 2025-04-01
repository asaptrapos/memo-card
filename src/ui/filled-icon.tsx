import { ReactNode } from "react";

type Props = {
  backgroundColor: string;
  icon: string | ReactNode;
};

export function FilledIcon({ backgroundColor, icon }: Props) {
  const isIconString = typeof icon === "string";

  return (
    <div
      style={{ backgroundColor }}
      className="rounded-lg w-[30px] h-[30px] flex justify-center items-center"
    >
      {isIconString ? <i className={`mdi ${icon} text-white`} /> : icon}
    </div>
  );
}
