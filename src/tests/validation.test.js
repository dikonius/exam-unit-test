import { isCartItem, isProduct } from "../validation.js"

const exampleProduct = {
	id: 1001,
	name: 'Badanka',
	price: 500
}

const exampleCartObject = {
	id: 2001,
	amount: 1,
	item: exampleProduct
}

describe('Validation', () => {
	test ('returns true for a valid cart object', () => {
		expect(isCartItem(exampleCartObject)).toBe(true)
	})

	test ('returns false for an invalid cart object', () => {
		const invalidCartItems = [
      {}, 
      { id: 2002, amount: 1 }, 
      { id: 2002, item: exampleProduct },
      { id: 2002, amount: 0, item: exampleProduct },
      { id: 2002, amount: 1, item: {} }, 
      { id: 2002, amount: 1, item: { id: 1002, name: 'Test' } },
    ];

    invalidCartItems.forEach((item) => {
      expect(isCartItem(item)).toBe(false);
    });
  	});

	test ('returns true for a valid product', () => {
		expect(isProduct(exampleProduct)).toBe(true)
	})
	
	test ('returns false for an invalid produkt', () => {
		const invalidProducts = [
	  {}, 
	  { id: 1002, name: 'Test' }, 
	  { id: 1002, price: 50 }, 
	  { name: 'Test', price: 50 }, 
	  { id: 1002, name: 'Test', price: -10 }
	];

	invalidProducts.forEach((product) => {
	  expect(isProduct(product)).toBe(false);
	});
	});

})
