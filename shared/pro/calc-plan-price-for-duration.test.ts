import { expect, test } from "vitest";
import { calcPlanPriceForDuration } from "./calc-plan-price-for-duration.ts";
import { PaymentMethodType } from "./payment-gateway-types";
import { PlanDb } from "../../functions/db/plan/schema";

const plan = { price: 3, price_stars: 250 } as PlanDb;

test("calc plan price $", () => {
  expect(calcPlanPriceForDuration(PaymentMethodType.Usd, plan, 1)).toBe(
    plan.price,
  );
  expect(calcPlanPriceForDuration(PaymentMethodType.Usd, plan, 6)).toBe(15);
  expect(calcPlanPriceForDuration(PaymentMethodType.Usd, plan, 12)).toBe(27);
});

test("calc plan price Stars", () => {
  expect(calcPlanPriceForDuration(PaymentMethodType.Stars, plan, 1)).toBe(
    plan.price_stars,
  );
  expect(calcPlanPriceForDuration(PaymentMethodType.Stars, plan, 6)).toBe(1000);
  expect(calcPlanPriceForDuration(PaymentMethodType.Stars, plan, 12)).toBe(
    1500,
  );
});
