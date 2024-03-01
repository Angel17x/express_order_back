import { ProductSchema } from './Product.schema';
import { SalesSchema } from './sales.schema';
import { UserSchema } from './user.schema';

const schemas = [
  { name: 'User', schema: UserSchema },
  { name: 'Product', schema: ProductSchema },
  { name: 'Sales', schema: SalesSchema },
  // ...otros esquemas
];

export default schemas;