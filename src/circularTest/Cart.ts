import { User } from './User';

export class Cart {
  // @ts-ignore
  constructor(user) {
    // @ts-ignore
    this.user = user;
  }

  checkOwner() {
    // Проверка: является ли владелец корзины экземпляром класса User
    // @ts-ignore
    return this.user instanceof User;
  }
}
