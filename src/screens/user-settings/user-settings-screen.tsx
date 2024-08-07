import { observer } from "mobx-react-lite";
import { useUserSettingsStore } from "./store/user-settings-store-context.tsx";
import { deckListStore } from "../../store/deck-list-store.ts";
import React, { useEffect } from "react";
import { generateTimeRange } from "./generate-time-range.tsx";
import { useMainButton } from "../../lib/platform/use-main-button.ts";
import { useProgress } from "../../lib/platform/use-progress.tsx";
import { RadioSwitcher } from "../../ui/radio-switcher.tsx";
import { theme } from "../../ui/theme.tsx";
import { Select } from "../../ui/select.tsx";
import { css, cx } from "@emotion/css";
import { useBackButton } from "../../lib/platform/use-back-button.ts";
import { screenStore } from "../../store/screen-store.ts";
import { HintTransparent } from "../../ui/hint-transparent.tsx";
import { t } from "../../translations/t.ts";
import { Screen } from "../shared/screen.tsx";
import { links } from "../../../shared/links/links.ts";
import { List } from "../../ui/list.tsx";
import { FilledIcon } from "../../ui/filled-icon.tsx";
import { boolNarrow } from "../../lib/typescript/bool-narrow.ts";
import { platform } from "../../lib/platform/platform.ts";
import { BrowserPlatform } from "../../lib/platform/browser/browser-platform.ts";
import { userStore } from "../../store/user-store.ts";
import { formatPaidUntil } from "../pro/format-paid-until.tsx";
import { ProIcon } from "../../ui/pro-icon.tsx";
import { copyToClipboard } from "../../lib/copy-to-clipboard/copy-to-clipboard.ts";
import { showAlert } from "../../lib/platform/show-alert.ts";
import { assert } from "../../../shared/typescript/assert.ts";
import { reset } from "../../ui/reset.ts";
import { showConfirm } from "../../lib/platform/show-confirm.ts";

export const timeRanges = generateTimeRange();

export const UserSettingsScreen = observer(() => {
  const userSettingsStore = useUserSettingsStore();
  const screen = screenStore.screen;
  assert(screen.type === "userSettings");

  useEffect(() => {
    userSettingsStore.load();
  }, [userSettingsStore, screen.index]);

  useMainButton(t("save"), () => userSettingsStore.submit());

  useBackButton(() => {
    screenStore.back();
  });
  useProgress(() => userSettingsStore.userSettingsRequest.isLoading);

  if (!deckListStore.myInfo || !userSettingsStore.form) {
    return null;
  }

  const { isRemindNotifyEnabled, isSpeakingCardsEnabled, time } =
    userSettingsStore.form;

  return (
    <Screen title={t("settings")}>
      <div>
        <List
          items={[
            {
              icon: <ProIcon />,
              text: "MemoCard Pro",
              onClick: () => {
                screenStore.go({ type: "plans" });
              },
            },
          ]}
        />

        <HintTransparent>
          {userStore.paidUntil ? (
            <span>
              {t("payment_paid_until")}: {formatPaidUntil(userStore.paidUntil)}
            </span>
          ) : (
            t("payment_description")
          )}
        </HintTransparent>
      </div>

      <div>
        <List
          items={[
            {
              icon: (
                <FilledIcon
                  backgroundColor={theme.icons.turquoise}
                  icon={"mdi-snowflake"}
                />
              ),
              text: t("freeze_title"),
              onClick: () => {
                screenStore.go({ type: "freezeCards" });
              },
            },
          ]}
        />

        <HintTransparent>{t("freeze_hint")}</HintTransparent>
      </div>

      <div>
        <List
          items={[
            {
              icon: (
                <FilledIcon
                  backgroundColor={theme.icons.sea}
                  icon={"mdi-bell"}
                />
              ),
              right: (
                <span
                  className={css({
                    top: 3,
                    position: "relative",
                  })}
                >
                  <RadioSwitcher
                    isOn={isRemindNotifyEnabled.value}
                    onToggle={isRemindNotifyEnabled.toggle}
                  />
                </span>
              ),
              text: t("settings_review_notifications"),
            },
            isRemindNotifyEnabled.value
              ? {
                  icon: (
                    <FilledIcon
                      backgroundColor={theme.icons.green}
                      icon={"mdi-clock-time-five-outline"}
                    />
                  ),
                  text: t("settings_time"),
                  right: (
                    <div className={css({ color: theme.linkColor })}>
                      <Select
                        value={time.value.toString()}
                        onChange={(value) => {
                          time.onChange(value);
                        }}
                        options={timeRanges.map((range) => ({
                          value: range,
                          label: range,
                        }))}
                      />
                    </div>
                  ),
                }
              : null,
          ].filter(boolNarrow)}
        />

        <HintTransparent>
          {t("settings_review_notifications_hint")}
        </HintTransparent>
      </div>

      <div>
        <List
          animateTap={false}
          items={[
            {
              icon: (
                <FilledIcon
                  backgroundColor={theme.icons.pink}
                  icon={"mdi-account-voice"}
                />
              ),
              right: (
                <span
                  className={css({
                    top: 3,
                    position: "relative",
                  })}
                >
                  <RadioSwitcher
                    isOn={isSpeakingCardsEnabled.value}
                    onToggle={isSpeakingCardsEnabled.toggle}
                  />
                </span>
              ),
              text: t("speaking_cards"),
            },
          ]}
        />

        <HintTransparent>{t("card_speak_description")}</HintTransparent>
      </div>

      <div>
        <List
          items={[
            {
              icon: (
                <FilledIcon
                  backgroundColor={theme.icons.violet}
                  icon={"mdi-face-agent"}
                />
              ),
              text: t("settings_contact_support"),
              onClick: () => {
                platform.openInternalLink(links.supportChat);
              },
              isLinkColor: true,
            },

            {
              icon: (
                <FilledIcon
                  backgroundColor={theme.icons.blue}
                  icon={"mdi-shield-account"}
                />
              ),
              text: t("privacy_policy"),
              onClick: () => {
                platform.openExternalLink(links.privacyPolicyPath);
              },
              isLinkColor: true,
            },
            {
              icon: (
                <FilledIcon
                  backgroundColor={theme.icons.turquoise}
                  icon={"mdi-email-edit"}
                />
              ),
              text:
                platform instanceof BrowserPlatform ? (
                  <span>
                    <a
                      className={cx(reset.a, css({ color: theme.linkColor }))}
                      href={`mailto:${links.supportEmail}`}
                    >
                      {links.supportEmail}
                    </a>
                  </span>
                ) : (
                  <span
                    onClick={() => {
                      copyToClipboard(links.supportEmail);
                      showAlert(t("share_link_copied"));
                    }}
                  >
                    {links.supportEmail}
                  </span>
                ),
            },
          ]}
        />

        <HintTransparent>{t("settings_support_hint")}</HintTransparent>
      </div>

      {platform instanceof BrowserPlatform && (
        <div>
          <List
            items={[
              {
                icon: (
                  <FilledIcon
                    backgroundColor={theme.icons.sea}
                    icon={"mdi-logout"}
                  />
                ),
                text: t("logout"),
                onClick: () => {
                  assert(platform instanceof BrowserPlatform);
                  platform.logout();
                },
              },

              userStore.canDeleteItsAccount
                ? {
                    icon: (
                      <FilledIcon
                        backgroundColor={theme.danger}
                        icon={"mdi-account-cancel"}
                      />
                    ),
                    text: userSettingsStore.deleteAccountRequest.isLoading
                      ? t("ui_loading")
                      : "Delete account",
                    onClick: async () => {
                      const confirm = await showConfirm(
                        "Are you sure you want to delete your account?",
                      );
                      if (confirm) {
                        await userSettingsStore.deleteAccountRequest.execute();
                        window.location.reload();
                      }
                    },
                  }
                : null,
            ].filter(boolNarrow)}
          />
        </div>
      )}
    </Screen>
  );
});
