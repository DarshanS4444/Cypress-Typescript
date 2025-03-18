import homePo from "../../../support/page-objects/swiggy/HomePo"

class HomeOps { 
    searchForLocation(location: string) {
        homePo
            .searchLocation(location)
            .selectLocationFromSuggestions(location)
            .getSelectedLocation.should('contain.text', location)
        return this
    }
    searchForRestaurant(restaurantName:string) {
        homePo
            .searchRestaurant(restaurantName)
            .selectRestaurantFromSuggestions(restaurantName)
            .getRestaurentSelected.should('have.text',restaurantName)
    }
}
export default new HomeOps()