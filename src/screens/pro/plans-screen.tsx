import { observer } from "mobx-react-lite";
import { Screen } from "../shared/screen.tsx";
import { useBackButton } from "../../lib/platform/use-back-button.ts";
import { screenStore } from "../../store/screen-store.ts";
import { Flex } from "../../ui/flex.tsx";
import React, { useState } from "react";
import { useMainButton } from "../../lib/platform/use-main-button.ts";
import { Hint } from "../../ui/hint.tsx";
import { useMount } from "../../lib/react/use-mount.ts";
import { FullScreenLoader } from "../../ui/full-screen-loader.tsx";
import { PlansScreenStore, PreviewItem } from "./store/plans-screen-store.ts";
import { useProgress } from "../../lib/platform/use-progress.tsx";
import { userStore } from "../../store/user-store.ts";
import { ExternalLink } from "../../ui/external-link.tsx";
import { t, translator } from "../../translations/t.ts";
import { formatPaidUntil } from "./format-paid-until.tsx";
import { RadioList } from "../../ui/radio-list/radio-list.tsx";
import { css, cx } from "@emotion/css";
import { theme } from "../../ui/theme.tsx";
import {
  calcPlanPriceForDuration,
  durationsWithDiscount,
  PlanDuration,
} from "../../../shared/pro/calc-plan-price-for-duration.ts";
import { Tag } from "./tag.tsx";
import { Label } from "../../ui/label.tsx";
import { List } from "../../ui/list.tsx";
import { FilledIcon } from "../../ui/filled-icon.tsx";
import { translateProDuration } from "../../../shared/pro/translate-plan-duration.ts";
import { formatStarsPrice } from "../../../shared/pro/format-price.ts";
import { translateProDescription } from "../../../shared/pro/translate-pro-description.ts";
import { formatDiscount } from "../../../shared/pro/format-discount.ts";
import { assert } from "../../../shared/typescript/assert.ts";
import { links } from "../../../shared/links/links.ts";
import { MassCreationPreview } from "../shared/feature-preview/mass-creation-preview.tsx";
import { IndividualCardAiPreview } from "../shared/feature-preview/individual-card-ai-preview.tsx";
import { AiSpeechPreview } from "../shared/feature-preview/ai-speech-preview.tsx";

import { suitableCardInputModeStore } from "../../store/suitable-card-input-mode-store.ts";
import { sharedProTitle } from "../../../shared/pro/shared-pro-title.ts";

const planItems: Array<{
  iconText: string;
  iconColor: string;
  previewItem?: PreviewItem;
}> = [
  {
    iconColor: theme.icons.pink,
    iconText: "mdi-robot",
    previewItem: "individual_ai_card",
  },
  {
    iconColor: theme.icons.violet,
    iconText: "mdi-flash",
    previewItem: "bulk_ai_cards",
  },
  {
    iconColor: theme.icons.blue,
    iconText: "mdi-account-voice",
    previewItem: "ai_speech",
  },
  { iconColor: theme.icons.turquoise, iconText: "mdi-content-copy" },
  { iconColor: theme.icons.sea, iconText: "mdi-link-variant" },
];

export const PlansScreen = observer(() => {
  const [store] = useState(() => new PlansScreenStore());
  useBackButton(() => {
    screenStore.back();
  });

  useMount(() => {
    store.load();
    suitableCardInputModeStore.load();
  });

  useMainButton(
    () => store.buyText,
    () => {
      store.createOrder();
    },
    () => store.isBuyButtonVisible,
  );

  useProgress(() => store.createOrderRequest.isLoading);

  if (store.plansRequest.result.status !== "success") {
    return <FullScreenLoader />;
  }

  const planDescription = translateProDescription(translator.getLang());

  return (
    <Screen title={sharedProTitle}>
      <Flex
        direction={"column"}
        alignItems={"center"}
        justifyContent={"center"}
        gap={16}
        mt={4}
        mb={52}
        fullWidth
      >
        {userStore.paidUntil ? (
          <div className={css({ width: "100%" })}>
            <Hint>
              <Flex direction={"column"}>
                <div>
                  {t("payment_paid_until")}:{" "}
                  {formatPaidUntil(userStore.paidUntil)}
                </div>
                <div>
                  {t("ai_cards_left")}: {store.aiCardsLeft}
                </div>
              </Flex>
            </Hint>
          </div>
        ) : null}

        <Label text={t("payment_included")} fullWidth>
          <List
            items={planItems.map((item, i) => ({
              onClick: () => {
                store.previewPlanFeature(item.previewItem);
              },
              icon: (
                <FilledIcon
                  backgroundColor={item.iconColor}
                  icon={item.iconText}
                />
              ),
              text: (
                <Flex direction={"column"}>
                  <div>{planDescription[i].title}</div>
                  <div
                    className={css({
                      fontSize: 14,
                      color: theme.hintColor,
                      paddingRight: 4,
                    })}
                  >
                    {planDescription[i].description}
                  </div>
                </Flex>
              ),
              right: item.previewItem ? (
                <div className={css({ color: theme.hintColor })}>
                  <i
                    className={cx(
                      "mdi mdi-chevron-right",
                      css({ color: "currentColor" }),
                    )}
                  />
                </div>
              ) : undefined,
            }))}
          />
        </Label>

        <Label fullWidth text={t("payment_choose_duration")}>
          <RadioList<PlanDuration | null>
            selectedId={store.selectedPlanDuration.value}
            options={durationsWithDiscount.map((durationsWithDiscount) => {
              const proPlan = store.proPlan;
              assert(proPlan);
              return {
                id: durationsWithDiscount.duration,
                title: (
                  <div className={css({ display: "flex", gap: 8 })}>
                    <span>
                      {translateProDuration(
                        durationsWithDiscount.duration,
                        translator.getLang(),
                      )}
                    </span>
                    {durationsWithDiscount.discountStars > 0 && (
                      <Tag
                        text={formatDiscount(
                          durationsWithDiscount.discountStars,
                        )}
                      />
                    )}
                    <div
                      className={css({
                        color: theme.hintColor,
                        marginLeft: "auto",
                        paddingRight: 8,
                      })}
                    >
                      {formatStarsPrice(
                        calcPlanPriceForDuration(
                          "stars",
                          proPlan.price_stars,
                          durationsWithDiscount.duration,
                        ),
                      )}
                    </div>
                  </div>
                ),
              };
            })}
            onChange={store.selectedPlanDuration.onChange}
          />
        </Label>

        <div className={css({ width: "100%" })}>
          <Hint>
            {t("payment_tos_and_pp_agree")}
            <ExternalLink href={links.tosPath}>{t("payment_tos")}</ExternalLink>
            {t("payment_and")}
            <ExternalLink href={links.privacyPolicyPath}>
              {t("payment_pp")}
            </ExternalLink>
          </Hint>
        </div>
      </Flex>

      <IndividualCardAiPreview
        isOpen={store.selectedPreviewPlanFeature === "individual_ai_card"}
        onClose={store.quitPreviewPlanFeature}
        viewMode={suitableCardInputModeStore.viewMode}
      />

      <MassCreationPreview
        onClose={store.quitPreviewPlanFeature}
        isOpen={store.selectedPreviewPlanFeature === "bulk_ai_cards"}
      />

      <AiSpeechPreview
        isOpen={store.selectedPreviewPlanFeature === "ai_speech"}
        onClose={store.quitPreviewPlanFeature}
      />
    </Screen>
  );
});
