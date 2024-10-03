import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Accordion, Card, Button, Form, Row, Col } from 'react-bootstrap';
interface AddProductProps {
  onProductAdded: () => void;
}

const AddProduct: React.FC<AddProductProps> = ({ onProductAdded }) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      await axios.post('/api/products', { name, price, description }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      onProductAdded();
      setName('');
      setPrice('');
      setDescription('');
      
      navigate('/products');
    } catch (error) {
      console.error('Add product failed', error);
    }
  };

  return (
    // <div className="container mt-5">
    //   <h2>Add Product</h2>
    //   <form onSubmit={handleAddProduct}>
        
    //       <input
    //         type="text"
           
    //         id="name"
    //         value={name}
    //         onChange={(e) => setName(e.target.value)}
    //         placeholder='Product Name'
    //         required
    //       />
    //     <input
    //         type="number"
            
    //         id="price"
    //         value={price}
    //         onChange={(e) => setPrice(e.target.value)}
    //         placeholder='Price($)'
    //         min={1}
    //         step={1}
    //         required
    //       />
    //     <textarea
           
    //         id="description"
    //         value={description}
    //         onChange={(e) => setDescription(e.target.value)}
    //         placeholder='Description'
    //         required
    //       />
       
    //     <button type="submit" className="btn btn-primary">Add Product</button>
    //   </form>
    // </div>
    <div className="container">
    <Accordion className="mb-4 drop_shadow">
    <Accordion.Item eventKey="0" >
      <Accordion.Header><span className="fs-5">Add New Product</span></Accordion.Header>
      <Accordion.Body >
        <Form onSubmit={handleAddProduct}>
          <Form.Group as={Row} className="mb-3">
            <Col md={6}>
              <Form.Control
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Product Name"
                required
              />
            </Col>
            <Col md={6}>
              <Form.Control
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Price ($)"
                min={1}
                step={1}
                required
              />
            </Col>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control
              as="textarea"
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description"
              required
            />
          </Form.Group>
          <Button type="submit" variant="primary">Add Product</Button>
        </Form>
      </Accordion.Body>
    </Accordion.Item>
  </Accordion>
  </div>
  );

};

export default AddProduct;