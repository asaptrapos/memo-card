import { makeAutoObservable } from "mobx";
import { type UserDbType } from "../../functions/db/user/upsert-user-db.ts";
import { type PlansForUser } from "../../functions/db/plan/get-active-plans-for-user.ts";
import { BooleanToggle } from "mobx-form-lite";
import { persistableField } from "../lib/mobx-form-lite-persistable/persistable-field.ts";
import { canAdvancedShare } from "../../shared/access/can-advanced-share.ts";
import { RequestStore } from "../lib/mobx-request/request-store.ts";
import { activePlanesRequest } from "../api/api.ts";
import { reportHandledError } from "../lib/rollbar/rollbar.tsx";
import { formatPaidUntil } from "../screens/pro/format-paid-until.tsx";
import { assert } from "../../shared/typescript/assert.ts";
import { canDeleteItsAccount } from "../../shared/roles/can-delete-its-account.ts";
import { getUserLanguage } from "../../shared/language/get-user-language.ts";
import { LanguageShared } from "../../shared/language/language-shared.ts";
import { platform } from "../lib/platform/platform.ts";
import { BrowserPlatform } from "../lib/platform/browser/browser-platform.ts";

export class UserStore {
  userInfo?: UserDbType;
  plans?: PlansForUser;
  isCardFormattingOn = persistableField(
    new BooleanToggle(false),
    "isCardFormattingOn",
  );
  isSpeakingCardsMuted = new BooleanToggle(false);
  activePlansRequest = new RequestStore(activePlanesRequest);

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  setUser(user: UserDbType, plans: PlansForUser) {
    this.userInfo = user;
    this.plans = plans;

    if (this.isRtl) {
      document.documentElement.setAttribute("dir", "rtl");
    }

    if (platform instanceof BrowserPlatform) {
      platform.setLanguageCached(getUserLanguage(user));
    }
  }

  get language(): LanguageShared {
    if (!this.userInfo) {
      return platform.getLanguageCached();
    }

    return getUserLanguage(this.userInfo);
  }

  get isRtl() {
    // return true
    return this.language === "ar";
  }

  get user() {
    return this.userInfo ?? null;
  }

  get myId() {
    return this.user?.id;
  }

  get isAdmin() {
    return this.user?.is_admin ?? false;
  }

  get isSpeakingCardsEnabled() {
    if (this.isSpeakingCardsMuted.value) {
      return false;
    }
    return this.user?.is_speaking_card_enabled ?? false;
  }

  get canAdvancedShare() {
    if (!this.user || !this.plans) {
      return false;
    }
    return canAdvancedShare(this.user, this.plans);
  }

  get isPaid() {
    return this.plans?.some((plan) => plan.plan_id) ?? false;
  }

  get paidUntil() {
    const plan = this.plans ? this.plans[0] : undefined;
    if (!plan) {
      return null;
    }
    return formatPaidUntil(plan.until_date || "") || undefined;
  }

  async fetchActivePlans() {
    const plans = await this.activePlansRequest.execute();
    if (plans.status === "success") {
      this.plans = plans.data.plans;
    } else {
      reportHandledError("Error fetching active plans", plans.error, {
        userId: this.myId,
      });
    }
  }

  updateSettings(body: Partial<UserDbType>) {
    assert(this.userInfo, "myInfo is not loaded in optimisticUpdateSettings");
    Object.assign(this.userInfo, body);
  }

  get canUpdateCatalogSettings() {
    return this.isAdmin;
  }

  get canDeleteItsAccount() {
    if (!this.user) {
      return false;
    }
    return canDeleteItsAccount(this.user);
  }
}

export const userStore = new UserStore();
