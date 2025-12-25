import { expect, type Locator, type Page } from '@playwright/test';
import { request } from 'http';
import { Response } from '@playwright/test';
export class Login{
    readonly page:Page;
    readonly pageHeader:Locator;
    readonly inputUserName:Locator;
    readonly inputPassword:Locator;
    readonly btn_login:Locator;
    readonly lbl_loginError:Locator;
    readonly lbl_inputFieldErrorMessage:Locator;
    
    
    constructor(page:Page){
        this.page=page;
        this.pageHeader=page.locator(".orangehrm-login-title");
        this.inputUserName=page.locator("xpath=//input[@name='username']");
        this.inputPassword=page.locator("//input[@name='password']");
        this.btn_login=page.locator("//button[@type='submit']");
        this.lbl_loginError=page.locator(".oxd-alert-content--error p")
        this.lbl_inputFieldErrorMessage=page.locator(".oxd-input-group__message")

    }

    
    async verifyLoadedPage(headerText:string){
        const header=this.pageHeader
        await expect(header).toHaveText(headerText)
        console.log("---------Page header loaded---------------")
    }

    async loginToOrange(username:string,password:string){
        await this.inputUserName.fill(username)
        await this.inputPassword.fill(password)
        await this.btn_login.click()
        console.log("-------------User successfully logged in-----------------")
    }

    async verifyErrorMessage(errorText:string){
        const error=this.lbl_loginError
        await expect(error).toHaveText(errorText)
    }
    async verifyFieldValidationErrorMessage(text:string){
        const userNameError=this.lbl_inputFieldErrorMessage
        await expect(userNameError).toHaveText(text)
    }
    
    async verifyWhenBothfieldsAreEmpty(text:string){
        const userNameError_Uname=this.lbl_inputFieldErrorMessage.first()
        const upasswordErrorMessage=this.lbl_inputFieldErrorMessage.last()
        await expect(userNameError_Uname).toHaveText(text)
        await expect(upasswordErrorMessage).toHaveText(text)
    }

}