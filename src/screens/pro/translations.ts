import { PlanDb } from "../../../functions/db/plan/schema.ts";
import { translator } from "../../translations/t.ts";
import {
  calcPlanPriceForDuration,
  PlanDuration,
} from "../../../shared/pro/calc-plan-price-for-duration.ts";
import { formatPriceAsText } from "../../../shared/pro/format-price.ts";
import { PaymentMethodType } from "../../../shared/pro/payment-gateway-types.ts";

export const getPlanTitle = (plan: PlanDb) => {
  switch (plan.type) {
    case "pro":
      return `Pro`;
    case "plus":
    case "deck_producer":
      return "";
    default:
      return plan.type satisfies never;
  }
};

export const getBuyText = (
  plan: PlanDb,
  duration: PlanDuration,
  method: PaymentMethodType,
) => {
  const lang = translator.getLang();
  const price = formatPriceAsText(
    calcPlanPriceForDuration(method, plan, duration),
    method,
  );

  switch (lang) {
    case "en":
      return `Buy "${getPlanTitle(plan)}" for ${price}`;
    case "ru":
      return `Купить "${getPlanTitle(plan)}" за ${price}`;
    case "es":
      return `Comprar "${getPlanTitle(plan)}" por ${price}`;
    case "pt-br":
      return `Comprar "${getPlanTitle(plan)}" por ${price}`;
    default:
      return lang satisfies never;
  }
};
