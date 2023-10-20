import { ProductWithTotalPrice } from "@/helpers/product";
import Image from "next/image";
import { Badge } from "./badge";
import { ArrowDownIcon } from "lucide-react";

interface ProductItemProps {
  product: ProductWithTotalPrice
}

const ProductItem = ({product}: ProductItemProps) => {
  return ( 
    <div className="flex flex-col gap-4">
      <div className=" relative bg-accent rounded-lg h-[170px] w-full  flex items-center">
        <Image
          src={product.imageUrls[0]}
          height={0}
          width={0}
          sizes="100vw"
          className="h-auto max-h-[70%] w-auto max-w-[80%]"
          style={{
            objectFit: "contain"
          }}
          alt={product.name}
        />

        {product.discountPercentage > 0 && (
          <Badge className="absolute left-3 px-2 py-[2px] top-3">
            <ArrowDownIcon size={12}/> {product.discountPercentage}%
          </Badge>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <p className="text-sm overflow-hidden whitespace-nowrap text-ellipsis">{product.name}</p>
      
        <div className="flex items-center gap-2 overflow-hidden whitespace-nowrap text-ellipsis">
          {product.discountPercentage > 0 ? (
            <>
              <p className="overflow-hidden whitespace-nowrap text-ellipsis font-semibold">
                R$ {product.totalPrice.toFixed(2)}
              </p>

              <p className="overflow-hidden whitespace-nowrap text-ellipsis line-through opacity-75 text-xs">
                R$ {Number(product.basePrice).toFixed(2)}
              </p>
            </>
            ) : (
              <p className="overflow-hidden whitespace-nowrap text-ellipsis line-through opacity-75 text-xs">
                R$ {Number(product.basePrice).toFixed(2)}
              </p>
            )
          }
        </div>
      </div>

    </div>
   );
}
 
export default ProductItem;