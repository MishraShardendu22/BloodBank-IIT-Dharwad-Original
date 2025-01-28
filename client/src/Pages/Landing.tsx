import type React from "react"
import { useState } from "react"

import {
  Heart,
  Droplets,
  ArrowRight,
  Globe,
  Clock,
  Activity,
  Users,
  ChevronDown,
  Menu,
  Calendar,
  MapPin,
  Award,
  Bell,
  Sparkles,
  Shield,
  Github,
  Mail,
} from "lucide-react"
import { motion } from "framer-motion"

const teamMembers = [
  {
    name: "Anas",
    role: "Frontend Developer",
    github: "https://github.com/ANAS727189",
  },
  {
    name: "Shardendu",
    role: "Backend Developer",
    github: "https://github.com/MishraShardendu22",
  },
  {
    name: "Sourav",
    role: "AI/ML Developer",
    github: "https://github.com/sourav",
  },
  {
    name: "Mayank",
    role: "Backend Developer",
    github: "https://github.com/mayank",
  },
]

interface TeamMemberButtonProps {
  name: string
  role: string
  github: string
}

const TeamMemberButton: React.FC<TeamMemberButtonProps> = ({ name, role, github }) => (
  <motion.a
    href={github}
    target="_blank"
    rel="noopener noreferrer"
    whileHover={{ scale: 1.02 }}
    className="flex items-center gap-3 p-3 transition-all border rounded-lg bg-slate-900/50 hover:bg-slate-800/50 border-slate-800/50 hover:-translate-y-1 backdrop-blur-sm group"
  >
    <div className="flex items-center justify-center w-8 h-8 border rounded-full bg-gradient-to-br from-primary/20 to-primary/10 border-slate-800/50">
      {name.charAt(0)}
    </div>
    <div className="flex-1">
      <div className="font-medium transition-colors text-slate-200 group-hover:text-primary">{name}</div>
      <div className="text-sm text-slate-400">{role}</div>
    </div>
    <Github className="w-4 h-4 transition-colors text-slate-400 group-hover:text-primary" />
  </motion.a>
)

interface BloodTypeCardProps {
  type: string
  availability: number
}

const BloodTypeCard: React.FC<BloodTypeCardProps> = ({ type, availability }) => {
  const percentage = availability
  return (
    <motion.div whileHover={{ scale: 1.05 }} className="p-4 text-center rounded-lg bg-base-100/50 backdrop-blur-sm">
      <div className="relative w-20 h-20 mx-auto mb-3">
        <Droplets className="w-full h-full text-primary/20" />
        <span className="absolute inset-0 flex items-center justify-center text-2xl font-bold">{type}</span>
      </div>
      <div className="w-full h-2 mb-2 rounded-full bg-base-300">
        <div className="h-full rounded-full bg-primary" style={{ width: `${percentage}%` }} />
      </div>
      <p className="text-sm opacity-80">{availability}% Available</p>
    </motion.div>
  )
}

// Emergency Alert Banner
const EmergencyAlert = () => {
  return (
    <motion.div
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: "auto", opacity: 1 }}
      className="relative px-4 py-3 border-l-4 bg-error/10 border-error"
    >
      <div className="flex items-center justify-between mx-auto max-w-7xl">
        <div className="flex items-center gap-3">
          <Bell className="w-5 h-5 text-error animate-pulse" />
          <span className="font-medium text-error">Urgent: O-negative blood needed at City Hospital</span>
        </div>
        <button className="btn btn-error btn-sm">Respond Now</button>
      </div>
    </motion.div>
  )
}

// Achievement Badge Component
interface AchievementBadgeProps {
  count: number
  milestone: string
}

const AchievementBadge: React.FC<AchievementBadgeProps> = ({ count, milestone }) => (
  <motion.div
    whileHover={{ scale: 1.1 }}
    className="absolute transform -translate-x-1/2 -translate-y-1/2 flex items-center gap-2 px-3 py-1.5 rounded-full bg-base-100/50 backdrop-blur-sm border border-primary/20"
  >
    <Award className="w-4 h-4 text-primary" />
    <span className="text-sm font-medium">
      {count} {milestone}
    </span>
  </motion.div>
)

const Landing = () => {
  const [showEmergencyAlert, setShowEmergencyAlert] = useState(true)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  }

  const features = [
    {
      icon: Globe,
      title: "Global Network",
      description:
        "Connect with donors and recipients worldwide through our extensive network of blood banks and hospitals.",
    },
    {
      icon: Clock,
      title: "Real-time Updates",
      description: "Get instant notifications about urgent blood requirements and donation opportunities in your area.",
    },
    {
      icon: Users,
      title: "Community Support",
      description: "Join a community of dedicated donors and volunteers committed to saving lives.",
    },
    {
      icon: MapPin,
      title: "Location Services",
      description: "Find the nearest blood donation centers and track blood availability in real-time.",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-base-100 to-primary/20" data-theme="bloodsphere">
      {/* Floating Navigation */}
      <div className="fixed top-0 z-50 navbar bg-base-100/50 backdrop-blur-lg">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <Menu className="w-5 h-5" />
            </div>
          </div>
          <motion.a
            className="gap-2 text-xl btn btn-ghost"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <Droplets className="w-6 h-6 text-primary" />
            <span className="font-bold text-transparent bg-gradient-to-r from-white to-primary/50 bg-clip-text">
              BloodSphere
            </span>
          </motion.a>
        </div>
        <div className="hidden navbar-center lg:flex">
        </div>
        {/* <div className="gap-4 navbar-end">
          <a className="btn btn-primary btn-sm">Donate Now</a>
        </div> */}
      </div>

      {/* Hero Section */}
      <motion.section className="min-h-screen hero" initial="hidden" animate="visible" variants={containerVariants}>
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.1 }}
            transition={{ duration: 2 }}
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_500px_at_50%_50%,rgba(220,38,38,0.1),transparent)]" />
            <div className="grid grid-cols-[repeat(auto-fill,minmax(40px,1fr))] grid-rows-[repeat(auto-fill,minmax(40px,1fr))] h-full w-full">
              {[...Array(100)].map((_, i) => (
                <div key={i} className="border-[0.5px] border-primary/20" />
              ))}
            </div>
          </motion.div>
        </div>

        <div className="flex-col gap-16 hero-content lg:flex-row-reverse max-w-7xl">
          <motion.div variants={itemVariants} className="relative max-w-xl">
            <div className="absolute inset-0 bg-gradient-to-br from-primary to-accent rounded-full blur-[100px] opacity-20" />
            <motion.div
              className="relative z-10 grid grid-cols-2 gap-6"
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 6, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
            >
              {[
                {
                  icon: Clock,
                  label: "Response Time",
                  value: "Under 30 mins",
                  description: "Average emergency response",
                },
                { icon: Activity, label: "Success Rate", value: "99.9%", description: "Successful donations" },
              ].map((stat) => (
                <motion.div
                  key={stat.label}
                  whileHover={{ scale: 1.05 }}
                  className="p-6 border rounded-lg shadow-lg bg-base-200/50 backdrop-blur-sm border-base-content/5"
                >
                  <div className="flex items-center mb-4">
                    <div className="p-3 mr-4 rounded-full bg-primary/10">
                      <stat.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">{stat.label}</h3>
                      <p className="text-sm text-base-content/70">{stat.description}</p>
                    </div>
                  </div>
                  <div className="text-3xl font-bold text-primary">{stat.value}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div variants={itemVariants} className="max-w-xl">
            <motion.div
              className="gap-2 p-4 mb-8 text-lg badge badge-primary badge-outline"
              whileHover={{ scale: 1.05 }}
            >
              <Heart className="w-5 h-5" />
              Save Lives Today
            </motion.div>

            <h1 className="mb-8 text-6xl font-bold leading-tight lg:text-7xl">
              Your Blood
              <span className="block text-primary">Their Hope</span>
            </h1>

            <p className="mb-8 text-xl opacity-80">
              Join our global network of life-savers. Every donation can save up to three lives and bring hope to
              families in need.
            </p>

            <div className="flex flex-wrap gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="gap-2 btn btn-primary btn-lg"
              >
                Get Started 
                <ArrowRight className="w-5 h-5" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="gap-2 btn btn-outline btn-lg"
              >
                Learn More
                <ChevronDown className="w-5 h-5" />
              </motion.button>
            </div>
          </motion.div>
        </div>

        <motion.div
          className="absolute -translate-x-1/2 bottom-8 left-1/2 animate-bounce"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <ChevronDown className="w-8 h-8 text-primary" />
        </motion.div>
      </motion.section>

      <section className="relative py-16 overflow-hidden">
        <div className="container px-4 mx-auto max-w-7xl">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold">Current Blood Availability</h2>
            <p className="max-w-2xl mx-auto opacity-80">
              Real-time updates of blood type availability across our network
            </p>
          </motion.div>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-8">
            {[
              { type: "A+", availability: 85 },
              { type: "A-", availability: 60 },
              { type: "B+", availability: 75 },
              { type: "B-", availability: 45 },
              { type: "O+", availability: 90 },
              { type: "O-", availability: 30 },
              { type: "AB+", availability: 65 },
              { type: "AB-", availability: 40 },
            ].map((blood) => (
              <BloodTypeCard key={blood.type} {...blood} />
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-24 bg-base-200/50">
        <div className="container px-4 mx-auto max-w-7xl">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} className="mb-12 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 mb-4 rounded-full bg-primary/10">
              <Sparkles className="w-5 h-5 text-primary" />
              <span className="font-medium">Donor Achievements</span>
            </div>
            <h2 className="mb-4 text-4xl font-bold">Every Donation Counts</h2>
            <p className="max-w-2xl mx-auto opacity-80">Track your impact and earn recognition for saving lives</p>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                title: "Bronze Lifesaver",
                description: "Complete your first donation",
                icon: Heart,
                progress: 100,
              },
              {
                title: "Silver Guardian",
                description: "Donate 5 times in 6 months",
                icon: Shield,
                progress: 60,
              },
              {
                title: "Golden Hero",
                description: "Help save 10+ lives",
                icon: Award,
                progress: 30,
              },
            ].map((achievement) => (
              <motion.div
                key={achievement.title}
                whileHover={{ scale: 1.02 }}
                className="p-6 border rounded-lg bg-base-100/50 backdrop-blur-sm border-primary/10"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 rounded-full bg-primary/10">
                    <achievement.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold">{achievement.title}</h3>
                    <p className="text-sm opacity-80">{achievement.description}</p>
                  </div>
                </div>
                <div className="w-full h-2 rounded-full bg-base-300">
                  <div className="h-full rounded-full bg-primary" style={{ width: `${achievement.progress}%` }} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-24">
        <div className="container px-4 mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="grid items-center gap-16 lg:grid-cols-2"
          >
            <div>
              <h2 className="mb-6 text-4xl font-bold">Find Donation Centers Near You</h2>
              <p className="mb-8 text-lg opacity-80">
                Locate the nearest blood banks and hospitals in our network. View real-time requirements and book your
                donation slot instantly.
              </p>
              <div className="space-y-4">
                {[
                  { label: "City Hospital", distance: "0.8 km", urgent: true },
                  { label: "Red Cross Center", distance: "1.2 km", urgent: false },
                  { label: "Community Blood Bank", distance: "2.5 km", urgent: false },
                ].map((center) => (
                  <motion.div
                    key={center.label}
                    whileHover={{ scale: 1.02 }}
                    className="flex items-center justify-between p-4 rounded-lg bg-base-200"
                  >
                    <div className="flex items-center gap-3">
                      <MapPin className="w-5 h-5 text-primary" />
                      <div>
                        <h3 className="font-medium">{center.label}</h3>
                        <p className="text-sm opacity-80">{center.distance} away</p>
                      </div>
                    </div>
                    <button className="btn btn-primary btn-sm">{center.urgent ? "Urgent Need" : "Book Slot"}</button>
                  </motion.div>
                ))}
              </div>
            </div>
            <div className="relative overflow-hidden rounded-lg aspect-square bg-base-200">
              {/* Placeholder for map - you can integrate with Google Maps or similar */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_500px_at_50%_50%,rgba(220,38,38,0.1),transparent)]" />
              <div className="absolute inset-0 grid grid-cols-[repeat(20,1fr)] grid-rows-[repeat(20,1fr)]">
                {[...Array(400)].map((_, i) => (
                  <div key={i} className="border-[0.5px] border-primary/10" />
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-base-200">
        <div className="container px-4 mx-auto max-w-7xl">
          <motion.div
            className="mb-16 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="mb-4 text-4xl font-bold">Why Choose BloodSphere?</h2>
            <p className="max-w-2xl mx-auto text-lg opacity-80">
              We're revolutionizing blood donation with cutting-edge technology and a passionate community
            </p>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                className="p-6 rounded-lg bg-base-100"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <feature.icon className="w-12 h-12 mb-4 text-primary" />
                <h3 className="mb-2 text-xl font-bold">{feature.title}</h3>
                <p className="opacity-80">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24">
        <div className="container px-4 mx-auto max-w-7xl">
          <motion.div
            className="mb-16 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="mb-4 text-4xl font-bold">How It Works</h2>
            <p className="max-w-2xl mx-auto text-lg opacity-80">
              Join our platform in three simple steps and start saving lives
            </p>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                icon: Users,
                title: "Create Account",
                description: "Sign up and complete your donor profile with relevant medical information",
              },
              {
                icon: MapPin,
                title: "Find Centers",
                description: "Locate nearby donation centers and check real-time blood requirements",
              },
              {
                icon: Calendar,
                title: "Schedule Donation",
                description: "Book your donation slot and receive reminders and preparation tips",
              },
            ].map((step, index) => (
              <motion.div
                key={step.title}
                className="relative p-6 text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-primary/20">
                  <step.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="mb-2 text-xl font-bold">{step.title}</h3>
                <p className="opacity-80">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Stats Section */}
      <section className="py-24 bg-base-200">
        <div className="container px-4 mx-auto max-w-7xl">
          <div className="grid gap-8 md:grid-cols-4">
            {[
              { value: "10K+", label: "Active Donors" },
              { value: "30K+", label: "Lives Saved" },
              { value: "500+", label: "Partner Hospitals" },
              { value: "50+", label: "Cities Covered" },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="mb-2 text-4xl font-bold text-primary">{stat.value}</div>
                <div className="text-lg opacity-80">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      {/* <section className="py-24">
        <div className="container px-4 mx-auto max-w-7xl">
          <div className="grid gap-16 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="mb-4 text-4xl font-bold">Get in Touch</h2>
              <p className="mb-8 text-lg opacity-80">
                Have questions about blood donation or need assistance? Our team is here to help.
              </p>
              <div className="space-y-4">
                {[
                  { icon: Phone, text: "+1 (555) 123-4567" },
                  { icon: MessagesSquare, text: "support@bloodsphere.com" },
                  { icon: MapPin, text: "123 Medical Center Ave, Health City, HC 12345" }
                ].map((contact) => (
                  <div key={contact.text} className="flex items-center gap-4">
                    <contact.icon className="w-6 h-6 text-primary" />
                    <span>{contact.text}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="p-8 rounded-lg bg-base-200"
            >
              <form className="space-y-4">
                <div className="form-control">
                  <input type="text" placeholder="Your Name" className="input input-bordered" />
                </div>
                <div className="form-control">
                  <input type="email" placeholder="Email Address" className="input input-bordered" />
                </div>
                <div className="form-control">
                  <textarea className="h-32 textarea textarea-bordered" placeholder="Your Message"></textarea>
                </div>
                <button className="w-full btn btn-primary">Send Message</button>
              </form>
            </motion.div>
          </div>
        </div>
      </section> */}

      <footer className="relative bg-base-200 text-slate-200">
        <div className="absolute inset-0 " />

        <div className="container relative px-6 py-12 mx-auto">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
            {/* Platform Info */}
            <div className="space-y-6">
              <div className="flex items-center space-x-2">
                <Globe className="w-6 h-6 text-blue-500" />
                <span className="text-xl font-bold">Parshu</span>
              </div>
              <p className="text-sm text-slate-400">Empowering machine learning workflows with automated solutions.</p>
              <div className="flex space-x-4">
                <a href="#" className="text-slate-400 hover:text-blue-500">
                  <Github className="w-5 h-5" />
                </a>
                <a href="#" className="text-slate-400 hover:text-blue-500">
                  <Mail className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="mb-4 text-lg font-semibold">Platform</h3>
              <ul className="space-y-2">
                {["Features", "Documentation", "API Reference"].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-slate-400 hover:text-blue-500">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h3 className="mb-4 text-lg font-semibold">Resources</h3>
              <ul className="space-y-2">
                {["Blog", "Tutorials", "Support"].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-slate-400 hover:text-blue-500">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div>
              <h3 className="mb-4 text-lg font-semibold">Company</h3>
              <ul className="space-y-2">
                {["About Us", "Careers", "Contact"].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-slate-400 hover:text-blue-500">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Team Section */}
          <div className="pt-8 mt-12 border-t border-slate-900">
            <div className="text-center">
              <h3 className="mb-6 text-lg font-semibold">Developed by Parshu</h3>
              <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                {teamMembers.map((member) => (
                  <motion.div
                    key={member.name}
                    className="p-4 transition-all border rounded-lg group border-slate-800 bg-slate-900/50 hover:border-blue-500/50"
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center justify-center w-10 h-10 text-blue-500 rounded-full bg-blue-500/10">
                          {member.name[0]}
                        </div>
                        <div className="text-left">
                          <p className="font-medium text-slate-200">{member.name}</p>
                          <p className="text-sm text-slate-400">{member.role}</p>
                        </div>
                      </div>
                      <a
                        href={member.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 transition-colors text-slate-400 hover:text-blue-500"
                      >
                        <Github className="w-5 h-5" />
                      </a>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="pt-8 mt-8 text-center border-t border-slate-800">
            <p className="text-sm text-slate-400">© {new Date().getFullYear()} Parshu. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Landing

