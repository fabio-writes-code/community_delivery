import { USERNAME } from "./index.js";



export function renderWishlists(containerElementId, wishlist) {
  const wishlistContainer = document.getElementById(containerElementId)
  for (const item of wishlist) {
    wishlistContainer.appendChild(
      createWishlistNode(item)
    )
  }
}

function createWishlistNode({ id, buyer, created_at, items, status, store, wishholder }) {
  const wishlist = document.createElement('li')
  wishlist.className = 'wishlist'
  wishlist.title = `Created at ${new Date(created_at)}`
  wishlist.setAttribute('data-id', id)
  wishlist.setAttribute('data-store-id', store)

  const wishlistContent = document.createElement('section')

  const createdBy = document.createElement('h1')
  createdBy.textContent = buyer
  wishlistContent.appendChild(createdBy)

  const wishlistItems = document.createElement('ul')
  wishlistItems.setAttribute('aria-label', 'Wishlist Items')

  for (const id in items) {
    let item = document.createElement('li')
    item.textContent = items[id]
    wishlistItems.appendChild(item)
  }

  wishlistContent.appendChild(wishlistItems)

  const actions = document.createElement('section')
  actions.className = 'actions'
  actions.setAttribute('aria-label', 'Change Status')

  const actionButton = document.createElement('button')
  actionButton.setAttribute('data-id', id)

  switch (status) {
    case 'PENDING':
      actionButton.className = 'accept'
      actionButton.textContent = 'Make a Trip'
      actionButton.title = 'Make a Trip'
      break
    case 'ACCEPTED':
      actionButton.classList = 'accepted'
      actionButton.textContent = `Wishlist picked up by ${wishholder}`
      actionButton.title = `Wishlist fulfilled by ${wishholder}`
      actionButton.className += ' accepted'
      break
    default:
      actionButton.className = 'fulfilled'
      actionButton.textContent = `Wishlist fulfilled by ${wishholder}`
      actionButton.title = `Wishlist fulfilled by ${wishholder}`
      actionButton.disabled = true
      actionButton.className = ' fulfilled'
  }

  actions.appendChild(actionButton)

  wishlist.appendChild(wishlistContent)
  wishlist.appendChild(actions)


  return wishlist
}


export function updateWishlistNode(element, status) {
  if (status === 'ACCEPTED') {
    element.className = 'accepted'
    element.textContent = `Wishlist picked up by ${USERNAME}`
    element.title = `Wishlist picked up by ${USERNAME}`
  }
  else if (status === 'FULFILLED') {
    element.className = 'fulfilled'
    element.textContent = `Wishlist fulfilled by ${USERNAME}`
    element.title = `Wishlist fulfilled by ${USERNAME}`
    element.disabled = true
  }
}