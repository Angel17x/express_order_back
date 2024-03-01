import { ProductSchema } from './Product.schema';
import { UserSchema } from './user.schema';

const schemas = [
  { name: 'User', schema: UserSchema },
  { name: 'Product', schema: ProductSchema },
  // ...otros esquemas
];

export default schemas;