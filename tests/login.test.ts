import {test} from '@playwright/test'
import { Login } from '../pages/login.spec'
import dataurls from '../data/userDataUrls.json'
import credentials from '../data/loginCredentials.json'
import { HomePage } from '../pages/homePage.spec'

test.describe("Testing of login scenarios",()=>{
    
    test.beforeEach(async({page})=>{
        await page.goto(dataurls.testurl)
    })
    test("Test successful login",async({page})=>{
        const loginPg=new Login(page)
        await loginPg.verifyLoadedPage("Login")
        await loginPg.loginToOrange(credentials.validUsername,credentials.validPassword)

        await page.waitForLoadState('networkidle',{timeout:500000})
        const dashboard=new HomePage(page)
        await dashboard.verifyHomePageHeader("Dashboard")
        await dashboard.verifySideMenuItems()
    })
    test("Test invalid username login",async({page})=>{
        const loginPg=new Login(page)
        await loginPg.verifyLoadedPage("Login")
        await loginPg.loginToOrange("testUserName",credentials.validPassword)

        await page.waitForLoadState('networkidle',{timeout:500000})
        await loginPg.verifyErrorMessage("Invalid credentials")
    })
    test("Test invalid password login",async({page})=>{
        const loginPg=new Login(page)
        await loginPg.verifyLoadedPage("Login")
        await loginPg.loginToOrange(credentials.validUsername,"TestPassword")

        await page.waitForLoadState('networkidle',{timeout:500000})
        await loginPg.verifyErrorMessage("Invalid credentials")
    })
    test("Test empty username login",async({page})=>{
        const loginPg=new Login(page)
        await loginPg.verifyLoadedPage("Login")
        await loginPg.loginToOrange("",credentials.validPassword)

        
        await page.waitForLoadState('networkidle',{timeout:500000})
        await loginPg.verifyFieldValidationErrorMessage("Required")
    })
    test("Test empty password login",async({page})=>{
        const loginPg=new Login(page)
        await loginPg.verifyLoadedPage("Login")
        await loginPg.loginToOrange(credentials.validUsername,"")

        
        await page.waitForLoadState('networkidle',{timeout:500000})
        await loginPg.verifyFieldValidationErrorMessage("Required")
    })
    test("Test empty user name and password login",async({page})=>{
        const loginPg=new Login(page)
        await loginPg.verifyLoadedPage("Login")
        await loginPg.loginToOrange("","")

        
        await page.waitForLoadState('networkidle',{timeout:500000})
        await loginPg.verifyWhenBothfieldsAreEmpty("Required")
    })

    test("Test navigate to recruitments and interact",async({page})=>{
        const loginPg=new Login(page)
        await loginPg.verifyLoadedPage("Login")
        await loginPg.loginToOrange(credentials.validUsername,credentials.validPassword)

        await page.waitForLoadState('networkidle',{timeout:50000})
        const homePg=new HomePage(page);
        await homePg.navigateToRecruitment()
        await page.waitForLoadState('networkidle',{timeout:50000})
        await homePg.selectVacancyForRecruitment('Junior Account Assistant')
        await homePg.filterFromSideMenu("Test value")
        
    })
})