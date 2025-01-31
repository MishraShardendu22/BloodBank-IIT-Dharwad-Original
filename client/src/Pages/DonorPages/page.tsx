import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import type { Types } from "mongoose"
import axiosInstance from "@/util/axiosInstance"
import { motion } from "framer-motion"
import { Sidebar } from "./_components/Sidebar"
import { useUserStore } from "@/store/store"
import { useThemeStore } from "@/store/themeStore"
import Navbar from "@/components/Navbar"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, Phone, Clock, Award } from "lucide-react"

export interface IDonation {
    _id: string
    donorId: Types.ObjectId
    quantity: string
    organisationId: {
        _id: Types.ObjectId
        name: string
    }
    createdAt: string
    }

    export interface IDonationLocation {
    _id: string
    organisationId: Types.ObjectId
    name: string
    contactDetails: string
    location: string
    timings: string
    otherDetails?: string
    }

    const Donor = () => {
    const [activeTab, setActiveTab] = useState<"info" | "history" | "locations" | "certificate">("info")
    const [donorInfo, setDonorInfo] = useState<{ name: string; email: string } | null>(null)
    const [donationHistory, setDonationHistory] = useState<IDonation[]>([])
    const [donationLocations, setDonationLocations] = useState<IDonationLocation[]>([])
    const setUser = useUserStore((state: any) => state.setUser)
    const { theme } = useThemeStore()

    useEffect(() => {
        fetchDonorInfo()
        fetchDonationHistory()
        fetchDonationLocations()
    }, [])

    const fetchDonorInfo = async () => {
        try {
        const { data } = await axiosInstance.get("/donor/verifyDonor")
        setDonorInfo(data.data)
        setUser(data.data)
        } catch (error) {
        console.error("Error fetching donor info:", error)
        }
    }

    const fetchDonationHistory = async () => {
        try {
        const { data } = await axiosInstance.get("/donor/donation-history")
        setDonationHistory(data.data)
        } catch (error) {
        console.error("Error fetching donation history:", error)
        }
    }

    const getDonationTier = (donationCount: number) => {
        if (donationCount >= 50) return { tier: "Platinum", color: "bg-gradient-to-r from-purple-400 to-purple-600" }
        if (donationCount >= 20) return { tier: "Gold", color: "bg-gradient-to-r from-yellow-400 to-yellow-600" }
        if (donationCount >= 10) return { tier: "Silver", color: "bg-gradient-to-r from-gray-400 to-gray-600" }
        if (donationCount >= 5) return { tier: "Bronze", color: "bg-gradient-to-r from-orange-400 to-orange-600" }
        return { tier: "Not Eligible", color: "bg-gray-400" }
    }

    const fetchDonationLocations = async () => {
        try {
        const { data } = await axiosInstance.get("/donor/donation-location")
        setDonationLocations(data.data)
        } catch (error) {
        console.error("Error fetching donation locations:", error)
        }
    }

    const renderContent = () => {
        switch (activeTab) {
        case "info":
            return (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                <Card
                className={`mb-6 ${theme === "light" ? "bg-white border-gray-200 shadow-sm" : "bg-base-200/50 backdrop-blur-sm border-primary/10"}`}
                >
                <CardHeader>
                    <CardTitle className={`text-2xl font-bold ${theme === "light" ? "text-gray-800" : "text-primary"}`}>
                    Donor Information
                    </CardTitle>
                </CardHeader>
                <CardContent className="grid gap-6 md:grid-cols-2">
                    {donorInfo && (
                    <>
                        <div className="space-y-4">
                        <div
                            className={`p-4 rounded-lg ${theme === "light" ? "bg-gray-50 border border-gray-200" : "bg-base-300/30"}`}
                        >
                            <h3 className={`mb-2 text-lg font-semibold ${theme === "light" ? "text-gray-800" : ""}`}>
                            Personal Details
                            </h3>
                            <div className="space-y-2">
                            <p className="flex items-center gap-2">
                                <span className="font-medium text-gray-500">Name:</span>
                                <span className={theme === "light" ? "text-gray-700" : "text-primary"}>
                                {donorInfo.name}
                                </span>
                            </p>
                            <p className="flex items-center gap-2">
                                <span className="font-medium text-gray-500">Email:</span>
                                <span className={theme === "light" ? "text-gray-700" : "text-primary"}>
                                {donorInfo.email}
                                </span>
                            </p>
                            <p className="flex items-center gap-2">
                                <span className="font-medium text-gray-500">Role:</span>
                                <Badge variant={theme === "light" ? "default" : "secondary"}>Donor</Badge>
                            </p>
                            </div>
                        </div>
                        </div>
                        <div className="space-y-4">
                        <div
                            className={`p-4 rounded-lg ${theme === "light" ? "bg-gray-50 border border-gray-200" : "bg-base-300/30"}`}
                        >
                            <h3 className={`mb-2 text-lg font-semibold ${theme === "light" ? "text-gray-800" : ""}`}>
                            Donation Statistics
                            </h3>
                            <div className="space-y-2">
                            <p className="flex items-center gap-2">
                                <span className="font-medium text-gray-500">Total Donations:</span>
                                <Badge variant={theme === "light" ? "default" : "secondary"}>
                                {donationHistory.length}
                                </Badge>
                            </p>
                            <p className="flex items-center gap-2">
                                <span className="font-medium text-gray-500">Last Donation:</span>
                                <span className={theme === "light" ? "text-gray-700" : "text-primary"}>
                                {donationHistory[0]?.createdAt
                                    ? new Date(donationHistory[0].createdAt).toLocaleDateString()
                                    :"Your generosity is still waiting to make its grand debut! 🎭"}
                                </span>
                            </p>
                            </div>
                        </div>
                        </div>
                    </>
                    )}
                </CardContent>
                </Card>
            </motion.div>
            )
        case "history":
            return (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                <Card
                className={`mb-6 ${theme === "light" ? "bg-white border-gray-200 shadow-sm" : "bg-base-200/50 backdrop-blur-sm border-primary/10"}`}
                >
                <CardHeader>
                    <CardTitle className={`text-2xl font-bold ${theme === "light" ? "text-gray-800" : "text-primary"}`}>
                    Donation History
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div
                    className={`overflow-hidden border rounded-lg ${theme === "light" ? "border-gray-200" : "border-base-300"}`}
                    >
                    <Table>
                        <TableHeader>
                        <TableRow className={theme === "light" ? "bg-gray-50" : "bg-base-300/30"}>
                            <TableHead className="font-semibold">Date</TableHead>
                            <TableHead className="font-semibold">Organisation</TableHead>
                            <TableHead className="font-semibold">Quantity</TableHead>
                            <TableHead className="font-semibold">Status</TableHead>
                        </TableRow>
                        </TableHeader>
                        <TableBody>
                        {donationHistory.map((donation, index) => (
                            <TableRow
                            key={index}
                            className={`hover:${theme === "light" ? "bg-gray-50" : "bg-base-300/10"}`}
                            >
                            <TableCell>
                                <div className="flex items-center gap-2">
                                <Calendar className={`w-4 h-4 ${theme === "light" ? "text-gray-700" : "text-primary"}`} />
                                {new Date(donation.createdAt).toLocaleDateString()}
                                </div>
                            </TableCell>
                            <TableCell>{donation.organisationId.name}</TableCell>
                            <TableCell>{donation.quantity}</TableCell>
                            <TableCell>
                                <Badge variant={theme === "light" ? "outline" : "default"}>Completed</Badge>
                            </TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                    </div>
                </CardContent>
                </Card>
            </motion.div>
            )
        case "locations":
            return (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                <Card
                className={`${theme === "light" ? "bg-white border-gray-200 shadow-sm" : "bg-base-200/50 backdrop-blur-sm border-primary/10"}`}
                >
                <CardHeader>
                    <CardTitle className={`text-2xl font-bold ${theme === "light" ? "text-gray-800" : "text-primary"}`}>
                    Donation Locations
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div
                    className={`overflow-hidden border rounded-lg ${theme === "light" ? "border-gray-200" : "border-base-300"}`}
                    >
                    <Table>
                        <TableHeader>
                        <TableRow className={theme === "light" ? "bg-gray-50 text-gray-400" : "bg-base-300/30"}>
                            <TableHead className="font-semibold">Name</TableHead>
                            <TableHead className="font-semibold">Location</TableHead>
                            <TableHead className="font-semibold">Timings</TableHead>
                            <TableHead className="font-semibold">Contact</TableHead>
                            <TableHead className="font-semibold">Action</TableHead>
                        </TableRow>
                        </TableHeader>
                        <TableBody>
                        {donationLocations.map((location, index) => (
                            <TableRow
                            key={index}
                            className={`hover:${theme === "light" ? "bg-gray-50 text-gray-600" : "bg-base-300/10"}`}
                            >
                            <TableCell className="font-medium">{location.name}</TableCell>
                            <TableCell>
                                <div className="flex items-center gap-2">
                                <MapPin className={`w-4 h-4 ${theme === "light" ? "text-gray-800" : "text-primary"}`} />
                                {location.location}
                                </div>
                            </TableCell>
                            <TableCell>
                                <div className="flex items-center gap-2">
                                <Clock className={`w-4 h-4 ${theme === "light" ? "text-gray-800" : "text-primary"}`} />
                                {location.timings}
                                </div>
                            </TableCell>
                            <TableCell>
                                <div className="flex items-center gap-2">
                                <Phone className={`w-4 h-4 ${theme === "light" ? "text-gray-800" : "text-primary"}`} />
                                {location.contactDetails}
                                </div>
                            </TableCell>
                            <TableCell>
                                <Button
                                variant="outline"
                                className={`transition-colors ${
                                    theme === "light"
                                    ? "bg-white text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700"
                                    : "bg-primary/10 text-primary hover:bg-primary/20"
                                }`}
                                >
                                Book Appointment
                                </Button>
                            </TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                    </div>
                </CardContent>
                </Card>
            </motion.div>
            )

            case "certificate":
                const donationCount = donationHistory.length
                const { tier, color } = getDonationTier(donationCount)
                
                return (
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                        <Card className={`mb-6 ${theme === "light" ? "bg-white border-gray-200 shadow-sm" : "bg-base-200/50 backdrop-blur-sm border-primary/10"}`}>
                            <CardHeader>
                                <CardTitle className={`text-2xl font-bold ${theme === "light" ? "text-gray-800" : "text-primary"}`}>
                                    Donation Certificate
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="flex flex-col items-center justify-center p-8 space-y-6">
                                <div className={`p-4 rounded-full ${color}`}>
                                    <Award className="w-16 h-16 text-white" />
                                </div>
                                <div className="text-center">
                                    <h3 className={`text-2xl font-bold ${theme === "light" ? "text-gray-800" : "text-primary"}`}>
                                        {tier} Donor
                                    </h3>
                                    <p className={`mt-2 ${theme === "light" ? "text-gray-600" : "text-gray-300"}`}>
                                        Total Donations: {donationCount}
                                    </p>
                                </div>
                                {tier !== "Not Eligible" ? (
                                    <Button 
                                        className={`mt-4 ${color} text-white hover:opacity-90`}
                                        onClick={() => {}}
                                    >
                                        Download Certificate
                                    </Button>
                                ) : (
                                    <p className="mt-4 text-gray-500">
                                        Make at least 5 donations to earn your first certificate!
                                    </p>
                                )}
                                <div className="w-full max-w-md p-4 mt-8 bg-gray-100 rounded-lg bg-opacity-20">
                                    <h4 className="mb-4 text-lg font-semibold">Achievement Tiers</h4>
                                    <div className="space-y-2">
                                        <p>🥉 Bronze: 5+ donations</p>
                                        <p>🥈 Silver: 10+ donations</p>
                                        <p>🥇 Gold: 20+ donations</p>
                                        <p>💎 Platinum: 50+ donations</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                )
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
                Donor Dashboard
                </h1>
            </motion.div>
            {renderContent()}
            </div>
        </main>
        </div>
    )
    }

export default Donor

