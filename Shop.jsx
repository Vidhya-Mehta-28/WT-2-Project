import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Shop = ({ renderProductCard, products, featuredProducts, newProducts }) => {
  const allProducts = [...products, ...featuredProducts, ...newProducts];

  return (
    <Container className="py-5">
      <h2 className="section-title text-center mb-4">Shop All Products</h2>
      <Row>
        {allProducts.length === 0 ? (
          <Col>
            <p className="text-center text-muted">No products available.</p>
          </Col>
        ) : (
          allProducts.map(product => renderProductCard(product))
        )}
      </Row>
    </Container>
  );
};

export default Shop;