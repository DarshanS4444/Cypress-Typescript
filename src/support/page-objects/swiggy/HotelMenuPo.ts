class HotelMenuPo {
     get getMenuItems() {
        return cy.get('[id*="cid"]')
     }
}
export default new HotelMenuPo()