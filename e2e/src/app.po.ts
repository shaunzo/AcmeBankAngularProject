import { browser, by, element } from 'protractor';

export class AppPage {
  async navigateTo(): Promise<unknown> {
    return browser.get(browser.baseUrl);
  }

  async getCompanyNameText(): Promise<string> {
    return element(by.css('app-root mat-toolbar [data-test="companyName"]')).getText();
  }

  async getToolBarIcon(): Promise<string> {
    return element(by.css('app-root mat-toolbar .toolbar-icon svg-icon svg')).getCssValue('height');
  }

  // tslint:disable-next-line:typedef
  async getButtonText(): Promise<string> {
    return element(by.css('[data-test="withdrawBtn"]')).getText();
  }
}
