import { Link, useNavigate } from "react-router-dom";
import Toggle from "../components/Toggle";
import { useEffect, useState } from "react";
import { loginUser } from "../api";
import toast from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import { login} from "../features/auth/authSlice";
import { iplTeamsMessages } from "../constants";

const Login = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const navigate = useNavigate();
  useEffect(()=>{
    if(isAuthenticated){
      navigate("/")
    }
  }, [isAuthenticated])
  
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const user = useSelector((state) => state.auth.user); // Access current user from Redux store
  const dispatch = useDispatch();
  const [showPassword, setshowPassword] = useState(false);

  // Handle form submission for login
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send login request
      const res = await loginUser(formData);
      const response = res.data;
      const team = response.data.user.iplTeam;
      // Dispatch user info and tokens to Redux store
      dispatch(
        login({
          user: response.data.user,
          accessToken: response.data.accessToken,
          refreshToken: response.data.refreshToken,
        })
      );

      // Display success message and navigate to home
      toast.success(iplTeamsMessages[team].fansMessage);
      navigate("/");
    } catch (err) {
      // Handle error response
      const errorMessage = err.response?.data?.message || "Login failed!";
      toast.error(errorMessage);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 mx-4">
      <section className="rounded-md p-4 bg-white shadow-lg max-w-md w-full">
        <div className="flex flex-col items-center">
          <div className="w-full">
            <h2 className="text-3xl font-bold text-center text-gray-800">
              Sign In
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              New here?{" "}
              <Link className="text-blue-500 underline" to="/register-user">
                Register
              </Link>
            </p>
            <form className="mt-6" onSubmit={handleFormSubmit}>
              <div className="space-y-4">
                {/* Email Input */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Email address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        [e.target.name]: e.target.value,
                      })
                    }
                    placeholder="Enter your email"
                    className="block w-full rounded-md border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>

                {/* Password Input */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          [e.target.name]: e.target.value,
                        })
                      }
                      placeholder="Enter your password"
                      className="block w-full rounded-md border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                    {/* Toggle Component */}
                    <Toggle
                      showPassword={showPassword}
                      setshowPassword={setshowPassword}
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <div>
                  <button
                    type="submit"
                    className="w-full rounded-md bg-indigo-600 px-4 py-2 text-white font-semibold hover:bg-indigo-700"
                  >
                    Sign In
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;

