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
        this.sideMenuItems= page.locator("//span[@class='oxd-text oxd-text--span oxd-main-menu-item--name']/parent::a");// page.locator(".oxd-main-menu-item")
        this.dropdownVacancy=page.locator(".oxd-select-wrapper");
        this.dropdownArrow=page.locator("//label[text()='Vacancy']/parent::div/following-sibling::div//*[@class='oxd-select-text--after']");
        this.vacancyDropdownOption=page.getByRole("option");
        this.inputSearch=page.locator("//input[@placeholder='Search']");
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

    async navigateToRecruitment(menuItemText:string){
        for(const item of await this.sideMenuItems.all()){
            const text = await item.textContent()
            console.log(`--------Before if -----${text}--------------`)
            if(text==='Recruitment'){
                console.log(`-------------${text}--------------`);
                await item.click();
                console.log("---------- Recruitment option selected -------------")
                break;
            }
        }
    }

    async selectVacancyForRecruitment(vacancy:string){
        const vacancyDrp=this.dropdownArrow
        await vacancyDrp.click()
        await this.vacancyDropdownOption.filter({hasText:vacancy}).click()
    }

    async filterFromSideMenu(inputVal:string){
        await this.inputSearch.click();
        await this.inputSearch.clear();
        await this.inputSearch.pressSequentially(inputVal,{delay:1000});       
    }

    
}