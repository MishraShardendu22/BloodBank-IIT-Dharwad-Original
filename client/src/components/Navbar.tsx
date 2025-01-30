import { Menu, Droplets } from "lucide-react"
import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom"
import LogOut from "./Logout"

const Navbar = () => {
    const navigate = useNavigate()
    return (
        <div className="fixed top-0 z-50 w-full navbar bg-base-100/50 backdrop-blur-lg">
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
            <span
                onClick={() => navigate("/")}
                className="font-bold text-transparent bg-gradient-to-r from-white to-primary/50 bg-clip-text"
            >
                BloodSphere
            </span>
            </motion.a>
        </div>
        <div className="hidden navbar-center lg:flex"></div>
        <div className="navbar-end">
            <LogOut />
        </div>
        </div>
    )
    }

    export default Navbar

