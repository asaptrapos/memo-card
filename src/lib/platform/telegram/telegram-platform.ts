import { Platform, PlatformTheme } from "../platform.ts";
import { cssVarToValue } from "./css-var-to-value.ts";
import { Language } from "../../../translations/t.ts";
import { isRuProxy } from "../../urls/is-ru-proxy.ts";
import { PlatformSchemaType } from "../../../../functions/db/user/upsert-user-db.ts";
import { WebApp } from "./telegram-web-app.ts";
import { makeObservable, observable, action } from "mobx";

const buttonColor = "var(--tg-theme-button-color)";
const buttonTextColor = "var(--tg-theme-button-text-color)";
const hintColor = "var(--tg-theme-hint-color)";

export class TelegramPlatform implements Platform {
  isFullScreen = this.calcIsFullScreen();

  constructor() {
    makeObservable(this, {
      isFullScreen: observable,
    });
  }

  getInitData(): string {
    return WebApp.initData;
  }

  getTheme(): PlatformTheme {
    return {
      buttonColor: cssVarToValue(buttonColor),
      hintColor: cssVarToValue(hintColor),
      buttonTextColor: cssVarToValue(buttonTextColor),
    };
  }

  getStartParam(): string | undefined {
    const startParam = WebApp.initDataUnsafe.start_param;
    if (startParam) return startParam;

    const urlParams = new URLSearchParams(window.location.search);
    const start = urlParams.get("start");
    return typeof start === "string" ? start : undefined;
  }

  initialize() {
    WebApp.ready();
    WebApp.setHeaderColor("secondary_bg_color");
    if (this.isSwipeControllable()) {
      WebApp.isVerticalSwipesEnabled = false;
    }
    WebApp.expand();

    // Def doesn't work on Mac :(
    // Don't know yet about other platform
    WebApp.onEvent(
      // @ts-expect-error
      "fullscreenChanged",
      action(() => {
        this.isFullScreen = this.calcIsFullScreen();
      }),
    );
  }

  private calcIsFullScreen() {
    if (!WebApp.isVersionAtLeast("8.0")) {
      return false;
    }
    if (WebApp.platform === "macos") {
      return true;
    }
    // @ts-expect-error
    return !!WebApp.isFullscreen;
  }

  isOutdated(): boolean {
    return !WebApp.isVersionAtLeast("6.1");
  }

  isCloudStorageAvailable(): boolean {
    return WebApp.isVersionAtLeast("6.9");
  }

  isSwipeControllable() {
    return WebApp.isVersionAtLeast("7.8");
  }

  openInternalLink(link: string) {
    // https://github.com/overtake/TelegramSwift/issues/1156
    if (this.isMacosWithShareBugs()) {
      this.openExternalLink(link);
      return;
    }

    WebApp.openTelegramLink(link);
  }

  isIos() {
    return WebApp.platform === "ios";
  }

  isWeb() {
    return (
      WebApp.platform === "webk" ||
      WebApp.platform === "weba" ||
      WebApp.platform === "web"
    );
  }

  isAndroid() {
    return WebApp.platform === "android";
  }

  isMacosWithShareBugs() {
    return WebApp.platform === "macos" && WebApp.isVersionAtLeast("7.8");
  }

  getClientData(): PlatformSchemaType {
    return {
      platform: WebApp.platform,
      colorScheme: WebApp.colorScheme,
      tgVersion: WebApp.version,
      isRuProxy: isRuProxy(),
    };
  }

  getLanguage(): Language {
    const languageCode = WebApp.initDataUnsafe.user?.language_code;
    switch (languageCode) {
      case "ru":
      case "es":
      case "pt-br":
      case "ar":
        return languageCode;
      default:
        return "en";
    }
  }

  isTelegramDesktop() {
    return WebApp.platform === "tdesktop";
  }

  openExternalLink(link: string) {
    WebApp.openLink(link);
  }

  openInvoiceLink(link: string) {
    WebApp.openInvoice(link, (status) => {
      if (status === "paid") {
        WebApp.close();
      }
    });
  }
}
