import { CustomProjectConfig } from 'lost-pixel';

export const config: CustomProjectConfig = {
  storybookShots: {
    storybookUrl: './storybook-static',
    elementLocator: '[data-screenshot="true"]',
  },
  generateOnly: true,
  failOnDifference: true,
  waitBeforeScreenshot: 500,
};
