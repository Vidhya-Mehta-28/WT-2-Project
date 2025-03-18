const Product = require('./models/productModel');
const mockProducts = require('./controllers/productController').mockProducts;
const mockFeaturedProducts = require('./controllers/productController').mockFeaturedProducts;
const mockNewProducts = require('./controllers/productController').mockNewProducts;

const seedDB = async () => {
  await Product.deleteMany({});
  await Product.insertMany([...mockProducts, ...mockFeaturedProducts, ...mockNewProducts]);
  console.log('Database seeded!');
  process.exit();
};

seedDB().catch(err => console.error(err));