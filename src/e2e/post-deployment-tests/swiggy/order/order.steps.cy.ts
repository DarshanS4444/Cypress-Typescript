import { Given, Then } from "@badeball/cypress-cucumber-preprocessor";
import HomeOps from "../../../business-operations/swiggy/HomeOps";
import MenuManagementOps from "../../../business-operations/swiggy/MenuManagementOps";

Given('I search for {string} restaurant in {string} location', (restaurantName: string,location: string) => {
    HomeOps.searchForLocation(location).searchForRestaurant(restaurantName)
})
Then('I verify restaurant menu is loaded', () => {
    MenuManagementOps.verifyMenuItemsAreLoaded()
})