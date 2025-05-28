import Joi from 'joi';


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
