import { useContext } from "react";
import "./Cart.scss";
import { CartContext } from "../../context/Cart";

export default function Cart() {
  const Base_Url = 'http://localhost:3020';

  const { cartItems, clearCart, getCartTotal, removeFromCart, addToCart } = useContext(CartContext);

  return (
    <div className="flex-col flex items-center fixed inset-0 left-1/4 bg-white dark:bg-black gap-8 p-10 text-black dark:text-white font-normal uppercase text-sm">
      <h1 className="text-2xl font-bold">Cart</h1>

      <div className="flex flex-col gap-4">
        {cartItems.map((product) => (
          <div className="flex justify-between items-center" key={product.id}>
            <div className="flex gap-4">
              <img src={`${Base_Url}/${product.image}`} alt={product.title} className="rounded-md h-24" />
              <div className="flex flex-col">
                <h1 className="text-lg font-bold">{product.name}</h1>
                <p className="text-gray-600">{product.price}</p>
              </div>
            </div>
            <div className="flex gap-4">
              <button
                className="px-4 py-2 bg-gray-800 text-white text-xs font-bold uppercase rounded hover:bg-gray-700 focus:outline-none focus:bg-gray-700"
                onClick={() => addToCart(product)}
              >
                +
              </button>
              <p>{product.quantity}</p>
              <button
                className="px-4 py-2 bg-gray-800 text-white text-xs font-bold uppercase rounded hover:bg-gray-700 focus:outline-none focus:bg-gray-700"
                onClick={() => removeFromCart(product)}
              >
                -
              </button>
            </div>
          </div>
        ))}
      </div>
      {cartItems.length > 0 ? (
        <div className="flex flex-col justify-between items-center">
          <h1 className="text-lg font-bold">Total: €{getCartTotal()}</h1>
          <button
            className="px-4 py-2 bg-gray-800 text-white text-xs font-bold uppercase rounded hover:bg-gray-700 focus:outline-none focus:bg-gray-700"
            onClick={clearCart}
          >
            Clear cart
          </button>
        </div>
      ) : (
        <h1 className="text-lg font-bold">Your cart is empty</h1>
      )}
    </div>
  );
}
