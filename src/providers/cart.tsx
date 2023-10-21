"use client"

import { ProductWithTotalPrice } from "@/helpers/product";
import { createContext, ReactNode, useState } from "react";

export interface CartProduct extends ProductWithTotalPrice {
  quantity: number;
}  

interface ICartContext{
  products: CartProduct[];
  cartTotalPrice: number;
  cartBasePrice: number;
  cartTotalDiscount: number;
  addProductToCart: (product: CartProduct) => void
  decreaseProductQuantity: (productId: string) => void
  increaseProductQuantity: (productId: string) => void
  removeProductFromCart: (productId: string) => void
}

export const CartContext = createContext<ICartContext>({
  products: [],
  cartTotalPrice: 0,
  cartBasePrice: 0,
  cartTotalDiscount: 0,
  addProductToCart: () => {},
  decreaseProductQuantity: () => {},
  increaseProductQuantity: () => {},
  removeProductFromCart: () => {},
})

const CartProvider = ({children}: {children: ReactNode}) => {
  const [products, setProducts] =  useState<CartProduct[]>([])

  const addProductToCart = (product: CartProduct) => {
    //se o produto ja estiver no carrinho apenas aumente a sua quantidade
    
    const ProductIsAlreadyOnCart = products.some(cartProduct => cartProduct.id === product.id)
    
    if(ProductIsAlreadyOnCart) {
      setProducts((prev) => 
        prev.map((cartProduct) => {
          if (cartProduct.id === product.id) {
            return {
              ...cartProduct,
              quantity: cartProduct.quantity + product.quantity,
            };
          }

          return cartProduct;
        })
      );

      return;
    }

    // se não, adicione o produto à lista
    setProducts((prev) => [...prev, product])
  };

  const decreaseProductQuantity = (productId: string) => {
    // se a quantidade for 1, remova o produto do carrinho

    // se não, diminua a quantidade em 1

    setProducts(prev => 
      prev.map(cartProduct => {
        if (cartProduct.id === productId) {
          return {
            ...cartProduct,
            quantity: cartProduct.quantity - 1
          };
        }

        return cartProduct
      })
      .filter((cartProduct) => cartProduct.quantity > 0),
    )
  }

  const increaseProductQuantity = (productId: string) => {
    // se a quantidade for 1, remova o produto do carrinho

    // se não, diminua a quantidade em 1

    setProducts(prev => 
      prev.map(cartProduct => {
        if (cartProduct.id === productId) {
          return {
            ...cartProduct,
            quantity: cartProduct.quantity + 1
          };
        }

        return cartProduct
      })
    
    )
  }

  const removeProductFromCart = (productId: string) => {
    setProducts((prev) =>
      prev.filter((cartProduct) => cartProduct.id !== productId)
    )
  }

  return ( 
    <CartContext.Provider
      value={{
        products,
        addProductToCart,
        decreaseProductQuantity,
        increaseProductQuantity,
        removeProductFromCart,
        cartTotalPrice: 0,
        cartBasePrice: 0,
        cartTotalDiscount: 0,
      }}
    >
      {children}
    </CartContext.Provider>
   );
}
 
export default CartProvider;
