export const languagesShared = ['en', 'ru', 'es', 'pt-br', 'ar'] as const;

export type LanguageShared = typeof languagesShared[number];

export enum LanguageCatalogItemAvailableIn {
  En = "en",
  Ru = "ru",
  Es = "es",
  Uk = "uk",
  // arabic
  Ar = "ar",
  // Farsi
  Fa = "fa",
  PtBr = "pt-br",
}

export const languageSharedToHuman = (type: LanguageShared) => {
  switch (type) {
    case "en":
      return "English";
    case "ru":
      return "Русский";
    case "es":
      return "Español";
    case "pt-br":
      return "Português";
    case "ar":
      return "العربية";
    default:
      return type;
  }
}

export const languageCatalogItemAvailableInToNative = (
  type: LanguageCatalogItemAvailableIn,
) => {
  switch (type) {
    case LanguageCatalogItemAvailableIn.En:
      return "English";
    case LanguageCatalogItemAvailableIn.Ru:
      return "Русский";
    case LanguageCatalogItemAvailableIn.Es:
      return "Español";
    case LanguageCatalogItemAvailableIn.Uk:
      return "Українська";
    case LanguageCatalogItemAvailableIn.PtBr:
      return "Português";
    case LanguageCatalogItemAvailableIn.Ar:
      return "العربية";
    case LanguageCatalogItemAvailableIn.Fa:
      return "فارسی";
    default:
      return type;
  }
};
