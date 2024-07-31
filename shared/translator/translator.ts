type Storage<Language extends string, Resource> = {
  [key in Language]: Resource;
};

type DefaultResource = { [key in string]: string };

export class Translator<
  Language extends string,
  Translation extends DefaultResource,
> {
  constructor(
    private storage: Storage<Language, Translation>,
    private languageOrProvider: Language | (() => Language),
  ) {}

  get lang() {
    if (typeof this.languageOrProvider === "function") {
      return this.languageOrProvider();
    }
    return this.languageOrProvider;
  }

  setLang(lang: Language) {
    this.languageOrProvider = lang;
  }

  getLang() {
    return this.lang;
  }

  translate(key: keyof Translation, defaultValue?: string): string {
    return this.storage[this.lang][key] ?? defaultValue;
  }

  isSupported(lang: string): lang is Language {
    return lang in this.storage;
  }
}
