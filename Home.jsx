import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';

const Home = ({ renderCategoryCard, renderBestSellingCard, renderProductCard, products, featuredProducts, newProducts, error, handleViewAll }) => {
  // Categories data (previous setup)
  const categories = [
    { id: '1', image: '/images/mango.jpeg' },
    { id: '2', image: '/images/chip1.jpeg' },
    { id: '3', image: '/images/dairy.jpeg' },
    { id: '4', image: '/images/pepsi.jpeg' },
    { id: '5', image: '/images/kellogs.jpeg' },
    { id: '6', image: '/images/scopes.jpeg' },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="hero-area">
        <div className="hero-overlay"></div>
        <Container className="hero-content">
          <h1 className="hero-title">Organic Foods at your Doorsteps</h1>
          <p className="hero-subtitle">Fresh, Sustainable, Delivered.</p>
          <div className="hero-btn">
            <Button variant="primary" className="me-3">Start Shopping</Button>
            <Button variant="outline-light">Join Now</Button>
          </div>
        </Container>
      </section>

      {/* Display Error if Fetch Fails */}
      {error && (
        <Container className="py-4">
          <div className="alert alert-warning text-center" role="alert">
            {error}
          </div>
        </Container>
      )}

      {/* Category Section */}
      <section className="categories-area section-padding">
        <Container>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="section-title">Explore Categories</h2>
            <Button variant="primary" className="view-all-btn">View All</Button>
          </div>
          <Row>
            {categories.map(category => (
              <React.Fragment key={category.id}>
                {renderCategoryCard("", category.image)}
              </React.Fragment>
            ))}
          </Row>
        </Container>
      </section>

      {/* Best Selling Products */}
      <section className="best-selling-section section-padding">
        <Container>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="section-title">Best Selling Products</h2>
            <Button variant="primary" className="view-all-btn" onClick={() => handleViewAll('best-selling')}>
              View All
            </Button>
          </div>
          <Row>
            {products.length === 0 ? (
              <Col>
                <p className="text-center text-muted">No products available.</p>
              </Col>
            ) : (
              products.map(product => renderBestSellingCard(product))
            )}
          </Row>
        </Container>
      </section>

      {/* Featured Products */}
      <section className="product-area section-padding bg-light">
        <Container>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="section-title">Featured Products</h2>
            <Button variant="primary" className="view-all-btn" onClick={() => handleViewAll('featured')}>
              View All
            </Button>
          </div>
          <Row>
            {featuredProducts.length === 0 ? (
              <Col>
                <p className="text-center text-muted">No featured products available.</p>
              </Col>
            ) : (
              featuredProducts.map(product => renderProductCard(product))
            )}
          </Row>
        </Container>
      </section>

      {/* New Products */}
      <section className="product-area section-padding">
        <Container>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="section-title">Just Arrived</h2>
            <Button variant="primary" className="view-all-btn" onClick={() => handleViewAll('new')}>
              View All
            </Button>
          </div>
          <Row>
            {newProducts.length === 0 ? (
              <Col>
                <p className="text-center text-muted">No new products available.</p>
              </Col>
            ) : (
              newProducts.map(product => renderProductCard(product))
            )}
          </Row>
        </Container>
      </section>
    </>
  );
};

export default Home;