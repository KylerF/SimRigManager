import { NightwatchBrowser } from 'nightwatch';

module.exports = {
  before: (browser: NightwatchBrowser) => {
    browser.url(browser.launch_url);
  },

  after: (browser: NightwatchBrowser) => {
    browser.end();
  },

  'should check heading contains text SimRig Manager': (browser: NightwatchBrowser) => {
    browser.assert.containsText('h1', 'SimRig Manager');
  },
};
