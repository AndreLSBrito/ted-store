import { ProductWithTotalPrice } from "@/helpers/product";
import Image from "next/image";
import { Badge } from "./badge";
import { ArrowDownIcon } from "lucide-react";
import Link from "next/link";
import DiscountBadge from "./discount-badge";

interface ProductItemProps {
  product: ProductWithTotalPrice
}

const ProductItem = ({product}: ProductItemProps) => {
  return ( 
    <Link href={`/product/${product.slug}`}>
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
            <DiscountBadge className="absolute left-3 top-3">
              {product.discountPercentage}
            </DiscountBadge>
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
    </Link>
   );
}
 
export default ProductItem;