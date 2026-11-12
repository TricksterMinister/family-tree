/* Run against a local or preview URL: ATLAS_URL=http://localhost:8765 npm test */
const { chromium } = require("playwright");
const assert = require("node:assert/strict");
const base = process.env.ATLAS_URL || "http://127.0.0.1:8765";
(async () => {
  const browser = await chromium.launch({
    headless: true,
    ...(process.env.CHROMIUM_EXECUTABLE_PATH
      ? { executablePath: process.env.CHROMIUM_EXECUTABLE_PATH }
      : {}),
    args: ["--no-sandbox"],
  });
  try {
    for (const edition of ["index.html", "irakli.html"])
      for (const language of ["ka", "ru", "en"]) {
        const context = await browser.newContext({
          viewport: { width: 428, height: 926 },
          isMobile: true,
          hasTouch: true,
          ignoreHTTPSErrors: true,
          reducedMotion: "reduce",
        });
        await context.addInitScript(
          (lang) => localStorage.setItem("atlas-lang", lang),
          language,
        );
        const page = await context.newPage(),
          errors = [];
        page.on("pageerror", (e) => errors.push(e.message));
        await page.goto(base + "/" + edition);
        await page.waitForSelector("body.ready");
        const geometry = await page.evaluate(() => {
          const { N, NODE, PARENTS, DIRECT } = window.__atlas;
          const apex = NODE.temo,
            collisions = [],
            monotonic = [];
          for (const a of N)
            for (const b of N)
              if (
                a.id < b.id &&
                Math.abs(a.x - b.x) < (a.w + b.w) / 2 &&
                a.y < b.y + b.h &&
                b.y < a.y + a.h
              )
                collisions.push([a.id, b.id]);
          for (const [child, ps] of Object.entries(PARENTS))
            if (DIRECT.has(child))
              for (const p of ps)
                if (NODE[p].y <= NODE[child].y + NODE[child].h)
                  monotonic.push([child, p]);
          const root = NODE.bitu;
          return {
            width: apex.el.getBoundingClientRect().width,
            collisions,
            monotonic,
            above: N.filter((n) => n.id !== "temo" && n.y < apex.h + 80).map(
              (n) => n.id,
            ),
            deepest: N.every((n) => n.id === "bitu" || n.y + n.h < root.y),
            edgeAbove: [...document.querySelectorAll(".edge")].some(
              (e) => e.getBBox().y < 0,
            ),
          };
        });
        assert(
          geometry.width >= 310 && geometry.width <= 340,
          JSON.stringify(geometry),
        );
        assert.deepEqual(geometry.collisions, []);
        assert.deepEqual(geometry.monotonic, []);
        assert.deepEqual(geometry.above, []);
        assert(geometry.deepest);
        assert(!geometry.edgeAbove);
        // Inspect every rendered dossier, including kinship links and unknown dates.
        const texts = await page.evaluate(() => {
          const out = [];
          for (const n of window.__atlas.N) {
            window.__atlas.select(n.id);
            out.push({
              id: n.id,
              text: document.querySelector("#drawer").innerText,
            });
            document.querySelector("#sheet-close").click();
          }
          return out;
        });
        const forbidden =
          language === "ka"
            ? /[A-Za-zА-Яа-яЁё]/
            : language === "ru"
              ? /[A-Za-z\u10a0-\u10ff]/
              : /[А-Яа-яЁё\u10a0-\u10ff]/;
        for (const { id, text } of texts)
          assert(
            !forbidden.test(text),
            `${edition}/${language}/${id}: foreign script`,
          );
        assert(
          !forbidden.test(await page.locator("body").innerText()),
          `${edition}/${language}: interface`,
        );
        await page.locator("#nav-home").click();
        await page.locator(".hero").click();
        await page.waitForTimeout(100);
        const sheet = await page.locator("#drawer").boundingBox();
        assert(Math.abs(sheet.y + sheet.height - 926) < 2);
        assert(sheet.height > 450 && sheet.height < 650);
        await page.locator("#sheet-size").click();
        await page.waitForTimeout(350);
        assert((await page.locator("#drawer").boundingBox()).height > 750);
        await page.keyboard.press("Escape");
        assert(!(await page.locator("#drawer").isVisible()));
        await page.locator("#nav-menu").click();
        await page
          .locator("#language")
          .selectOption(language === "ru" ? "en" : "ru");
        await page.locator("#menu-close").click();
        await page.locator("#nav-home").click();
        assert.deepEqual(errors, []);
        await context.close();
        console.log(
          `PASS ${edition} ${language}: 58 dossiers, language purity, apex, collisions, ancestry, mobile sheet`,
        );
      }
    const page = await browser.newPage({
      viewport: { width: 1440, height: 1000 },
      ignoreHTTPSErrors: true,
    });
    await page.goto(base + "/");
    await page.waitForFunction(() => window.__atlas?.introActive);
    const start = Date.now();
    await page.waitForFunction(() => !window.__atlas.introActive);
    assert(Date.now() - start < 3300);
    await page.locator("#nav-menu").click();
    await page.locator("#replay").click();
    assert(await page.evaluate(() => window.__atlas.introActive));
    await page.mouse.click(30, 300);
    assert(!(await page.evaluate(() => window.__atlas.introActive)));
    await page.locator("#nav-menu").click();
    await page.locator("#replay").click();
    await page.keyboard.press("Escape");
    assert(!(await page.evaluate(() => window.__atlas.introActive)));
    await page.reload();
    await page.waitForSelector("body.ready");
    assert(!(await page.evaluate(() => window.__atlas.introActive)));
    const before = await page.evaluate(() => ({ ...window.__atlas.cam }));
    await page.mouse.move(500, 400);
    await page.mouse.down();
    await page.mouse.move(600, 450, { steps: 8 });
    await page.mouse.up();
    const after = await page.evaluate(() => ({ ...window.__atlas.cam }));
    assert(after.x > before.x + 80);
    await page.locator("#nav-home").click();
    await page.setViewportSize({ width: 926, height: 428 });
    await page.waitForTimeout(350);
    assert(await page.locator(".hero").isVisible());
    for (const asset of [
      "apple-touch-icon.png",
      "icon-192.png",
      "icon-512.png",
      "manifest-ka.webmanifest",
      "manifest-en.webmanifest",
      "manifest-ru.webmanifest",
    ]) {
      const r = await page.request.get(base + "/" + asset);
      assert.equal(r.status(), 200, asset);
    }
    console.log(
      "PASS intro 3s, pointer/keyboard interruption, replay, repeat visit, drag, resize, WebClip assets",
    );
  } finally {
    await browser.close();
  }
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
