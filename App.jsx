import { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Row, Col, Button, Offcanvas, Badge, Form, InputGroup, Navbar, Nav } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from 'react-router-dom';
import './App.css';

// Import Pages
import Home from './Home';
import Shop from './Shop';
import About from './About';
import Contact from './Contact';
import SearchResults from './SearchResults';

function App() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [newProducts, setNewProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [error, setError] = useState(null);
  const [showViewAll, setShowViewAll] = useState(false);
  const [viewAllType, setViewAllType] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState('default');

  // Mock data (unchanged)
  const mockProducts = [
    { _id: '1', name: 'Whole Wheat Sandwich Bread', price: 18.00, originalPrice: 20.00, discount: 10, rating: 4.5, reviews: 22, image: 'https://images.unsplash.com/photo-1543339308-43e59d6b73a6' },
    { _id: '2', name: 'Organic Baby Spinach', price: 15.00, originalPrice: 18.00, discount: 17, rating: 4.0, reviews: 15, image: 'https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5b' },
    { _id: '3', name: 'Organic Apples', price: 15.00, originalPrice: 17.00, discount: 12, rating: 4.8, reviews: 25, image: 'https://images.unsplash.com/photo-1570913149827-2782bf00607c' },
    { _id: '4', name: 'Organic Almonds', price: 22.00, originalPrice: 25.00, discount: 12, rating: 4.2, reviews: 18, image: 'https://images.unsplash.com/photo-1608270586620-2487806f2270' },
  ];

  const mockFeaturedProducts = [
    { _id: '5', name: 'Organic Avocados', price: 12.00, originalPrice: 15.00, discount: 20, rating: 4.7, reviews: 30, image: 'https://images.unsplash.com/photo-1519162584292-56dfc9eb5db4', isFeatured: true },
    { _id: '6', name: 'Fresh Strawberries', price: 10.00, originalPrice: 12.00, discount: 17, rating: 4.9, reviews: 40, image: 'https://images.unsplash.com/photo-1587393855524-087f83d2b045', isFeatured: true },
    { _id: '7', name: 'Organic Almond Milk', price: 8.00, originalPrice: 10.00, discount: 20, rating: 4.3, reviews: 25, image: 'https://images.unsplash.com/photo-1615485290219-951d9d8e6688', isFeatured: true },
    { _id: '8', name: 'Organic Quinoa', price: 14.00, originalPrice: 16.00, discount: 13, rating: 4.5, reviews: 28, image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff', isFeatured: true },
  ];

  const mockNewProducts = [
    { _id: '9', name: 'Organic Blueberries', price: 9.00, originalPrice: 11.00, discount: 18, rating: 4.6, reviews: 22, image: 'https://images.unsplash.com/photo-1498557850523-fd3d118b962e', isNew: true },
    { _id: '10', name: 'Organic Chia Seeds', price: 13.00, originalPrice: 15.00, discount: 13, rating: 4.3, reviews: 18, image: 'https://images.unsplash.com/photo-1615484477778-7bc5a5a7d3d1', isNew: true },
    { _id: '11', name: 'Organic Coconut Oil', price: 16.00, originalPrice: 18.00, discount: 11, rating: 4.7, reviews: 30, image: 'https://images.unsplash.com/photo-1584275556685-24c5c1a68b2f', isNew: true },
    { _id: '12', name: 'Organic Tomatoes', price: 7.00, originalPrice: 9.00, discount: 22, rating: 4.2, reviews: 15, image: 'https://images.unsplash.com/photo-1590859808308-3d2d9c515b1a', isNew: true },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsRes, featuredRes, newRes] = await Promise.all([
          axios.get('/api/products'),
          axios.get('/api/products/featured'),
          axios.get('/api/products/new')
        ]);
        setProducts(productsRes.data || mockProducts);
        setFeaturedProducts(featuredRes.data || mockFeaturedProducts);
        setNewProducts(newRes.data || mockNewProducts);
      } catch (err) {
        console.error('Fetch Error:', err);
        setError('Failed to load products. Using mock data.');
        setProducts(mockProducts);
        setFeaturedProducts(mockFeaturedProducts);
        setNewProducts(mockNewProducts);
      }
    };
    fetchData();
  }, []);

  // Deduplicate products for search suggestions
  const allProducts = [...products, ...featuredProducts, ...newProducts];
  const uniqueProducts = Array.from(new Map(allProducts.map(product => [product._id, product])).values());

  const addToCart = (product, quantity = 1) => {
    const productId = product._id?.toString() || Math.random().toString();
    const existingItem = cart.find(item => item._id?.toString() === productId);
    if (existingItem) {
      setCart(cart.map(item =>
        item._id?.toString() === productId ? { ...item, quantity: item.quantity + quantity } : item
      ));
    } else {
      setCart([...cart, { ...product, _id: productId, quantity }]);
    }
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item._id?.toString() !== productId));
  };

  const handleViewAll = (type) => {
    setViewAllType(type);
    setShowViewAll(true);
  };

  const getViewAllProducts = () => {
    let filteredProducts = [];
    switch (viewAllType) {
      case 'best-selling':
        filteredProducts = products;
        break;
      case 'featured':
        filteredProducts = products.filter(p => p.isFeatured);
        break;
      case 'new':
        filteredProducts = products.filter(p => p.isNew);
        break;
      default:
        filteredProducts = [];
    }

    if (searchQuery) {
      filteredProducts = filteredProducts.filter(p =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    switch (sortOption) {
      case 'price-low-to-high':
        filteredProducts.sort((a, b) => a.price - b.price);
        break;
      case 'price-high-to-low':
        filteredProducts.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filteredProducts.sort((a, b) => b.rating - a.rating);
        break;
      default:
        break;
    }

    return filteredProducts.slice(0, 12);
  };

  const handleSearch = (query) => {
    // Search handled by navigate
  };

  const renderCategoryCard = (category, image) => (
    <Col xs={6} sm={3} md={2} className="mb-4 text-center">
      <div className="category-card">
        <img
          src={image || 'https://via.placeholder.com/150'}
          alt={category}
          className="category-img"
          onError={(e) => (e.target.src = 'https://via.placeholder.com/150')}
        />
        <p className="category-title">{category || 'Category'}</p>
      </div>
    </Col>
  );

  const renderBestSellingCard = (product) => (
    <Col xs={6} sm={4} md={3} className="mb-4 text-center">
      <div className="best-selling-card">
        <img
          src={product.image || 'https://via.placeholder.com/200'}
          alt={product.name}
          className="best-selling-img"
          onError={(e) => (e.target.src = 'https://via.placeholder.com/200')}
        />
      </div>
    </Col>
  );

  const renderProductCard = (product) => (
    <Col xs={12} sm={6} md={4} lg={3} className="mb-4">
      <div className="product-card">
        <div className="product-img-wrapper">
          <img
            src={product.image || 'https://via.placeholder.com/250'}
            alt={product.name}
            className="product-img"
            loading="lazy"
            onError={(e) => (e.target.src = 'https://via.placeholder.com/250')}
          />
          {product.discount && (
            <Badge className="product-discount-badge">{product.discount}% OFF</Badge>
          )}
        </div>
        <div className="card-body text-center">
          <h5 className="card-title product-title">{product.name}</h5>
          <div className="mb-2">
            {[...Array(Math.floor(product.rating || 0))].map((_, i) => (
              <span key={i} className="text-warning">★</span>
            ))}
            {product.rating % 1 !== 0 && <span className="text-warning">½</span>}
            <span className="ms-1 text-muted">({product.reviews || 0})</span>
          </div>
          <div className="d-flex justify-content-center align-items-center gap-2">
            {product.originalPrice && <del className="text-muted">${product.originalPrice.toFixed(2)}</del>}
            <span className="fw-bold text-primary">${product.price.toFixed(2)}</span>
          </div>
        </div>
        <div className="card-footer bg-transparent border-0">
          <Row className="g-2 align-items-center">
            <Col xs={3}>
              <input
                type="number"
                className="form-control product-input"
                defaultValue="1"
                min="1"
                id={`quantity-${product._id}`}
              />
            </Col>
            <Col xs={9}>
              <Button
                variant="primary"
                size="sm"
                onClick={() => {
                  const quantity = parseInt(document.getElementById(`quantity-${product._id}`).value) || 1;
                  addToCart(product, quantity);
                }}
                className="w-100 modern-btn"
              >
                Add to Cart
              </Button>
            </Col>
          </Row>
        </div>
      </div>
    </Col>
  );

  const renderViewAllCards = () => (
    <Row className="g-4">
      {getViewAllProducts().map(product => renderProductCard(product))}
      {getViewAllProducts().length === 0 && (
        <Col>
          <p className="text-center text-muted">No products found.</p>
        </Col>
      )}
    </Row>
  );

  return (
    <div className="App">
      {/* Header */}
      <header className="header-area header-sticky">
        <Container>
          <Navbar expand="lg" className="main-nav">
            <Navbar.Brand as={Link} to="/">
              <img src="/images/ecommerce.png" alt="Organic Logo" className="img-fluid" />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarNav" />
            <Navbar.Collapse id="navbarNav">
              <Nav className="mx-auto">
                <Nav.Link as={Link} to="/" className="nav-item active">
                  <span>Home</span>
                </Nav.Link>
                <Nav.Link as={Link} to="/shop" className="nav-item">
                  <span>Shop</span>
                </Nav.Link>
                <Nav.Link as={Link} to="/about" className="nav-item">
                  <span>About</span>
                </Nav.Link>
                <Nav.Link as={Link} to="/contact" className="nav-item">
                  <span>Contact</span>
                </Nav.Link>
                <Nav.Link as={Link} to="#" className="nav-item">
                  <span>Blog</span>
                </Nav.Link>
              </Nav>
              <div className="search-input">
                <InputGroup>
                  <Form.Control
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        handleSearch(searchQuery);
                        navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
                      }
                    }}
                    className="search-input-field"
                    autoComplete="off"
                    list="search-suggestions"
                  />
                  <datalist id="search-suggestions">
                    {uniqueProducts.map((product, index) => (
                      <option key={`${product._id}-${index}`} value={product.name} />
                    ))}
                  </datalist>
                  <Button
                    variant="primary"
                    onClick={() => {
                      handleSearch(searchQuery);
                      navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
                    }}
                    className="search-btn"
                  >
                    <i className="fas fa-search"></i>
                  </Button>
                </InputGroup>
              </div>
              <ul className="nav">
                <li>
                  <a href="#"><i className="fas fa-user"></i></a>
                </li>
                <li className="cart">
                  <a onClick={() => setShowCart(true)}>
                    <i className="fas fa-shopping-cart"></i>
                    <span>{cart.reduce((sum, item) => sum + item.quantity, 0)}</span>
                  </a>
                </li>
              </ul>
            </Navbar.Collapse>
          </Navbar>
        </Container>
      </header>

      {/* Routes */}
      <Routes>
        <Route
          path="/"
          element={
            <Home
              renderCategoryCard={renderCategoryCard}
              renderBestSellingCard={renderBestSellingCard}
              renderProductCard={renderProductCard}
              products={products}
              featuredProducts={featuredProducts}
              newProducts={newProducts}
              error={error}
              handleViewAll={handleViewAll}
            />
          }
        />
        <Route
          path="/shop"
          element={
            <Shop
              renderProductCard={renderProductCard}
              products={products}
              featuredProducts={featuredProducts}
              newProducts={newProducts}
            />
          }
        />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route
          path="/search"
          element={
            <SearchResults
              products={products}
              featuredProducts={featuredProducts}
              newProducts={newProducts}
              renderProductCard={renderProductCard}
            />
          }
        />
      </Routes>

      {/* View All Offcanvas */}
      <Offcanvas show={showViewAll} onHide={() => setShowViewAll(false)} placement="end" className="view-all-offcanvas" backdrop={true}>
        <Offcanvas.Header closeButton className="offcanvas-header-custom">
          <Offcanvas.Title className="text-white">
            <i className="fas fa-list me-2"></i>
            {viewAllType === 'best-selling' && 'All Best Selling Products'}
            {viewAllType === 'featured' && 'All Featured Products'}
            {viewAllType === 'new' && 'All New Products'}
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div className="view-all-filters mb-4 p-3 bg-light rounded-3 shadow-sm">
            <InputGroup className="mb-3">
              <Form.Control
                type="text"
                placeholder="Search products (e.g., 'Organic Apples', 'Avocado')..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="filter-input"
                autoComplete="off"
                list="product-suggestions"
              />
              <datalist id="product-suggestions">
                {uniqueProducts.map((product, index) => (
                  <option key={`${product._id}-${index}`} value={product.name} />
                ))}
              </datalist>
              <Button variant="primary" className="filter-btn">
                <i className="fas fa-search"></i>
              </Button>
            </InputGroup>
            <Form.Select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="filter-select"
            >
              <option value="default">Sort by: Default</option>
              <option value="price-low-to-high">Price: Low to High</option>
              <option value="price-high-to-low">Price: High to Low</option>
              <option value="rating">Rating</option>
            </Form.Select>
          </div>
          {renderViewAllCards()}
          {getViewAllProducts().length >= 12 && (
            <div className="text-center mt-4">
              <Button variant="primary" className="load-more-btn">
                Load More <i className="fas fa-arrow-down ms-2"></i>
              </Button>
            </div>
          )}
        </Offcanvas.Body>
      </Offcanvas>

      {/* Cart Offcanvas */}
      <Offcanvas show={showCart} onHide={() => setShowCart(false)} placement="end" className="cart-offcanvas">
        <Offcanvas.Header closeButton className="offcanvas-header-custom">
          <Offcanvas.Title className="text-white">
            Your Cart <Badge bg="primary">{cart.length}</Badge>
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {cart.length === 0 ? (
            <p className="text-center text-muted">Your cart is empty.</p>
          ) : (
            <>
              <ul className="list-group">
                {cart.map((item) => (
                  <li key={item._id} className="list-group-item d-flex justify-content-between align-items-center">
                    <div>
                      <h6 className="my-0 section-title">{item.name}</h6>
                      <small className="text-muted">Qty: {item.quantity}</small>
                    </div>
                    <div>
                      <span className="fw-bold">${(item.price * item.quantity).toFixed(2)}</span>
                      <Button
                        variant="link"
                        className="text-danger p-0 ms-2"
                        onClick={() => removeFromCart(item._id)}
                      >
                        ×
                      </Button>
                    </div>
                  </li>
                ))}
                <li className="list-group-item d-flex justify-content-between fw-bold bg-light">
                  <span>Total (USD)</span>
                  <span>${cart.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2)}</span>
                </li>
              </ul>
              <Button variant="primary" className="w-100 mt-3 modern-btn">Proceed to Checkout</Button>
            </>
          )}
        </Offcanvas.Body>
      </Offcanvas>

      {/* Footer */}
      <footer className="main-footer">
        <div className="footer-top-area">
          <Container>
            <Row>
              <Col md={4} className="mb-4">
                <div className="footer-widget about-widget">
                  <h5 className="footer-title">Organic Shop</h5>
                  <p className="text-muted">
                    We deliver the freshest organic products right to your doorstep. Shop with us for a healthier lifestyle!
                  </p>
                  <ul className="list-wrap">
                    <li><a href="#"><i className="fab fa-facebook-f"></i></a></li>
                    <li><a href="#"><i className="fab fa-twitter"></i></a></li>
                    <li><a href="#"><i className="fab fa-instagram"></i></a></li>
                    <li><a href="#"><i className="fab fa-linkedin-in"></i></a></li>
                  </ul>
                </div>
              </Col>
              <Col md={4} className="mb-4">
                <div className="footer-widget">
                  <h5 className="footer-title">Quick Links</h5>
                  <ul className="footer-list">
                    <li><Link to="/" className="footer-link">Home</Link></li>
                    <li><Link to="/shop" className="footer-link">Shop</Link></li>
                    <li><Link to="/about" className="footer-link">About Us</Link></li>
                    <li><Link to="/contact" className="footer-link">Contact</Link></li>
                  </ul>
                </div>
              </Col>
              <Col md={4} className="mb-4">
                <div className="footer-widget">
                  <h5 className="footer-title">Follow Us</h5>
                  <ul className="list-wrap">
                    <li><a href="#" className="social-icon"><i className="fab fa-facebook-f"></i></a></li>
                    <li><a href="#" className="social-icon"><i className="fab fa-twitter"></i></a></li>
                    <li><a href="#" className="social-icon"><i className="fab fa-instagram"></i></a></li>
                    <li><a href="#" className="social-icon"><i className="fab fa-linkedin-in"></i></a></li>
                  </ul>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
        <div className="footer-bottom-area">
          <Container>
            <Row className="align-items-center">
              <Col md={12}>
                <div className="copyright text-center">
                  <p>© 2025 Organic Shop. All rights reserved.</p>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </footer>
    </div>
  );
}

export default function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}