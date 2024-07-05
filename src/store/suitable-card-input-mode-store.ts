import { createCachedCardInputModesRequest } from "../api/create-cached-card-input-modes-request.ts";
import { makeAutoObservable } from "mobx";
import { CardInputModeDb } from "../../functions/db/card-input-mode/schema.ts";
import { Language } from "../translations/t.ts";
import { platform } from "../lib/platform/platform.ts";
import { userStore } from "./user-store.ts";

export class SuitableCardInputModeStore {
  cardInputModesRequest = createCachedCardInputModesRequest();

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  load() {
    if (userStore.isPaid) {
      return;
    }
    this.cardInputModesRequest.execute();
  }

  get viewMode(): CardInputModeDb | null {
    if (this.cardInputModesRequest.result.status !== "success") {
      return null;
    }

    const cardInputModes = this.cardInputModesRequest.result.data;
    const findByPreviewRecommendFor = (lang: Language) =>
      cardInputModes.find(
        (mode) => mode.options?.preview_recommend_for === lang,
      );

    const enInputMode = findByPreviewRecommendFor("en");
    const firstInputMode = this.cardInputModesRequest.result.data[0];

    const defaultInputMode = enInputMode || firstInputMode;
    if (!defaultInputMode) {
      throw new Error("No input mode found");
    }

    return (
      findByPreviewRecommendFor(platform.getLanguage()) || defaultInputMode
    );
  }
}

export const suitableCardInputModeStore = new SuitableCardInputModeStore();
