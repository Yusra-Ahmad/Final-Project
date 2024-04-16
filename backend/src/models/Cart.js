import mongoose from 'mongoose';

const { Schema } = mongoose;

const cartSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model
    required: true
  },
  products: [
    {
      product: {
        type: Schema.Types.ObjectId,
        ref: 'Product', // Reference to the Product model
        required: true
      },
      quantity: {
        type: Number,
        default: 1 // Default quantity is 1
      }
    }
  ],
  totalPrice: {
    type: Number,
    default: 0 // Default total price is 0
  }
});

const Cart = mongoose.model('Cart', cartSchema);

export default Cart;