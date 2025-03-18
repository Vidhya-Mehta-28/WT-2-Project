const Product = require('../models/productModel');

// Mock data as fallback
const mockProducts = [
  { name: 'Whole Wheat Sandwich Bread', price: 18.00, originalPrice: 20.00, discount: 10, rating: 4.5, reviews: 22, image: '/images/chip1.jpeg' },
  { name: 'Organic Baby Spinach', price: 15.00, originalPrice: 18.00, discount: 17, rating: 4.0, reviews: 15, image: '/images/spinach.jpeg' },
  { name: 'Organic Apples', price: 15.00, originalPrice: 17.00, discount: 12, rating: 4.8, reviews: 25, image: '/images/apples.jpeg' },
  { name: 'Organic Almonds', price: 22.00, originalPrice: 25.00, discount: 12, rating: 4.2, reviews: 18, image: '/images/almonds.jpeg' },
];

const mockFeaturedProducts = [
  { name: 'Organic Avocados', price: 12.00, originalPrice: 15.00, discount: 20, rating: 4.7, reviews: 30, image: '/images/mango.jpeg', isFeatured: true },
  { name: 'Fresh Strawberries', price: 10.00, originalPrice: 12.00, discount: 17, rating: 4.9, reviews: 40, image: '/images/strawberries.jpeg', isFeatured: true },
  { name: 'Organic Almond Milk', price: 8.00, originalPrice: 10.00, discount: 20, rating: 4.3, reviews: 25, image: '/images/almond-milk.jpeg', isFeatured: true },
  { name: 'Organic Quinoa', price: 14.00, originalPrice: 16.00, discount: 13, rating: 4.5, reviews: 28, image: '/images/quinoa.jpeg', isFeatured: true },
];

const mockNewProducts = [
  { name: 'Organic Blueberries', price: 9.00, originalPrice: 11.00, discount: 18, rating: 4.6, reviews: 22, image: '/images/blueberries.jpeg', isNew: true },
  { name: 'Organic Chia Seeds', price: 13.00, originalPrice: 15.00, discount: 13, rating: 4.3, reviews: 18, image: '/images/chia-seeds.jpeg', isNew: true },
  { name: 'Organic Coconut Oil', price: 16.00, originalPrice: 18.00, discount: 11, rating: 4.7, reviews: 30, image: '/images/coconut-oil.jpeg', isNew: true },
  { name: 'Organic Tomatoes', price: 7.00, originalPrice: 9.00, discount: 22, rating: 4.2, reviews: 15, image: '/images/tomatoes.jpeg', isNew: true },
];

// Get all products
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    if (products.length === 0) {
      return res.status(200).json(mockProducts);
    }
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get featured products
exports.getFeaturedProducts = async (req, res) => {
  try {
    const products = await Product.find({ isFeatured: true });
    if (products.length === 0) {
      return res.status(200).json(mockFeaturedProducts);
    }
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get new products
exports.getNewProducts = async (req, res) => {
  try {
    const products = await Product.find({ isNew: true });
    if (products.length === 0) {
      return res.status(200).json(mockNewProducts);
    }
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add a product
exports.addProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};