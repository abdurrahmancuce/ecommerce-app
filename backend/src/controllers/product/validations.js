import Joi from 'joi';

const ProductSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().min(5),
  price: Joi.string().required(),
  photos: Joi.string(),
});

export default ProductSchema;
