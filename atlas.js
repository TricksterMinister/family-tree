/* Family Atlas: layout, camera, lineage highlighting, dossier drawer.
   Variant comes from window.ATLAS_VARIANT ('temo' | 'irakli'); biographies from atlas-data.js. */
(function () {
  'use strict';
  const V = window.ATLAS_VARIANT === 'irakli' ? 'irakli' : 'temo';
  const BIO = window.ATLAS_BIO[V];
  const PROTO = V;
  const EM = String.fromCharCode(8212), EN = String.fromCharCode(8211), AP = String.fromCharCode(8217);
  const $ = (s, r) => (r || document).querySelector(s);
  const el = (tag, cls, html) => { const e = document.createElement(tag); if (cls) e.className = cls; if (html != null) e.innerHTML = html; return e; };
  const SVGNS = 'http://www.w3.org/2000/svg';

  /* ---------------- people: names, sex, role ---------------- */
  const META = {
    'temo': ['Teimuraz (Temo) Benidze', 'Теймураз (Темо) Важаевич Бенидзе', 'm', V === 'temo' ? 'self' : 'brother'],
    'irakli': ['Irakli Benidze', 'Ираклий Важаевич Бенидзе', 'm', V === 'temo' ? 'brother' : 'birthday'],
    'keti': ['Keti Bochorishvili', 'Кети Бочоришвили', 'f', V === 'temo' ? 'inlaw' : 'wife'],
    'child-leila': ['Leila (Lela) Benidze', 'Лейла (Лела) Бенидзе', 'f', 'daughter'],
    'child-vazha': ['Vazha Benidze', 'Важа Бенидзе', 'm', 'son'],
    'child-giorgi': ['Giorgi Benidze', 'Георгий Бенидзе', 'm', 'son'],
    'vazha': ['Vazha Benidze', 'Важа Несторович Бенидзе', 'm', 'father'],
    'leila': ['Leila Papava', 'Лейла Орестовна Папава', 'f', 'mother'],
    'nestor': ['Nestor Benidze', 'Нестор Бенидзе', 'm', 'gfp'],
    'minusha': ['Minash (Minusha) Agumava', 'Минаш (Минуша) Агумава', 'f', 'gmp'],
    'orest': ['Orest Papava', 'Орест Георгиевич Папава', 'm', 'gfm'],
    'zhenia': ['Evgenia (Zhenia) Kalandia', 'Евгения (Женя) Каландия', 'f', 'gmm'],
    'sharden': ['Sharden Benidze', 'Шарден Бенидзе', 'm', 'uncle'],
    'zhora': ['Zhora (Giorgi) Benidze', 'Жора (Георгий) Бенидзе', 'm', 'uncle'],
    'ilya': ['Ilia Benidze', 'Илья Бенидзе', 'm', 'uncle'],
    'venera': ['Venera Benidze', 'Венера Бенидзе', 'f', 'aunt'],
    'inessa': ['Inessa Benidze', 'Инесса Бенидзе', 'f', 'aunt'],
    'revaz': ['Revaz (Rezo) Papava', 'Реваз (Резо) Папава', 'm', 'uncleM'],
    'ana': ['Ana Kalandia', 'Анна Каландия', 'f', 'ggSis'],
    'tatusha': ['Tatusha Kalandia', 'Татуша Каландия', 'f', 'ggSis'],
    'konstantine': ['Konstantine Kalandia', 'Константин Каландия', 'm', 'ggBro'],
    'estate': ['Estate Kalandia', 'Эстатэ (Евстафий) Каландия', 'm', 'ggBro'],
    'mikha': ['Mikheil (Mikha) Kalandia', 'Михаил (Миха) Каландия', 'm', 'ggf'],
    'evdokia': ['Evdokia Lukava', 'Евдокия Павловна Лукава', 'f', 'ggm'],
    'shalva': ['Shalva Kalandia', 'Шалва Каландия', 'm', 'gmBro'],
    'otar': ['Otar Bodjgua (Kalandia)', 'Отар Боджгуа (Каландия)', 'm', 'gmBro'],
    'maiko-bodjgua': ['Maiko Bodjgua', 'Майко Боджгуа', 'f', 'maternalAunt'],
    'dodo-bodjgua': ['Dodo Bodjgua', 'Додо Боджгуа', 'f', 'maternalAunt'],
    'vakhtang-bodjgua': ['Vakhtang (Vakho) Bodjgua', 'Вахтанг (Вахо) Боджгуа', 'm', 'maternalUncle'],
    'nona-natsivlishvili': ['Nona Natsivlishvili', 'Нонна Нацивлишвили', 'f', 'maternalAunt'],
    'nika-natsivlishvili': ['Nika Natsivlishvili', 'Ника Нацивлишвили', 'm', 'cousin2'],
    'mzia-djidjilava': ['Mzia Djidjilava', 'Мзия Джиджилава', 'f', 'cousin'],
    'ioseb-djidjilava': ['Ioseb (Soso) Djidjilava', 'Иосиф (Сосо) Джиджилава', 'm', 'cousin'],
    'nina': ['Nina Kalandia', 'Нина Каландия', 'f', 'gmSis'],
    'nadezhda': ['Nadezhda (Nadia) Kalandia', 'Надежда (Надя) Каландия', 'f', 'gmSis'],
    'lukava-sisters': ['Paraskeva, Marine, Olga Lukava', 'Параскева, Марине, Ольга Лукава', 'grp', 'ggmSis'],
    'bachu': ['Bachu Kalandia', 'Бачу Битуевич Каландия', 'm', 'gggfK'],
    'keso': ['Keso Kukhilava', 'Кесо Кухилава', 'f', 'gggmK'],
    'pavel': ['Pavle Lukava', 'Павел Лукава', 'm', 'gggfL'],
    'salome': ['Salome Kakachia', 'Саломе Какачия', 'f', 'gggmL'],
    'bitu': ['Bitu Kalandadze (Kalandia)', 'Биту Каландадзе (Каландия)', 'm', 'founder'],
    'abessalom': ['Abessalom', 'Абессалом', 'm', 'cousin'],
    'lekso': ['Lekso (Alex)', 'Лексо (Алексей)', 'm', 'cousin'],
    'data': ['Data (David)', 'Дата (Давид)', 'm', 'cousin'],
    'anzor-bacho': ['Anzor (Bacho)', 'Анзор (Бачо)', 'm', 'cousin'],
    'nino-papava': ['Nino Papava', 'Нино Ревазовна Папава', 'f', 'cousin'],
    'zhenia-papava': ['Evgenia (Zhenia) Papava', 'Евгения (Женя) Ревазовна Папава', 'f', 'cousin'],
    'aldona': ['Aldona Kalandia', 'Альдона Шалвовна Каландия', 'f', 'maternalAunt'],
    'medea': ['Medea Kalandia', 'Медея Шалвовна Каландия', 'f', 'maternalAunt'],
    'giya-kalandia': ['Giorgi (Giya) Kalandia', 'Георгий (Гия) Шалвович Каландия', 'm', 'maternalUncle'],
    'nanuli': ['Nanuli Gigeneishvili', 'Нанули Гигенеишвили', 'f', 'maternalAunt'],
    'irakli-medea': ['Irakli', 'Ираклий', 'm', 'cousin2'],
    'levan-medea': ['Levan', 'Леван', 'm', 'cousin2'],
    'giorgi-giya': ['Giorgi Kalandia', 'Георгий Каландия', 'm', 'cousin2'],
    'eliso': ['Eliso Benidze', 'Элисо Георгиевна Бенидзе', 'f', 'cousin'],
    'nana-benidze': ['Nana Benidze', 'Нана Георгиевна Бенидзе', 'f', 'cousin'],
    'khatuna': ['Khatuna Benidze', 'Хатуна Георгиевна Бенидзе', 'f', 'cousin'],
    'paata': ['Paata Benidze', 'Паата Георгиевич Бенидзе', 'm', 'cousin']
  };

  const ROLE = {
    self: ['ბენიძეთა სახლის შვილი', 'Son of the House of Benidze', 'Сын дома Бенидзе'],
    brother: ['ღვიძლი ძმა', 'Brother', 'Родной брат'],
    birthday: ['დაბადების დღე · 13 ნოემბერი', 'Birthday · 13 November', 'Именинник · 13 ноября'],
    inlaw: ['ირაკლის მეუღლე · რძალი', 'Irakli' + AP + 's wife', 'Супруга Ираклия'],
    wife: ['მეუღლე', 'Wife', 'Супруга'],
    daughter: ['ქალიშვილი', 'Daughter', 'Дочь'],
    son: ['ვაჟი', 'Son', 'Сын'],
    father: ['მამა', 'Father', 'Отец'],
    mother: ['დედა', 'Mother', 'Мать'],
    gfp: ['ბაბუა · მამის მხრიდან', 'Paternal grandfather', 'Дедушка по отцу'],
    gmp: ['ბებია · მამის მხრიდან', 'Paternal grandmother', 'Бабушка по отцу'],
    gfm: ['ბაბუა · დედის მხრიდან', 'Maternal grandfather', 'Дедушка по матери'],
    gmm: ['ბებია · დედის მხრიდან', 'Maternal grandmother', 'Бабушка по матери'],
    uncle: ['ბიძა', 'Uncle', 'Дядя'],
    aunt: ['მამიდა', 'Aunt', 'Тётя · мамида'],
    uncleM: ['ბიძა · დედის ძმა', 'Uncle · mother' + AP + 's brother', 'Дядя · брат матери'],
    cousin: ['ბიძაშვილი / დეიდაშვილი', 'Cousin', 'Двоюродный брат / сестра'],
    maternalAunt: ['დეიდა', 'Maternal Aunt', 'Тётя (по матери)'],
    maternalUncle: ['ბიძა', 'Maternal Uncle', 'Дядя (по матери)'],
    cousin2: ['ნათესავი', 'Relative', 'Родственник'],
    ggSis: ['დიდი პაპის და', 'Great-grandfather' + AP + 's sister', 'Сестра прадеда'],
    ggBro: ['დიდი პაპის ძმა', 'Great-grandfather' + AP + 's brother', 'Брат прадеда'],
    ggf: ['დიდი პაპა', 'Great-grandfather', 'Прадед'],
    ggm: ['დიდი ბებია', 'Great-grandmother', 'Прабабушка'],
    gmBro: ['ბებიის ძმა', 'Grandmother' + AP + 's brother', 'Брат бабушки'],
    gmSis: ['ბებიის და', 'Grandmother' + AP + 's sister', 'Сестра бабушки'],
    ggmSis: ['დიდი ბებიის დები', 'Great-grandmother' + AP + 's sisters', 'Сёстры прабабушки'],
    gggfK: ['დიდი პაპის მამა', 'Great-great-grandfather', 'Прапрадед'],
    gggmK: ['დიდი პაპის დედა', 'Great-great-grandmother', 'Прапрабабушка'],
    gggfL: ['დიდი ბებიის მამა', 'Great-great-grandfather', 'Прапрадед'],
    gggmL: ['დიდი ბებიის დედა', 'Great-great-grandmother', 'Прапрабабушка'],
    founder: ['გვარის ფუძემდებელი', 'Founder of the line', 'Родоначальник рода']
  };

  const LANGS = ['ka', 'en', 'ru'];
  const T = {
    eyebrow: V === 'temo'
      ? ['საგვარეულო გენეალოგიური ხე', 'Family genealogy · ascending pedigree', 'Родословное древо · восходящая роспись']
      : ['საგვარეულო გენეალოგიური ხე · 13 ნოემბერი', 'Family genealogy · 13 November', 'Родословное древо · 13 ноября'],
    title: V === 'temo'
      ? ['თეიმურაზ ვაჟას ძე ბენიძის საგვარეულო ხე', 'The Family Tree of Teimuraz Benidze', 'Родословное древо Теймураза Важаевича Бенидзе']
      : ['ირაკლი ვაჟას ძე ბენიძის საგვარეულო ხე', 'The Family Tree of Irakli Benidze', 'Родословное древо Ираклия Важаевича Бенидзе'],
    houses: V === 'temo'
      ? 'ბენიძე · აგუმავა · პაპავა · კალანდია (კალანდაძე) · ლუკავა · კაკაჩია · ქუხილავა'
      : 'ირაკლი ბენიძისა და ქეთი ბოჭორიშვილის ოჯახი · ბენიძე · აგუმავა · პაპავა · კალანდია · ლუკავა',
    direct: ['პირდაპირი ხაზი', 'Direct line', 'Прямая линия'],
    gift: ['ირაკლის ვერსია', 'Irakli' + AP + 's edition', 'Версия Ираклия'],
    giftBadge: ['13 ნოემბერი · საჩუქარი', '13 November · Gift', '13 ноября · Подарок'],
    hint: ['გადაათრიეთ სივრცე · მასშტაბი: ⌘/Ctrl + სქროლი · დააწკაპუნეთ ბარათს', 'Drag to explore · ⌘/Ctrl + scroll to zoom · click a card', 'Тяните полотно · масштаб: ⌘/Ctrl + прокрутка · нажмите на карточку'],
    lgMain: ['პირდაპირი წინაპრების ხაზი', 'Direct ancestral line', 'Прямая линия предков'],
    lgPat: ['მამის შტო: ბენიძე და აგუმავა', 'Father' + AP + 's branch: Benidze and Agumava', 'Ветвь отца: Бенидзе и Агумава'],
    lgKal: ['დედის შტო: პაპავა და კალანდია', 'Mother' + AP + 's branch: Papava and Kalandia', 'Ветвь матери: Папава и Каландия'],
    lgLuk: ['ლუკავებისა და კაკაჩიების შტო', 'The Lukava and Kakachia branch', 'Ветвь Лукава и Какачия'],
    male: ['მამაკაცი', 'Male', 'Мужчина'], female: ['ქალი', 'Female', 'Женщина'],
    g0: V === 'temo' ? ['თეიმურაზ ბენიძე და მისი თაობა', 'Teimuraz and his generation', 'Теймураз и его поколение']
      : ['ირაკლი, ქეთი და მათი შვილები', 'Irakli, Keti and their children', 'Ираклий, Кети и их дети'],
    g1: ['მშობლები', 'Parents', 'Родители'],
    g2: ['ბებია-ბაბუები', 'Grandparents', 'Дедушки и бабушки'],
    g3: ['დიდი ბებია-ბაბუები', 'Great-grandparents', 'Прадеды'],
    g4: ['წინაპრები: ბაჩუ კალანდია და პავლე ლუკავა', 'Forebears: Bachu Kalandia and Pavle Lukava', 'Предки: Бачу Каландия и Павел Лукава'],
    g5: ['გვარის ფუძემდებელი: ბითუ კალანდაძე', 'Founder: Bitu Kalandadze', 'Родоначальник: Биту Каландадзе'],
    wBen: ['ბენიძეების გვერდითი შტო (ბიძები და მამიდები)', 'Benidze collateral branch · uncles and aunts', 'Боковая ветвь Бенидзе · дяди и тёти'],
    wPap: ['პაპავების გვერდითი შტო', 'Papava collateral branch', 'Боковая ветвь Папава'],
    wMik: ['მიხა კალანდიას და-ძმები (ბაჩუ კალანდიასა და კესო ქუხილავას შვილები)', 'Siblings of Mikha Kalandia · children of Bachu and Keso', 'Братья и сёстры Михи Каландия · дети Бачу и Кесо'],
    wKal: ['კალანდიების გვერდითი შტო (ბებია ჟენიას და-ძმები)', 'Kalandia collateral branch · siblings of grandmother Zhenia', 'Боковая ветвь Каландия · братья и сёстры бабушки Жени'],
    wLuk: ['ლუკავების გვერდითი შტო', 'Lukava collateral branch', 'Боковая ветвь Лукава']
  };
  let lang = 'ka';
  try { const s = localStorage.getItem('atlas-lang'); if (LANGS.includes(s)) lang = s; } catch (e) {}
  const li = () => LANGS.indexOf(lang);
  const tr = k => Array.isArray(T[k]) ? T[k][li()] : T[k];
  const dash = s => s.split(' ' + EM + ' ').join(' ' + EN + ' ');

  function badgeText(s) {
    s = dash(s);
    if (lang === 'ka') return s;
    const map = lang === 'en'
      ? [['საგვარეულო ხის ავტორი', 'Author of the family tree'], ['დაბ.:', 'b.'], ['წელი:', 'year:'], ['სოხუმი', 'Sukhumi'], ['ნოემბერი', 'November'], [' წ.', ''], [' ს.', ' c.']]
      : [['საგვარეულო ხის ავტორი', 'Автор родословного древа'], ['დაბ.:', 'род.'], ['წელი:', 'год:'], ['სოხუმი', 'Сухуми'], ['ნოემბერი', 'ноября'], [' წ.', ' г.'], [' ს.', ' в.']];
    map.forEach(([a, b]) => { s = s.split(a).join(b); });
    return s;
  }

  /* ---------------- kinship graph ---------------- */
  const PARENTS = {
    temo: ['vazha', 'leila'], irakli: ['vazha', 'leila'],
    vazha: ['nestor', 'minusha'], sharden: ['nestor', 'minusha'], zhora: ['nestor', 'minusha'], ilya: ['nestor', 'minusha'], venera: ['nestor', 'minusha'], inessa: ['nestor', 'minusha'],
    leila: ['orest', 'zhenia'], revaz: ['orest', 'zhenia'],
    zhenia: ['mikha', 'evdokia'], shalva: ['mikha', 'evdokia'], otar: ['mikha', 'evdokia'], nina: ['mikha', 'evdokia'], nadezhda: ['mikha', 'evdokia'],
    mikha: ['bachu', 'keso'], ana: ['bachu', 'keso'], tatusha: ['bachu', 'keso'], konstantine: ['bachu', 'keso'], estate: ['bachu', 'keso'],
    evdokia: ['pavel', 'salome'], 'lukava-sisters': ['pavel', 'salome'],
    bachu: ['bitu'],
    'child-leila': ['irakli', 'keti'], 'child-vazha': ['irakli', 'keti'], 'child-giorgi': ['irakli', 'keti'],
    abessalom: ['inessa'], lekso: ['inessa'], data: ['inessa'], 'anzor-bacho': ['inessa'],
    eliso: ['zhora'], 'nana-benidze': ['zhora'], khatuna: ['zhora'], paata: ['zhora'],
    'mzia-djidjilava': ['venera'], 'ioseb-djidjilava': ['venera'],
    'nino-papava': ['revaz'], 'zhenia-papava': ['revaz'],
    aldona: ['shalva'], medea: ['shalva'], 'giya-kalandia': ['shalva'], nanuli: ['nadezhda'],
    'maiko-bodjgua': ['otar'], 'dodo-bodjgua': ['otar'], 'vakhtang-bodjgua': ['otar'],
    'nona-natsivlishvili': ['nina'], 'nika-natsivlishvili': ['nona-natsivlishvili'],
    'irakli-medea': ['medea'], 'levan-medea': ['medea'], 'giorgi-giya': ['giya-kalandia']
  };
  const COUPLES = [['irakli', 'keti'], ['vazha', 'leila'], ['nestor', 'minusha'], ['orest', 'zhenia'], ['mikha', 'evdokia'], ['bachu', 'keso'], ['pavel', 'salome']];
  const has = id => !!BIO[id];
  const parentsOf = id => (PARENTS[id] || []).filter(has);
  const childrenOf = id => Object.keys(PARENTS).filter(c => has(c) && PARENTS[c].includes(id));
  const spouseOf = id => { const c = COUPLES.find(c => c.includes(id)); return c ? c.find(x => x !== id) : null; };
  const siblingsOf = id => { const p = PARENTS[id]; return p ? Object.keys(PARENTS).filter(c => c !== id && has(c) && PARENTS[c][0] === p[0]) : []; };
  function ancestors(id, acc) { acc = acc || new Set(); parentsOf(id).forEach(p => { if (!acc.has(p)) { acc.add(p); ancestors(p, acc); } }); return acc; }
  const PROTO_ANC = ancestors(PROTO);
  function chainTo(a, from) {
    from = from || PROTO;
    if (from === a) return [from];
    for (const p of parentsOf(from)) { const c = chainTo(a, p); if (c) return [from].concat(c); }
    return null;
  }
  function linkOf(id) {
    if (id === PROTO || PROTO_ANC.has(id)) return id;
    if (id === 'keti' && V === 'irakli') return 'irakli';
    return parentsOf(id).find(p => PROTO_ANC.has(p) || p === PROTO) || null;
  }
  function lineageSet(id) {
    const s = ancestors(id); s.add(id);
    const link = linkOf(id);
    if (link) (chainTo(link) || []).forEach(x => s.add(x));
    if (id === 'keti') s.add('irakli');
    if (V === 'irakli' && s.has('irakli') && !id.startsWith('child-')) childrenOf('irakli').forEach(c => s.add(c));
    return s;
  }

  /* ---------------- layout ---------------- */
  const Y0 = V === 'temo' ? 480 : 680;
  const yI = Y0 + 120, PITCH = 420;
  const R = n => yI + (n - 1) * PITCH;
  const MZ = n => R(n) + 355;
  const BUS = n => R(n) - 36;
  const UY = n => R(n) + 62;
  const N = [];
  const add = (id, cx, y, w, anchor, kind, gen, extra) => N.push(Object.assign({ id, cx, y, w, anchor, kind, gen }, extra || {}));

  if (V === 'temo') {
    add('temo', 0, Y0, 580, 'bottom', 'direct', 0, { hero: 'photo' });
    add('irakli', 455, Y0, 230, 'bottom', 'direct', 0.4);
    add('keti', 735, Y0, 230, 'bottom', 'kin', 0.6);
    // Zhora's children (paternal first cousins, Gen 0 on far left):
    add('eliso', -1880, Y0, 155, 'bottom', 'collateral', 0.3);
    add('nana-benidze', -1715, Y0, 155, 'bottom', 'collateral', 0.4);
    add('khatuna', -1550, Y0, 155, 'bottom', 'collateral', 0.5);
    add('paata', -1385, Y0, 155, 'bottom', 'collateral', 0.6);
    // Venera's children (paternal first cousins):
    add('mzia-djidjilava', -1220, Y0, 155, 'bottom', 'collateral', 0.5);
    add('ioseb-djidjilava', -1055, Y0, 155, 'bottom', 'collateral', 0.6);
    // Inessa's sons (paternal first cousins, Gen 0 on left):
    add('abessalom', -890, Y0, 155, 'bottom', 'collateral', 0.5);
    add('lekso', -725, Y0, 155, 'bottom', 'collateral', 0.6);
    add('data', -560, Y0, 155, 'bottom', 'collateral', 0.7);
    add('anzor-bacho', -395, Y0, 155, 'bottom', 'collateral', 0.8);
    // Revaz's daughters (maternal first cousins, Gen 0 on right):
    add('nino-papava', 980, Y0, 190, 'bottom', 'collateral', 0.5);
    add('zhenia-papava', 1195, Y0, 190, 'bottom', 'collateral', 0.6);
    // Medea's & Giya's sons (Gen 0 on far right):
    add('irakli-medea', 1410, Y0, 160, 'bottom', 'collateral', 0.7);
    add('levan-medea', 1590, Y0, 160, 'bottom', 'collateral', 0.8);
    add('giorgi-giya', 1770, Y0, 170, 'bottom', 'collateral', 0.9);
    add('nika-natsivlishvili', 2270, Y0, 155, 'bottom', 'collateral', 0.9);
  } else {
    add('child-leila', -225, 170, 200, 'bottom', 'kin', 0, { child: 1 });
    add('child-vazha', 0, 170, 200, 'bottom', 'kin', 0.1, { child: 1 });
    add('child-giorgi', 225, 170, 200, 'bottom', 'kin', 0.2, { child: 1 });
    add('irakli', -190, Y0, 310, 'bottom', 'direct', 0.5, { hero: 'portrait' });
    add('keti', 165, Y0, 260, 'bottom', 'kin', 0.7);
    add('temo', -560, Y0, 240, 'bottom', 'direct', 0.8);
    // Zhora's children:
    add('eliso', -2275, Y0, 155, 'bottom', 'collateral', 0.3);
    add('nana-benidze', -2110, Y0, 155, 'bottom', 'collateral', 0.4);
    add('khatuna', -1945, Y0, 155, 'bottom', 'collateral', 0.5);
    add('paata', -1780, Y0, 155, 'bottom', 'collateral', 0.6);
    // Venera's children:
    add('mzia-djidjilava', -1615, Y0, 155, 'bottom', 'collateral', 0.5);
    add('ioseb-djidjilava', -1450, Y0, 155, 'bottom', 'collateral', 0.6);
    // Inessa's sons (paternal first cousins, Gen 0 on left):
    add('abessalom', -1285, Y0, 155, 'bottom', 'collateral', 0.5);
    add('lekso', -1120, Y0, 155, 'bottom', 'collateral', 0.6);
    add('data', -955, Y0, 155, 'bottom', 'collateral', 0.7);
    add('anzor-bacho', -790, Y0, 155, 'bottom', 'collateral', 0.8);
    // Revaz's daughters:
    add('nino-papava', 430, Y0, 190, 'bottom', 'collateral', 0.5);
    add('zhenia-papava', 645, Y0, 190, 'bottom', 'collateral', 0.6);
    // Medea's & Giya's sons:
    add('irakli-medea', 860, Y0, 160, 'bottom', 'collateral', 0.7);
    add('levan-medea', 1040, Y0, 160, 'bottom', 'collateral', 0.8);
    add('giorgi-giya', 1220, Y0, 170, 'bottom', 'collateral', 0.9);
    add('nika-natsivlishvili', 2270, Y0, 155, 'bottom', 'collateral', 0.9);
  }
  add('vazha', -170, R(1), 250, 'top', 'direct', 1.4); add('leila', 170, R(1), 250, 'top', 'direct', 1.5);
  add('nestor', -870, R(2), 250, 'top', 'direct', 2.4); add('minusha', -530, R(2), 250, 'top', 'direct', 2.5);
  add('orest', 530, R(2), 250, 'top', 'direct', 2.4); add('zhenia', 870, R(2), 250, 'top', 'direct', 2.5);
  ['sharden', 'zhora', 'ilya', 'venera', 'inessa'].forEach((id, i) => add(id, -1584 + i * 206, MZ(1), 190, 'bottom', 'collateral', 3 + i * 0.08));
  add('revaz', 1100, MZ(1), 200, 'bottom', 'collateral', 3);
  add('aldona', 1280, MZ(1), 155, 'bottom', 'collateral', 3.1);
  add('medea', 1445, MZ(1), 155, 'bottom', 'collateral', 3.2);
  add('giya-kalandia', 1610, MZ(1), 155, 'bottom', 'collateral', 3.3);
  add('maiko-bodjgua', 1775, MZ(1), 155, 'bottom', 'collateral', 3.4);
  add('dodo-bodjgua', 1940, MZ(1), 155, 'bottom', 'collateral', 3.5);
  add('vakhtang-bodjgua', 2105, MZ(1), 155, 'bottom', 'collateral', 3.6);
  add('nona-natsivlishvili', 2270, MZ(1), 155, 'bottom', 'collateral', 3.7);
  add('nanuli', 2435, MZ(1), 155, 'bottom', 'collateral', 3.8);
  add('mikha', 700, R(3), 250, 'top', 'direct', 3.6); add('evdokia', 1040, R(3), 250, 'top', 'direct', 3.7);
  add('shalva', 1445, MZ(2), 190, 'bottom', 'collateral', 4.2);
  add('otar', 1940, MZ(2), 190, 'bottom', 'collateral', 4.3);
  add('nina', 2270, MZ(2), 170, 'bottom', 'collateral', 4.4);
  add('nadezhda', 2435, MZ(2), 170, 'bottom', 'collateral', 4.5);
  add('bachu', 330, R(4), 250, 'top', 'direct', 4.8); add('keso', 670, R(4), 250, 'top', 'direct', 4.9);
  add('pavel', 1070, R(4), 250, 'top', 'direct', 4.8); add('salome', 1410, R(4), 250, 'top', 'direct', 4.9);
  ['ana', 'tatusha', 'konstantine', 'estate'].forEach((id, i) => add(id, -328 + i * 206, MZ(3), 190, 'bottom', 'collateral', 5.4 + i * 0.08));
  add('lukava-sisters', 1650, MZ(3), 240, 'bottom', 'collateral', 5.4);
  add('bitu', 330, R(5), 250, 'top', 'direct', 6);
  const NODE = {}; N.forEach(n => NODE[n.id] = n);

  const WINGS = [
    { key: 'wBen', ids: ['sharden', 'zhora', 'ilya', 'venera', 'inessa'] },
    { key: 'wPap', ids: ['revaz', 'aldona', 'medea', 'giya-kalandia', 'maiko-bodjgua', 'dodo-bodjgua', 'vakhtang-bodjgua', 'nona-natsivlishvili', 'nanuli'] },
    { key: 'wKal', ids: ['shalva', 'otar', 'nina', 'nadezhda'] },
    { key: 'wMik', ids: ['ana', 'tatusha', 'konstantine', 'estate'] },
    { key: 'wLuk', ids: ['lukava-sisters'] }
  ];
  const BOUNDS = { x0: V === 'temo' ? -2150 : -2500, x1: 2620, y0: V === 'temo' ? -60 : -30, y1: R(5) + 470 };
  const HOME = V === 'temo' ? { x0: -1250, x1: 1450, y0: -200, y1: R(1) + 200 } : { x0: -1400, x1: 1350, y0: -190, y1: R(1) + 190 };
  const GENS = [
    ['', 'g0', Y0 - 190], ['I', 'g1', R(1) + 70], ['II', 'g2', R(2) + 70], ['III', 'g3', R(3) + 70], ['IV', 'g4', R(4) + 70], ['V', 'g5', R(5) + 70]
  ];

  /* ---------------- DOM ---------------- */
  const viewport = $('#viewport'), world = $('#world'), svg = $('#edges');
  document.body.dataset.lang = lang;
  document.body.classList.add('v-' + V);

  N.forEach(n => {
    const b = BIO[n.id], m = META[n.id];
    const node = el('div', 'node a-' + n.anchor + ' k-' + n.kind);
    node.dataset.id = n.id;
    node.style.left = n.cx + 'px'; node.style.top = n.y + 'px'; node.style.setProperty('--w', n.w + 'px');
    const anchor = el('div', 'anchor');
    const card = el('div', 'card ' + (n.kind === 'kin' ? '' : n.kind) + ' ' + m[2] + (n.hero ? ' hero ' + n.hero : '') + (n.child ? ' child' : ''));
    card.tabIndex = 0; card.setAttribute('role', 'button');
    card.style.setProperty('--d', Math.round(n.gen * 170) + 'ms');
    let media = '';
    if (n.hero === 'photo') media = '<div class="photo"><img src="temo_clean.jpg" alt="" draggable="false"></div>';
    if (n.hero === 'portrait') media = '<div class="frame"><svg width="46" height="46" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.1" stroke-linecap="round"><circle cx="12" cy="8" r="4"/><path d="M4.5 21a7.5 7.5 0 0 1 15 0"/></svg><span>ადგილი ირაკლის ფოტოსთვის</span><img src="irakli.jpg" alt="" draggable="false" onerror="this.remove()"></div>';
    card.innerHTML = media + '<div class="role"></div><div class="nm"></div><div class="sub"></div><div class="badge' + (b.unk ? ' unk' : '') + '"></div>';
    anchor.appendChild(card); node.appendChild(anchor); world.appendChild(node);
    n.el = node; n.card = card;
  });

  const wingEls = WINGS.map(() => { const e = el('div', 'wing'); world.appendChild(e); return e; });

  const quote = el('div', 'legend-quote');
  quote.style.left = '-1660px'; quote.style.top = (R(3) + 30) + 'px';
  quote.innerHTML = '<div class="eyebrow">საგვარეულო გადმოცემა · ნონა ბიცოლას (ნორა ცერცვაძის) ნაამბობით</div><blockquote>მიხა კალანდიას თქმით, გვარის თავდაპირველი ფორმა იყო <strong>კალანდაძე</strong> (წარმოშობით გურიიდან). კონფლიქტის გამო წინაპრები სამეგრელოში (ზუგდიდი / წალენჯიხა) გადასახლდნენ და გვარი კალანდიად დაიწერეს.</blockquote>';
  world.appendChild(quote);

  const colophon = el('div', 'colophon');
  colophon.style.left = '330px'; colophon.style.top = (R(5) + 250) + 'px';
  colophon.innerHTML = '<div class="mark"></div><p>' + (V === 'temo'
    ? 'საგვარეულო გენეალოგიური ხე შედგენილია საოჯახო გადმოცემებისა და საარქივო ცნობების მიხედვით.'
    : 'საგვარეულო გენეალოგიური ხე შედგენილია ირაკლი ვაჟას ძე ბენიძის დაბადების დღის (13 ნოემბერი) საჩუქრად.')
    + '</p><p class="houses">ბენიძე · აგუმავა · პაპავა · კალანდია (კალანდაძე) · ლუკავა · კაკაჩია · ქუხილავა</p>';
  world.appendChild(colophon);

  const rail = $('#rail');
  const genEls = GENS.map(g => {
    const e = el('div', 'gen', '<b>' + g[0] + '</b><span></span>');
    e.addEventListener('click', () => flyRect({ x0: -1100, x1: 1500, y0: g[2] - 330, y1: g[2] + 330 }));
    rail.appendChild(e); return e;
  });

  const LIGHT_LABELS = {
    sunset: ['☀️ ჩასვლა', '☀️ Sunset', '☀️ Закат'],
    opal: ['💎 ოპალი', '💎 Opal', '💎 Опал'],
    promenade: ['🏮 ჩირაღდნები', '🏮 Promenade', '🏮 Огни']
  };

  function paintText() {
    const i = li();
    N.forEach(n => {
      const b = BIO[n.id], m = META[n.id], c = n.card;
      $('.role', c).textContent = ROLE[m[3]][i];
      $('.nm', c).textContent = i === 0 ? b.geo : m[i - 1];
      $('.sub', c).textContent = i === 0 ? m[0] : b.geo;
      $('.badge', c).textContent = badgeText(b.date);
    });
    document.querySelectorAll('[data-t]').forEach(e => { e.textContent = tr(e.dataset.t); });
    genEls.forEach((e, k) => { $('span', e).textContent = tr(GENS[k][1]); });
    wingEls.forEach((e, k) => { e.textContent = tr(WINGS[k].key); });
    document.querySelectorAll('#lang button').forEach(b => b.classList.toggle('on', b.dataset.lang === lang));
    document.querySelectorAll('#light-switcher button').forEach(b => {
      const k = b.dataset.light;
      if (LIGHT_LABELS[k]) b.textContent = LIGHT_LABELS[k][i];
    });
    document.documentElement.lang = lang;
    document.title = tr('title');
  }

  /* ---------------- edges ---------------- */
  const box = id => { const n = NODE[id], h = n.card.offsetHeight; const top = n.anchor === 'top' ? n.y : n.y - h; return { cx: n.cx, l: n.cx - n.w / 2, r: n.cx + n.w / 2, top, bottom: top + h }; };
  function rpath(p, r) {
    let d = 'M' + p[0][0] + ' ' + p[0][1];
    for (let i = 1; i < p.length - 1; i++) {
      const a = p[i - 1], b = p[i], c = p[i + 1];
      const l1 = Math.hypot(b[0] - a[0], b[1] - a[1]), l2 = Math.hypot(c[0] - b[0], c[1] - b[1]);
      const q = Math.min(r, l1 / 2, l2 / 2);
      if (q < 1) { d += ' L' + b[0] + ' ' + b[1]; continue; }
      const p1 = [b[0] - (b[0] - a[0]) / l1 * q, b[1] - (b[1] - a[1]) / l1 * q];
      const p2 = [b[0] + (c[0] - b[0]) / l2 * q, b[1] + (c[1] - b[1]) / l2 * q];
      d += ' L' + p1[0] + ' ' + p1[1] + ' Q' + b[0] + ' ' + b[1] + ' ' + p2[0] + ' ' + p2[1];
    }
    const z = p[p.length - 1];
    return d + ' L' + z[0] + ' ' + z[1];
  }
  let EDGES = [];
  function mk(tag, cls, attrs, delay, ids, mode) {
    const e = document.createElementNS(SVGNS, tag);
    e.setAttribute('class', cls);
    for (const k in attrs) e.setAttribute(k, attrs[k]);
    if (tag === 'path') e.setAttribute('pathLength', '1');
    e.style.transitionDelay = Math.round(delay) + 'ms';
    svg.appendChild(e);
    EDGES.push({ e, ids, mode });
    return e;
  }
  function buildEdges() {
    svg.innerHTML = ''; EDGES = [];
    const U = {};
    const unionRows = { 'vazha': 1, 'nestor': 2, 'orest': 2, 'mikha': 3, 'bachu': 4, 'pavel': 4 };
    const house = {
      'irakli': 'main', 'vazha': 'main', 'nestor': 'paternal', 'sharden': 'paternal', 'zhora': 'paternal', 'ilya': 'paternal', 'venera': 'paternal', 'inessa': 'paternal',
      'abessalom': 'paternal', 'lekso': 'paternal', 'data': 'paternal', 'anzor-bacho': 'paternal',
      'eliso': 'paternal', 'nana-benidze': 'paternal', 'khatuna': 'paternal', 'paata': 'paternal',
      'mzia-djidjilava': 'paternal', 'ioseb-djidjilava': 'paternal',
      'orest': 'main', 'revaz': 'main', 'zhenia': 'kalandia', 'shalva': 'kalandia', 'otar': 'kalandia', 'nina': 'kalandia', 'nadezhda': 'kalandia',
      'aldona': 'kalandia', 'medea': 'kalandia', 'giya-kalandia': 'kalandia', 'nanuli': 'kalandia',
      'maiko-bodjgua': 'kalandia', 'dodo-bodjgua': 'kalandia', 'vakhtang-bodjgua': 'kalandia',
      'nona-natsivlishvili': 'kalandia', 'nika-natsivlishvili': 'kalandia',
      'nino-papava': 'main', 'zhenia-papava': 'main',
      'irakli-medea': 'kalandia', 'levan-medea': 'kalandia', 'giorgi-giya': 'kalandia',
      'mikha': 'main', 'bachu': 'kalandia', 'pavel': 'lukava'
    };
    COUPLES.forEach(([a, b]) => {
      if (!has(a) || !has(b)) return;
      const A = box(a), B = box(b);
      const y = unionRows[a] ? UY(unionRows[a]) : Y0 - (V === 'temo' ? 66 : 72);
      const x = (A.r + B.l) / 2, g = NODE[a].gen;
      mk('path', 'edge union h-' + house[a], { d: 'M' + A.r + ' ' + y + ' L' + B.l + ' ' + y }, g * 170 + 250, [a, b], 'all');
      mk('circle', 'ring h-' + house[a], { cx: x, cy: y, r: 5.5 }, g * 170 + 500, [a, b], 'all');
      U[a] = { x, y, bus: unionRows[a] ? BUS(unionRows[a]) : 232 };
    });
    const childHouse = { vazha: 'paternal', mikha: 'kalandia', evdokia: 'lukava' };
    Object.keys(PARENTS).forEach(c => {
      if (!has(c)) return;
      const p = PARENTS[c], C = box(c), n = NODE[c];
      if (p.length === 1) {
        const Pb = box(p[0]);
        const side = n.kind === 'collateral';
        const hs = childHouse[c] || (side ? (house[p[0]] || 'kalandia') : 'main');
        if (Math.abs(C.cx - Pb.cx) < 2) {
          mk('path', 'edge h-' + hs + (side ? ' side' : ''), { d: 'M' + C.cx + ' ' + C.bottom + ' L' + Pb.cx + ' ' + Pb.top }, n.gen * 170 + 500, [c, p[0]], 'all');
        } else {
          const midY = (C.bottom + Pb.top) / 2;
          const pts = [[C.cx, C.bottom], [C.cx, midY], [Pb.cx, midY], [Pb.cx, Pb.top]];
          mk('path', 'edge h-' + hs + (side ? ' side' : ''), { d: rpath(pts, 18) }, n.gen * 170 + 500, [c, p[0]], 'all');
        }
        return;
      }
      const u = U[p[0]];
      const side = n.kind === 'collateral';
      const hs = childHouse[c] || (side ? house[p[0]] : 'main');
      const pts = Math.abs(C.cx - u.x) < 1 ? [[C.cx, C.bottom], [u.x, u.y - 6]] : [[C.cx, C.bottom], [C.cx, u.bus], [u.x, u.bus], [u.x, u.y - 6]];
      mk('path', 'edge h-' + hs + (side ? ' side' : ''), { d: rpath(pts, 18) }, n.gen * 170 + 450, [c, p[0], p[1]], 'child');
    });
    WINGS.forEach((w, k) => {
      const bs = w.ids.map(box);
      wingEls[k].style.left = (bs.reduce((s, b) => s + b.cx, 0) / bs.length) + 'px';
      wingEls[k].style.top = (Math.min.apply(null, bs.map(b => b.top)) - 34) + 'px';
    });
    paintFocus();
  }

  /* ---------------- focus / lineage ---------------- */
  let selected = null, hovered = null;
  function paintFocus() {
    const id = hovered || selected;
    document.body.classList.toggle('has-focus', !!id);
    const s = id ? lineageSet(id) : null;
    N.forEach(n => { n.el.classList.toggle('lit', !!s && s.has(n.id)); n.el.classList.toggle('sel', n.id === selected); });
    EDGES.forEach(x => {
      let lit = false;
      if (s) lit = x.mode === 'all' ? x.ids.every(i => s.has(i)) : s.has(x.ids[0]) && (s.has(x.ids[1]) || s.has(x.ids[2]));
      x.e.classList.toggle('lit', lit);
    });
  }

  /* ---------------- dossier ---------------- */
  const dScroll = $('#drawer .scroll');
  const chip = id => '<button class="chip" data-go="' + id + '">' + BIO[id].geo + '</button>';
  function openDossier(id) {
    const b = BIO[id], m = META[id];
    let i = 0; const st = () => ' style="--i:' + (i++) + '"';
    let h = '<div class="d-in">';
    if (id === 'temo' && V === 'temo') h += '<div class="d-photo"' + st() + '><img src="temo_clean.jpg" alt=""></div>';
    h += '<div class="d-role"' + st() + '>' + ROLE[m[3]][0] + '</div>';
    h += '<h3 class="d-name"' + st() + '>' + b.title + '</h3>';
    h += '<div class="d-alt"' + st() + '>' + m[0] + ' · ' + m[1] + '</div>';
    h += '<div class="d-badge"' + st() + '><span class="badge' + (b.unk ? ' unk' : '') + '">' + dash(b.date) + '</span></div>';
    h += '<div class="d-rule"' + st() + '></div>';
    b.rows.forEach(r => {
      const mm = r.match(/^<span class="tt-label">(.*?)<\/span>\s*([\s\S]*)$/);
      if (mm && mm[2].indexOf('tt-label') < 0) {
        const story = /გადმოცემა|საინტერესო|ბიოგრაფია|ალდონა|წარმოშობა/.test(mm[1]);
        h += '<div class="d-row' + (story ? ' story' : '') + '"' + st() + '><span class="lbl">' + mm[1].replace(/:\s*$/, '') + '</span>' + mm[2] + '</div>';
      } else h += '<div class="d-row"' + st() + '>' + r + '</div>';
    });
    const sp = spouseOf(id);
    const kin = [['მშობლები', parentsOf(id)], ['მეუღლე', sp && has(sp) ? [sp] : []], ['შვილები', childrenOf(id)], ['და-ძმები', siblingsOf(id)]].filter(k => k[1].length);
    const link = linkOf(id);
    const chain = link && id !== PROTO ? (chainTo(link) || []).concat(link === id ? [] : [id]) : [];
    if (kin.length || chain.length > 1) {
      h += '<div class="d-kin"' + st() + '>';
      if (chain.length > 1) h += '<h4>ნათესაური ხაზი</h4><div class="d-line">' + chain.map(chip).join('<span class="arrow">→</span>') + '</div>';
      kin.forEach(k => { h += '<h4>' + k[0] + '</h4><div class="chips">' + k[1].map(chip).join('') + '</div>'; });
      h += '</div>';
    }
    dScroll.innerHTML = h + '</div>';
    dScroll.scrollTop = 0;
    document.body.classList.add('has-drawer', 'used');
  }
  function select(id, flyTo) {
    selected = id; hovered = null; paintFocus();
    if (!id) { document.body.classList.remove('has-drawer'); return; }
    openDossier(id);
    if (flyTo !== false) centerOn(id);
  }
  dScroll.addEventListener('click', e => { const c = e.target.closest('[data-go]'); if (c) select(c.dataset.go); });
  $('#drawer .close').addEventListener('click', () => select(null));

  /* ---------------- camera ---------------- */
  const cam = { x: 0, y: 0, k: 1 };
  const KMIN = 0.14, KMAX = 2.2;
  const zoomOut = $('#zoom output');
  let raf = 0, railRaf = 0;
  const drawerOpen = () => document.body.classList.contains('has-drawer') && innerWidth > 860;
  const availW = () => innerWidth - (drawerOpen() ? 468 : 0);
  function apply() {
    world.style.transform = 'translate(' + cam.x + 'px,' + cam.y + 'px) scale(' + cam.k + ')';
    zoomOut.textContent = Math.round(cam.k * 100) + '%';
    if (!railRaf) railRaf = requestAnimationFrame(() => {
      railRaf = 0;
      genEls.forEach((e, i) => {
        const y = cam.y + GENS[i][2] * cam.k;
        const off = y < 190 || y > innerHeight - 250;
        e.style.transform = 'translateY(' + (y - 14) + 'px)';
        e.style.opacity = off ? 0 : 1;
        e.style.pointerEvents = off ? 'none' : '';
      });
    });
  }
  function rectCam(r, pad) {
    const w = availW(), h = innerHeight; pad = pad == null ? 70 : pad;
    const k = Math.max(KMIN, Math.min(KMAX, Math.min((w - pad * 2) / (r.x1 - r.x0), (h - pad * 2) / (r.y1 - r.y0))));
    return { k, x: w / 2 - (r.x0 + r.x1) / 2 * k, y: h / 2 - (r.y0 + r.y1) / 2 * k };
  }
  function fly(to, dur) {
    cancelAnimationFrame(raf);
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) dur = 0;
    const w = availW(), h = innerHeight;
    const f = { k: cam.k, cx: (w / 2 - cam.x) / cam.k, cy: (h / 2 - cam.y) / cam.k };
    const t = { k: to.k, cx: (w / 2 - to.x) / to.k, cy: (h / 2 - to.y) / to.k };
    const t0 = performance.now(); dur = dur == null ? 1100 : dur;
    const ease = x => x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
    (function step(now) {
      const p = dur ? Math.min(1, (now - t0) / dur) : 1, e = ease(p);
      cam.k = Math.exp(Math.log(f.k) + (Math.log(t.k) - Math.log(f.k)) * e);
      cam.x = w / 2 - (f.cx + (t.cx - f.cx) * e) * cam.k;
      cam.y = h / 2 - (f.cy + (t.cy - f.cy) * e) * cam.k;
      apply();
      if (p < 1) raf = requestAnimationFrame(step);
    })(t0);
  }
  const flyRect = (r, dur, pad) => fly(rectCam(r, pad), dur);
  function centerOn(id) {
    requestAnimationFrame(() => {
      const b = box(id), k = Math.min(1.05, Math.max(cam.k, 0.82));
      const cy = innerWidth <= 860 ? innerHeight * 0.13 : innerHeight / 2;
      fly({ k, x: availW() / 2 - b.cx * k, y: cy - (b.top + b.bottom) / 2 * k }, 1000);
    });
  }
  function zoomAt(px, py, f) {
    cancelAnimationFrame(raf);
    const k = Math.max(KMIN, Math.min(KMAX, cam.k * f)), r = k / cam.k;
    cam.x = px - (px - cam.x) * r; cam.y = py - (py - cam.y) * r; cam.k = k; apply();
  }
  function zoomStep(f) {
    const w = availW() / 2, h = innerHeight / 2, k = Math.max(KMIN, Math.min(KMAX, cam.k * f)), r = k / cam.k;
    fly({ k, x: w - (w - cam.x) * r, y: h - (h - cam.y) * r }, 450);
  }

  /* pointer: drag to pan, pinch to zoom, tap to open */
  const ptrs = new Map(); let moved = 0, downCard = null, pinch0 = 0, touched = false;
  viewport.addEventListener('pointerdown', e => {
    if (e.button > 0) return;
    touched = true; cancelAnimationFrame(raf);
    ptrs.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (ptrs.size === 1) { moved = 0; downCard = e.target.closest('.card'); }
    if (ptrs.size === 2) { const a = Array.from(ptrs.values()); pinch0 = Math.hypot(a[0].x - a[1].x, a[0].y - a[1].y); }
    viewport.setPointerCapture(e.pointerId);
  });
  viewport.addEventListener('pointermove', e => {
    const p = ptrs.get(e.pointerId); if (!p) return;
    const dx = e.clientX - p.x, dy = e.clientY - p.y;
    p.x = e.clientX; p.y = e.clientY;
    if (ptrs.size === 1) {
      moved += Math.abs(dx) + Math.abs(dy);
      if (moved > 6) { viewport.classList.add('dragging'); document.body.classList.add('used'); cam.x += dx; cam.y += dy; apply(); }
    } else if (ptrs.size === 2) {
      const a = Array.from(ptrs.values()), d = Math.hypot(a[0].x - a[1].x, a[0].y - a[1].y);
      if (pinch0) zoomAt((a[0].x + a[1].x) / 2, (a[0].y + a[1].y) / 2, d / pinch0);
      pinch0 = d; moved = 99;
    }
  });
  const up = e => {
    if (!ptrs.has(e.pointerId)) return;
    ptrs.delete(e.pointerId); viewport.classList.remove('dragging');
    if (ptrs.size === 0 && moved <= 6 && e.type === 'pointerup') {
      if (downCard) select(downCard.closest('.node').dataset.id);
      else if (selected) select(null);
    }
  };
  viewport.addEventListener('pointerup', up); viewport.addEventListener('pointercancel', up);
  viewport.addEventListener('wheel', e => {
    e.preventDefault(); touched = true; document.body.classList.add('used');
    if (e.ctrlKey || e.metaKey) zoomAt(e.clientX, e.clientY, Math.exp(-e.deltaY * 0.012));
    else { cancelAnimationFrame(raf); cam.x -= e.deltaX; cam.y -= e.deltaY; apply(); }
  }, { passive: false });
  viewport.addEventListener('dblclick', e => {
    if (e.target.closest('.card')) return;
    const k = Math.min(KMAX, cam.k * 1.6), r = k / cam.k;
    fly({ k, x: e.clientX - (e.clientX - cam.x) * r, y: e.clientY - (e.clientY - cam.y) * r }, 500);
  });

  let hoverT = 0;
  N.forEach(n => {
    n.card.addEventListener('mouseenter', () => { clearTimeout(hoverT); hoverT = setTimeout(() => { if (!ptrs.size) { hovered = n.id; paintFocus(); } }, 90); });
    n.card.addEventListener('mouseleave', () => { clearTimeout(hoverT); hoverT = setTimeout(() => { hovered = null; paintFocus(); }, 60); });
    n.card.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); select(n.id); } });
  });

  /* chrome */
  $('#lang').addEventListener('click', e => {
    const b = e.target.closest('button'); if (!b) return;
    lang = b.dataset.lang; document.body.dataset.lang = lang;
    try { localStorage.setItem('atlas-lang', lang); } catch (err) {}
    paintText(); requestAnimationFrame(buildEdgesInstant);
  });
  $('#btn-direct').addEventListener('click', e => { const on = document.body.classList.toggle('direct-only'); e.currentTarget.classList.toggle('on', on); });
  $('#z-in').addEventListener('click', () => zoomStep(1.35));
  $('#z-out').addEventListener('click', () => zoomStep(1 / 1.35));
  $('#z-fit').addEventListener('click', () => flyRect(BOUNDS));
  $('#z-home').addEventListener('click', () => flyRect(HOME));
  addEventListener('keydown', e => {
    if (e.key === 'Escape') select(null);
    else if (e.key === '+' || e.key === '=') zoomStep(1.35);
    else if (e.key === '-') zoomStep(1 / 1.35);
    else if (e.key === '0') flyRect(BOUNDS);
    else if (e.key.startsWith('Arrow') && !(e.target.closest && e.target.closest('.card'))) {
      const d = { ArrowLeft: [90, 0], ArrowRight: [-90, 0], ArrowUp: [0, 90], ArrowDown: [0, -90] }[e.key];
      fly({ k: cam.k, x: cam.x + d[0], y: cam.y + d[1] }, 220);
    }
  });
  addEventListener('resize', apply);
  function buildEdgesInstant() {
    buildEdges();
    svg.querySelectorAll('.edge,.ring').forEach(e => { e.style.transitionDelay = '0ms'; });
  }

  /* ---------------- boot ---------------- */
  paintText();
  Object.assign(cam, rectCam(BOUNDS, 40)); apply();
  const fontsReady = (document.fonts && document.fonts.ready) ? Promise.race([document.fonts.ready, new Promise(r => setTimeout(r, 1800))]) : Promise.resolve();
  const curtain = $('#curtain');
  const quick = /[?&]nointro/.test(location.search) || matchMedia('(prefers-reduced-motion: reduce)').matches;
  let started = false;
  function start() {
    if (started) return; started = true;
    buildEdges();
    curtain.classList.add('gone');
    requestAnimationFrame(() => requestAnimationFrame(() => document.body.classList.add('revealed')));
    setTimeout(() => { if (!touched && !selected) flyRect(HOME, 2200); }, quick ? 0 : 3000);
    setTimeout(() => { document.body.classList.add('settled'); buildEdgesInstant(); }, quick ? 300 : 5200);
  }
  fontsReady.then(() => { setTimeout(start, quick ? 0 : 2300); });
  curtain.addEventListener('click', () => fontsReady.then(start));
  const heroImg = $('.hero .photo img');
  if (heroImg && !heroImg.complete) heroImg.addEventListener('load', () => { if (started) buildEdgesInstant(); });

  /* Light mode switcher (sunset | opal | promenade) */
  let lightMode = 'sunset';
  try {
    const savedLight = localStorage.getItem('atlas-light');
    if (['sunset', 'opal', 'promenade'].includes(savedLight)) lightMode = savedLight;
  } catch (e) {}
  document.body.dataset.light = lightMode;

  function setLightMode(m) {
    lightMode = m;
    document.body.dataset.light = m;
    try { localStorage.setItem('atlas-light', m); } catch (e) {}
    document.querySelectorAll('#light-switcher button').forEach(b => {
      b.classList.toggle('on', b.dataset.light === m);
    });
  }
  setLightMode(lightMode);

  const lightSwitcher = $('#light-switcher');
  if (lightSwitcher) {
    lightSwitcher.addEventListener('click', e => {
      const b = e.target.closest('button[data-light]');
      if (b) setLightMode(b.dataset.light);
    });
  }

  /* Interactive specular glint & subtle parallax for the frameless Sukhumi engraving */
  const rootStyle = document.documentElement.style;
  addEventListener('pointermove', e => {
    const x = e.clientX, y = e.clientY;
    rootStyle.setProperty('--mx', x + 'px');
    rootStyle.setProperty('--my', y + 'px');
    rootStyle.setProperty('--px', ((0.5 - x / innerWidth) * 14).toFixed(1) + 'px');
    rootStyle.setProperty('--py', ((0.5 - y / innerHeight) * 10).toFixed(1) + 'px');

    if (lightMode === 'promenade') {
      const r = Math.max(0, Math.min(1, x / innerWidth));
      if (r < 0.45) {
        rootStyle.setProperty('--prom-c1', 'rgba(167, 243, 208, 0.95)');
        rootStyle.setProperty('--prom-c2', 'rgba(45, 212, 191, 0.92)');
        rootStyle.setProperty('--prom-c3', 'rgba(59, 130, 246, 0.75)');
        rootStyle.setProperty('--prom-drop', 'rgba(45, 212, 191, 0.65)');
      } else if (r > 0.55) {
        rootStyle.setProperty('--prom-c1', 'rgba(254, 215, 170, 0.95)');
        rootStyle.setProperty('--prom-c2', 'rgba(249, 115, 22, 0.92)');
        rootStyle.setProperty('--prom-c3', 'rgba(225, 29, 72, 0.75)');
        rootStyle.setProperty('--prom-drop', 'rgba(249, 115, 22, 0.7)');
      } else {
        rootStyle.setProperty('--prom-c1', 'rgba(254, 240, 138, 0.95)');
        rootStyle.setProperty('--prom-c2', 'rgba(251, 146, 60, 0.92)');
        rootStyle.setProperty('--prom-c3', 'rgba(168, 85, 247, 0.72)');
        rootStyle.setProperty('--prom-drop', 'rgba(251, 146, 60, 0.65)');
      }
    }
  }, { passive: true });

  window.__atlas = { select, flyRect, BOUNDS, HOME, N, BIO, cam };
})();
