import { test, expect } from "vitest";
import { calcPlanPriceForDuration } from "./calc-plan-price-for-duration.ts";

test("calc plan price $", () => {
  const pricePerMonth = 3;

  expect(calcPlanPriceForDuration("usd", pricePerMonth, 1)).toBe(pricePerMonth);
  expect(calcPlanPriceForDuration("usd", pricePerMonth, 6)).toBe(15);
  expect(calcPlanPriceForDuration("usd", pricePerMonth, 12)).toBe(27);
});

test("calc plan price Stars", () => {
  const pricePerMonth = 250;

  expect(calcPlanPriceForDuration("stars", pricePerMonth, 1)).toBe(
    pricePerMonth,
  );
  expect(calcPlanPriceForDuration("stars", pricePerMonth, 6)).toBe(1000);
  expect(calcPlanPriceForDuration("stars", pricePerMonth, 12)).toBe(1500);
});
