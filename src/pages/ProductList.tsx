import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AddProduct from './AddProduct';

interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
}

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const fetchProducts = async () => {
    const token = localStorage.getItem('token');
    const response = await axios.get('/api/products', {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log(response.data);
    setProducts(response.data);
  };
  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id: string) => {
    console.log(id)
    const token = localStorage.getItem('token');
    await axios.delete(`/api/products/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setProducts(products.filter(product => product.id !== id));
  };
  const handleProductAdded = () => {
    fetchProducts();
  };
  return (
    <div className="container mt-5">
      <AddProduct onProductAdded={handleProductAdded} />
      <h3>Product List</h3>
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {
          products.map(product => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>{product.price}</td>
              <td>{product.description}</td>
              <td>
                <button className="btn btn-danger" onClick={() => handleDelete(product.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {products.length === 0 && (<div className='text-center fs-4'><span className='text-danger'>Oops!</span> No items in your inventory!</div>)}
    </div>
  );
};

export default ProductList;