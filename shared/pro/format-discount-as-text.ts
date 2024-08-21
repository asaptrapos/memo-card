import { LanguageShared } from "../language/language-shared.ts";
import { formatDiscountNumber } from "./format-discount-number.ts";

export const formatDiscountAsText = (
  discount: number,
  lang: LanguageShared,
) => {
  const discountNumber = formatDiscountNumber(discount);
  if (discountNumber === null) {
    return "";
  }

  const discountNumberFormatted = discountNumber.replace("-", "");

  switch (lang) {
    case "en":
      return `${discountNumberFormatted} off`;
    case "ru":
      return `Скидка ${discountNumberFormatted}`;
    case "es":
      return `Descuento ${discountNumberFormatted}`;
    case "pt-br":
      return `Desconto ${discountNumberFormatted}`;
    default:
      return lang satisfies never;
  }
};

export const formatDiscountAsTextParenthesis = (
  discount: number,
  lang: LanguageShared,
) => {
  const text = formatDiscountAsText(discount, lang);

  return text ? ` (${text})` : "";
};
