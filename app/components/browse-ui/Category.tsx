import { BrowseProps } from '@/types'
import React from 'react'

const Category: React.FC<BrowseProps> = ({ products }) => {
  return (
    <div>
    <h1>Category</h1>
    {products.map(product => (
      <div key={product.id}>
        {product.name}
        {product.brand}
      </div>
    ))}
  </div>
  )
}

export default Category