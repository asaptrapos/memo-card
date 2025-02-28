import { Screen } from "../shared/screen.tsx";
import { platform } from "../../lib/platform/platform.ts";
import { links } from "../../../shared/links/links.ts";
import { Button } from "../../ui/button.tsx";
import { t } from "../../translations/t.ts";
import { observer } from "mobx-react-lite";

export const ErrorScreen = observer(() => {
  return (
    <Screen title={t("error")}>
      <div className="self-center my-6">
        {t("error_contact_support")}
      </div>
      <Button
        onClick={() => {
          platform.openInternalLink(links.supportChat);
        }}
      >
        {t("settings_contact_support")}
      </Button>
    </Screen>
  );
});
