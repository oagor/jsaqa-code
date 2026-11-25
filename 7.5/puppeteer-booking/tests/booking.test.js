const puppeteer = require("puppeteer");
const {
  clickElement,
  clickNthElement,
  getText,
  isDisabled,
  openHall,
} = require("../lib/commands.js");
const {
  MAIN_PAGE,
  CHROME_PATH,
  DAY,
  SEANCE,
  CHAIR,
  FREE_CHAIR,
  BOOK_BUTTON,
  TICKET_TITLE,
  TICKET_CHAIRS,
} = require("../lib/constants.js");

jest.setTimeout(60000);

const DAY_INDEX = 2;
const SEANCE_INDEX = 0;

let browser;
let page;

beforeEach(async () => {
  browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: false,
    slowMo: 50,
  });
  page = await browser.newPage();
  await page.goto(MAIN_PAGE);
  await openHall(
    page,
    { day: DAY, seance: SEANCE, chair: CHAIR },
    DAY_INDEX,
    SEANCE_INDEX,
  );
});

afterEach(async () => {
  await browser.close();
});

describe("Booking tickets", () => {
  test("Happy path: book one seat", async () => {
    await clickNthElement(page, FREE_CHAIR, 0);
    await clickElement(page, BOOK_BUTTON);
    const actual = await getText(page, TICKET_TITLE);
    expect(actual).toContain("Вы выбрали билеты");
  });

  test("Happy path: book two seats", async () => {
    await clickNthElement(page, FREE_CHAIR, 0);
    await clickNthElement(page, FREE_CHAIR, 1);
    await clickElement(page, BOOK_BUTTON);
    const actual = await getText(page, TICKET_CHAIRS);
    expect(actual.match(/\d+\/\d+/g).length).toBe(2);
  });

  test("Sad path: can not book without selected seat", async () => {
    const actual = await isDisabled(page, BOOK_BUTTON);
    expect(actual).toBe(true);
  });
});
