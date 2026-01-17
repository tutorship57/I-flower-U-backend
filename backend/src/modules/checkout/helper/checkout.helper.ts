import { AppError } from "../../../shared/utils/appErrorCustomize.util";
const validateCartAndSplitItem = (items: any, cartItems: any) => {
  const cartItemSet = [];
  const cartItemSingle = [];
  let calculatedTotalAmount = 0;
  for (const item of items) {
    const product = cartItems.find(
      (cartItem: any) => cartItem.product_id === item.product_id
    );

    if (!product) {
      throw new AppError(
        `Product with ID ${item.product_id} not found in cart`,
        404
      );
    }
    if (product.Product.category_id === 2) {
      cartItemSet.push(item);
    }else{
      cartItemSingle.push(item);
    }
    calculatedTotalAmount += product.Product.product_price * item.quantity;
  }
  return { cartItemSet, cartItemSingle, calculatedTotalAmount };
};
export { validateCartAndSplitItem };
