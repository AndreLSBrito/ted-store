import { ShoppingCartIcon } from "lucide-react";
import { Badge } from "./badge";
import { useContext } from "react";
import { CartContext } from "@/providers/cart";
import CartItem from "./cart-item";
import { computedProductTotalPrice } from "@/helpers/product";

const Cart = () => {
  const { products } = useContext(CartContext)

  return ( 
    <div className="flex flex-col gap-8">
      <Badge 
        className="w-fit px-3 py-[0.375rem] gap-1 border-2 border-primary text-base uppercase"
        variant="outline"
      >
        <ShoppingCartIcon size={16}/>
        Carrinho
      </Badge>

      {products.map(( product ) => (
        <div className="flex flex-col gap-5">
          <CartItem key={product.id} product={computedProductTotalPrice(product as any) as any}/>
        </div>
      ))}
    </div>
   );
}
 
export default Cart;