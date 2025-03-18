import hotelMenuPo from "../../../support/page-objects/swiggy/HotelMenuPo"

class MenuManagementOps {
    verifyMenuItemsAreLoaded() {
        hotelMenuPo.getMenuItems.should('have.length.greaterThan', 0)
    }   
}
export default new MenuManagementOps()