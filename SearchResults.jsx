// src/SearchResults.jsx
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';

const SearchResults = ({ products, featuredProducts, newProducts, renderProductCard }) => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get('query') || '';

  const [searchTerm, setSearchTerm] = useState(query);
  const [sortOption, setSortOption] = useState('default');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);

  // Combine all products
  const allProducts = [...products, ...featuredProducts, ...newProducts];

  // Categories for filtering
  const categories = ['all', 'fruits', 'vegetables', 'dairy', 'snacks', 'beverages', 'cereals'];

  // Filter and sort products
  const filteredProducts = allProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || 
      (categoryFilter === 'fruits' && ['Organic Apples', 'Organic Avocados', 'Fresh Strawberries', 'Organic Blueberries'].includes(product.name)) ||
      (categoryFilter === 'vegetables' && ['Organic Baby Spinach', 'Organic Tomatoes'].includes(product.name)) ||
      (categoryFilter === 'dairy' && ['Organic Almond Milk'].includes(product.name)) ||
      (categoryFilter === 'snacks' && ['Whole Wheat Sandwich Bread', 'Organic Almonds', 'Organic Chia Seeds'].includes(product.name)) ||
      (categoryFilter === 'beverages' && ['Organic Coconut Oil'].includes(product.name)) ||
      (categoryFilter === 'cereals' && ['Organic Quinoa'].includes(product.name));
    return matchesSearch && matchesCategory;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortOption) {
      case 'price-low-to-high':
        return a.price - b.price;
      case 'price-high-to-low':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      default:
        return 0;
    }
  });

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = sortedProducts.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);

  useEffect(() => {
    setSearchTerm(query);
    setCurrentPage(1); // Reset to first page on new search
  }, [query]);

  const handleSearch = (e) => {
    e.preventDefault();
    window.history.pushState({}, '', `/search?query=${encodeURIComponent(searchTerm)}`);
  };

  return (
    <Container className="py-5">
      <h2 className="section-title text-center mb-4">Search Results for "{searchTerm}"</h2>
      <p className="text-center text-muted mb-4">
        {sortedProducts.length} products found.
      </p>

      {/* Filters */}
      <Row className="mb-4">
        <Col md={4}>
          <Form onSubmit={handleSearch} className="d-flex">
            <Form.Control
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search products..."
              className="me-2"
            />
            <Button variant="primary" type="submit">
              <i className="fas fa-search"></i>
            </Button>
          </Form>
        </Col>
        <Col md={4}>
          <Form.Select value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
            <option value="default">Sort by: Default</option>
            <option value="price-low-to-high">Price: Low to High</option>
            <option value="price-high-to-low">Price: High to Low</option>
            <option value="rating">Rating</option>
          </Form.Select>
        </Col>
        <Col md={4}>
          <Form.Select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </option>
            ))}
          </Form.Select>
        </Col>
      </Row>

      {/* Product Grid */}
      <Row>
        {currentProducts.length === 0 ? (
          <Col>
            <p className="text-center text-muted">No products found.</p>
          </Col>
        ) : (
          currentProducts.map(product => renderProductCard(product))
        )}
      </Row>

      {/* Pagination */}
      {totalPages > 1 && (
        <Row className="mt-4">
          <Col className="d-flex justify-content-center">
            <Button
              variant="outline-primary"
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="me-2"
            >
              Previous
            </Button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <Button
                key={page}
                variant={currentPage === page ? 'primary' : 'outline-primary'}
                onClick={() => setCurrentPage(page)}
                className="me-2"
              >
                {page}
              </Button>
            ))}
            <Button
              variant="outline-primary"
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
          </Col>
        </Row>
      )}
    </Container>
  );
};

// Add custom CSS for Organic theme styling
const styles = `
  .section-title {
    font-size: 2.5rem;
    color: #2a2a2a;
    font-weight: 700;
    margin-bottom: 20px;
  }
`;

const styleSheet = document.createElement('style');
styleSheet.textContent = styles;
document.head.appendChild(styleSheet);

export default SearchResults;