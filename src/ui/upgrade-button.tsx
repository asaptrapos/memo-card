import { css, cx } from "@emotion/css";
import React from "react";
import { reset } from "./reset.ts";
import { theme } from "./theme.tsx";

type Props = {
  mainColor?: string;
  noPseudoClasses?: boolean;
  column?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export const UpgradeButton = (props: Props) => {
  const { className, children, column, ...restProps } = props;

  return (
    <button
      {...restProps}
      className={cx(
        reset.button,
        css({
          display: "flex",
          flexDirection: column ? "column" : undefined,
          width: "100%",
          gap: column ? 0 : 8,
          justifyContent: "center",
          alignItems: "center",
          backgroundImage:
            "linear-gradient(to right, #8b5cf6, #ec4899, #ef4444)",
          ":hover": {
            backgroundImage:
              "linear-gradient(to right, #7c3aed, #db2777, #dc2626)",
          },
          cursor: "pointer",
          color: theme.buttonTextColorComputed,
          fontWeight: 600,
          fontSize: 14,
          lineHeight: 1.5,
          padding: "0.75rem 0.75rem",
          userSelect: "none",
          transitionDuration: "0.2s",
          borderRadius: theme.borderRadius,
          transitionTimingFunction: "ease-in-out",
          transitionProperty: "background-color, border, box-shadow, color",
        }),
        className,
      )}
    >
      {children}
    </button>
  );
};
