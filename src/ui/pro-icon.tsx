import { css, cx } from "@emotion/css";
import React from "react";

export const ProIcon = () => {
  return (
    <div
      className={css({
        backgroundImage: "linear-gradient(to right, #8b5cf6, #ec4899, #ef4444)",
        ":hover": {
          backgroundImage:
            "linear-gradient(to right, #7c3aed, #db2777, #dc2626)",
        },
        borderRadius: 8,
        width: 30,
        height: 30,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        color: "#fff",
      })}
    >
      <i className={cx("mdi", "mdi-star", css({ color: "inherit" }))} />
    </div>
  );
};
