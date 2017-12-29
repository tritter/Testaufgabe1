import React from 'react';

const ProductRow = (props) => {
    const product = props.value
    return (
      <div className="Product-row">
        <p>{product.Title}</p>
        <p>{product.ID}</p>
        <img src={product.CoverURL} alt="Product cover representation" />
      </div>
    );  
}

export default ProductRow;
