import express from "express";
import Order from "../models/Order.js"; // Make sure to add the file extension
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

// Place a new order
router
  .post("/", authMiddleware, async (req, res) => {
    try {
      const { products, totalAmount } = req.body;

      const newOrder = new Order({
        user: req.user.id,
        products,
        totalAmount,
      });

      await newOrder.save();
      res.status(201).send(newOrder);
    } catch (error) {
      res.status(400).send(error.message);
    }
  })
  .get("/", authMiddleware, async (req, res,next) => {
    try {
      const allOrders = await Order.find({ user: req.user.id }).populate({
        path: "products.product",
        model: "Products",
        select: "title price image"
        // model: "Products"
      });
      res.send(allOrders);
    } catch (error) {
      console.log(error);
      next({ status: 500, message: error.message });
    }
  });

// Export the router using ES Modules syntax
export { router as orderRouter };
