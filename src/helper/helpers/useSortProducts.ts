import { useEffect } from "react";

const useSortProducts = (
  sortBy: "asc" | "desc",
  allProducts: any[],
  setAllProducts: React.Dispatch<React.SetStateAction<any[]>>
) => {
  useEffect(() => {
    const sortedProducts = [...allProducts].sort((a, b) => {
      const priceA = parseFloat(a.product.price);
      const priceB = parseFloat(b.product.price);
      if (sortBy === "asc") {
        return priceA - priceB;
      } else {
        return priceB - priceA;
      }
    });
    setAllProducts(sortedProducts);
  }, [sortBy, allProducts, setAllProducts]);
};

export default useSortProducts;
