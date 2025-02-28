type Props = { number: number };

export const CardNumber = (props: Props) => {
  const { number } = props;

  return (
    <span className="text-hint">
      {number}.{" "}
    </span>
  );
};
