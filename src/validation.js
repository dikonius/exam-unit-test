import Joi from 'joi';

// Remember to use RED, GREEN, REFACTOR
// 1. pick one test case in validation.test.js
// 2. write the code, verify that the test is RED
// 3. write code in this file so that the test case becomes GREEN
// 4. refactor as neccessary before you move on to the next
// 5. repeat


function isProduct(maybeProduct) {
  const schema = Joi.object({
    id: Joi.number().integer().required(),
    name: Joi.string().required(),
    price: Joi.number().min(0).required(),
  });

  const result = schema.validate(maybeProduct);
  return result.error == null;
}

function isCartItem(maybeCartItem) {
  const schema = Joi.object({
    id: Joi.number().integer().required(),
    amount: Joi.number().integer().min(1).required(),
    item: Joi.object({
      id: Joi.number().integer().required(),
      name: Joi.string().required(),
      price: Joi.number().min(0).required(),
    }).required(),
  });

  const result = schema.validate(maybeCartItem);
  return result.error == null;
}

export { isCartItem, isProduct };
