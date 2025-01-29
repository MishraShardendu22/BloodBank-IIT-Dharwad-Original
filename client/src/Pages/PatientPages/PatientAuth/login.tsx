import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { Droplets, ArrowRight, LockKeyhole, Mail, Heart } from "lucide-react"
import { motion } from "framer-motion"
import Layout from "../_Layout"
import axiosInstance from "../../../util/axiosInstance"
import axios from "axios"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

const LoginPatient = () => {
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
      const response = await axiosInstance.post("/patient/login", formData)
      if (response.status === 200) {
        localStorage.setItem("token", response.data.data)
        navigate("/patient/dashboard")
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
              alt="Blood Donation"
              src="/blood-donor-login.jpg"
              className="absolute inset-0 object-cover w-full h-full opacity-80"
            />

            <div className="hidden lg:relative lg:block lg:p-12">
              <motion.div
                className="flex items-center gap-2"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Droplets className="h-8 text-white sm:h-10" />
                <Badge variant="secondary" className="text-sm">
                  Blood Donor Portal
                </Badge>
              </motion.div>

              <motion.h2
                className="mt-6 text-2xl font-bold text-white sm:text-3xl md:text-4xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                Welcome Back, Life Saver! 🩸
              </motion.h2>

              <motion.p
                className="mt-4 leading-relaxed text-white/90"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                Thank you for being a blood donor. Your contributions help save countless lives.
                Sign in to manage your donations and schedule your next life-saving appointment.
              </motion.p>
            </div>
          </section>

          <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
            <Card className="w-full max-w-xl">
              <CardHeader className="space-y-1">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-2">
                    <Droplets className="w-6 h-6 text-primary" />
                    <Heart className="w-5 h-5 text-red-500" />
                  </div>
                  <div className="space-y-1">
                    <Badge variant="outline" className="mb-2">
                      Donor Access
                    </Badge>
                    <CardTitle className="text-2xl">Sign in to Donor Portal</CardTitle>
                  </div>
                </div>
                <CardDescription>
                  Access your donor dashboard to manage appointments and track donations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <motion.form
                  onSubmit={handleSubmit}
                  className="space-y-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                      <Input
                        id="email"
                        type="email"
                        name="email"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={handleChange}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                      <LockKeyhole className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                      <Input
                        id="password"
                        type="password"
                        name="password"
                        placeholder="Enter your password"
                        value={formData.password}
                        onChange={handleChange}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  {error && (
                    <div className="p-3 text-sm text-red-500 rounded-md bg-red-50">
                      {error}
                    </div>
                  )}

                  <div className="space-y-4">
                    <Button
                      type="submit"
                      className="w-full"
                      size="lg"
                    >
                      Sign in as Donor
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>

                    <p className="text-sm text-center text-gray-600">
                      Not registered as a donor?{" "}
                      <Link to="/patient/register" className="font-medium text-primary hover:underline">
                        Register here
                      </Link>
                    </p>
                  </div>
                </motion.form>
              </CardContent>
            </Card>
          </main>
        </div>
      </div>
    </Layout>
  )
}

export default LoginPatient