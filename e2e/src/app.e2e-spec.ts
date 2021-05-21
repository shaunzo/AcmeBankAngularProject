import { AppPage } from './app.po';
import { browser, logging } from 'protractor';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display company name', async () => {
    await page.navigateTo();
    expect(await page.getCompanyNameText()).toEqual('Acme Bank');
  });

  it('should display the moneybag icon', async () => {
    await page.navigateTo();
    expect(await page.getToolBarIcon()).toEqual('45px');
  });

  it('should show buttons', async () => {
    await page.navigateTo();
    expect( await page.getButtonText()).toEqual('Withdraw');
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
