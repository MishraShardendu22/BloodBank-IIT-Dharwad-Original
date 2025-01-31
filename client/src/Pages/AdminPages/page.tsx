import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Navbar from "@/components/Navbar"
import { motion } from "framer-motion"
import axiosInstance from "@/util/axiosInstance"
import Analytics from "./_components/Analytics"
import DonorManagement from "./_components/DonorManagement"
import PatientManagement from "./_components/PatientManagement"
import OrganizationManagement from "./_components/OrganizationManagement"
import DonationLocationManagement from "./_components/DonationLocationManagement"
import BloodRequestManagement from "./_components/BloodRequestManagement"



interface IAdmin {
    _id: string
    name: string
    email: string
    phoneNo: string
    }

    const Admin = () => {
    const [adminInfo, setAdminInfo] = useState<IAdmin | null>(null)

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

    return (
        <div className="min-h-screen bg-gradient-to-b from-base-100 to-primary/20" data-theme="bloodsphere">
        <Navbar />
        <div className="container p-4 pt-16 mx-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            </motion.div>
            {adminInfo && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                <Card className="mb-6 bg-base-200/50 backdrop-blur-sm border-primary/10">
                <CardHeader>
                    <CardTitle>Admin Information</CardTitle>
                </CardHeader>
                <CardContent>
                    <p>
                    <strong>Name:</strong> {adminInfo.name}
                    </p>
                    <p>
                    <strong>Email:</strong> {adminInfo.email}
                    </p>
                    <p>
                    <strong>Phone:</strong> {adminInfo.phoneNo}
                    </p>
                </CardContent>
                </Card>
            </motion.div>
            )}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <Tabs defaultValue="analytics" className="w-full">
                <TabsList className="bg-base-200/50 backdrop-blur-sm">
                <TabsTrigger value="analytics">Analytics</TabsTrigger>
                <TabsTrigger value="donors">Donors</TabsTrigger>
                <TabsTrigger value="patients">Patients</TabsTrigger>
                <TabsTrigger value="organizations">Organizations</TabsTrigger>
                <TabsTrigger value="locations">Donation Locations</TabsTrigger>
                <TabsTrigger value="requests">Blood Requests</TabsTrigger>
                </TabsList>
                <TabsContent value="analytics">
                <Analytics />
                </TabsContent>
                <TabsContent value="donors">
                <DonorManagement />
                </TabsContent>
                <TabsContent value="patients">
                <PatientManagement />
                </TabsContent>
                <TabsContent value="organizations">
                <OrganizationManagement />
                </TabsContent>
                <TabsContent value="locations">
                <DonationLocationManagement />
                </TabsContent>
                <TabsContent value="requests">
                <BloodRequestManagement />
                </TabsContent>
            </Tabs>
            </motion.div>
        </div>
        </div>
    )
    }

export default Admin

