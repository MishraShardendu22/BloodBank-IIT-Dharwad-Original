"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import InventoryManager from "./_components/InventoryManager"
import DonationLocations from "./_components/DonationLocations"
import OrganizationBloodRequests from "./_components/BloodRequests"
import BloodDonation from "./_components/BloodDonation"
import type { Types } from "mongoose"
import axiosInstance from "@/util/axiosInstance"
import Navbar from "@/components/Navbar"
import { motion } from "framer-motion"

interface IOrganisation {
    _id: Types.ObjectId
    name: string
    email: string
    phoneNo: string
    }

    const Organisation = () => {
    const [orgData, setOrgData] = useState<IOrganisation | null>(null)

    useEffect(() => {
        fetchOrgData()
    }, [])

    const fetchOrgData = async () => {
        try {
        const { data } = await axiosInstance.get("/organisation/verifyOrganisation")
        setOrgData(data.data)
        } catch (error) {
        console.error("Error fetching organisation data:", error)
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-base-100 to-primary/20" data-theme="bloodsphere">
        <Navbar />
        <div className="container p-4 pt-16 mx-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
            <h1 className="text-3xl font-bold">Organisation Dashboard</h1>
            </motion.div>
            {orgData && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                <Card className="mb-6 bg-base-200/50 backdrop-blur-sm border-primary/10">
                <CardHeader>
                    <CardTitle>{orgData.name}</CardTitle>
                </CardHeader>
                <CardContent>
                    <p>
                    <strong>Email:</strong> {orgData.email}
                    </p>
                    <p>
                    <strong>Phone:</strong> {orgData.phoneNo}
                    </p>
                </CardContent>
                </Card>
            </motion.div>
            )}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <Tabs defaultValue="inventory" className="w-full">
                <TabsList className="bg-base-200/50 backdrop-blur-sm">
                <TabsTrigger value="inventory">Inventory</TabsTrigger>
                <TabsTrigger value="locations">Donation Locations</TabsTrigger>
                <TabsTrigger value="requests">Blood Requests</TabsTrigger>
                <TabsTrigger value="donation">Blood Donation</TabsTrigger>
                </TabsList>
                <TabsContent value="inventory">
                <InventoryManager />
                </TabsContent>
                <TabsContent value="locations">
                <DonationLocations />
                </TabsContent>
                <TabsContent value="requests">
                <OrganizationBloodRequests />
                </TabsContent>
                <TabsContent value="donation">
                <BloodDonation />
                </TabsContent>
            </Tabs>
            </motion.div>
        </div>
        </div>
    )
}

export default Organisation

