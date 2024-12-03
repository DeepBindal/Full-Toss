import React, { useEffect, useState } from 'react';
import { fetchUserOrders } from '../api';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { IPL_TEAM_STYLES } from "../constants";

const Orders = () => {
    const navigate = useNavigate()
    const [orders, setOrders] = useState([]); // Initialize with an empty array
    const [loading, setLoading] = useState(true); // Track loading state
    const [error, setError] = useState(null); // Track errors
    const user = useSelector((state) => state.auth.user);
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const team = user?.iplTeam;

    useEffect(()=>{
        if(!isAuthenticated){
          navigate("/")
        }
      }, [isAuthenticated])

    const teamStyles = IPL_TEAM_STYLES[team] || {
        primaryColor: "#19388a",
        secondaryColor: "#4f91cd",
      };
    useEffect(() => {
        async function getData() {
            try {
                const res = await fetchUserOrders();
                setOrders(res.data.data); // Set orders data
                setLoading(false); // Set loading to false once data is fetched
            } catch (err) {
                setError("Failed to fetch orders"); // Set error if API call fails
                setLoading(false); // Set loading to false in case of error
            }
        }
        getData();
    }, []); // Empty dependency array to run only once when component mounts

    if (loading) {
        return <div className="text-center text-xl mt-10">Loading...</div>; // Display loading message
    }

    if (error) {
        return <div className="text-center text-xl mt-10 text-red-500">{error}</div>; // Display error message if there's an issue fetching data
    }

    return (
        <div className={`bg-[${teamStyles.primaryColor}] min-h-screen mx-auto px-4 py-8`}>
            <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Your Orders</h2>
            {orders.length === 0 ? (
                <div className="text-center text-xl text-gray-500">No orders found</div> // Display message when no orders are available
            ) : (
                <div className="space-y-4">
                    {orders.map((order) => (
                        <div
                            key={order._id}
                            className="order-item bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
                        >
                            <h3 className="text-xl font-semibold text-gray-700">{order.product.title}</h3>
                            <div className="mt-2">
                                <div className="flex justify-between">
                                    <span className="font-medium text-gray-600">Quantity:</span>
                                    <span>{order.quantity}</span>
                                </div>
                                <div className="flex justify-between mt-1">
                                    <span className="font-medium text-gray-600">Price:</span>
                                    <span>₹{order.price}</span>
                                </div>
                                <div className="flex justify-between mt-1">
                                    <span className="font-medium text-gray-600">Status:</span>
                                    <span>{order.status || "Pending"}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Orders;
