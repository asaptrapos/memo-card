import { UpgradeButton } from "../../../ui/upgrade-button.tsx";
import { t } from "../../../translations/t.ts";
import { screenStore } from "../../../store/screen-store.ts";

export const UpgradeProBlock = () => {
  return (
    <div className="mt-9 self-stretch">
      <UpgradeButton
        onClick={() => {
          screenStore.go({ type: "plans" });
        }}
      >
        {t("upgrade_pro")}
      </UpgradeButton>
    </div>
  );
};
