type Props = { color: string };

export const ColorIcon = (props: Props) => {
  const { color } = props;

  return (
    <div
      style={{
        backgroundColor: color,
      }}
      className="w-[16px] h-[16px] ml-[7px] rounded-[4px] border border-white"
    />
  );
};
