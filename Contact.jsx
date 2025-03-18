// src/Contact.jsx
import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate form submission (replace with actual API call)
    if (formData.name && formData.email && formData.subject && formData.message) {
      setShowSuccess(true);
      setShowError(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setShowSuccess(false), 3000);
    } else {
      setShowError(true);
      setShowSuccess(false);
    }
  };

  return (
    <Container className="py-5">
      {/* Header Section */}
      <h2 className="section-title text-center mb-4">Contact Us</h2>
      <p className="text-center text-muted mb-5">
        We’d love to hear from you! Reach out with any questions or feedback.
      </p>

      {/* Contact Form */}
      <Row className="justify-content-center">
        <Col md={8}>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formSubject">
              <Form.Label>Subject</Form.Label>
              <Form.Control
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="Enter subject"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formMessage">
              <Form.Label>Message</Form.Label>
              <Form.Control
                as="textarea"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={4}
                placeholder="Your message here"
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100 modern-btn">
              Send Message
            </Button>

            {showSuccess && (
              <Alert variant="success" className="mt-3">
                Thank you! Your message has been sent successfully.
              </Alert>
            )}
            {showError && (
              <Alert variant="danger" className="mt-3">
                Please fill out all fields correctly.
              </Alert>
            )}
          </Form>
        </Col>
      </Row>

      {/* Contact Details */}
      <Row className="mt-5">
        <Col md={4} className="text-center mb-4">
          <i className="fas fa-map-marker-alt fa-2x text-primary mb-2"></i>
          <h5>Address</h5>
          <p className="text-muted">123 Organic Lane, Green City, GC 12345</p>
        </Col>
        <Col md={4} className="text-center mb-4">
          <i className="fas fa-envelope fa-2x text-primary mb-2"></i>
          <h5>Email</h5>
          <p className="text-muted">info@organicshop.com</p>
        </Col>
        <Col md={4} className="text-center mb-4">
          <i className="fas fa-phone fa-2x text-primary mb-2"></i>
          <h5>Phone</h5>
          <p className="text-muted">+1-234-567-890</p>
        </Col>
      </Row>

      {/* Map Section (Placeholder) */}
      <Row className="mt-5">
        <Col>
          <div style={{ height: '300px', background: '#e9ecef', borderRadius: '10px' }}>
            <p className="text-center pt-5 text-muted">
              Map Placeholder (Integrate Google Maps API here)
            </p>
          </div>
        </Col>
      </Row>
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
  .modern-btn {
    background: #7fad39;
    border: none;
    padding: 10px;
    font-weight: 600;
    border-radius: 5px;
    transition: all 0.3s ease;
  }
  .modern-btn:hover {
    background: #6e9632;
  }
`;

const styleSheet = document.createElement('style');
styleSheet.textContent = styles;
document.head.appendChild(styleSheet);

export default Contact;