import { addToCart, getCartItemCount, clearCart, getItem, getTotalCartValue, removeFromCart, editCart } from "../cart"


describe('function getCartItem', () => {

	beforeEach(() => {
		clearCart()
	})

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
})


describe('function getItem', () => {

	beforeEach(() => { 
		clearCart()
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

	test('getItem returns null for invalid index', () => {
		addToCart({ id: 1001, name: 'badanka', price: 20 });
		expect(getItem(-1)).toBeNull();
		expect(getItem(3)).toBeNull();
		expect(getItem(100)).toBeNull();
	});
})

describe('function getTotalCartValue', () => {

	beforeEach(() => { 
		clearCart()
	})

	test('getTotalCartValue calculates price for a single item', () => {
		addToCart({ id: 1001, name: 'badanka', price: 20 });
		expect(getTotalCartValue()).toBe(20);
	});

	test('getTotalCartValue calculates total price for multiple items', () => {
		addToCart({ id: 1001, name: 'badanka', price: 20 });
		addToCart({ id: 1002, name: 'vattenpistol', price: 40 });
		addToCart({ id: 1003, name: 'badboll', price: 30 });
		expect(getTotalCartValue()).toBe(90); 
	})
})

describe('function addToCart', () => {

	beforeEach(() => { 
		clearCart()
	})
	
	test('addToCart lägger till en ny produkt i kundvagnen', () => {
		const itemCountBefore = getCartItemCount()
		const input = { id: 1002, name: 'Vattenpistol', price: 40 }

		addToCart(input)
		const itemCountAfter = getCartItemCount()

		expect(itemCountAfter).toBe(itemCountBefore + 1)
	})

})

describe('function addToCart(newItem)', () => {
	beforeEach(() => { 
		clearCart()
	})

	test('addToCart returns false for invalid product', () => {
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

	test('addToCart adds multiple valid products', () => {
		const products = [
			{ id: 1001, name: 'badanka', price: 20 },
			{ id: 1002, name: 'vattenpistol', price: 40 },
			{ id: 1003, name: 'badboll', price: 30 }
		]

		products.forEach(product => addToCart(product))

		expect(getCartItemCount()).toBe(3)
		expect(getItem(0)).toEqual({
			id: expect.any(Number),
			amount: 1,
			item: products[0]
		})
		expect(getItem(1)).toEqual({
			id: expect.any(Number),
			amount: 1,
			item: products[1]
		})
		expect(getItem(2)).toEqual({
			id: expect.any(Number),
			amount: 1,
			item: products[2]
		})
	})
})

describe(' function removeFromCart(itemId)', () => {
	beforeEach(() => { 
		clearCart()
	})

	test('removeFromCart removes item by id', () => {
		addToCart({ id: 1001, name: 'badanka', price: 20 })
		addToCart({ id: 1002, name: 'vattenpistol', price: 40 })

		const itemCountBefore = getCartItemCount()
		const result = removeFromCart(1001)
		const itemCountAfter = getCartItemCount()

		expect(result).toBe(true)
		expect(itemCountAfter).toBe(itemCountBefore - 1)
		expect(getItem(0).item.name).toBe('vattenpistol')
	})

	test('removeFromCart returns false if item does not exist', () => {
		addToCart({ id: 1001, name: 'badanka', price: 20 })
		const result = removeFromCart(7)
		expect(result).toBe(false)
		expect(getCartItemCount()).toBe(1)
	})

})

describe('function editCart(itemId, newValues)', () => {
	beforeEach(() => { 
		clearCart()
	})

	test('editCart updates item amount and returns true', () => {
		addToCart({ id: 1001, name: 'badanka', price: 20 })
		const result = editCart(1001, { amount: 3 })
		expect(result).toBe(true)
		expect(getItem(0).amount).toBe(3)
	})

	test('editCart returns false for invalid product', () => {
		addToCart({ id: 1001, name: 'badanka', price: 20 })
		const invalidProduct = { id: 1002, name: 'Test', price: -10 }
		const result = editCart(1001, { item: invalidProduct })
		expect(result).toBe(false)
	})
})

describe('function clearCart()', () => {
	beforeEach(() => { 
		clearCart()
	})

	test('clearCart empties the cart', () => {
		addToCart({ id: 1001, name: 'badanka', price: 20 })
		addToCart({ id: 1002, name: 'vattenpistol', price: 40 })

		expect(getCartItemCount()).toBe(2)
		clearCart()
		expect(getCartItemCount()).toBe(0)
	})

})