import { Cart } from './Cart';

export class User {
  // @ts-ignore
  constructor(name) {
    // @ts-ignore
    this.name = name;
    // @ts-ignore
    this.cart = new Cart(this); // User ссылается на Cart
  }
}
