import { Screen } from "../shared/screen.tsx";
import { platform } from "../../lib/platform/platform.ts";
import { links } from "../../../shared/links/links.ts";
import { Button } from "../../ui/button.tsx";
import { css } from "@emotion/css";
import { t } from "../../translations/t.ts";

export const ErrorScreen = () => {
  return (
    <Screen title={t("error")}>
      <div
        className={css({
          alignSelf: "center",
          marginTop: 24,
          marginBottom: 24,
        })}
      >
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
};
