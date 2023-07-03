import { fetchNearbyStores } from "./api.js";
import { convertToGeoJson, plotStoresOnMap, flyToStore, displayStoreDetails } from "./map.js";


// Currently Selected Store
export let SELECTED_STORE_ID;


// Update Selected Store
export function updateSelectedStore(storeId) {
  SELECTED_STORE_ID = storeId
}

// Fetch nearby Stores
export async function displayNearbyStores(map, latitude, longitude) {
  const stores = await fetchNearbyStores(latitude, longitude)
  const storeGeoJson = convertToGeoJson(stores)
  plotStoresOnMap(map, storeGeoJson)
  return storeGeoJson
}

export async function setStoreNavigation(map, storesGeoJson) {
  const wishlistElements = document.getElementsByClassName('wishlist')

  for (const element of wishlistElements) {
    element.onclick = (e) => {
      const storeId = e.currentTarget.getAttribute('data-store-id')

      for (const point of storesGeoJson.features) {
        if (Number(storeId) === point.properties.id) {
          flyToStore(map, point)
          displayStoreDetails(map, point)
          updateSelectedStore(storeId)
          break;
        }
      }
    }
  }

} 