import express from 'express';
import Cart from '../models/Cart.js';
import Product from '../models/Products.js';

const cartRouter = express.Router();

cartRouter.post('/add-to-cart/:productId', async (req, res) => {
  const { productId } = req.params;
  const { userId } = req.body;
  
  try {
    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      cart = new Cart({ user: userId, products: [] });
    }

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ error: 'Product not found.' });
    }

    const existingProductIndex = cart.products.findIndex(
      item => item.product.toString() === productId
    );

    if (existingProductIndex !== -1) {
      cart.products[existingProductIndex].quantity += 1;
    } else {
      cart.products.push({ product: productId, quantity: 1 });
    }

    cart.totalPrice += product.price;

    await cart.save();

    return res.status(200).json({ message: 'Product added to cart successfully.', cart });
  } catch (error) {
    console.error('Error adding product to cart:', error);
    return res.status(500).json({ error: 'Internal server error.' });
  }
});

cartRouter.get('/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    const cart = await Cart.findOne({ user: userId });

    if (!cart) {
      return res.status(404).json({ error: 'Cart not found.' });
    }

    return res.status(200).json({ cart });
  } catch (error) {
    console.error('Error retrieving cart:', error);
    return res.status(500).json({ error: 'Internal server error.' });
  }
});

export default cartRouter;
