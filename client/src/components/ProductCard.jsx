import React, { useState } from "react";
import { placeUserOrder } from "../api";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const ResponsiveCard = ({ product, color }) => {
  const [isBuyActive, setIsBuyActive] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();
  const handleOrder = () => {
    setIsBuyActive(false);
    const data = {
      productId: product._id,
      quantity,
      price: quantity * product.price,
    };
    console.log(data);
    placeUserOrder(data)
      .then((res) => {
        toast.success("Order placed");
        navigate("/orders");
      })
      .catch((err) => {
        const errorMessage = err.response?.data?.message || "Error placing order";
        toast.error(errorMessage)
      });
  };

  return (
    <div
      className="max-w-sm mx-auto p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
      style={{ backgroundColor: color }} // Use inline style for dynamic background
    >
      {/* Image Section */}
      <div className="relative h-48 w-full overflow-hidden rounded-t-lg">
        <img
          src={product.imageUrl}
          alt={product.title}
          className="w-full h-full object-contain"
        />
      </div>

      {/* Content Section */}
      <div className="p-4">
        {/* Title */}
        <h2 className="text-lg font-semibold text-white">{product.title}</h2>
        {/* Description */}
        <p className="text-sm text-white mt-2 line-clamp-3">
          {product.description}
        </p>
        {/* Price and Button */}
        <div className="flex justify-between items-center mt-4 relative">
          <span className="text-lg font-bold text-blue-600">
            ₹{product.price}
          </span>
          <button
            onClick={() => setIsBuyActive((prev) => !prev)}
            className="px-4 py-1 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-all duration-300"
          >
            Buy Now
          </button>
          {isBuyActive && (
            <div className={`absolute top-10 right-0 z-10 text-white bg-[${color}] p-4 rounded-md shadow-md`}>
              <label htmlFor="quantity" className="block mb-2">
                Select Quantity
              </label>
              <select
                name="quantity"
                id="quantity"
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value, 10))}
                className="w-full p-2 rounded-md bg-white text-black"
              >
                {Array.from({ length: product.stock }, (_, i) => i + 1).map(
                  (num) => (
                    <option key={num} value={num}>
                      {num}
                    </option>
                  )
                )}
              </select>
              <button
                onClick={handleOrder}
                className="mt-2 w-full bg-blue-600 text-white py-1 px-2 rounded-md hover:bg-blue-700 transition-all"
              >
                Confirm Order
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResponsiveCard;
