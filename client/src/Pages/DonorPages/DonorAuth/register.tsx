"use client"

import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import Layout from "../_Layout"
import axiosInstance from "../../../util/axiosInstance"
import axios from "axios"
import { motion } from "framer-motion"
import { Droplets, ArrowRight } from "lucide-react"

const Register = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    passwordConfirmation: "",
    phoneNo: "",
    marketingAccept: false,
  })
  const [error, setError] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError("")

    if (formData.password !== formData.passwordConfirmation) {
      setError("Passwords do not match")
      return
    }

    try {
      const response = await axiosInstance.post("/donor/register", {
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        password: formData.password,
        phoneNo: formData.phoneNo,
      })

      if (response.status === 201) {
        navigate("/login")
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        setError(error.response.data.message || "Registration failed")
      } else {
        setError("An error occurred. Please try again.")
      }
    }
  }

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-b from-base-100 to-primary/20" data-theme="bloodsphere">
        <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
          <aside className="relative block h-16 lg:order-last lg:col-span-5 lg:h-full xl:col-span-6">
            <img
              alt="Pattern"
              src="/blood-donor-register.jpg"
              className="absolute inset-0 object-cover w-full h-full"
            />
          </aside>

          <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
            <div className="max-w-xl lg:max-w-3xl">
              <div className="relative">
                <motion.a
                  className="block text-blue-600"
                  href="/"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <span className="sr-only">Home</span>
                  <Droplets className="h-8 sm:h-10" />
                </motion.a>

                <motion.h1
                  className="mt-6 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  Welcome to BloodSphere 🩸
                </motion.h1>

                <motion.p
                  className="mt-4 leading-relaxed text-gray-500"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  Join our community of life-savers. Your registration brings hope to those in need.
                </motion.p>
              </div>

              <motion.form
                onSubmit={handleSubmit}
                className="grid grid-cols-6 gap-6 mt-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <div className="col-span-6 sm:col-span-3">
                  <label htmlFor="FirstName" className="block text-sm font-medium text-gray-700">
                    First Name
                  </label>

                  <input
                    type="text"
                    id="FirstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full mt-1 text-sm text-gray-700 bg-white border-gray-200 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>

                <div className="col-span-6 sm:col-span-3">
                  <label htmlFor="LastName" className="block text-sm font-medium text-gray-700">
                    Last Name
                  </label>

                  <input
                    type="text"
                    id="LastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full mt-1 text-sm text-gray-700 bg-white border-gray-200 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>

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
                  <label htmlFor="PhoneNo" className="block text-sm font-medium text-gray-700">
                    Phone Number
                  </label>

                  <input
                    type="tel"
                    id="PhoneNo"
                    name="phoneNo"
                    value={formData.phoneNo}
                    onChange={handleChange}
                    className="w-full mt-1 text-sm text-gray-700 bg-white border-gray-200 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>

                <div className="col-span-6 sm:col-span-3">
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

                <div className="col-span-6 sm:col-span-3">
                  <label htmlFor="PasswordConfirmation" className="block text-sm font-medium text-gray-700">
                    Password Confirmation
                  </label>

                  <input
                    type="password"
                    id="PasswordConfirmation"
                    name="passwordConfirmation"
                    value={formData.passwordConfirmation}
                    onChange={handleChange}
                    className="w-full mt-1 text-sm text-gray-700 bg-white border-gray-200 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>

                <div className="col-span-6">
                  <label htmlFor="MarketingAccept" className="flex gap-4">
                    <input
                      type="checkbox"
                      id="MarketingAccept"
                      name="marketingAccept"
                      checked={formData.marketingAccept}
                      onChange={handleChange}
                      className="w-5 h-5 bg-white border-gray-200 rounded-md shadow-sm"
                    />

                    <span className="text-sm text-gray-700">
                      I want to receive emails about blood donation announcements.
                    </span>
                  </label>
                </div>

                <div className="col-span-6">
                  <p className="text-sm text-gray-500">
                    By creating an account, you agree to our
                    <a href="#" className="text-blue-700 underline">
                      {" "}
                      terms and conditions{" "}
                    </a>
                    and
                    <a href="#" className="text-blue-700 underline">
                      {" "}
                      privacy policy
                    </a>
                    .
                  </p>
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
                    Create an account
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </motion.button>

                  <p className="mt-4 text-sm text-gray-500 sm:mt-0">
                    Already have an account?
                    <Link to="/login" className="text-blue-700 underline">
                      Log in
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

export default Register

