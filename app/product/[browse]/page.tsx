"use client";

import Brand from "@/app/components/browse-ui/Brand";
import Category from "@/app/components/browse-ui/Category";
import { useProducts } from "@/hooks/useProducts";
import { usePathname } from "next/navigation";

const Browse = () => {
  const pathname = usePathname();
  const identifier = pathname.split("/")[2].trim();

  if (!identifier) return null;

  const { products } = useProducts();
  const filteredProductsBy_Brand = products.filter(
    (product) => product.brand === identifier
  );
  const filteredProductsBy_Category = products.filter(
    (product) => product.category === identifier
  );


  const segment = decodeURIComponent(pathname.split("/")[2].trim());

  //Filtered sections
  const brand = products.some((product) => product.brand === segment);
  const category =  products.some((product) => product.category === segment);
  let componentToRender = null;
  switch (true) {
    case brand:
      componentToRender = <Brand products={filteredProductsBy_Brand} />;
      break;
    case category:
      componentToRender = <Category products={filteredProductsBy_Category} />
      break;
    default:
      return <>s</>;  
  }

  return <div>{componentToRender}</div>;
};

export default Browse;
