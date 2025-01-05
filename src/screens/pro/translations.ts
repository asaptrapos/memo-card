import { PlanDb } from "../../../functions/db/plan/schema.ts";
import { translator } from "../../translations/t.ts";
import {
  calcPlanPriceForDuration,
  PlanDuration,
} from "../../../shared/pro/calc-plan-price-for-duration.ts";
import { formatPriceAsText } from "../../../shared/pro/format-price.ts";
import { PaymentMethodType } from "../../../shared/pro/payment-gateway-types.ts";
import { formatDiscountAsTextParenthesis } from "../../../shared/pro/format-discount-as-text.ts";

export const getPlanTitle = (plan: PlanDb) => {
  switch (plan.type) {
    case "pro":
      return `Pro`;
    default:
      return "";
  }
};

export const getBuyText = (
  plan: PlanDb,
  duration: PlanDuration,
  method: PaymentMethodType,
  totalDiscount: number,
) => {
  const lang = translator.getLang();
  const price = formatPriceAsText(
    calcPlanPriceForDuration(method, plan, duration),
    method,
  );

  const discountFormatted = formatDiscountAsTextParenthesis(
    totalDiscount,
    lang,
  );

  switch (lang) {
    case "en":
      return `Buy "${getPlanTitle(plan)}" for ${price}${discountFormatted}`;
    case "ru":
      return `Купить "${getPlanTitle(plan)}" за ${price}${discountFormatted}`;
    case "es":
      return `Comprar "${getPlanTitle(plan)}" por ${price}${discountFormatted}`;
    case "pt-br":
      return `Comprar "${getPlanTitle(plan)}" por ${price}${discountFormatted}`;
    case "ar":
      return `اشتري "${getPlanTitle(plan)}" مقابل ${price}${discountFormatted}`;
    default:
      return lang satisfies never;
  }
};
