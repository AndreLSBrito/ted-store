import { Category } from "@prisma/client";
import Image from "next/image";
import Link from "next/link"

interface CategoryItemProps {
  category: Category
}

const CategoryItem = ({category}: CategoryItemProps) => {
  return ( 
    <Link href={`/category/${category.slug}`}>
      <div className="flex flex-col">
        <div className="flex w-full h-[150px] items-center justify-center bg-category-item-gradient rounded-tl-lg rounded-tr-lg">
          <Image
            src={category.imageUrl}
            alt={category.name}
            width={0}
            height={0}
            sizes="100vw"
            className="h-auto max-h-[70%] w-auto max-w-[80%]"
            style={{
              objectFit: "contain"
            }}
          />
        </div>

        <div className="bg-accent py-3 rounded-bl-lg rounded-br-lg">
          <p className="text-sm font-semibold text-center">{category.name}</p>
        </div>
      </div>
    </Link>
   );
}
 
export default CategoryItem;