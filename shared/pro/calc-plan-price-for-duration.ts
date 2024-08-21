import { PaymentMethodType } from "./payment-gateway-types.ts";
import { PlanDb } from "../../functions/db/plan/schema.ts";

export type PlanDuration = 1 | 6 | 12;

export const durationsWithDiscount: Array<{
  duration: PlanDuration;
  discount: number;
  discountStars: number;
}> = [
  { duration: 1, discount: 0, discountStars: 0 },
  { duration: 6, discount: 0.333, discountStars: 0.333 },
  { duration: 12, discount: 0.5, discountStars: 0.5 },
];

export const calcPlanPriceForDuration = (
  method: PaymentMethodType,
  plan: PlanDb,
  duration: PlanDuration,
) => {
  const found = durationsWithDiscount.find(
    (item) => item.duration === duration,
  );
  if (!found) {
    throw new Error(`Unknown duration: ${duration}`);
  }

  const priceRaw =
    method === PaymentMethodType.Stars ? plan.price_stars : plan.price;
  const discount =
    method === PaymentMethodType.Usd ? found.discount : found.discountStars;

  return Math.floor(priceRaw * duration * (1 - discount));
};
