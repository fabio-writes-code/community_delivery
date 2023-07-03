
// Fetch list of nearby stores from a given latitude and longitude
export async function fetchNearbyStores(latitude, longitude) {
  const response = await fetch(`/stores?lat=${latitude}&lng=${longitude}`, { method: 'GET' })

  if (response.ok)
    return response.json()
  else
    return Promise.reject(Error(response.statusText))
}

// Calls backend to add a new wishlist
export async function addWishlist(buyer, items, store) {
  const response = await fetch('/wishlist/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      buyer,
      items,
      store
    })
  })

  if (response.ok)
    return response.json()
  else
    return Promise.reject(Error(response.statusText))
}


//Calls backend to retrieve wishlists
export async function fetchNearbyWishlists(latitude, longitude, options) {
  let url = `/wishlist?lat=${latitude}&lng=${longitude}`
  if (options) {
    if (options.buyer) url += `&buyer=${options.buyer}`
    if (options.wishholder) url += `&wishholder=${options.wishholder}`
  }

  const response = await fetch(url, { method: 'GET' })

  return response.ok
    ? response.json()
    : Promise.reject(Error(response.statusText))
}

// update wishlist status
export async function updateWishlist(id, data) {
  const response = await fetch(`/wishlist/${id}/`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })

  return response
    ? response.json()
    : Promise.reject(Error(response.statusText))
}