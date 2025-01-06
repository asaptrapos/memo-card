import { Bot } from "grammy";

const bot = new Bot(process.env.BOT_TOKEN);

const main = async () => {
  // English
  await bot.api.setMyShortDescription(
    "Improve your memory with spaced repetition. Learn languages, history or other subjects with the proven flashcard method.",
    { language_code: "en" },
  );

  await bot.api.setMyDescription(
    "People tend to forget information. Within an hour, up to 60% of new information can slip away, and by the end of a week, only about 10% may remain. However, consistent revisiting of the information can combat this decline. This bot uses the proven flashcard method, assisting users in retaining and mastering languages, history, and more.",
    {
      language_code: "en",
    },
  );

  // Russian
  await bot.api.setMyShortDescription(
    "Улучшайте свою память с помощью интервального повторения. Изучайте языки, историю и другие предметы с помощью бота.",
    { language_code: "ru" },
  );

  await bot.api.setMyDescription(
    "Люди склонны забывать информацию. В течение часа забывается до 60% новой информации, а к концу недели может остаться около 10%. Однако постоянное повторение информации может предотвратить эту проблему. Этот бот использует метод интервального повторения, помогая пользователям сохранять и усваивать языки, историю и многое другое.",
    {
      language_code: "ru",
    },
  );

  // Ukrainian
  await bot.api.setMyShortDescription(
    "Покращуйте свою пам'ять за допомогою інтервального повторення. Вивчайте мови, історію та інші предмети за допомогою бота",
    { language_code: "uk" },
  );
  await bot.api.setMyDescription(
    "Люди схильні забувати інформацію. Протягом години забувається до 60% нової інформації, а кінець тижня може залишитися лише близько 10%. Однак постійне повторення інформації може запобігти цій проблемі. Цей бот використовує метод інтервального повторення, допомагаючи користувачам зберігати та засвоювати мови, історію та багато іншого.",
    {
      language_code: "uk",
    },
  );

  // Spanish
  await bot.api.setMyShortDescription(
    "Mejora tu memoria con la repetición espaciada.",
    { language_code: "es" },
  );

  await bot.api.setMyDescription(
    "Las personas tienden a olvidar la información. En una hora, hasta el 60% de la información nueva puede desaparecer, y al final de una semana, solo puede quedar alrededor del 10%. Sin embargo, la revisión constante de la información puede combatir este declive. Este bot utiliza el probado método de tarjetas de memoria, ayudando a los usuarios a retener y dominar idiomas, historia y más.",
    {
      language_code: "es",
    },
  );

  // Portuguese
  await bot.api.setMyShortDescription(
    "Melhore sua memória com a repetição espaçada. Estude idiomas, história e outras matérias com o bot.",
    { language_code: "pt" },
  );

  await bot.api.setMyDescription(
    "As pessoas tendem a esquecer informações. Em uma hora, até 60% das novas informações podem ser esquecidas e, ao final de uma semana, pode restar apenas cerca de 10% delas. No entanto, a revisão constante da informação pode combater esse declínio. Este bot utiliza o método comprovado de cartões de memória, ajudando os usuários a reter e dominar idiomas, história e muito mais.",
    {
      language_code: "pt",
    },
  );

  // Arabic
  await bot.api.setMyShortDescription(
    "حسّن ذاكرتك باستخدام التكرار المتباعد. تعلم اللغات والتاريخ ومواد أخرى باستخدام طريقة البطاقات التعليمية المجربة.",
    { language_code: "ar" },
  );

  await bot.api.setMyDescription(
    "يميل الناس إلى نسيان المعلومات. خلال ساعة واحدة، يمكن أن يتم نسيان ما يصل إلى 60٪ من المعلومات الجديدة، وبحلول نهاية الأسبوع، قد لا يتبقى سوى 10٪. ومع ذلك، يمكن مواجهة هذا التراجع من خلال المراجعة المنتظمة للمعلومات. يستخدم هذا البوت طريقة البطاقات التعليمية المثبتة، مما يساعد المستخدمين على حفظ وإتقان اللغات والتاريخ والمزيد.",
    {
      language_code: "ar",
    },
  );

  // Farsi
  await bot.api.setMyShortDescription(
    "حافظه خود را با تکرار فاصله‌ای بهبود ببخشید. زبان‌ها، تاریخ و موضوعات دیگر را با روش کارت‌های فلش ثابت یاد بگیرید.",
    { language_code: "fa" },
  );
  await bot.api.setMyDescription(
    "مردم به فراموشی اطلاعات متمایل هستند. در یک ساعت، تا 60٪ از اطلاعات جدید ممکن است از بین برود، و تا پایان هفته، تنها ح��ود 10٪ از آن باقی می‌ماند. با این حال، مرور مداوم اطلاعات می‌تواند این کاهش را مقابله کند. این ربات از روش کارت‌های فلش ثابت استفاده می‌کند و به کاربران در حفظ و تسلط بر زبان‌ها، تاریخ و موارد دیگر کمک می‌کند.",
    {
      language_code: "fa",
    },
  );
};

main();
