import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addProduct, removeProduct } from '../redux/store';

const ProductList = () => {
  const products = useSelector((state) => state.products);
  const dispatch = useDispatch();

  const handleAddProduct = (product) => {
    dispatch(addProduct(product));
  };

  const handleRemoveProduct = (product) => {
    dispatch(removeProduct(product));
  };
  return (
    <div style={{display:"flex"}}>
      <div style={{width:"auto",border:"1px solid",fontSize:"18px",padding:"10px"}}>
        <h2>Add Product:</h2>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <div>Soup</div>
          <div>$ 0.60 &nbsp;<button onClick={() => handleAddProduct({ id: 1, name: 'Soup', price: 0.60 })}>Add</button></div>
        </div><br></br>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <div>Bread</div>
          <div>$ 1.10 &nbsp;<button onClick={() => handleAddProduct({ id: 2, name: 'Bread', price: 1.10 })}>Add</button></div>
        </div><br></br>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <div>Cheese</div>
          <div>$ 0.90 &nbsp;<button onClick={() => handleAddProduct({ id: 3, name: 'Cheese', price: 0.90 })}>Add</button></div>
        </div><br></br>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <div>Butter</div>
          <div>$ 1.20 &nbsp;<button onClick={() => handleAddProduct({ id: 4, name: 'Butter', price: 1.20 })}>Add</button></div>
        </div><br></br>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <div>Milk</div>
          <div>$ 0.50 &nbsp;<button onClick={() => handleAddProduct({ id: 5, name: 'Milk', price: 0.50 })}>Add</button></div>
        </div>
      </div>
      <div style={{minWidth:"300px",border:"1px solid",fontSize:"18px",padding:"10px"}}>
        <h2>Product List : </h2>
        <div >
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                <div style={{width:"30%"}}>Product</div>
                <div style={{width:"30%"}}>Price</div>
                <div style={{width:"40%",display:"flex",alignItems:"center",padding:"10px",justifyContent:"center"}}>
                  count
                </div>
              </div>
          {Object.keys(products).map((productId) => {
            const product = products[productId];
            return (
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}} key={productId}>
                <div style={{width:"30%"}}>{product.name} </div>
                <div style={{width:"30%"}}>${product.price}</div>
                <div style={{width:"40%",display:"flex",justifyContent:"space-between",alignItems:"center",padding:"10px"}}>
                  <button onClick={() => handleRemoveProduct(product)}>-</button>&nbsp;&nbsp;{product.count}&nbsp;&nbsp;
                  <button onClick={() => handleAddProduct(product)}>+</button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ProductList;
