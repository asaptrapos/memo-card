import { links } from "../../../shared/links/links.ts";

export const isRuProxy = () => {
  return window.location.host === links.appBrowserRuProxyHost;
};
