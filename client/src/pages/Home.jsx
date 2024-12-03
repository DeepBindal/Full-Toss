import React, { useEffect, useState } from "react";
import { fetchProducts } from "../api";
import { useSelector } from "react-redux";
import ProductCard from "../components/ProductCard";
import { IPL_TEAM_STYLES } from "../constants";
import { Link } from "react-router-dom";

const Home = () => {
  const user = useSelector((state) => state.auth.user);
  const team = user?.iplTeam;
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const teamStyles = IPL_TEAM_STYLES[team] || {
    primaryColor: "#19388a",
    secondaryColor: "#4f91cd",
  };

  // Fetch products based on the team
  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      try {
        const res = await fetchProducts(team);
        setProducts(res.data.data);
      } catch (err) {
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, []);
  console.log(import.meta.env)
  return (
    <div
      className={`w-full bg-[${teamStyles.primaryColor}] min-h-screen flex flex-col items-center px-4 py-8 `}
    >
      {/* Greeting */}
      {Object.keys(user).length != 0 ? (
        <div className="mb-6 text-center">
          <h1 className="text-2xl text-white md:text-3xl font-bold">
            Welcome, {user.username}!
          </h1>
        </div>
      ) : (
        <div className="relative bg-gradient-to-br from-blue-600 to-purple-500 min-h-screen flex items-center justify-center px-6 py-12">
          {/* Background Image */}
          <div
            className="absolute inset-0 bg-cover bg-center opacity-40"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1549924231-f129b911e442?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080')",
            }}
          ></div>
          {/* Content */}
          <div className="relative z-10 text-center max-w-4xl text-white">
            {/* Title */}
            <h1 className="text-4xl md:text-6xl font-extrabold mb-6">
              Welcome to the{" "}
              <span className="text-yellow-300">IPL Fan Page!</span>
            </h1>
            {/* Description */}
            <p className="text-lg md:text-xl mb-8 leading-relaxed">
              Celebrate your favorite IPL teams, explore exciting content, and
              connect with fans from across the world. Stay updated, share your
              thoughts, and cheer for your team like never before!
            </p>
            {/* Buttons */}
            <div className="flex justify-center gap-4">
              <Link
                to="/register-user"
                className="px-6 py-3 bg-yellow-400 hover:bg-yellow-500 text-black font-bold rounded-lg shadow-lg transition-all"
              >
                Register Now
              </Link>
              <Link
                to="/login-user"
                className="px-6 py-3 bg-white hover:bg-gray-100 text-black font-bold rounded-lg shadow-lg transition-all"
              >
                Login
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Loading State */}
      {loading ? (
        <div className="flex justify-center items-center ">
          <p className="text-lg font-semibold text-gray-600">Loading...</p>
        </div>
      ) : products.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full max-w-7xl">
          {products.map((item) => (
            <ProductCard
              key={item._id}
              product={item}
              color={teamStyles.secondaryColor}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
