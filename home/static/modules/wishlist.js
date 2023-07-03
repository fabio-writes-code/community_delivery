import { USERNAME, } from './index.js'

import {
  addWishlist, fetchNearbyWishlists, updateWishlist
} from './api.js'

import { renderWishlists, updateWishlistNode } from './helpers.js'

import { SELECTED_STORE_ID } from './stores.js'

export async function createWishlist() {
  const wishlistInput = document.getElementById('wishlist-items').value.trim()
  if (USERNAME && SELECTED_STORE_ID && wishlistInput)
    addWishlist(USERNAME, wishlistInput.split(/\s*,\s*/), SELECTED_STORE_ID)

}

export async function displayNearbyWishlists(latitude, longitude) {
  try {
    const nearbyWishlist = await fetchNearbyWishlists(latitude, longitude)
    renderWishlists('nearby-wishlist', nearbyWishlist)
  } catch (error) {
    console.error(error)
  }
}

export async function displayMyRequests(latitude, longitude) {
  try {
    const mywishlist = await fetchNearbyWishlists(latitude, longitude, { buyer: USERNAME })
    renderWishlists('my-wishlist', mywishlist)
  } catch (error) {
    console.error(error)
  }
}

export async function displayMyTrips(latitude, longitude) {
  try {
    const myTrips = await fetchNearbyWishlists(latitude, longitude, { wishholder: USERNAME })
    renderWishlists('my-trips', myTrips)
  } catch (error) {
    console.error(error)
  }
}

export async function updateWishlistStatus(event) {
  console.log('Pending')
  console.log(event.target.className)
  switch (event.target.className) {
    case 'accept':
      event.preventDefault()
      updateWishlist(
        event.target.getAttribute('data-id'),
        {
          status: 'ACCEPTED',
          wishholder: USERNAME
        }
      ).then((result) => {
        updateWishlistNode(event.target, 'ACCEPTED')
      }).catch(error => console.error(error))
      break

    case 'accepted':
      event.preventDefault()
      updateWishlist(
        event.target.getAttribute('data-id'),
        {
          status: 'FULFILLED',
          wishholder: USERNAME
        }
      ).then(result => {
        updateWishlistNode(event.target, 'FULFILLED')
      }).catch(error => console.error(error))
  }
}