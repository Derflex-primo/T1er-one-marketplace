import { useProducts } from "@/hooks/useProducts";
import splitWord from "@/lib/utils/formats";
import Link from "next/link";
import React, { useState } from "react";
import { IoCloseSharp } from "react-icons/io5";
import { SlMenu } from "react-icons/sl";

const SortBrowse = () => {
  const { products } = useProducts();
  const uniqueCategories = Array.from(new Set(products.map((p) => p.category)));
  const uniqueBrands = Array.from(new Set(products.map((p) => p.brand)));

  // New state to track if the modal is open or not
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);

  const filterOption = `cursor-pointer 
                      text-sm 
                      font-bold 
                      p-3 
                      rounded-xl 
                      hover:bg-stone-100 `;

  const filterPlaceholder = `flex  
                           items-center 
                           gap-2 
                           text-sm 
                           font-bold 
                           p-3 
                           rounded-xl 
                           hover:bg-stone-100 
                           transition 
                           ease-in-out 
                           duration-150`;

  const filterPlaceholderStyle = `absolute 
                                rounded-xl 
                                border-[0.8px]   
                                bg-white 
                                shadow-xl 
                                p-3`;

  return (
    <div>
      <button
        className={filterPlaceholder}
        onClick={() => { 
        setIsModalOpen(!isModalOpen)
        setSelectedFilter(null);
        }}
      >
        {isModalOpen ? <IoCloseSharp size={18} /> : <SlMenu size={18} />}
        <span>Browse</span>
      </button>

      {isModalOpen && (
        <div className={`${filterPlaceholderStyle} top-[16]  `}>
          <div className={filterOption}>Deals</div>
          <div className={filterOption}>Shops</div>
          <div
            onClick={() => setSelectedFilter("Brands")}
            className={filterOption}
          >
            Brands
          </div>
          <div
            onClick={() => setSelectedFilter("Category")}
            className={filterOption}
          >
            Categories
          </div>
        </div>
      )}

      {selectedFilter === "Brands" && (
        <div className={`${filterPlaceholderStyle} right-[1160px] top-[16] `}>
          {uniqueBrands.map((brand) => (
            <Link
              key={brand}
              href={`/product/${brand}`}
              onClick={() => {
                setIsModalOpen(false);
                setSelectedFilter(null);
              }}
            >
              <div>
                <div className={filterOption}>{splitWord(brand)}</div>
              </div>
            </Link>
          ))}
        </div>
      )}

      {selectedFilter === "Category" && (
        <div className={`${filterPlaceholderStyle} right-[1104px] top-[16] `}>
          {uniqueCategories.map((category) => (
            <Link 
            key={category}
             href={`/product/${category}`}>
              <div
                onClick={() => {
                  setIsModalOpen(false);
                  setSelectedFilter(null);
                }}
              >
                <div className={filterOption}>{splitWord(category)}</div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default SortBrowse;
