import mongoose, { Schema } from 'mongoose';

const shippingAddressSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  
  postcode: {
    type: String,
    required: true
  },
  country: {
    type: String,
    required: true
  }
}, {id: false}); 

// Define the Product Schema within the Order
const productSchema = new mongoose.Schema({
  product: {
    type: Schema.Types.ObjectId,
    ref: 'Products',
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    default: 1
  }
});

// Define the Order Schema
const orderSchema = new mongoose.Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  products: [productSchema],
  totalAmount: {
    type: Number,
    required: true
  },
  orderDate: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    default: 'Processing'  
  },
  shippingAddress: shippingAddressSchema
});

const Order = mongoose.model('Order', orderSchema);

export default Order;
