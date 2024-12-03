import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Toggle from "../components/Toggle";
import { signupUser } from "../api";
import toast from "react-hot-toast";

const Register = () => {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        city: "",
    })

    const [showPassword, setshowPassword] = useState(false)

    const navigate = useNavigate()

    const handleSubmitForm = async (e) => {
        e.preventDefault();
        signupUser(formData)
        .then((res) => {
            toast.success("Welcome")
            navigate("/login-user");
        }).catch((err) => {
            let errorMessage = err.response.data.message
            toast.error(errorMessage);
        })
    }
  return (
    <div class="">
      <section class="rounded-md p-2 bg-white">
        <div class="flex items-center justify-center my-3">
          <div class="xl:mx-auto shadow-md p-4 xl:w-full xl:max-w-sm 2xl:max-w-md">
            <div class="mb-2"></div>
            <h2 class="text-2xl font-bold leading-tight">
              Sign up to create account
            </h2>
            <p class="mt-2 text-base text-gray-600">
              Already have an account? <Link className="text-blue-500" to="/login-user">Sign In</Link>
            </p>
            <form class="mt-5" onSubmit={handleSubmitForm} action="#">
              <div class="space-y-4">
                <div>
                  <label class="text-base font-medium text-gray-900">
                    User Name
                  </label>
                  <div class="mt-2">
                    <input
                      placeholder="Full Name"
                      value={formData.username}
                      onChange={(e) => setFormData({...formData, [e.target.name]: e.target.value})}
                      name="username"
                      type="text"
                      class="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    />
                  </div>
                </div>
                <div>
                  <label class="text-base font-medium text-gray-900">
                    Email address
                  </label>
                  <div class="mt-2">
                    <input
                      placeholder="Email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, [e.target.name]: e.target.value})}
                      class="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      name="email"
                    />
                  </div>
                </div>
                <div>
                  <label class="text-base font-medium text-gray-900">
                    Favourite City
                  </label>
                  <div class="mt-2">
                    <input
                      placeholder="Favourite City"
                      type="text"
                      value={formData.city}
                      onChange={(e) => setFormData({...formData, [e.target.name]: e.target.value})}
                      class="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      name="city"
                    />
                  </div>
                </div>
                <div>
                  <div class="flex items-center justify-between">
                    <label class="text-base font-medium text-gray-900">
                      Password
                    </label>
                  </div>
                  <div class="mt-2">
                    <input
                      placeholder="Password"
                      value={formData.password}
                      onChange={(e) => setFormData({...formData, [e.target.name]: e.target.value})}
                      type={showPassword ? "text" : "password"}
                      class="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      name="password"
                    />
                    <Toggle showPassword={showPassword} setshowPassword={setshowPassword}/>
                  </div>
                </div>
                <div>
                  <button
                    class="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                    type="submit"
                  >
                    Create Account
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

export default Register;
