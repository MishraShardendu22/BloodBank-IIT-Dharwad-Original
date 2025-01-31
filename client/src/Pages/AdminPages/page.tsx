import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Navbar from "@/components/Navbar"
import { motion } from "framer-motion"
import axiosInstance from "@/util/axiosInstance"
import Analytics from "./_components/Analytics"
import DonorManagement from "./_components/DonorManagement"
import PatientManagement from "./_components/PatientManagement"
import OrganizationManagement from "./_components/OrganizationManagement"
import DonationLocationManagement from "./_components/DonationLocationManagement"
import BloodRequestManagement from "./_components/BloodRequestManagement"
import { Sidebar } from "./_components/Sidebar"
import { useThemeStore } from "@/store/themeStore"

interface IAdmin {
    _id: string
    name: string
    email: string
    phoneNo: string
    }

    const Admin = () => {
    const [adminInfo, setAdminInfo] = useState<IAdmin | null>(null)
    const [activeTab, setActiveTab] = useState<
        "analytics" | "donors" | "patients" | "organizations" | "locations" | "requests"
    >("analytics")
    const { theme } = useThemeStore()

    useEffect(() => {
        fetchAdminInfo()
    }, [])

    const fetchAdminInfo = async () => {
        try {
        const { data } = await axiosInstance.get("/admin/verifyAdmin")
        setAdminInfo(data.data)
        } catch (error) {
        console.error("Error fetching admin info:", error)
        }
    }

    const renderContent = () => {
        switch (activeTab) {
        case "analytics":
            return <Analytics />
        case "donors":
            return <DonorManagement />
        case "patients":
            return <PatientManagement />
        case "organizations":
            return <OrganizationManagement />
        case "locations":
            return <DonationLocationManagement />
        case "requests":
            return <BloodRequestManagement />
        default:
            return null
        }
    }

    return (
        <div
        className={`flex h-screen ${
            theme === "light" ? "bg-gradient-to-b from-gray-50 to-gray-100" : "bg-gradient-to-b from-base-100 to-primary/20"
        }`}
        data-theme={theme === "dark" ? "bloodsphere-dark" : "bloodsphere-light"}
        >
        <Navbar />
        <Sidebar setActiveTab={setActiveTab} activeTab={activeTab} />
        <main className="flex-1 pt-16 pl-[280px] overflow-auto">
            <div className="container p-6 mx-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
                <h1 className={`text-4xl font-bold ${theme === "light" ? "text-gray-800" : "text-primary"}`}>
                Admin Dashboard
                </h1>
            </motion.div>
            {adminInfo && (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                <Card
                    className={`mb-6 ${theme === "light" ? "bg-white border-gray-200 shadow-sm" : "bg-base-200/50 backdrop-blur-sm border-primary/10"}`}
                >
                    <CardHeader>
                    <CardTitle className={theme === "light" ? "text-gray-800" : ""}>Admin Information</CardTitle>
                    </CardHeader>
                    <CardContent>
                    <p className={theme === "light" ? "text-gray-600" : ""}>
                        <strong>Name:</strong> {adminInfo.name}
                    </p>
                    <p className={theme === "light" ? "text-gray-600" : ""}>
                        <strong>Email:</strong> {adminInfo.email}
                    </p>
                    <p className={theme === "light" ? "text-gray-600" : ""}>
                        <strong>Phone:</strong> {adminInfo.phoneNo}
                    </p>
                    </CardContent>
                </Card>
                </motion.div>
            )}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                {renderContent()}
            </motion.div>
            </div>
        </main>
        </div>
    )
}

export default Admin

