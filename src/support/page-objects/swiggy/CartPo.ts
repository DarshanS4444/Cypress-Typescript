class CartPo {
     getItemDetailsInCart(itemName: string, prize: string) {
        return cy.contains('div', itemName).parent('div').next('div').find('span').contains(prize)
     }
}
export default new CartPo()