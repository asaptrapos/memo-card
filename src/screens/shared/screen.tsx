import React, { ReactNode } from "react";
import { observer } from "mobx-react-lite";
import { cn } from "../../ui/cn.ts";
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
      className={cn(
        "flex flex-col gap-2 relative",
        platform instanceof BrowserPlatform ? "mb-20" : "mb-4",
      )}
    >
      <div>
        <div className="absolute -top-1 left-0">
          <BrowserBackButton />
        </div>
        <h3 className="text-center">{title}</h3>
        {subtitle}
      </div>
      {children}
    </div>
  );
});
