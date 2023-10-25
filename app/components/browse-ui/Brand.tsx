import { BrowseProps, ProductTypes } from '@/types';
import React from 'react'

const Brand: React.FC<BrowseProps> = ({ products }) => {
  return (
    <div>
      <h1>Brand</h1>
      {products.map(product => (
        <div key={product.id}>
          {product.name}
          {product.brand}
        </div>
      ))}
    </div>
  )
}

export default Brand;
