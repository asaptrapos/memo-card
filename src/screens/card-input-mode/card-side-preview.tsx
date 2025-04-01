import { HorizontalDivider } from "../../ui/horizontal-divider.tsx";

type Props = { front?: string; back?: string; example?: string };

export function CardSidePreview(props: Props) {
  const { front, back, example } = props;
  return (
    <div className="h-[250px] w-[250px] box-border rounded-[12px] text-text flex flex-col items-center justify-center p-[10px] bg-secondary-bg">
      <div className="font-semibold break-words">{front}</div>
      {back ? <HorizontalDivider /> : null}
      <div className="font-semibold break-words">{back}</div>
      <div className="pt-2 font-normal text-sm max-w-[200px]">{example}</div>
    </div>
  );
}
