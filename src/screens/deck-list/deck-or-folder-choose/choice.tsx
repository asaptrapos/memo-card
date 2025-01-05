import { css, cx } from "@emotion/css";
import { theme } from "../../../ui/theme.tsx";
import { Flex } from "../../../ui/flex.tsx";
import { tapScale } from "../../../lib/animations/tap-scale.ts";
import { ChevronIcon } from "../../../ui/chevron-icon.tsx";
import { ReactNode, useMemo } from "react";
import { colord } from "colord";

type Props = {
  icon?: string | ReactNode;
  title: string;
  description?: string;
  onClick: () => void;
};

export const Choice = (props: Props) => {
  const { icon, title, description, onClick } = props;
  const mainColor = theme.buttonColorComputed;
  const parsedColor = useMemo(() => colord(mainColor), [mainColor]);

  return (
    <div
      onClick={onClick}
      className={css({
        padding: "14px 16px",
        display: "flex",
        flexDirection: "column",
        gap: 4,
        color: theme.textColor,
        borderRadius: theme.borderRadius,
        boxShadow: theme.boxShadow,
        backgroundColor: parsedColor.alpha(0.2).toHex(),
        cursor: "pointer",
        ...tapScale,
      })}
    >
      <Flex
        justifyContent={"space-between"}
        alignItems={"center"}
        fullWidth
        gap={12}
      >
        <Flex gap={12}>
          {typeof icon === "string" ? (
            <i className={cx(icon, css({ color: theme.buttonColor }))} />
          ) : (
            icon
          )}
          <Flex direction={"column"}>
            <h3 className={css({ color: theme.buttonColor })}>{title}</h3>
            <div className={css({ color: theme.buttonColor })}>
              {description}
            </div>
          </Flex>
        </Flex>
        <div className={css({ color: theme.buttonColor })}>
          <ChevronIcon direction={"right"} />
        </div>
      </Flex>
    </div>
  );
};
