import { test } from '@playwright/test';
import { Login } from '../pages/login.page';
import { HomePage } from '../pages/homePage.page';
import dataurls from '../data/userDataUrls.json';
import credentials from '../data/loginCredentials.json';

test.describe('Login scenarios', () => {
  let loginPg: Login;

  test.beforeEach(async ({ page }) => {
    await page.goto(dataurls.testurl);
    loginPg = new Login(page);
    await loginPg.verifyLoadedPage('Login');
  });

  test('Successful login', async ({ page }) => {
    await loginPg.loginToOrange(
      credentials.validUsername,
      credentials.validPassword
    );

    const dashboard = new HomePage(page);
    await dashboard.verifyHomePageHeader('Dashboard');
    await dashboard.verifySideMenuItems();
  });

  test('Invalid username login', async () => {
    await loginPg.loginToOrange(
      'testUserName',
      credentials.validPassword
    );

    await loginPg.verifyErrorMessage('Invalid credentials');
  });

  test('Invalid password login', async () => {
    await loginPg.loginToOrange(
      credentials.validUsername,
      'TestPassword'
    );

    await loginPg.verifyErrorMessage('Invalid credentials');
  });

  test('Empty username login', async () => {
    await loginPg.loginToOrange('', credentials.validPassword);
    await loginPg.verifyFieldValidationErrorMessage('Required');
  });

  test('Empty password login', async () => {
    await loginPg.loginToOrange(credentials.validUsername, '');
    await loginPg.verifyFieldValidationErrorMessage('Required');
  });

  test('Empty username and password login', async () => {
    await loginPg.loginToOrange('', '');
    await loginPg.verifyWhenBothfieldsAreEmpty('Required');
  });

  test('Navigate to recruitment and interact', async ({ page }) => {
    await loginPg.loginToOrange(
      credentials.validUsername,
      credentials.validPassword
    );
    await page.waitForLoadState('networkidle',{timeout:50000})
     const homePg = new HomePage(page);
     await homePg.navigateToRecruitment('Recruitment');
     await page.waitForLoadState('networkidle',{timeout:50000})
     await homePg.selectVacancyForRecruitment('Junior Account Assistant');
    // await homePg.filterFromSideMenu('Test value');
  });
});