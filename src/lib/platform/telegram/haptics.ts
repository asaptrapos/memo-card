import WebApp from "@twa-dev/sdk";

const isIos = WebApp.platform === "ios";
const isAndroid = WebApp.platform === "android";

const isHapticEnabled = isIos || isAndroid;

export type HapticNotificationType = "error" | "success" | "warning";

export const hapticNotification = (type: HapticNotificationType) => {
  if (!isHapticEnabled) {
    return;
  }
  WebApp.HapticFeedback.notificationOccurred(type);
};

export type HapticImpactType = "light" | "medium" | "heavy";

export const hapticImpact = (type: HapticImpactType) => {
  if (!isHapticEnabled) {
    return;
  }
  WebApp.HapticFeedback.impactOccurred(type);
};

export const hapticSelection = () => {
  if (!isHapticEnabled) {
    return;
  }
  WebApp.HapticFeedback.selectionChanged();
};
