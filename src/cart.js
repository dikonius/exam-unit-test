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
// function addToCart(newItem)
// function removeFromCart(itemId)
// function editCart(itemId, newValues)
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
	idCounter = 2002
}
// Din kod börjar här
// Du får en funktion att börja med

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





export { getCartItemCount, addToCart, clearCart, getItem, getTotalCartValue }
