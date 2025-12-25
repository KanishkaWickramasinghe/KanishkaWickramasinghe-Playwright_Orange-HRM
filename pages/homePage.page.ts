import { expect, Locator, Page } from "@playwright/test";
import { spawn } from "child_process";

export class HomePage{
    readonly page:Page;
    readonly pageHeader:Locator;
    readonly sideMenuItems:Locator;
    readonly dropdownVacancy:Locator;
    readonly dropdownArrow:Locator;
    readonly vacancyDropdownOption:Locator;
    readonly inputSearch:Locator;
    
    constructor(page:Page){
        this.page=page;
        this.pageHeader=page.locator(".oxd-topbar-header-breadcrumb-module")
        this.sideMenuItems= page.getByRole("listitem");// page.locator(".oxd-main-menu-item")
        this.dropdownVacancy=page.locator(".oxd-select-wrapper");
        this.dropdownArrow=page.locator(".oxd-select-text--after");
        this.vacancyDropdownOption=page.getByRole("option");
        this.inputSearch=page.locator("//input[@placeholder='Search']")
    }

    async verifyHomePageHeader(headerText:string){
        const header=this.pageHeader
        await expect(header).toHaveText(headerText)
    }

    async verifySideMenuItems(){
        for(const item of await this.sideMenuItems.all()){
            const text = await item.textContent()
            console.log(text)
        }
    }

    async navigateToRecruitment(){
        for(const item of await this.sideMenuItems.all()){
            const text = await item.textContent()
            if(text==="Recruitment"){
                console.log(text)
                await item.click();
                console.log("---------- Recruitment option selected -------------")
                break;
            }
        }
    }

    async selectVacancyForRecruitment(vacancy:string){
        const vacancyDrp=this.dropdownArrow
        //await vacancyDrp.nth(1).selectOption({label:'Junior Account Assistant'} )
        await vacancyDrp.nth(1).click()
        await this.vacancyDropdownOption.filter({hasText:vacancy}).click()
    }

    async filterFromSideMenu(inputVal:string){
        await this.inputSearch.click();
        await this.inputSearch.clear();
        await this.inputSearch.pressSequentially(inputVal,{delay:1000});       
    }

    
}