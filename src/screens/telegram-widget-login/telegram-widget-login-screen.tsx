import { observer } from "mobx-react-lite";
import { LoginButton } from "@telegram-auth/react";
import { platform } from "../../lib/platform/platform.ts";
import { BrowserPlatform } from "../../lib/platform/browser/browser-platform.ts";
import React, { useState } from "react";
import { css, cx } from "@emotion/css";
import { theme } from "../../ui/theme.tsx";
import { t } from "../../translations/t.ts";
import { assert } from "../../../shared/typescript/assert.ts";
import { TelegramPlatform } from "../../lib/platform/telegram/telegram-platform.ts";
import { ErrorScreen } from "../error-screen/error-screen.tsx";
import { useGoogleOneTapLogin } from "react-google-one-tap-login";
import { Button } from "../../ui/button.tsx";

const BOT_NAME = import.meta.env.VITE_BOT_NAME;
assert(BOT_NAME, "VITE_BOT_NAME is not set");

export const TelegramWidgetLoginScreen = observer(() => {
  const [showGoogleSignIn, setShowGoogleSignIn] = useState(true);
  useGoogleOneTapLogin({
    onError: (error) => console.log(error),
    disabled: showGoogleSignIn,
    onSuccess: (response) => {
      console.log(response);
    },
    googleAccountConfigs: {
      // callback: ({ clientId, credential, select_by }) => console.log('==', credential),
      client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
    },
  });

  if (platform instanceof TelegramPlatform) {
    return <ErrorScreen />;
  }

  console.log(import.meta.env.VITE_GOOGLE_CLIENT_ID);
  console.log(import.meta.env);

  return (
    <div
      className={css({
        height: 400,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        gap: 12,
        padding: "0 24px",
      })}
    >
      <div
        className={css({
          display: "flex",
          width: 350,
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          gap: 14,
          backgroundColor: theme.bgColor,
          borderRadius: theme.borderRadius,
          boxShadow: theme.boxShadow,
          padding: 24,
          paddingBottom: 48,
        })}
      >
        <div
          className={css({
            backgroundColor: "#f4f4f4",
            borderRadius: "50%",
            padding: 4,
          })}
        >
          <img
            className={css({
              width: 100,
              transform: "translate(2px, 4px)",
            })}
            src={"/img/logo.png"}
            alt={"MemoCard logo"}
          />
        </div>
        <h2>MemoCard</h2>
        <div
          className={css({
            width: "100%",
            display: "flex",
            gap: 4,
            flexDirection: "column",
            alignItems: "center",
          })}
        >
          <div className={css({ width: 219 })}>
            <Button
              icon={
                <i
                  className={cx(
                    "mdi mdi-google mdi-24px",
                    css({ color: "inherit" }),
                  )}
                />
              }
              onClick={() => {
                setShowGoogleSignIn(false);
              }}
            >
              {t("login_google")}
            </Button>
          </div>
          <div className={css({ height: 22 })}>
            <LoginButton
              showAvatar={false}
              cornerRadius={12}
              botUsername={BOT_NAME}
              onAuthCallback={(data) => {
                assert(platform instanceof BrowserPlatform);
                platform.handleTelegramWidgetLogin(data);
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
});
