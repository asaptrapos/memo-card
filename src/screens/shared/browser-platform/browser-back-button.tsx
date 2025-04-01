import { platform } from "../../../lib/platform/platform.ts";
import { BrowserPlatform } from "../../../lib/platform/browser/browser-platform.ts";
import { assert } from "../../../../shared/typescript/assert.ts";

export function BrowserBackButton() {
  if (!(platform instanceof BrowserPlatform)) {
    return null;
  }

  return (
    <div className="flex justify-between">
      {platform.isBackButtonVisible ? (
        <i
          className="mdi mdi-arrow-left-circle mdi-24px text-hint cursor-pointer"
          onClick={() => {
            assert(platform instanceof BrowserPlatform);
            platform.backButtonInfo?.onClick();
          }}
        />
      ) : null}
    </div>
  );
}
