"use client";

import Brand from "@/app/components/browse-ui/Brand";
import Category from "@/app/components/browse-ui/Category";
import SearchDashboard from "@/app/components/browse-ui/SearchDashboard";
import { useProducts } from "@/hooks/useProducts";
import { useSearch } from "@/providers/SearchContext";
import Fuse from "fuse.js";
import { usePathname } from "next/navigation";

const Browse = () => {
  const pathname = usePathname();
  const { searchTerm } = useSearch();
  const { products } = useProducts();

  const fuse = new Fuse(products, {
    keys: ['name', 'description', 'category', 'brand'],
    includeScore: true,
    threshold: 0.2
  });

  const filteredProductsBy_Search = searchTerm ? fuse.search(searchTerm).map(result => result.item) : products;

  const segment = decodeURIComponent(pathname.split("/")[2].trim());
  // Determine what to filter by
  const brand = products.some((product) => product.brand === segment);
  const category = products.some((product) => product.category === segment);

  // Determine which component to render based on search term or URL segment
  let componentToRender = null;
  if (searchTerm) {
    componentToRender = <SearchDashboard products={filteredProductsBy_Search} />;
  } else if (brand) {
    const filteredProductsBy_Brand = products.filter((product) => product.brand === segment);
    componentToRender = <Brand products={filteredProductsBy_Brand} />;
  } else if (category) {
    const filteredProductsBy_Category = products.filter((product) => product.category === segment);
    componentToRender = <Category products={filteredProductsBy_Category} />;
  } else {
    // Render some default component or null if nothing matches
    componentToRender = <>Default content or null if not needed</>;
  }

  return <div>{componentToRender}</div>;
};

export default Browse;
