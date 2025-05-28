/*
Din uppgift:
- skriv testfall för alla funktionerna nedan i cart.test.js (RED)
- skriv kod här för att implementera funktionerna (GREEN)

Tips:
- börja med att identifiera VAD som ska testas.
- om du testar t.ex. removeFromCart får du använda addToCart i början av testet. Den kommer nämligen ha sina egna tester

*/
// function getCartItemCount() done
// function getItem(index) done
// function getTotalCartValue() done
// function addToCart(newItem) done
// function removeFromCart(itemId) done
// function editCart(itemId, newValues) done
// function clearCart()
// -------------------------------------------------- //

import { isCartItem, isProduct } from "./validation.js"

let cart = []
let idCounter = 2002
// -------------------------------------------------- //

function getCartItemCount() {
	return cart.length
}

function clearCart() {
	cart = []
}

function getItem(index) {
	if (index < 0 || index >= cart.length) {
		return null
	}
	return cart[index]
}

function getTotalCartValue() {
	return cart.reduce((total, cartItem) => {
		return total + (cartItem.item.price * cartItem.amount)
	}, 0)
}

function addToCart(newItem) {
	if( !isProduct(newItem) ) {
		return false
	}

	const cartItem = { id: idCounter, amount: 1, item: newItem }
	idCounter++
	cart.push(cartItem)
}

function removeFromCart(itemId) {
	const index = cart.findIndex(cartItem => cartItem.item.id === itemId)
	if (index !== -1) {
		cart.splice(index, 1)
		return true
	}
	return false
}

function editCart(itemId, newValues) {
	const index = cart.findIndex(cartItem => cartItem.item.id === itemId)
	if (index !== -1) {
		const cartItem = cart[index]
		if (newValues.amount !== undefined) {
			cartItem.amount = newValues.amount
		}
		if (newValues.item !== undefined) {
			if (isProduct(newValues.item)) {
				cartItem.item = newValues.item
			} else {
				return false
			}
		}
		return true
	}
	return false
}





export { getCartItemCount, addToCart, clearCart, getItem, getTotalCartValue, removeFromCart, editCart }
