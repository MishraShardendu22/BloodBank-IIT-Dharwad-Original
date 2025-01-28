"use client"

import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import Layout from "../_Layout"
import axiosInstance from "../../../util/axiosInstance"
import axios from "axios"
import { motion } from "framer-motion"
import { Droplets, ArrowRight } from "lucide-react"

const Login = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [error, setError] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError("")

    try {
      const response = await axiosInstance.post("/donor/login", formData)

      if (response.status === 200) {
        localStorage.setItem("token", response.data.data)
        navigate("/dashboard")
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        setError(error.response.data.message || "Login failed")
      } else {
        setError("An error occurred. Please try again.")
      }
    }
  }

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-b from-base-100 to-primary/20" data-theme="bloodsphere">
        <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
          <section className="relative flex items-end h-32 bg-gray-900 lg:col-span-5 lg:h-full xl:col-span-6">
            <img
              alt="Night"
              src="/blood-donor-login.jpg"
              className="absolute inset-0 object-cover w-full h-full opacity-80"
            />

            <div className="hidden lg:relative lg:block lg:p-12">
              <motion.a
                className="block text-white"
                href="/"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <span className="sr-only">Home</span>
                <Droplets className="h-8 sm:h-10" />
              </motion.a>

              <motion.h2
                className="mt-6 text-2xl font-bold text-white sm:text-3xl md:text-4xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                Welcome Back to BloodSphere 🩸
              </motion.h2>

              <motion.p
                className="mt-4 leading-relaxed text-white/90"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                Your contribution matters. Log in to continue your journey of saving lives through blood donation.
              </motion.p>
            </div>
          </section>

          <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
            <div className="max-w-xl lg:max-w-3xl">
              <div className="relative block -mt-16 lg:hidden">
                <a
                  className="inline-flex items-center justify-center w-16 h-16 text-blue-600 bg-white rounded-full sm:h-20 sm:w-20"
                  href="/"
                >
                  <span className="sr-only">Home</span>
                  <Droplets className="w-8 h-8 sm:h-10 sm:w-10" />
                </a>

                <h1 className="mt-2 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
                  Welcome Back to BloodSphere 🩸
                </h1>

                <p className="mt-4 leading-relaxed text-gray-500">
                  Your contribution matters. Log in to continue your journey of saving lives through blood donation.
                </p>
              </div>

              <motion.form
                onSubmit={handleSubmit}
                className="grid grid-cols-6 gap-6 mt-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <div className="col-span-6">
                  <label htmlFor="Email" className="block text-sm font-medium text-gray-700">
                    Email
                  </label>

                  <input
                    type="email"
                    id="Email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full mt-1 text-sm text-gray-700 bg-white border-gray-200 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>

                <div className="col-span-6">
                  <label htmlFor="Password" className="block text-sm font-medium text-gray-700">
                    Password
                  </label>

                  <input
                    type="password"
                    id="Password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full mt-1 text-sm text-gray-700 bg-white border-gray-200 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>

                {error && (
                  <div className="col-span-6">
                    <p className="text-sm text-red-500">{error}</p>
                  </div>
                )}

                <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
                  <motion.button
                    type="submit"
                    className="inline-flex items-center justify-center w-full px-12 py-3 text-sm font-medium text-white transition bg-blue-600 border border-blue-600 rounded-md shrink-0 hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500 sm:w-auto"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Log in
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </motion.button>

                  <p className="mt-4 text-sm text-gray-500 sm:mt-0">
                    Don't have an account?
                    <Link to="/register" className="text-gray-700 underline">
                      Sign up
                    </Link>
                    .
                  </p>
                </div>
              </motion.form>
            </div>
          </main>
        </div>
      </div>
    </Layout>
  )
}

export default Login

