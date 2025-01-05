import { PlanDuration } from "./calc-plan-price-for-duration.ts";
import { LanguageShared } from "../language/language-shared.ts";
import { PaymentMethodType } from "./payment-gateway-types.ts";

export const translateProDuration = (
  duration: PlanDuration,
  lang: LanguageShared,
  method: PaymentMethodType,
) => {
  switch (lang) {
    case "en": {
      const rulesEn = new Intl.PluralRules("en-US");
      const resultEn = rulesEn.select(duration);

      switch (method) {
        case PaymentMethodType.Usd:
          switch (resultEn) {
            case "one":
              return `Pay monthly`;
            case "other":
            default:
              return `Pay yearly`;
          }
        case PaymentMethodType.Stars:
          switch (resultEn) {
            case "one":
              return `${duration} month`;
            case "other":
            default:
              return `${duration} months`;
          }
        default:
          return method satisfies never;
      }
    }
    case "ru": {
      const rulesRu = new Intl.PluralRules("ru-RU");
      const result = rulesRu.select(duration);
      switch (method) {
        case PaymentMethodType.Usd:
          switch (result) {
            case "one":
              return `Оплата раз в месяц`;
            case "other":
            default:
              return `Оплата раз в год`;
          }
        case PaymentMethodType.Stars:
          switch (result) {
            case "one":
              return `${duration} месяц`;
            case "other":
            default:
              return `${duration} месяцев`;
          }
        default:
          return method satisfies never;
      }
    }
    case "es": {
      const rulesEs = new Intl.PluralRules("es-ES");
      const resultEs = rulesEs.select(duration);
      switch (method) {
        case PaymentMethodType.Usd:
          switch (resultEs) {
            case "one":
              return `Pago mensual`;
            case "other":
            default:
              return `Pago anual`;
          }
        case PaymentMethodType.Stars:
          switch (resultEs) {
            case "one":
              return `${duration} mes`;
            case "other":
            default:
              return `${duration} meses`;
          }
        default:
          return method satisfies never;
      }
    }
    case "pt-br": {
      const rulesPt = new Intl.PluralRules("pt-br");
      const resultPt = rulesPt.select(duration);
      switch (method) {
        case PaymentMethodType.Usd:
          switch (resultPt) {
            case "one":
              return `Pagamento mensal`;
            case "other":
            default:
              return `Pagamento anual`;
          }
        case PaymentMethodType.Stars:
          switch (resultPt) {
            case "one":
              return `${duration} mês`;
            case "other":
            default:
              return `${duration} meses`;
          }
        default:
          return method satisfies never;
      }
    }
    case "ar": {
      const rulesAr = new Intl.PluralRules("ar");
      const resultAr = rulesAr.select(duration);
      switch (method) {
        case PaymentMethodType.Usd:
          switch (resultAr) {
            case "one":
              return `الدفع شهريًا`;
            case "other":
            default:
              return `الدفع سنويًا`;
          }
        case PaymentMethodType.Stars:
          switch (resultAr) {
            case "one":
              return `${duration} شهر`;
            case "other":
            default:
              return `${duration} أشهر`;
          }
        default:
          return method satisfies never;
      }
    }
    default:
      return lang satisfies never;
  }
};
