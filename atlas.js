const V = document.body.dataset.edition || "temo";
const AP = "’";
const META = {
  temo: [
    "Teimuraz (Temo) Benidze",
    "Теймураз (Темо) Важаевич Бенидзе",
    "m",
    V === "temo" ? "self" : "brother",
  ],
  irakli: [
    "Irakli Benidze",
    "Ираклий Важаевич Бенидзе",
    "m",
    V === "temo" ? "brother" : "birthday",
  ],
  keti: [
    "Keti Bochorishvili",
    "Кети Бочоришвили",
    "f",
    V === "temo" ? "inlaw" : "wife",
  ],
  "child-leila": [
    "Leila (Lela) Benidze",
    "Лейла (Лела) Бенидзе",
    "f",
    "daughter",
  ],
  "child-vazha": ["Vazha Benidze", "Важа Бенидзе", "m", "son"],
  "child-giorgi": ["Giorgi Benidze", "Георгий Бенидзе", "m", "son"],
  vazha: ["Vazha Benidze", "Важа Несторович Бенидзе", "m", "father"],
  leila: ["Leila Papava", "Лейла Орестовна Папава", "f", "mother"],
  nestor: ["Nestor Benidze", "Нестор Бенидзе", "m", "gfp"],
  minusha: ["Minash (Minusha) Agumava", "Минаш (Минуша) Агумава", "f", "gmp"],
  orest: ["Orest Papava", "Орест Георгиевич Папава", "m", "gfm"],
  zhenia: ["Evgenia (Zhenia) Kalandia", "Евгения (Женя) Каландия", "f", "gmm"],
  sharden: ["Sharden Benidze", "Шарден Бенидзе", "m", "uncle"],
  zhora: ["Zhora (Giorgi) Benidze", "Жора (Георгий) Бенидзе", "m", "uncle"],
  ilya: ["Ilia Benidze", "Илья Бенидзе", "m", "uncle"],
  venera: ["Venera Benidze", "Венера Бенидзе", "f", "aunt"],
  inessa: ["Inessa Benidze", "Инесса Бенидзе", "f", "aunt"],
  revaz: ["Revaz (Rezo) Papava", "Реваз (Резо) Папава", "m", "uncleM"],
  ana: ["Ana Kalandia", "Анна Каландия", "f", "ggSis"],
  tatusha: ["Tatusha Kalandia", "Татуша Каландия", "f", "ggSis"],
  konstantine: ["Konstantine Kalandia", "Константин Каландия", "m", "ggBro"],
  estate: ["Estate Kalandia", "Эстатэ (Евстафий) Каландия", "m", "ggBro"],
  mikha: ["Mikheil (Mikha) Kalandia", "Михаил (Миха) Каландия", "m", "ggf"],
  evdokia: ["Evdokia Lukava", "Евдокия Павловна Лукава", "f", "ggm"],
  shalva: ["Shalva Kalandia", "Шалва Каландия", "m", "gmBro"],
  otar: ["Otar Bodjgua (Kalandia)", "Отар Боджгуа (Каландия)", "m", "gmBro"],
  "maiko-bodjgua": ["Maiko Bodjgua", "Майко Боджгуа", "f", "maternalAunt"],
  "dodo-bodjgua": ["Dodo Bodjgua", "Додо Боджгуа", "f", "maternalAunt"],
  "vakhtang-bodjgua": [
    "Vakhtang (Vakho) Bodjgua",
    "Вахтанг (Вахо) Боджгуа",
    "m",
    "maternalUncle",
  ],
  "nona-natsivlishvili": [
    "Nona Natsivlishvili",
    "Нонна Нацивлишвили",
    "f",
    "maternalAunt",
  ],
  "nika-natsivlishvili": [
    "Nika Natsivlishvili",
    "Ника Нацивлишвили",
    "m",
    "cousin2",
  ],
  "mzia-djidjilava": ["Mzia Djidjilava", "Мзия Джиджилава", "f", "cousin"],
  "ioseb-djidjilava": [
    "Ioseb (Soso) Djidjilava",
    "Иосиф (Сосо) Джиджилава",
    "m",
    "cousin",
  ],
  nina: ["Nina Kalandia", "Нина Каландия", "f", "gmSis"],
  nadezhda: [
    "Nadezhda (Nadia) Kalandia",
    "Надежда (Надя) Каландия",
    "f",
    "gmSis",
  ],
  "lukava-sisters": [
    "Paraskeva, Marine, Olga Lukava",
    "Параскева, Марине, Ольга Лукава",
    "grp",
    "ggmSis",
  ],
  bachu: ["Bachu Kalandia", "Бачу Битуевич Каландия", "m", "gggfK"],
  keso: ["Keso Kukhilava", "Кесо Кухилава", "f", "gggmK"],
  pavel: ["Pavle Lukava", "Павел Лукава", "m", "gggfL"],
  salome: ["Salome Kakachia", "Саломе Какачия", "f", "gggmL"],
  bitu: [
    "Bitu Kalandadze (Kalandia)",
    "Биту Каландадзе (Каландия)",
    "m",
    "founder",
  ],
  abessalom: ["Abessalom", "Абессалом", "m", "cousin"],
  lekso: ["Lekso (Alex)", "Лексо (Алексей)", "m", "cousin"],
  data: ["Data (David)", "Дата (Давид)", "m", "cousin"],
  "anzor-bacho": ["Anzor (Bacho)", "Анзор (Бачо)", "m", "cousin"],
  "nino-papava": ["Nino Papava", "Нино Ревазовна Папава", "f", "cousin"],
  "zhenia-papava": [
    "Evgenia (Zhenia) Papava",
    "Евгения (Женя) Ревазовна Папава",
    "f",
    "cousin",
  ],
  aldona: ["Aldona Kalandia", "Альдона Шалвовна Каландия", "f", "maternalAunt"],
  medea: ["Medea Kalandia", "Медея Шалвовна Каландия", "f", "maternalAunt"],
  "giya-kalandia": [
    "Giorgi (Giya) Kalandia",
    "Георгий (Гия) Шалвович Каландия",
    "m",
    "maternalUncle",
  ],
  nanuli: ["Nanuli Gigeneishvili", "Нанули Гигенеишвили", "f", "maternalAunt"],
  "irakli-medea": ["Irakli", "Ираклий", "m", "cousin2"],
  "levan-medea": ["Levan", "Леван", "m", "cousin2"],
  "giorgi-giya": ["Giorgi Kalandia", "Георгий Каландия", "m", "cousin2"],
  eliso: ["Eliso Benidze", "Элисо Георгиевна Бенидзе", "f", "cousin"],
  "nana-benidze": ["Nana Benidze", "Нана Георгиевна Бенидзе", "f", "cousin"],
  khatuna: ["Khatuna Benidze", "Хатуна Георгиевна Бенидзе", "f", "cousin"],
  paata: ["Paata Benidze", "Паата Георгиевич Бенидзе", "m", "cousin"],
};
const ROLE = {
  self: [
    "ბენიძეთა სახლის შვილი",
    "Son of the House of Benidze",
    "Сын дома Бенидзе",
  ],
  brother: ["ღვიძლი ძმა", "Brother", "Родной брат"],
  birthday: [
    "დაბადების დღე · 13 ნოემბერი",
    "Birthday · 13 November",
    "Именинник · 13 ноября",
  ],
  inlaw: [
    "ირაკლის მეუღლე · რძალი",
    "Irakli" + AP + "s wife",
    "Супруга Ираклия",
  ],
  wife: ["მეუღლე", "Wife", "Супруга"],
  daughter: ["ქალიშვილი", "Daughter", "Дочь"],
  son: ["ვაჟი", "Son", "Сын"],
  father: ["მამა", "Father", "Отец"],
  mother: ["დედა", "Mother", "Мать"],
  gfp: ["ბაბუა · მამის მხრიდან", "Paternal grandfather", "Дедушка по отцу"],
  gmp: ["ბებია · მამის მხრიდან", "Paternal grandmother", "Бабушка по отцу"],
  gfm: ["ბაბუა · დედის მხრიდან", "Maternal grandfather", "Дедушка по матери"],
  gmm: ["ბებია · დედის მხრიდან", "Maternal grandmother", "Бабушка по матери"],
  uncle: ["ბიძა", "Uncle", "Дядя"],
  aunt: ["მამიდა", "Aunt", "Тётя · мамида"],
  uncleM: [
    "ბიძა · დედის ძმა",
    "Uncle · mother" + AP + "s brother",
    "Дядя · брат матери",
  ],
  cousin: ["ბიძაშვილი / დეიდაშვილი", "Cousin", "Двоюродный брат / сестра"],
  maternalAunt: ["დეიდა", "Maternal Aunt", "Тётя (по матери)"],
  maternalUncle: ["ბიძა", "Maternal Uncle", "Дядя (по матери)"],
  cousin2: ["ნათესავი", "Relative", "Родственник"],
  ggSis: [
    "დიდი პაპის და",
    "Great-grandfather" + AP + "s sister",
    "Сестра прадеда",
  ],
  ggBro: [
    "დიდი პაპის ძმა",
    "Great-grandfather" + AP + "s brother",
    "Брат прадеда",
  ],
  ggf: ["დიდი პაპა", "Great-grandfather", "Прадед"],
  ggm: ["დიდი ბებია", "Great-grandmother", "Прабабушка"],
  gmBro: ["ბებიის ძმა", "Grandmother" + AP + "s brother", "Брат бабушки"],
  gmSis: ["ბებიის და", "Grandmother" + AP + "s sister", "Сестра бабушки"],
  ggmSis: [
    "დიდი ბებიის დები",
    "Great-grandmother" + AP + "s sisters",
    "Сёстры прабабушки",
  ],
  gggfK: ["დიდი პაპის მამა", "Great-great-grandfather", "Прапрадед"],
  gggmK: ["დიდი პაპის დედა", "Great-great-grandmother", "Прапрабабушка"],
  gggfL: ["დიდი ბებიის მამა", "Great-great-grandfather", "Прапрадед"],
  gggmL: ["დიდი ბებიის დედა", "Great-great-grandmother", "Прапрабабушка"],
  founder: ["გვარის ფუძემდებელი", "Founder of the line", "Родоначальник рода"],
};
const PARENTS = {
  temo: ["vazha", "leila"],
  irakli: ["vazha", "leila"],
  vazha: ["nestor", "minusha"],
  sharden: ["nestor", "minusha"],
  zhora: ["nestor", "minusha"],
  ilya: ["nestor", "minusha"],
  venera: ["nestor", "minusha"],
  inessa: ["nestor", "minusha"],
  leila: ["orest", "zhenia"],
  revaz: ["orest", "zhenia"],
  zhenia: ["mikha", "evdokia"],
  shalva: ["mikha", "evdokia"],
  otar: ["mikha", "evdokia"],
  nina: ["mikha", "evdokia"],
  nadezhda: ["mikha", "evdokia"],
  mikha: ["bachu", "keso"],
  ana: ["bachu", "keso"],
  tatusha: ["bachu", "keso"],
  konstantine: ["bachu", "keso"],
  estate: ["bachu", "keso"],
  evdokia: ["pavel", "salome"],
  "lukava-sisters": ["pavel", "salome"],
  bachu: ["bitu"],
  "child-leila": ["irakli", "keti"],
  "child-vazha": ["irakli", "keti"],
  "child-giorgi": ["irakli", "keti"],
  abessalom: ["inessa"],
  lekso: ["inessa"],
  data: ["inessa"],
  "anzor-bacho": ["inessa"],
  eliso: ["zhora"],
  "nana-benidze": ["zhora"],
  khatuna: ["zhora"],
  paata: ["zhora"],
  "mzia-djidjilava": ["venera"],
  "ioseb-djidjilava": ["venera"],
  "nino-papava": ["revaz"],
  "zhenia-papava": ["revaz"],
  aldona: ["shalva"],
  medea: ["shalva"],
  "giya-kalandia": ["shalva"],
  nanuli: ["nadezhda"],
  "maiko-bodjgua": ["otar"],
  "dodo-bodjgua": ["otar"],
  "vakhtang-bodjgua": ["otar"],
  "nona-natsivlishvili": ["nina"],
  "nika-natsivlishvili": ["nona-natsivlishvili"],
  "irakli-medea": ["medea"],
  "levan-medea": ["medea"],
  "giorgi-giya": ["giya-kalandia"],
};
const COUPLES = [
  ["irakli", "keti"],
  ["vazha", "leila"],
  ["nestor", "minusha"],
  ["orest", "zhenia"],
  ["mikha", "evdokia"],
  ["bachu", "keso"],
  ["pavel", "salome"],
];
const TEXT = {
  ka: {
    title: "თეიმურაზ ბენიძის საგვარეულო ატლასი",
    eyebrow: "ერთი ცხოვრება · მრავალი თაობა",
    home: "ჩემთან",
    ancestors: "წინაპრები",
    overview: "მიმოხილვა",
    menu: "მენიუ",
    close: "დახურვა",
    replay: "შესავლის გამეორება",
    language: "ენა",
    languages: ["ქართული", "ინგლისური", "რუსული"],
    light: "განათება",
    lights: ["ქარვა", "მთვარის შუქი", "საღამოს შუქი"],
    gift: "ირაკლისადმი მიძღვნილი გამოცემა",
    original: "თეიმურაზის გამოცემა",
    dedication: "ირაკლის · 13 ნოემბერი",
    parents: "მშობლები",
    children: "შვილები",
    spouse: "მეუღლე",
    siblings: "და-ძმები",
    path: "ნათესაური კავშირი",
    biography: "ოჯახის მატიანე",
    expand: "სრულად გახსნა",
    collapse: "შემცირება",
    zoomIn: "მიახლოება",
    zoomOut: "დაშორება",
    hint: "გადაათრიეთ სივრცე · გასადიდებლად გაშალეთ ორი თითი",
    line: "წინაპრების გზა",
    generations: [
      "მშობლები",
      "ბებია და ბაბუა",
      "დიდი ბებია და პაპა",
      "ადრეული წინაპრები",
      "უძველესი ცნობილი წინაპარი",
    ],
    quoteTitle: "ოჯახის გადმოცემა",
    quote:
      "მიხა კალანდიას ნაამბობით, რომელიც ნონა ბიცოლამ შემოინახა, გვარის თავდაპირველი ფორმა იყო კალანდაძე. გურიიდან სამეგრელოში გადასახლების შემდეგ გვარი კალანდიად დაიწერა.",
    colophon: "საოჯახო გადმოცემებისა და საარქივო ცნობების მიხედვით",
    nephew: "ძმისშვილი",
    self: "ამ ისტორიის დასაწყისი",
    founder: "ამ შტოს უძველესი ცნობილი წინაპარი",
    skip: "შესავლის გამოტოვება",
    canvas: "საგვარეულო ატლასი",
    loading: "ატლასი იტვირთება",
    error: "ატლასი ვერ ჩაიტვირთა. განაახლეთ გვერდი.",
  },
  ru: {
    title: "Родовой атлас Теймураза Бенидзе",
    eyebrow: "Одна жизнь · поколения историй",
    home: "Ко мне",
    ancestors: "Предки",
    overview: "Обзор",
    menu: "Меню",
    close: "Закрыть",
    replay: "Повторить вступление",
    language: "Язык",
    languages: ["Грузинский", "Английский", "Русский"],
    light: "Освещение",
    lights: ["Янтарь", "Лунный свет", "Вечерние огни"],
    gift: "Издание для Ираклия",
    original: "Издание Теймураза",
    dedication: "Ираклию · 13 ноября",
    parents: "Родители",
    children: "Дети",
    spouse: "Супруги",
    siblings: "Братья и сёстры",
    path: "Родственная связь",
    biography: "Семейная хроника",
    expand: "Развернуть",
    collapse: "Свернуть",
    zoomIn: "Приблизить",
    zoomOut: "Отдалить",
    hint: "Тяните полотно · разводите пальцы для приближения",
    line: "Путь к предкам",
    generations: [
      "Родители",
      "Дедушки и бабушки",
      "Прадеды и прабабушки",
      "Ранние предки",
      "Самый ранний известный предок",
    ],
    quoteTitle: "Семейное предание",
    quote:
      "По рассказу Михи Каландия, сохранённому тётей Ноной, первоначальная фамилия рода — Каландадзе. После переселения из Гурии в Мегрелию фамилия стала записываться как Каландия.",
    colophon: "По семейным воспоминаниям и архивным сведениям",
    nephew: "Племянник / племянница",
    self: "Начало этой истории",
    founder: "Самый ранний известный предок этой ветви",
    skip: "Пропустить вступление",
    canvas: "Родословный атлас",
    loading: "Атлас загружается",
    error: "Не удалось загрузить атлас. Обновите страницу.",
  },
  en: {
    title: "The family atlas of Teimuraz Benidze",
    eyebrow: "One life · generations of stories",
    home: "Home",
    ancestors: "Ancestors",
    overview: "Overview",
    menu: "Menu",
    close: "Close",
    replay: "Replay introduction",
    language: "Language",
    languages: ["Georgian", "English", "Russian"],
    light: "Lighting",
    lights: ["Amber", "Moonlight", "Evening lights"],
    gift: "Edition for Irakli",
    original: "Teimuraz’s edition",
    dedication: "For Irakli · 13 November",
    parents: "Parents",
    children: "Children",
    spouse: "Spouses",
    siblings: "Siblings",
    path: "Family connection",
    biography: "Family chronicle",
    expand: "Expand",
    collapse: "Collapse",
    zoomIn: "Zoom in",
    zoomOut: "Zoom out",
    hint: "Drag to explore · spread two fingers to zoom",
    line: "The ancestral path",
    generations: [
      "Parents",
      "Grandparents",
      "Great-grandparents",
      "Earlier ancestors",
      "Earliest known ancestor",
    ],
    quoteTitle: "Family tradition",
    quote:
      "According to Mikha Kalandia’s account, preserved by Aunt Nona, the original family name was Kalandadze. After the move from Guria to Samegrelo, the name came to be recorded as Kalandia.",
    colophon: "From family memories and archival accounts",
    nephew: "Nephew / niece",
    self: "Where this story begins",
    founder: "Earliest known ancestor of this branch",
    skip: "Skip introduction",
    canvas: "Family atlas",
    loading: "Loading the atlas",
    error: "The atlas could not load. Please refresh.",
  },
};
const LANGS = ["ka", "en", "ru"];
const $ = (s) => document.querySelector(s);
const storage = {
  get(k) {
    try {
      return localStorage.getItem(k);
    } catch {
      return null;
    }
  },
  set(k, v) {
    try {
      localStorage.setItem(k, v);
    } catch {}
  },
};
let lang = LANGS.includes(storage.get("atlas-lang"))
  ? storage.get("atlas-lang")
  : "ka";
const t = (k) => TEXT[lang][k];
const bio = (id) => window.ATLAS_BIO[id][lang];
const name = (id) =>
  lang === "ka" ? bio(id).name : META[id][lang === "en" ? 0 : 1];
const role = (id) =>
  id === "temo"
    ? t("self")
    : id === "bitu"
      ? t("founder")
      : id.startsWith("child-") && V === "temo"
        ? t("nephew")
        : ROLE[META[id][3]][LANGS.indexOf(lang)];
const parents = (id) => PARENTS[id] || [];
const children = (id) =>
  Object.keys(PARENTS).filter((c) => PARENTS[c].includes(id));
const spouse = (id) =>
  COUPLES.find((c) => c.includes(id))?.find((c) => c !== id);
const siblings = (id) =>
  Object.keys(PARENTS).filter(
    (c) => c !== id && parents(c).some((p) => parents(id).includes(p)),
  );
function ancestors(id, seen = new Set()) {
  for (const p of parents(id)) {
    if (!seen.has(p)) {
      seen.add(p);
      ancestors(p, seen);
    }
  }
  return seen;
}
const DIRECT = ancestors("temo");
DIRECT.add("temo");
const world = $("#world"),
  svg = $("#edges"),
  viewport = $("#viewport"),
  sheet = $("#drawer"),
  menu = $("#menu");
const N = Object.keys(META).map((id) => ({
  id,
  direct: DIRECT.has(id),
  w: id === "temo" ? 520 : DIRECT.has(id) ? 240 : 210,
  x: 0,
  y: 0,
  h: 0,
}));
const NODE = Object.fromEntries(N.map((n) => [n.id, n]));
let selected = null,
  cameraRaf = 0,
  renderRaf = 0,
  introTimer = 0,
  introActive = false,
  booted = false,
  returnFocus = null;
const cam = { x: 0, y: 0, k: 1 };
let BOUNDS = {},
  HOME = {},
  generationRows = [];
const reduced = matchMedia("(prefers-reduced-motion: reduce)");
const escape = (s) =>
  String(s).replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        c
      ],
  );
function element(tag, cls, text) {
  const e = document.createElement(tag);
  e.className = cls;
  if (text !== undefined) e.textContent = text;
  return e;
}
N.forEach((n) => {
  const card = element(
    "button",
    "card " +
      (n.direct ? "direct" : "collateral") +
      (n.id === "temo" ? " hero" : "") +
      (n.id === "bitu" ? " founder" : ""),
  );
  card.type = "button";
  card.dataset.id = n.id;
  card.style.width = n.w + "px";
  card.setAttribute("aria-controls", "drawer");
  if (n.id === "temo") {
    const photo = element("div", "photo");
    const img = new Image();
    img.src = "temo_clean.jpg";
    img.alt = "";
    img.width = 1060;
    img.height = 600;
    img.draggable = false;
    photo.append(img);
    card.append(photo);
  }
  card.append(
    element("span", "role"),
    element("span", "nm"),
    element("span", "badge"),
  );
  world.append(card);
  n.el = card;
  card.addEventListener("click", () => {
    if (!dragged) select(n.id);
  });
  card.addEventListener("focus", () => {
    if (booted && !introActive && !selected && !dragged) ensureVisible(n);
  });
});
const quote = element("article", "family-quote");
quote.append(element("small", ""), element("p", ""));
world.append(quote);
const labels = TEXT.en.generations.map(() => {
  const e = element("div", "generation-label");
  world.append(e);
  return e;
});
const endnote = element("p", "endnote");
world.append(endnote);
function paintText() {
  document.documentElement.lang = lang;
  document.title = t("title");
  document.body.dataset.lang = lang;
  document.querySelector("meta[name=apple-mobile-web-app-title]").content =
    t("title");
  document.querySelector("link[rel=manifest]").href =
    "manifest-" + lang + ".webmanifest";
  N.forEach((n) => {
    n.el.querySelector(".role").textContent = role(n.id);
    n.el.querySelector(".nm").textContent = name(n.id);
    n.el.querySelector(".badge").textContent = bio(n.id).date;
    n.el.setAttribute("aria-label", name(n.id) + " · " + role(n.id));
  });
  document
    .querySelectorAll("[data-t]")
    .forEach((e) => (e.textContent = t(e.dataset.t)));
  document
    .querySelectorAll("[data-label]")
    .forEach((e) => e.setAttribute("aria-label", t(e.dataset.label)));
  $("#edition").textContent = V === "irakli" ? t("dedication") : t("eyebrow");
  $("#edition-link").textContent = t(V === "irakli" ? "original" : "gift");
  $("#language").replaceChildren(
    ...LANGS.map((l, i) => {
      const e = element("option", "", t("languages")[i]);
      e.value = l;
      return e;
    }),
  );
  $("#language").value = lang;
  $("#lighting").replaceChildren(
    ...["sunset", "opal", "promenade"].map((v, i) => {
      const e = element("option", "", t("lights")[i]);
      e.value = v;
      return e;
    }),
  );
  $("#lighting").value = document.body.dataset.light || "sunset";
  quote.firstChild.textContent = t("quoteTitle");
  quote.lastChild.textContent = t("quote");
  endnote.textContent = t("colophon");
  labels.forEach((e, i) => (e.textContent = t("generations")[i]));
  if (selected) renderDossier(selected);
}
// Generation is genealogical. A layout band is a measured visual terrace.
const directRows = [
  ["temo"],
  ["vazha", "leila"],
  ["nestor", "minusha", "orest", "zhenia"],
  ["mikha", "evdokia"],
  ["bachu", "keso", "pavel", "salome"],
  ["bitu"],
];
const directXs = [
  [0],
  [-170, 170],
  [-650, -350, 350, 650],
  [400, 740],
  [90, 390, 920, 1220],
  [90],
];
function place(id, x, y, generation) {
  const n = NODE[id];
  n.x = x;
  n.y = y;
  n.generation = generation;
  n.revealOrder = Math.min(7, Math.max(0, y / 380));
}
function layout() {
  // One measurement pass, followed by one write pass. No interleaved layout reads.
  N.forEach((n) => (n.h = n.el.offsetHeight));
  let y = 0;
  generationRows = [];
  directRows.forEach((ids, g) => {
    ids.forEach((id, i) => place(id, directXs[g][i], y, g));
    generationRows.push(y);
    y += Math.max(...ids.map((id) => NODE[id].h)) + (g === 0 ? 160 : 520);
  });
  // The brother's family occupies its own terrace below the apex.
  const terrace = NODE.temo.h + 90;
  place("irakli", -640, terrace, 0);
  place("keti", -900, terrace, 0);
  ["child-leila", "child-vazha", "child-giorgi"].forEach((id, i) =>
    place(
      id,
      -1020 + i * 240,
      terrace + Math.max(NODE.irakli.h, NODE.keti.h) + 140,
      -1,
    ),
  );
  // Each collateral family has an exclusive horizontal corridor. Children are below parents.
  const groups = [
    {
      ids: ["sharden", "zhora", "ilya", "venera", "inessa"],
      source: "nestor",
      side: -1,
      start: 1500,
    },
    { ids: ["revaz"], source: "orest", side: 1, start: 1750 },
    {
      ids: ["shalva", "otar", "nina", "nadezhda"],
      source: "mikha",
      side: 1,
      start: 2600,
    },
    {
      ids: ["ana", "tatusha", "konstantine", "estate"],
      source: "bachu",
      side: -1,
      start: 1500,
    },
    { ids: ["lukava-sisters"], source: "pavel", side: 1, start: 1750 },
  ];
  const collateralKids = (id) => children(id).filter((c) => !DIRECT.has(c));
  function branchWidth(id) {
    const kids = collateralKids(id);
    if (!kids.length) return 240;
    if (kids.every((k) => !collateralKids(k).length))
      return kids.length === 1 ? 240 : 500;
    return kids.reduce((w, k) => w + branchWidth(k) + 60, -60);
  }
  function subtree(id, x, top, g) {
    place(id, x, top, g);
    const kids = collateralKids(id),
      next = top + NODE[id].h + 110;
    if (kids.every((k) => !collateralKids(k).length)) {
      let rowY = next;
      for (let i = 0; i < kids.length; i += 2) {
        const pair = kids.slice(i, i + 2);
        pair.forEach((c, j) =>
          subtree(
            c,
            x + (pair.length > 1 ? (j === 0 ? -125 : 125) : 0),
            rowY,
            g - 1,
          ),
        );
        rowY += Math.max(...pair.map((k) => NODE[k].h)) + 110;
      }
    } else {
      let cursor = x - branchWidth(id) / 2;
      kids.forEach((c) => {
        const w = branchWidth(c);
        subtree(c, cursor + w / 2, next, g - 1);
        cursor += w + 60;
      });
    }
  }
  groups.forEach((group) => {
    let cursor = group.start;
    group.ids.forEach((id) => {
      const width = branchWidth(id);
      subtree(
        id,
        group.side * (cursor + width / 2),
        NODE[group.source].y + NODE[group.source].h + 110,
        NODE[group.source].generation - 1,
      );
      cursor += width + 110;
    });
  });
  // Bitu closes the known ancestral story, below every collateral terrace too.
  NODE.bitu.y = Math.max(
    NODE.bitu.y,
    ...N.filter((n) => n.id !== "bitu").map((n) => n.y + n.h + 240),
  );
  generationRows[5] = NODE.bitu.y;
  N.forEach((n) => {
    n.el.style.left = n.x - n.w / 2 + "px";
    n.el.style.top = n.y + "px";
    n.el.style.setProperty(
      "--delay",
      Math.min(1800, n.revealOrder * 210) + "ms",
    );
  });
  labels.forEach((e, i) => {
    e.style.left = "0px";
    e.style.top = generationRows[i + 1] - 100 + "px";
  });
  quote.style.left = "-1000px";
  quote.style.top = NODE.mikha.y + 40 + "px";
  endnote.style.left = NODE.bitu.x + "px";
  endnote.style.top = NODE.bitu.y + NODE.bitu.h + 100 + "px";
  BOUNDS = {
    x0: Math.min(...N.map((n) => n.x - n.w / 2)) - 80,
    x1: Math.max(...N.map((n) => n.x + n.w / 2)) + 80,
    y0: -60,
    y1: NODE.bitu.y + NODE.bitu.h + 220,
  };
  HOME = { x0: -320, x1: 320, y0: -60, y1: NODE.leila.y + NODE.leila.h + 40 };
  buildEdges();
}
let EDGES = [];
function addPath(points, ids, direct = false) {
  const p = document.createElementNS("http://www.w3.org/2000/svg", "path");
  p.setAttribute(
    "d",
    points.map((v, i) => (i ? "L" : "M") + v.join(" ")).join(" "),
  );
  p.setAttribute("pathLength", "1");
  p.classList.add("edge");
  if (direct) p.classList.add("main-edge");
  p.dataset.ids = ids.join(" ");
  p.style.setProperty(
    "--delay",
    Math.min(1700, Math.min(...points.map((v) => v[1])) * 0.48) + "ms",
  );
  svg.append(p);
  EDGES.push(p);
}
function buildEdges() {
  svg.replaceChildren();
  EDGES = [];
  for (const [child, ps] of Object.entries(PARENTS)) {
    const c = NODE[child];
    if (!c) continue;
    if (DIRECT.has(child)) {
      const joinY = Math.min(...ps.map((id) => NODE[id].y)) - 65;
      addPath(
        [
          [c.x, c.y + c.h],
          [c.x, joinY],
        ],
        [child, ...ps],
        true,
      );
      ps.forEach((id) => {
        const p = NODE[id];
        addPath(
          [
            [c.x, joinY],
            [p.x, joinY],
            [p.x, p.y],
          ],
          [child, id],
          true,
        );
      });
    } else {
      // From the nearest ancestor to a dedicated outer corridor, then down to the child.
      const p = NODE[ps[0]];
      const partner = spouse(p.id) && NODE[spouse(p.id)];
      const bus =
        Math.max(
          p.y + p.h,
          partner && partner.y === p.y ? partner.y + partner.h : 0,
        ) + 40;
      const family = children(p.id).map((id) => NODE[id]);
      const corridor =
        c.x < p.x
          ? Math.min(...family.map((n) => n.x - n.w / 2)) - 35
          : Math.max(...family.map((n) => n.x + n.w / 2)) + 35;
      addPath(
        [
          [p.x, p.y + p.h],
          [p.x, bus],
          [corridor, bus],
          [corridor, c.y - 28],
          [c.x, c.y - 28],
          [c.x, c.y],
        ],
        [child, ...ps],
      );
    }
  }
  COUPLES.forEach(([a, b]) => {
    const A = NODE[a],
      B = NODE[b];
    if (A.y === B.y) {
      const l = A.x < B.x ? A : B,
        r = l === A ? B : A;
      addPath(
        [
          [l.x + l.w / 2, l.y + Math.min(l.h, r.h) / 2],
          [r.x - r.w / 2, l.y + Math.min(l.h, r.h) / 2],
        ],
        [a, b],
        DIRECT.has(a),
      );
    }
  });
  paintFocus();
}
function routeTo(id) {
  const queue = [["temo"]],
    seen = new Set(["temo"]);
  while (queue.length) {
    const path = queue.shift(),
      last = path.at(-1);
    if (last === id) return path;
    for (const next of [
      ...parents(last),
      ...children(last),
      spouse(last),
    ].filter(Boolean)) {
      if (!seen.has(next)) {
        seen.add(next);
        queue.push([...path, next]);
      }
    }
  }
  return [id];
}
function paintFocus() {
  const active = selected
    ? new Set([...routeTo(selected), ...ancestors(selected)])
    : null;
  document.body.classList.toggle("has-focus", !!selected);
  N.forEach((n) => {
    n.el.classList.toggle("lit", !!active?.has(n.id));
    n.el.setAttribute("aria-pressed", String(selected === n.id));
  });
  EDGES.forEach((e) =>
    e.classList.toggle(
      "lit",
      !!active && e.dataset.ids.split(" ").every((id) => active.has(id)),
    ),
  );
}
function renderDossier(id) {
  const b = bio(id);
  $("#d-role").textContent = role(id);
  $("#d-name").textContent = name(id);
  $("#d-date").textContent = b.date;
  $("#d-rows").replaceChildren(...b.rows.map((s) => element("p", "", s)));
  const kin = $("#d-kin");
  kin.replaceChildren();
  const sections = [
    [t("path"), routeTo(id)],
    [t("parents"), parents(id)],
    [t("spouse"), [spouse(id)].filter(Boolean)],
    [t("children"), children(id)],
    [t("siblings"), siblings(id)],
  ];
  for (const [title, ids] of sections) {
    if (!ids.length) continue;
    kin.append(element("h3", "", title));
    const list = element("div", "chips");
    ids.forEach((k) => {
      const button = element("button", "chip", name(k));
      button.type = "button";
      button.addEventListener("click", () => select(k));
      list.append(button);
    });
    kin.append(list);
  }
  sheet.lang = lang;
  $("#sheet-size").textContent = t(
    sheet.classList.contains("expanded") ? "collapse" : "expand",
  );
}
function select(id) {
  finishIntro();
  selected = id;
  paintFocus();
  if (!id) {
    closeSheet();
    return;
  }
  returnFocus = NODE[id].el;
  renderDossier(id);
  sheet.showModal?.();
  sheet.classList.add("open");
  sheet.querySelector(".sheet-scroll").scrollTop = 0;
  centerOn(id);
  $("#sheet-close").focus({ preventScroll: true });
}
function closeSheet() {
  selected = null;
  paintFocus();
  sheet.close();
  sheet.classList.remove("open");
  sheet.classList.remove("expanded");
  if (returnFocus) {
    returnFocus.focus({ preventScroll: true });
    returnFocus = null;
  }
}
const mobile = () => innerWidth <= 700;
function safeArea() {
  const s = getComputedStyle(document.documentElement);
  return {
    top: parseFloat(s.getPropertyValue("--safe-top")) || 0,
    bottom: parseFloat(s.getPropertyValue("--safe-bottom")) || 0,
  };
}
function render() {
  world.style.transform = `translate3d(${cam.x}px,${cam.y}px,0) scale(${cam.k})`;
  document.body.classList.toggle("overview", cam.k < 0.27);
  $("#zoom-value").textContent = Math.round(cam.k * 100) + "%";
  renderRaf = 0;
}
function requestRender() {
  if (!renderRaf) renderRaf = requestAnimationFrame(render);
}
function fit(r, pad = 60) {
  const w = innerWidth,
    h = innerHeight - 150;
  const k = Math.max(
    0.025,
    Math.min(
      1.25,
      (w - pad * 2) / (r.x1 - r.x0),
      (h - pad * 2) / (r.y1 - r.y0),
    ),
  );
  return {
    k,
    x: w / 2 - ((r.x0 + r.x1) * k) / 2,
    y: 100 + h / 2 - ((r.y0 + r.y1) * k) / 2,
  };
}
function homeCamera() {
  const { top } = safeArea();
  const width = mobile()
    ? Math.min(330, innerWidth - 64)
    : Math.min(460, innerWidth * 0.36);
  const k = width / NODE.temo.w;
  return {
    k,
    x: innerWidth / 2,
    y: mobile()
      ? Math.max(135 + top, innerHeight * 0.17)
      : Math.max(150, innerHeight * 0.17),
  };
}
function fly(target, duration = 650) {
  cancelAnimationFrame(cameraRaf);
  if (reduced.matches || !duration) {
    Object.assign(cam, target);
    render();
    return;
  }
  const from = { ...cam },
    start = performance.now();
  const step = (now) => {
    const p = Math.min(1, (now - start) / duration),
      e = 1 - Math.pow(1 - p, 3);
    cam.k = Math.exp(
      Math.log(from.k) + (Math.log(target.k) - Math.log(from.k)) * e,
    );
    cam.x = from.x + (target.x - from.x) * e;
    cam.y = from.y + (target.y - from.y) * e;
    render();
    if (p < 1) cameraRaf = requestAnimationFrame(step);
  };
  cameraRaf = requestAnimationFrame(step);
}
function goHome() {
  finishIntro();
  if (sheet.open) closeSheet();
  fly(homeCamera());
}
function centerOn(id) {
  const n = NODE[id],
    header = $("#masthead").getBoundingClientRect().bottom + 20;
  const bottom = mobile()
    ? sheet.getBoundingClientRect().top - 20
    : innerHeight - 120;
  const width = mobile() ? innerWidth : innerWidth - 480;
  const k = Math.max(
    0.18,
    Math.min(1, (width - 80) / n.w, Math.max(100, bottom - header) / n.h),
  );
  fly({
    k,
    x: width / 2 - n.x * k,
    y: header + (Math.max(100, bottom - header) - n.h * k) / 2 - n.y * k,
  });
}
function ensureVisible(n) {
  const r = n.el.getBoundingClientRect();
  if (
    r.top < 110 ||
    r.bottom > innerHeight - 100 ||
    r.left < 0 ||
    r.right > innerWidth
  )
    fly(
      {
        k: 0.85,
        x: innerWidth / 2 - n.x * 0.85,
        y: innerHeight / 2 - (n.y + n.h / 2) * 0.85,
      },
      250,
    );
}
function zoomAt(x, y, f) {
  finishIntro();
  cancelAnimationFrame(cameraRaf);
  const k = Math.max(0.025, Math.min(2, cam.k * f)),
    ratio = k / cam.k;
  cam.x = x - (x - cam.x) * ratio;
  cam.y = y - (y - cam.y) * ratio;
  cam.k = k;
  requestRender();
}
let dragged = false;
const pointers = new Map();
let down = null;
viewport.addEventListener("pointerdown", (e) => {
  if (e.button > 0) return;
  finishIntro();
  cancelAnimationFrame(cameraRaf);
  pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
  down = { x: e.clientX, y: e.clientY };
  dragged = pointers.size > 1;
});
viewport.addEventListener("pointermove", (e) => {
  const old = pointers.get(e.pointerId);
  if (!old) return;
  const before = [...pointers.values()].map((p) => ({ ...p }));
  const dx = e.clientX - old.x,
    dy = e.clientY - old.y;
  pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
  if (Math.hypot(e.clientX - down.x, e.clientY - down.y) > 6) dragged = true;
  if (pointers.size === 2) {
    dragged = true;
    const after = [...pointers.values()];
    const d0 = Math.hypot(before[0].x - before[1].x, before[0].y - before[1].y),
      d1 = Math.hypot(after[0].x - after[1].x, after[0].y - after[1].y);
    const mx = (before[0].x + before[1].x) / 2,
      my = (before[0].y + before[1].y) / 2;
    if (d0 > 1) zoomAt(mx, my, d1 / d0);
    cam.x += (after[0].x + after[1].x) / 2 - mx;
    cam.y += (after[0].y + after[1].y) / 2 - my;
    requestRender();
  } else if (dragged) {
    cam.x += dx;
    cam.y += dy;
    requestRender();
  }
  if (dragged) {
    viewport.setPointerCapture(e.pointerId);
    viewport.classList.add("dragging");
  }
});
function pointerUp(e) {
  pointers.delete(e.pointerId);
  if (!pointers.size) {
    viewport.classList.remove("dragging");
    setTimeout(() => {
      dragged = false;
    }, 0);
  } else {
    const p = [...pointers.values()][0];
    down = { ...p };
  }
}
viewport.addEventListener("pointerup", pointerUp);
viewport.addEventListener("pointercancel", pointerUp);
viewport.addEventListener(
  "wheel",
  (e) => {
    e.preventDefault();
    finishIntro();
    if (e.ctrlKey || e.metaKey)
      zoomAt(e.clientX, e.clientY, Math.exp(-e.deltaY * 0.008));
    else {
      cancelAnimationFrame(cameraRaf);
      cam.x -= e.deltaX;
      cam.y -= e.deltaY;
      requestRender();
    }
  },
  { passive: false },
);
viewport.addEventListener(
  "click",
  (e) => {
    if (dragged) e.stopPropagation();
  },
  true,
);
function finishIntro() {
  if (!introActive) return;
  introActive = false;
  clearTimeout(introTimer);
  cancelAnimationFrame(cameraRaf);
  document.body.classList.remove("intro");
  document.body.classList.add("ready");
  $("#skip-intro").hidden = true;
  if (booted) layout();
  Object.assign(cam, homeCamera());
  render();
  try {
    sessionStorage.setItem("atlas-intro-seen", "1");
  } catch {}
}
function playIntro() {
  if (sheet.open) closeSheet();
  if (menu.open) menu.close();
  cancelAnimationFrame(cameraRaf);
  clearTimeout(introTimer);
  introActive = true;
  document.body.classList.remove("ready");
  document.body.classList.remove("intro");
  void world.offsetWidth;
  document.body.classList.add("intro");
  $("#skip-intro").hidden = false;
  const target = homeCamera();
  Object.assign(cam, { k: target.k * 0.82, x: target.x, y: target.y + 28 });
  render();
  fly(target, 2700);
  introTimer = setTimeout(finishIntro, 3000);
}
// Capture makes every interaction interrupt the scene before its normal action executes.
document.addEventListener("pointerdown", finishIntro, true);
document.addEventListener("keydown", (e) => {
  finishIntro();
  if (e.key === "Escape") {
    if (sheet.open) closeSheet();
    if (menu.open) menu.close();
  }
  if (sheet.open || menu.open || e.target.matches("input,select")) return;
  if (e.key === "+" || e.key === "=")
    zoomAt(innerWidth / 2, innerHeight / 2, 1.2);
  if (e.key === "-") zoomAt(innerWidth / 2, innerHeight / 2, 1 / 1.2);
  if (e.key === "Home") goHome();
  if (e.key.startsWith("Arrow") && !e.target.closest(".card")) {
    e.preventDefault();
    cancelAnimationFrame(cameraRaf);
    cam.x += { ArrowLeft: 80, ArrowRight: -80 }[e.key] || 0;
    cam.y += { ArrowUp: 80, ArrowDown: -80 }[e.key] || 0;
    requestRender();
  }
});
$("#nav-home").onclick = goHome;
$("#nav-ancestors").onclick = () => {
  finishIntro();
  fly(
    fit(
      {
        x0: -900,
        x1: 1500,
        y0: NODE.vazha.y - 100,
        y1: NODE.bitu.y + NODE.bitu.h + 100,
      },
      30,
    ),
  );
};
$("#nav-overview").onclick = () => {
  finishIntro();
  fly(fit(BOUNDS, 30));
};
$("#nav-menu").onclick = () => {
  finishIntro();
  menu.showModal();
};
$("#menu-close").onclick = () => menu.close();
$("#replay").onclick = playIntro;
$("#skip-intro").onclick = finishIntro;
$("#sheet-close").onclick = closeSheet;
sheet.addEventListener("cancel", (e) => {
  e.preventDefault();
  closeSheet();
});
$("#sheet-size").onclick = () => {
  sheet.classList.toggle("expanded");
  $("#sheet-size").textContent = t(
    sheet.classList.contains("expanded") ? "collapse" : "expand",
  );
  setTimeout(() => selected && centerOn(selected), 300);
};
// The grabber provides the familiar sheet swipe; buttons offer the same actions.
let sheetDragY = null;
const grabber = document.querySelector(".sheet-handle");
grabber.addEventListener("pointerdown", (e) => {
  sheetDragY = e.clientY;
  grabber.setPointerCapture(e.pointerId);
});
grabber.addEventListener("pointerup", (e) => {
  if (sheetDragY === null) return;
  const dy = e.clientY - sheetDragY;
  sheetDragY = null;
  if (dy > 55) {
    if (sheet.classList.contains("expanded")) $("#sheet-size").click();
    else closeSheet();
  } else if (dy < -40 && !sheet.classList.contains("expanded"))
    $("#sheet-size").click();
});
grabber.addEventListener("pointercancel", () => {
  sheetDragY = null;
});
for (const dialog of [sheet, menu])
  dialog.addEventListener("click", (e) => {
    if (e.target === dialog) {
      const r = dialog.getBoundingClientRect();
      if (
        e.clientX < r.left ||
        e.clientX > r.right ||
        e.clientY < r.top ||
        e.clientY > r.bottom
      ) {
        if (dialog === sheet) closeSheet();
        else dialog.close();
      }
    }
  });
$("#language").onchange = (e) => {
  const previous = { ...cam };
  lang = e.target.value;
  storage.set("atlas-lang", lang);
  paintText();
  layout();
  Object.assign(cam, previous);
  render();
  if (selected) centerOn(selected);
};
$("#lighting").onchange = (e) => {
  document.body.dataset.light = e.target.value;
  storage.set("atlas-light", e.target.value);
};
$("#zoom-in").onclick = () => zoomAt(innerWidth / 2, innerHeight / 2, 1.3);
$("#zoom-out").onclick = () => zoomAt(innerWidth / 2, innerHeight / 2, 1 / 1.3);
let resizeTimer;
addEventListener("resize", () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    if (!booted) return;
    const n = selected && NODE[selected];
    layout();
    if (n) centerOn(n.id);
    else goHome();
  }, 120);
});
document.addEventListener("visibilitychange", () => {
  document.body.classList.toggle("paused", document.hidden);
  if (document.hidden) finishIntro();
});
reduced.addEventListener("change", () => {
  if (reduced.matches) finishIntro();
});
document.body.dataset.light = ["sunset", "opal", "promenade"].includes(
  storage.get("atlas-light"),
)
  ? storage.get("atlas-light")
  : "sunset";
async function boot() {
  paintText();
  await Promise.race([
    document.fonts.ready,
    new Promise((r) => setTimeout(r, 800)),
  ]);
  const img = $(".hero img");
  if (img)
    await Promise.race([
      img.decode().catch(() => {}),
      new Promise((r) => setTimeout(r, 600)),
    ]);
  layout();
  booted = true;
  document.body.classList.remove("loading");
  let seen = false;
  try {
    seen = !!sessionStorage.getItem("atlas-intro-seen");
  } catch {}
  if (
    seen ||
    reduced.matches ||
    new URLSearchParams(location.search).has("nointro")
  ) {
    Object.assign(cam, homeCamera());
    document.body.classList.add("ready");
    render();
  } else playIntro();
  document.fonts.ready.then(() => {
    if (!introActive) {
      layout();
      if (!selected) render();
    }
  });
}
boot().catch((e) => {
  $("#status").textContent = t("error");
  document.body.classList.add("load-error");
  console.error(e);
});
window.__atlas = {
  N,
  NODE,
  PARENTS,
  DIRECT,
  cam,
  select,
  layout,
  playIntro,
  finishIntro,
  get bounds() {
    return BOUNDS;
  },
  get introActive() {
    return introActive;
  },
  get language() {
    return lang;
  },
};
