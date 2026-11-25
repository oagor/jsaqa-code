module.exports = {
  clickElement: async function (page, selector) {
    try {
      await page.waitForSelector(selector);
      await page.click(selector);
    } catch (error) {
      throw new Error(`Selector is not clickable: ${selector}`);
    }
  },

  clickNthElement: async function (page, selector, index) {
    try {
      await page.waitForSelector(selector);
      const elements = await page.$$(selector);
      await elements[index].click();
    } catch (error) {
      throw new Error(`Element #${index} is not clickable: ${selector}`);
    }
  },

  getText: async function (page, selector) {
    try {
      await page.waitForSelector(selector);
      return await page.$eval(selector, (link) => link.textContent);
    } catch (error) {
      throw new Error(`Text is not available for selector: ${selector}`);
    }
  },

  isDisabled: async function (page, selector) {
    try {
      await page.waitForSelector(selector);
      return await page.$eval(selector, (button) => button.disabled);
    } catch (error) {
      throw new Error(`Not possible to check state of selector: ${selector}`);
    }
  },

  openHall: async function (page, selectors, dayIndex, seanceIndex) {
    try {
      await page.waitForSelector(selectors.day);
      const days = await page.$$(selectors.day);
      const dayStamp = await page.evaluate(
        (day) => Number(day.dataset.timeStamp),
        days[dayIndex],
      );
      await days[dayIndex].click();
      await page.waitForFunction(
        (seanceSelector, from) => {
          const first = document.querySelector(seanceSelector);
          if (!first) return false;
          const stamp = Number(first.dataset.seanceTimeStamp);
          return stamp >= from && stamp < from + 86400;
        },
        {},
        selectors.seance,
        dayStamp,
      );

      const seances = await page.$$(selectors.seance);
      await seances[seanceIndex].click();
      await page.waitForSelector(selectors.chair);
    } catch (error) {
      throw new Error(
        `Not possible to open hall (day #${dayIndex}, seance #${seanceIndex}): ${error.message}`,
      );
    }
  },
};
