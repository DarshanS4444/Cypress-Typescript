import { dataContext } from "../../../resources/dataContext"
import cartPo from "./CartPo"
class HotelMenuPo {
     get getMenuItems() {
        return cy.get('[id*="cid"]')
     }
     get getSearchForDishesButton() {
        return cy.xpath('//div[text()="Search for dishes"]')
     }
     get getSearchInput() {
        return cy.get('input[data-cy="menu-search-header"]')
     }
     getAddOneButtonForDish(nameOfDish: string) {
        return cy.contains('div', nameOfDish).parent('div').next('div').find('div').contains('+')
     }
     getPrizeOfDish(nameOfDish: string, quantity: string) {
        cy.contains('div', nameOfDish).next('div').invoke('text').then((prize) => {
            dataContext.setData(`prizeOf-${nameOfDish}`, parseInt(prize) * parseInt(quantity))
        })
        return this
     }
     get getViewCartButton() {
        return cy.get('span').contains('View Cart')
     }
     goToSearchDishPage() {
        this.getSearchForDishesButton.click()
        return this
     }
     searchForDishes(nameOfDish: string) {
        this.getSearchInput.clear().type(nameOfDish)
        return this
     }
     plusOneForDish(nameOfDish: string) {
        this.getAddOneButtonForDish(nameOfDish).click({ force: true })
        return this
     }
     goToCart() {
        this.getViewCartButton.click()
        return cartPo
     }
}
export default new HotelMenuPo()