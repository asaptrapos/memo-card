import { SnackbarProvider } from "notistack";

export function SnackbarProviderWrapper() {
  return (
    <SnackbarProvider
      iconVariant={{
        success: (
          <div className="mr-2">
            <i className="mdi mdi-check-circle-outline mdi-24px text-button" />
          </div>
        ),
        error: (
          <div className="mr-2">
            <i className="mdi mdi-alert-circle-outline mdi-24px text-danger" />
          </div>
        ),
      }}
    />
  );
}
