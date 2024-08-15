import { css } from "@emotion/css";
import { theme } from "./theme.tsx";
import React from "react";

type Props = {
  height?: string;
  backgroundColor?: string;
};

export const FullScreenLoader = (props: Props) => {
  const height = props.height ?? "100vh";
  const backgroundColor = props.backgroundColor ?? theme.secondaryBgColor;
  return (
    <div
      className={css({
        display: "flex",
        height,
        backgroundColor,
        alignItems: "center",
        justifyContent: "center",
      })}
    >
      <i className={"mdi mdi-loading mdi-spin mdi-48px"} />
    </div>
  );
};

export const ScreenLoader = () => {
  return <FullScreenLoader height={"calc(100vh - 90px)"} />;
};
