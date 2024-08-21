import { PaymentMethodType } from "./payment-gateway-types.ts";

export const formatPriceAsText = (price: number, method: PaymentMethodType) => {
  switch (method) {
    case PaymentMethodType.Stars: {
      return price + " ⭐️";
    }
    case PaymentMethodType.Usd: {
      return "$" + price;
    }
    default: {
      return method satisfies never;
    }
  }
};
