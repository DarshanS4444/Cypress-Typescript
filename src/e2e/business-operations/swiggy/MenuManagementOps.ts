import { DataTable } from "@badeball/cypress-cucumber-preprocessor"
import hotelMenuPo from "../../../support/page-objects/swiggy/HotelMenuPo"
import { dataContext } from "../../../resources/dataContext"
import cartPo from "../../../support/page-objects/swiggy/CartPo"

class MenuManagementOps {
    verifyMenuItemsAreLoaded() {
        hotelMenuPo.getMenuItems.should('have.length.greaterThan', 0)
    }   
    addItemsToCart(datatable: DataTable) {
       const foodItems = datatable.hashes()
       dataContext.setData('foodItems', foodItems)
       hotelMenuPo.goToSearchDishPage()
        foodItems.forEach((rows) => {
            cy.log(`ordering ${rows.Quantity} - ${rows.Name}`)

            hotelMenuPo.searchForDishes(rows.Name).getPrizeOfDish(rows.Name,rows.Quantity).plusOneForDish(rows.Name)
            if(parseInt(rows.Quantity) > 1) {
                for(let i=1; i < parseInt(rows.Quantity); i++ ) {
                    hotelMenuPo.plusOneForDish(rows.Name)
                }
            }
        })
    }
    verifyDishesAddedToCart() {
        const foodItems = dataContext.getData('foodItems')
        hotelMenuPo.goToCart()
        foodItems.forEach((rows: any) => {
            cartPo.getItemDetailsInCart(rows.Name,dataContext.getData(`prizeOf-${rows.Name}`)).should('be.visible')
        })
    }
}
export default new MenuManagementOps()