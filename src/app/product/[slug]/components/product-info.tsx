"use client"


import { Button } from "@/components/ui/button";
import DiscountBadge from "@/components/ui/discount-badge";
import { useToast } from "@/components/ui/use-toast";
import { ProductWithTotalPrice } from "@/helpers/product";
import { CartContext } from "@/providers/cart";
import { Product } from "@prisma/client";
import { ArrowLeftIcon, ArrowRightIcon, TruckIcon } from "lucide-react";
import { useContext, useState } from "react";

interface ProducInfoProps {
  product: ProductWithTotalPrice
}

const ProductInfo = ({product}: ProducInfoProps) => {
  const {toast} = useToast()

  const [quantity, setQuantity] = useState(1)

  const {addProductToCart} = useContext(CartContext)

  const handleDecreaseQuantityClick = () => {
    setQuantity((prev) => (prev === 1 ? prev : prev - 1))
  }

  const handleIncreaseQuantityClick = () => {
    setQuantity((prev) => (prev + 1))
  }

  const handleAddToCartClick = () => {
    addProductToCart({...product, quantity})
    toast({
      description: `Seu ${product.slug} foi adicionado ao carrinho!`,
      className: "text-green-500"
    })
  }
  
  return ( 
    <div className="flex flex-col px-5">
      <h2 className="text-lg ">{product.name}</h2>

      <div className="flex items-center gap-2">
        <h1 className="text-xl font-bold">R$ {product.totalPrice.toFixed(2)}</h1>
        {product.discountPercentage > 0 && (
          <DiscountBadge>
            {product.discountPercentage}%
          </DiscountBadge>
        )}
      </div>

      {product.discountPercentage > 0 && (
        <p className="text-sm opacity-75">De: <span className="text-sm opacity-75 line-through">R$ { Number(product.basePrice).toFixed(2)}</span></p>
      )}

      <div className="mt-4 flex items-center gap-2">
        <Button onClick={handleDecreaseQuantityClick} size="icon" variant="outline">
          <ArrowLeftIcon size={16}/>
        </Button>

        <span>{quantity}</span>

        <Button onClick={handleIncreaseQuantityClick} size="icon" variant="outline">
          <ArrowRightIcon size={16}/>
        </Button>
      </div>

      <div className="flex flex-col gap-3 mt-8">
        <h3 className="font-bold">Descrição</h3>
        <p className="text-sm opacity-60 text-justify">{product.description}</p>
      </div>

      <Button onClick={handleAddToCartClick} className="mt-8 font-bold uppercase">Adicionar ao carrinho</Button>

      <div className="rounded-lg bg-accent flex items-center px-5 py-2 justify-between mt-5">
        <div className="flex items-center gap-2">
          <TruckIcon/>

          <div className="flex flex-col">
            <p className="text-xs">
              Entrega via <span className="font-bold">FSPacket®</span>
            </p>

            <p className="text-[#8162ff] text-xs">
              Envio para <span className="font-bold">todo Brasil</span>
            </p>
          </div>
        </div>
        
        <p className="text-xs font-bold">Frete grátis</p>
      </div>
    </div>
   );
}
 
export default ProductInfo;