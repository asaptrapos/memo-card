type Props = { src: string };

export const AudioPlayer = (props: Props) => {
  const { src } = props;
  return (
    <audio
      className="w-full focus:outline-none"
      controls
      src={src}
      controlsList="nodownload"
    />
  );
};
