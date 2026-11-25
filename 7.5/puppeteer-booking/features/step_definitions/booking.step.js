const {
  Given,
  When,
  Then,
  Before,
  After,
  setDefaultTimeout,
} = require("@cucumber/cucumber");
const puppeteer = require("puppeteer");
const { expect } = require("chai");
const {
  clickElement,
  clickNthElement,
  getText,
  isDisabled,
  openHall,
} = require("../../lib/commands.js");
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
} = require("../../lib/constants.js");

setDefaultTimeout(60000);

Before(async function () {
  this.browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: false,
    slowMo: 50,
  });
  this.page = await this.browser.newPage();
});

After(async function () {
  if (this.browser) {
    await this.browser.close();
  }
});

Given(
  "user opened the hall of seance {int} on day {int}",
  async function (seanceNumber, dayNumber) {
    await this.page.goto(MAIN_PAGE);
    await openHall(
      this.page,
      { day: DAY, seance: SEANCE, chair: CHAIR },
      dayNumber - 1,
      seanceNumber - 1,
    );
  },
);

When("user selects {int} free seats", async function (count) {
  for (let i = 0; i < count; i++) {
    await clickNthElement(this.page, FREE_CHAIR, i);
  }
});

When("user clicks the book button", async function () {
  await clickElement(this.page, BOOK_BUTTON);
});

Then("user sees the ticket title {string}", async function (expected) {
  const actual = await getText(this.page, TICKET_TITLE);
  expect(actual).to.contain(expected);
});

Then("user sees {int} seats in the ticket", async function (count) {
  const actual = await getText(this.page, TICKET_CHAIRS);
  expect(actual.match(/\d+\/\d+/g).length).to.equal(count);
});

Then("the book button is disabled", async function () {
  const actual = await isDisabled(this.page, BOOK_BUTTON);
  expect(actual).to.equal(true);
});
