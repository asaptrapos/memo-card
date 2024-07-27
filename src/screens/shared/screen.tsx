import React, { ReactNode } from "react";
import { observer } from "mobx-react-lite";
import { css } from "@emotion/css";
import { BrowserBackButton } from "./browser-platform/browser-back-button.tsx";
import { platform } from "../../lib/platform/platform.ts";
import { BrowserPlatform } from "../../lib/platform/browser/browser-platform.ts";

type Props = {
  children: ReactNode;
  title: string;
  subtitle?: ReactNode;
};

export const Screen = observer((props: Props) => {
  const { children, title, subtitle } = props;

  return (
    <div
      className={css({
        display: "flex",
        flexDirection: "column",
        gap: 8,
        position: "relative",
        marginBottom: platform instanceof BrowserPlatform ? 70 : 16,
      })}
    >
      <div>
        <div
          className={css({
            position: "absolute",
            top: -4,
            left: 0,
          })}
        >
          <BrowserBackButton />
        </div>
        <h3 className={css({ textAlign: "center" })}>{title}</h3>
        {subtitle}
      </div>
      {children}
    </div>
  );
});
