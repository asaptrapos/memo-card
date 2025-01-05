import React, { ReactNode } from "react";
import { css, cx } from "@emotion/css";
import { theme } from "./theme.tsx";
import { Flex } from "./flex.tsx";
import { reset } from "./reset.ts";
import { userStore } from "../store/user-store.ts";

type Props = {
  text: ReactNode;
  children: ReactNode;
  isRequired?: boolean;
  // Helps to avoid nested <label> tags
  isPlain?: boolean;
  slotRight?: ReactNode;
  fullWidth?: boolean;
};

export const Label = (props: Props) => {
  const Tag = props.isPlain ? "span" : "label";
  const { slotRight, fullWidth } = props;

  return (
    <Tag
      className={cx(
        reset.label,
        css({
          display: "flex",
          flexDirection: "column",
          gap: 0,
          width: fullWidth ? "100%" : undefined,
        }),
      )}
    >
      <Flex
        mr={userStore.isRtl ? 12 : undefined}
        ml={!userStore.isRtl ? 12 : undefined}
        alignItems={"center"}
      >
        <span
          className={css({
            color: theme.hintColor,
            textTransform: "uppercase",
            fontSize: 14,
          })}
        >
          {props.text}
        </span>
        {props.isRequired && (
          <span
            className={css({
              paddingLeft: 4,
              color: theme.danger,
            })}
          >
            *
          </span>
        )}
        {slotRight && (
          <span
            className={cx(
              css({
                fontSize: 14,
              }),
              userStore.isRtl
                ? css({ marginRight: "auto", marginLeft: 12 })
                : css({ marginLeft: "auto", marginRight: 12 }),
            )}
          >
            {slotRight}
          </span>
        )}
      </Flex>
      {props.children}
    </Tag>
  );
};
