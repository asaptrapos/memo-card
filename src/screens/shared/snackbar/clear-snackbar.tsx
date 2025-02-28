import { closeSnackbar, SnackbarKey } from "notistack";

type Props = { snackbarId: SnackbarKey };

export const ClearSnackbar = (props: Props) => {
  const { snackbarId } = props;
  return (
    <button
      className="p-0 border-0 outline-none text-inherit font-inherit cursor-pointer bg-transparent focus:outline-none mr-2"
      onClick={() => {
        closeSnackbar(snackbarId);
      }}
    >
      <i className="mdi mdi-close-circle-outline mdi-24px text-button" />
    </button>
  );
};
