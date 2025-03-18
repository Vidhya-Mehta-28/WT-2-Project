// src/About.jsx
import React from 'react';
import { Container, Row, Col, Card, Image } from 'react-bootstrap';

const About = () => {
  return (
    <Container className="py-5">
      {/* Header Section */}
      <h2 className="section-title text-center mb-4">About Us</h2>
      <p className="text-center text-muted mb-5">
        Discover the story behind Organic Shop and our commitment to sustainable living.
      </p>

      {/* Mission Section */}
      <Row className="align-items-center mb-5">
        <Col md={6} className="mb-4 mb-md-0">
          <Image
            src="https://images.unsplash.com/photo-1505576399279-565b52d4ac71"
            alt="Organic Farm"
            fluid
            className="rounded shadow-sm"
          />
        </Col>
        <Col md={6}>
          <h3 className="section-subtitle">Our Mission</h3>
          <p>
            At Organic Shop, our mission is to deliver the freshest, sustainably sourced organic products to your doorstep. We believe in promoting a healthier lifestyle by offering chemical-free fruits, vegetables, and groceries while supporting local farmers and reducing our carbon footprint.
          </p>
          <p>
            Founded with a passion for nature, we strive to make organic living accessible to everyone, blending tradition with innovation to meet modern needs.
          </p>
        </Col>
      </Row>

      {/* History Section */}
      <Row className="align-items-center flex-md-row-reverse mb-5">
        <Col md={6} className="mb-4 mb-md-0">
          <Image
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c"
            alt="Organic Market"
            fluid
            className="rounded shadow-sm"
          />
        </Col>
        <Col md={6}>
          <h3 className="section-subtitle">Our History</h3>
          <p>
            Established in 2020, Organic Shop began as a small family-run business dedicated to providing organic produce to local communities. Over the years, we’ve grown into a trusted name in the organic industry, expanding our reach while staying true to our roots.
          </p>
          <p>
            Today, we partner with over 50 local farmers and suppliers to bring you the best selection of organic goods, all while maintaining strict quality standards.
          </p>
        </Col>
      </Row>

      {/* Team Section */}
      <Row>
        <h3 className="section-subtitle text-center mb-4">Meet Our Team</h3>
        <Col md={4} className="mb-4">
          <Card className="text-center border-0 shadow-sm">
            <Card.Img
              variant="top"
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d"
              alt="Team Member 1"
              className="rounded-circle"
              style={{ width: '150px', height: '150px', objectFit: 'cover', margin: '0 auto' }}
            />
            <Card.Body>
              <Card.Title>Jane Doe</Card.Title>
              <Card.Text className="text-muted">Founder & CEO</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4} className="mb-4">
          <Card className="text-center border-0 shadow-sm">
            <Card.Img
              variant="top"
              src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61"
              alt="Team Member 2"
              className="rounded-circle"
              style={{ width: '150px', height: '150px', objectFit: 'cover', margin: '0 auto' }}
            />
            <Card.Body>
              <Card.Title>John Smith</Card.Title>
              <Card.Text className="text-muted">Operations Manager</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4} className="mb-4">
          <Card className="text-center border-0 shadow-sm">
            <Card.Img
              variant="top"
              src="https://images.unsplash.com/photo-1607746882042-944635dfe10e"
              alt="Team Member 3"
              className="rounded-circle"
              style={{ width: '150px', height: '150px', objectFit: 'cover', margin: '0 auto' }}
            />
            <Card.Body>
              <Card.Title>Emily Brown</Card.Title>
              <Card.Text className="text-muted">Marketing Lead</Card.Text>
            </Card.Body>
          </Card>
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
  .section-subtitle {
    font-size: 1.8rem;
    color: #7fad39;
    font-weight: 600;
    margin-bottom: 15px;
  }
  .shadow-sm {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
  }
  .shadow-sm:hover {
    box-shadow: 0 6px 18px rgba(0, 0, 0, 0.15);
    transform: translateY(-5px);
  }
`;

const styleSheet = document.createElement('style');
styleSheet.textContent = styles;
document.head.appendChild(styleSheet);

export default About;