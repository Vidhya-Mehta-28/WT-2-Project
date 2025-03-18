const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.json([
    { _id: '1', name: 'Whole Wheat Sandwich Bread', price: 18.00, originalPrice: 20.00, discount: 10, rating: 4.5, reviews: 22, image: '/images/chip1.jpeg' },
    // Add other mock products as needed
  ]);
});

router.get('/featured', (req, res) => {
  res.json([
    { _id: '5', name: 'Organic Avocados', price: 12.00, originalPrice: 15.00, discount: 20, rating: 4.7, reviews: 30, image: '/images/mango.jpeg', isFeatured: true },
    // Add other mock featured products
  ]);
});

router.get('/new', (req, res) => {
  res.json([
    { _id: '9', name: 'Organic Blueberries', price: 9.00, originalPrice: 11.00, discount: 18, rating: 4.6, reviews: 22, image: '/images/pepsi.jpeg', isNew: true },
    // Add other mock new products
  ]);
});

module.exports = router;