import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../api";
import toast from "react-hot-toast";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { logout } from "../features/auth/authSlice";
import { IPL_TEAM_STYLES } from "../constants";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.auth.user);
  const team = user?.iplTeam || "Full Toss";
  const teamStyles = IPL_TEAM_STYLES[team] || {
    primaryColor: "#19388a",
    secondaryColor: "#4f91cd",
  };
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logoutUser()
      .then((res) => console.log(res))
      .catch((err) => console.log(err));

    toast.success("You are logged out.");
    dispatch(logout());
    navigate("/login-user");
  };

  return (
    <nav className={`bg-[${teamStyles?.secondaryColor}] z-50 px-6 py-4`}>
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo Section */}
        <div className={`logo text-2xl font-bold text-white`}>
          <NavLink to="/">{team}</NavLink>
        </div>

        {/* Hamburger Menu Button */}
        <button
          className="text-white md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}
            />
          </svg>
        </button>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-4">
          {isAuthenticated ? (
            <div className="flex gap-2">
              <Link to="/orders">
                <button className="bg-white px-4 py-2 rounded-full font-medium text-blue-600 border border-blue-600 hover:bg-black hover:text-white">
                  Orders
                </button>
              </Link>
              <Link to="/profile">
                <button className="bg-white px-4 py-2 rounded-full font-medium text-blue-600 border border-blue-600 hover:bg-black hover:text-white">
                  Profile
                </button>
              </Link>
              <button
                onClick={handleLogout}
                className="bg-white px-4 py-2 rounded-full font-medium text-blue-600 border border-blue-600 hover:bg-black hover:text-white"
              >
                Logout
              </button>
            </div>
          ) : (
            <>
              <Link to="/login-user">
                <button className="bg-white px-4 py-2 rounded-full font-medium text-blue-600 border border-blue-600 hover:bg-black hover:text-white">
                  Login
                </button>
              </Link>
              <Link to="/register-user">
                <button className="bg-white px-4 py-2 rounded-full font-medium text-blue-600 border border-blue-600 hover:bg-black hover:text-white">
                  Register
                </button>
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden mt-4">
          {isAuthenticated ? (
            <div className="flex flex-col gap-2">
              <Link to="/orders">
                <button className="w-full bg-white px-4 py-2 rounded-full font-medium text-blue-600 border border-blue-600 hover:bg-black hover:text-white">
                  Orders
                </button>
              </Link>
              <Link to="/profile">
                <button className="w-full bg-white px-4 py-2 rounded-full font-medium text-blue-600 border border-blue-600 hover:bg-black hover:text-white">
                  Profile
                </button>
              </Link>
              <button
                onClick={handleLogout}
                className="w-full bg-white px-4 py-2 rounded-full font-medium text-blue-600 border border-blue-600 hover:bg-black hover:text-white"
              >
                Logout
              </button>
            </div>
          ) : (
            <>
              <Link to="/login-user">
                <button className="w-full bg-white px-4 py-2 rounded-full font-medium text-blue-600 border border-blue-600 hover:bg-black hover:text-white">
                  Login
                </button>
              </Link>
              <Link to="/register-user">
                <button className="w-full bg-white px-4 py-2 rounded-full font-medium text-blue-600 border border-blue-600 hover:bg-black hover:text-white">
                  Register
                </button>
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
