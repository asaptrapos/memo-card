import { test, expect } from "vitest";
import { formatDiscountNumber } from "./format-discount-number";

test("format discount", () => {
  expect(formatDiscountNumber(0)).toBe(null);
  expect(formatDiscountNumber(0.3333)).toBe("-33%");
  expect(formatDiscountNumber(0.5)).toBe("-50%");
});
