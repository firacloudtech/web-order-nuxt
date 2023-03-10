import { CartItem } from "~~/types/cart.type";

export const useCartStore = defineStore("cart", () => {
  const cart = ref<CartItem[]>([]);

  async function addProduct(cartItem: CartItem) {
    const cartIndex = cart.value.findIndex((v) => v.id === cartItem.id);
    const item = cart.value[cartIndex];

    if (cartIndex > -1) {
      item.quantity++;
      cart.value[cartIndex] = item;
      return cart.value[cartIndex];
    }

    cart.value.push(cartItem);
    return cart.value[cart.value.length - 1];
  }

  async function removeProduct(cartItem: CartItem) {
    return cart.value.filter((v) => v.id !== cartItem.id);
  }

  function getTotal() {
    return cart.value.reduce((sum, v) => sum + v.price * v.quantity, 0);
  }

  return {
    cart,
    addProduct,
    getTotal,
    removeProduct,
  };
});
