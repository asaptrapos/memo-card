import { translator } from "../../translations/t.ts";

export const translateAddCards = (count: number) => {
  const language = translator.getLang();

  if (language === "ru") {
    const rules = new Intl.PluralRules("ru-RU");
    const result = rules.select(count);

    switch (result) {
      case "one":
        return `Добавить ${count} карточку`;
      case "few":
      case "two":
        return `Добавить ${count} карточки`;
      default:
        return `Добавить ${count} карточек`;
    }
  }

  if (language === "es") {
    const rules = new Intl.PluralRules("es-ES");
    const result = rules.select(count);

    switch (result) {
      case "one":
        return `Agregar ${count} tarjeta`;
      default:
        return `Agregar ${count} tarjetas`;
    }
  }

  if (language === "pt-br") {
    const rules = new Intl.PluralRules("pt-br");
    const result = rules.select(count);

    switch (result) {
      case "one":
        return `Adicionar ${count} cartão`;
      default:
        return `Adicionar ${count} cartões`;
    }
  }

  if (count === 1) {
    return `Add ${count} card`;
  }
  return `Add ${count} cards`;
};

export const translateHowMassCreationWorksText = () => {
  const language = translator.getLang();

  if (language === "en") {
    return {
      example1: "Example 1",
      example2: "Example 2",
      description: "Generate multiple cards at once using AI",
      promptExample1: "Generate 3 cards with capitals of the world",
      frontExample1: "Country",
      backExample1: "Capital",
      resultExample1:
        "You will get cards like Germany - Berlin, France - Paris, Canada - Ottawa",
      promptExample2:
        "Generate 2 cards with English French words related to fruits",
      frontExample2: "Fruit in English",
      backExample2: "Fruit in French",
      resultExample2: "You will get cards like Apple - Pomme, Banana - Banane",
    };
  }

  if (language === "ru") {
    return {
      example1: "Пример 1",
      example2: "Пример 2",
      description: "Генерируйте множество карточек за раз с использованием ИИ",
      promptExample1: "Сгенерируй 3 карточки со столицами мира",
      frontExample1: "Страна",
      backExample1: "Столица",
      resultExample1:
        "Пример результата: Германия - Берлин, Франция - Париж, Канада - Оттава",
      promptExample2:
        "Сгенерируй 2 карточки с русскими и французскими словами на тему фруктов",
      frontExample2: "Фрукт на русском",
      backExample2: "Фрукт на французском",
      resultExample2: "Пример результата: Яблоко - Pomme, Банан - Banane",
    };
  }

  if (language === "es") {
    return {
      example1: "Ejemplo 1",
      example2: "Ejemplo 2",
      description: "Genere múltiples tarjetas a la vez utilizando IA",
      promptExample1: "Generar 3 tarjetas con capitales del mundo",
      frontExample1: "País",
      backExample1: "Capital",
      resultExample1:
        "Obtendrá tarjetas como Alemania - Berlín, Francia - París, Canadá - Ottawa",
      promptExample2:
        "Genera 2 tarjetas con palabras en francés y español relacionadas con frutas",
      frontExample2: "Fruta en español",
      backExample2: "Fruta en francés",
      resultExample2: "Obtendrá tarjetas como Manzana - Pomme, Banana - Banane",
    };
  }

  if (language === "pt-br") {
    return {
      example1: "Exemplo 1",
      example2: "Exemplo 2",
      description: "Gere várias cartas de uma vez usando IA",
      promptExample1: "Gerar 3 cartas com capitais do mundo",
      frontExample1: "País",
      backExample1: "Capital",
      resultExample1:
        "Você obterá cartas como Alemanha - Berlim, França - Paris, Canadá - Ottawa",
      promptExample2:
        "Gere 2 letras com palavras em português e francês relacionadas a frutas",
      frontExample2: "Fruta em português",
      backExample2: "Fruta em francês",
      resultExample2: "Você obterá cartas como Maçã - Pomme, Banana - Banane",
    };
  }

  if (language === "ar") {
    return {
      example1: "المثال 1",
      example2: "المثال 2",
      description: "قم بإنشاء بطاقات متعددة في وقت واحد باستخدام الذكاء الاصطناعي",
      promptExample1: "إنشاء 3 بطاقات بعواصم العالم",
      frontExample1: "بلد",
      backExample1: "عاصمة",
      resultExample1:
        "ستحصل على بطاقات مثل ألمانيا - برلين ، فرنسا - باريس ، كندا - أوتاوا",
      promptExample2:
        "إنشاء 2 بطاقة بكلمات إنجليزية وفرنسية تتعلق بالفواكه",
      frontExample2: "فاكهة بالإنجليزية",
      backExample2: "فاكهة بالفرنسية",
      resultExample2: "ستحصل على بطاقات مثل تفاحة - Pomme ، موزة - Banane",
    };
  }

  if (language === "fa") {
    return {
      example1: "مثال 1",
      example2: "مثال 2",
      description: "با استفاده از هوش مصنوعی، چندین کارت را همزمان ایجاد کنید",
      promptExample1: "ساخت 3 کارت با پایتخت‌های جهان",
      frontExample1: "کشور",
      backExample1: "پایتخت",
      resultExample1:
        "کارت‌هایی مانند آلمان - برلین، فرانسه - پاریس، کانادا - اتاوا خواهید داشت",
      promptExample2:
        "ساخت 2 کارت با کلمات انگلیسی و فرانسوی مرتبط با میوه‌ها",
      frontExample2: "میوه به انگلیسی",
      backExample2: "میوه به فرانسوی",
      resultExample2: "کارت‌هایی مانند سیب - Pomme، موز - Banane خواهید داشت",
    };
  }

  if (language === "uk") {
    return {
      example1: "Приклад 1",
      example2: "Приклад 2",
      description: "Генеруйте кілька карток одночасно за допомогою ШІ",
      promptExample1: "Згенеруй 3 картки зі столицями світу",
      frontExample1: "Країна",
      backExample1: "Столиця",
      resultExample1:
        "Приклад результату: Німеччина - Берлін, Франція - Париж, Канада - Оттава",
      promptExample2:
        "Згенеруй 2 картки з англійськими та французькими словами, пов'язаними з фруктами",
      frontExample2: "Фрукт англійською",
      backExample2: "Фрукт французькою",
      resultExample2: "Приклад результату: Яблуко - Pomme, Банан - Banane",
    };
  }

  return language satisfies never;
};
