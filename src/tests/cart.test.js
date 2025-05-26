import { addToCart, getCartItemCount, clearCart, getItem, getTotalCartValue } from "../cart"


describe('Cart', () => {
	beforeEach(() => {
		clearCart()
	})

	

	// Skriv dina testfall här

	test('getCartItemCount returns 0 when cart is empty', () => {
		const itemCount = getCartItemCount()
		expect(itemCount).toBe(0)
	})

	test('getCartItemCount returns false when invalid product added', () => {
		const invalidProducts = [
	  {}, 
	  { id: 1002, name: 'Test' }, 
	  { id: 1002, price: 50 }, 
	  { name: 'Test', price: 50 }, 
	  { id: 1002, name: 'Test', price: -10 }
	];
	
	invalidProducts.forEach((product) => {
		const result = addToCart(product)
		expect(result).toBe(false)
		})
	})

	test('getItem returns item at the specified index', () => {
		addToCart({ id: 1001, name: 'badanka', price: 20 });
		addToCart({ id: 1002, name: 'vattenpistol', price: 40 });
		addToCart({ id: 1003, name: 'badboll', price: 30 });

		expect(getItem(0)).toEqual({
			amount: 1,
			id: expect.any(Number),
			item: { id: 1001, name: 'badanka', price: 20 }
		});
		expect(getItem(1)).toEqual({
			amount: 1,
			id: expect.any(Number),
			item: { id: 1002, name: 'vattenpistol', price: 40 }
		});
		expect(getItem(2)).toEqual({
			amount: 1,
			id: expect.any(Number),
			item: { id: 1003, name: 'badboll', price: 30 }
		});
	});

	test('getTotalValue calculates price for a single item', () => {
		addToCart({ id: 1001, name: 'badanka', price: 20 });
		expect(getTotalCartValue()).toBe(20);
	});

	test('getTotalValue calculates total price for multiple items', () => {
		addToCart({ id: 1001, name: 'badanka', price: 20 });
		addToCart({ id: 1002, name: 'vattenpistol', price: 40 });
		addToCart({ id: 1003, name: 'badboll', price: 30 });
		expect(getTotalCartValue()).toBe(90); 
	})


	// Du får ett test att börja med
	test('addToCart lägger till en ny produkt i kundvagnen', () => {
		const itemCountBefore = getCartItemCount()
		const input = { id: 1002, name: 'Vattenpistol', price: 40 }

		// addToCart returnerar inget - den påverkar kundvagnen
		// vi behöver använda getCartItemCount för att se om det har lagts till en ny produkt i kundvagnen
		addToCart(input)
		const itemCountAfter = getCartItemCount()

		expect(itemCountAfter).toBe(itemCountBefore + 1)
	})

})
