class HomePo { 
    get getLocationSearchInput() {
        return cy.get('#location')
    }
    getLocationSuggested(location: string) {
        return cy.get('div').contains('Search Result').next('div').contains(location)
    }
    get getSelectedLocation() {
        return cy.get('.icon-downArrow').prev('span')
    }
    get getRestaurantSearchButton() {
        return cy.get('span').contains('Search')
    }
    get getRestaurantInput() {
        return cy.get('[placeholder="Search for restaurants and food"]')
    }
    getRestaurantSuggested(restaurantName: string) {
        return cy.get('[data-testid="autosuggest-item"]').contains(restaurantName)
    }
    getRestaurantFromList(restaurantName: string) {
        return cy.get(`[aria-label*="Restaurant name: ${restaurantName}"]`)
    }
    get getRestaurentSelected() {
        return cy.get('h1')
    }

    searchLocation(location: string) {
        this.getLocationSearchInput.type(location)
        return this
    }
    selectLocationFromSuggestions(location: string) {
        this.getLocationSuggested(location).click()
        return this
    }
    searchRestaurant(restaurantName: string) {
        this.getRestaurantSearchButton.click()
        this.getRestaurantInput.type(restaurantName)
        return this
    }
    selectRestaurantFromSuggestions(restaurantName: string) {
        this.getRestaurantSuggested(restaurantName).click()
        this.getRestaurantFromList(restaurantName).click()
        return this
    }
    
}
export default new HomePo()