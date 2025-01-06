import { LanguageShared } from "../language/language-shared.ts";

export const translateShortProDescription = (lang: LanguageShared): string => {
  switch (lang) {
    case "en":
      return "Unlock advanced features: AI card generation, high quality AI speech generation, duplicate folders and decks";
    case "uk":
      return "Отримайте розширені функції: генерація карток з ШІ, високоякісна генерація мови з ШІ, дублювання папок та колод";
    case "ru":
      return "Получите продвинутые функции: генерация карточек с ИИ, высококачественная генерация речи с ИИ, дублирование папок и колод";
    case "es":
      return "Desbloquee funciones avanzadas: generación de tarjetas de IA, generación de voz de IA de alta calidad, duplicar carpetas y barajas";
    case "pt-br":
      return "Desbloqueie recursos avançados: geração de cartões de IA, geração de voz de IA de alta qualidade, duplicar pastas e baralhos";
    case "ar":
      return "فتح ميزات متقدمة: إنشاء بطاقات بالذكاء الاصطناعي، إنشاء صوتي بالذكاء الاصطناعي عالي الجودة، تكرار المجلدات والكومات";
    case "fa":
      return "قفل کردن ویژگی‌های پیشرفته: ایجاد کارت‌های با هوش مصنوعی، ایجاد صدای با کیفیت بالای هوش مصنوعی، تکرار پوشه‌ها و دسته‌ها";
    default:
      return lang satisfies never;
  }
};

export const translateProDescription = (
  lang: LanguageShared,
): [
  { title: string; description: string },
  { title: string; description: string },
  { title: string; description: string },
  { title: string; description: string },
  { title: string; description: string },
] => {
  switch (lang) {
    case "en": {
      return [
        {
          title: "AI powered individual cards",
          description: "Generate flashcards with AI translation for any word",
        },
        {
          title: "Bulk AI card generation",
          description:
            "Create entire decks instantly by providing a topic to AI",
        },
        {
          title: "High quality AI speech generation",
          description:
            "Get high quality voiceovers instead of robotic voice for your cards",
        },
        {
          title: "Duplicate folder, deck",
          description: "Save time by duplicating your folders and decks",
        },
        {
          title: "One time links",
          description: "Share your decks and folders with one time links",
        },
      ];
    }
    case "ru": {
      return [
        {
          title: "ChatGPT карточки",
          description:
            "Генерация карточек с переводом и примером для любого слова благодаря ИИ",
        },
        {
          title: "Массовая генерация карточек",
          description:
            "Создавайте целые колоды на определённую тему с помощью ИИ",
        },
        {
          title: "ИИ озвучка карточек",
          description: "Качественная озвучка вместо роботизированного голоса",
        },
        {
          title: "Дублирование папок, колод",
          description: "Экономьте время, дублируя папки и колоды",
        },
        {
          title: "Одноразовые ссылки",
          description: "Делитесь колодами и папками через одноразовые ссылки",
        },
      ];
    }
    case "es": {
      return [
        {
          title: "Tarjetas individuales con IA",
          description:
            "Genera tarjetas con traducción y ejemplos para cualquier palabra",
        },
        {
          title: "Generación masiva de tarjetas con IA",
          description:
            "Crea barajas enteras al instante proporcionando un tema a la IA",
        },
        {
          title: "Generación de voz IA de alta calidad",
          description:
            "Obtén locuciones de alta calidad en lugar de voz robótica para tus tarjetas",
        },
        {
          title: "Duplicar carpeta, baraja",
          description: "Ahorra tiempo duplicando tus carpetas y barajas",
        },
        {
          title: "Enlaces de un solo uso",
          description:
            "Comparte tus barajas y carpetas con enlaces de un solo uso",
        },
      ];
    }
    case "pt-br": {
      return [
        {
          title: "Cartões individuais com IA",
          description:
            "Gere cartões com tradução e exemplos para qualquer palavra",
        },
        {
          title: "Geração em massa de cartões com IA",
          description:
            "Crie baralhos inteiros instantaneamente fornecendo um tópico para a IA",
        },
        {
          title: "Geração de voz IA de alta qualidade",
          description:
            "Obtenha locuções de alta qualidade em vez de voz robótica para seus cartões",
        },
        {
          title: "Duplicar pasta, baralho",
          description: "Economize tempo duplicando suas pastas e baralhos",
        },
        {
          title: "Links de uso único",
          description:
            "Compartilhe seus baralhos e pastas com links de uso único",
        },
      ];
    }
    case "ar": {
      return [
        {
          title: "بطاقات فردية مدعومة بالذكاء الاصطناعي",
          description: "إنشاء بطاقات فلاشية مع ترجمة الذكاء الاصطناعي لأي كلمة",
        },
        {
          title: "إنشاء بطاقات بالجملة بالذكاء الاصطناعي",
          description:
            "إنشاء أكوام بأكملها على الفور عن طريق توفير موضوع للذكاء الاصطناعي",
        },
        {
          title: "إنشاء صوتي بالذكاء الاصطناعي عالي الجودة",
          description:
            "الحصول على تسجيلات صوتية عالية الجودة بدلاً من الصوت الروبوتي لبطاقاتك",
        },
        {
          title: "تكرار المجلد، الكومة",
          description: "وفر الوقت من خلال تكرار مجلداتك وأكوامك",
        },
        {
          title: "روابط مرة واحدة",
          description: "شارك أكوامك ومجلداتك بروابط مرة واحدة",
        },
      ];
    }
    case "fa": {
      return [
        {
          title: "کارت‌های فردی با هوش مصنوعی",
          description: "ایجاد کارت‌های فلش با ترجمه هوش مصنوعی برای هر کلمه",
        },
        {
          title: "ایجاد کارت‌های فلش با هوش مصنوعی",
          description:
            "ایجاد کل دسته‌ها به صورت فوری با ارائه یک موضوع به هوش مصنوعی",
        },
        {
          title: "ایجاد صدای با کیفیت بالای هوش مصنوعی",
          description:
            "دریافت صداهای با کیفیت بالا به جای صدای رباتیک برای کارت‌های شما",
        },
        {
          title: "تکرار پوشه، دس��ه",
          description:
            "زمان خود را با تکرار پوشه‌ها و دسته‌های خود صرفه‌جویی کنید",
        },
        {
          title: "پیوندهای یکبار مصرف",
          description:
            "اشتراک‌گذاری دسته‌ها و پوشه‌های خود با پیوندهای یکبار مصرف",
        },
      ];
    }
    case "uk": {
      return [
        {
          title: "Карти з ШІ",
          description:
            "Генеруйте картки з перекладом та прикладом для будь-якого слова",
        },
        {
          title: "Масова генерація карток з ШІ",
          description: "Створюйте цілі колоди миттєво, надавши тему ШІ",
        },
        {
          title: "Якісна генерація голосу з ШІ",
          description:
            "Отримуйте якісні озвучення замість роботизованого голосу для ваших карток",
        },
        {
          title: "Дублювання папок, колод",
          description: "Економте час, дублюючи ваші папки та колоди",
        },
        {
          title: "Одноразові посилання",
          description: "Поділіться колодами та папками через разові посилання",
        },
      ];
    }
    default:
      return lang satisfies never;
  }
};
