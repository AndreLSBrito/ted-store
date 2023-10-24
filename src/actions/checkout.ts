"use server"

import { CartProduct } from "@/providers/cart"
import Stripe from "stripe"

export const createCheckout = async (products: CartProduct[], orderId: string) => {
  // criar checkout
  
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? "A variável de ambiente STRIPE_SECRET_KEY não está definida.", {
    apiVersion: "2023-10-16"
  });

  const checkout = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "payment",
    success_url: process.env.HOST_URL,
    cancel_url: process.env.HOST_URL,
    metadata: {
      orderId,
    },
    line_items: products.map( product => {
      return {
        price_data: {
          currency: 'brl',
          product_data: {
            name: product.name,
            description: product.description,
            images: product.imageUrls,
          },
          unit_amount: product.totalPrice * 100,
        },
        quantity: product.quantity,
      }
    })
  })

  // retornar checkout
  return checkout
}

