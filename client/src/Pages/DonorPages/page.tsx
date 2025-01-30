"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import type { Types } from "mongoose"
import axiosInstance from "@/util/axiosInstance"
import Navbar from "@/components/Navbar"
import { motion } from "framer-motion"

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
    const [donorInfo, setDonorInfo] = useState<{ name: string; email: string } | null>(null)
    const [donationHistory, setDonationHistory] = useState<IDonation[]>([])
    const [donationLocations, setDonationLocations] = useState<IDonationLocation[]>([])

    useEffect(() => {
        fetchDonorInfo()
        fetchDonationHistory()
        fetchDonationLocations()
    }, [])

    const fetchDonorInfo = async () => {
        try {
        const { data } = await axiosInstance.get("/donor/verifyDonor")
        setDonorInfo(data.data)
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

    const fetchDonationLocations = async () => {
        try {
        const { data } = await axiosInstance.get("/donor/donation-location")
        setDonationLocations(data.data)
        } catch (error) {
        console.error("Error fetching donation locations:", error)
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-base-100 to-primary/20" data-theme="bloodsphere">
        <Navbar />
        <div className="container p-4 pt-16 mx-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
            <h1 className="text-3xl font-bold">Donor Dashboard</h1>
            </motion.div>

            {donorInfo && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                <Card className="mb-6 bg-base-200/50 backdrop-blur-sm border-primary/10">
                <CardHeader>
                    <CardTitle>Donor Information</CardTitle>
                </CardHeader>
                <CardContent>
                    <p>
                    <strong>Name:</strong> {donorInfo.name}
                    </p>
                    <p>
                    <strong>Email:</strong> {donorInfo.email}
                    </p>
                </CardContent>
                </Card>
            </motion.div>
            )}

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <Card className="mb-6 bg-base-200/50 backdrop-blur-sm border-primary/10">
                <CardHeader>
                <CardTitle>Donation History</CardTitle>
                </CardHeader>
                <CardContent>
                <Table>
                    <TableHeader>
                    <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Organisation</TableHead>
                        <TableHead>Quantity</TableHead>
                    </TableRow>
                    </TableHeader>
                    <TableBody>
                    {donationHistory.map((donation, index) => (
                        <TableRow key={index}>
                        <TableCell>{new Date(donation.createdAt).toLocaleDateString()}</TableCell>
                        <TableCell>{donation.organisationId.name}</TableCell>
                        <TableCell>{donation.quantity}</TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
                </CardContent>
            </Card>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <Card className="bg-base-200/50 backdrop-blur-sm border-primary/10">
                <CardHeader>
                <CardTitle>Donation Locations</CardTitle>
                </CardHeader>
                <CardContent>
                <Table>
                    <TableHeader>
                    <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Location</TableHead>
                        <TableHead>Timings</TableHead>
                        <TableHead>Contact</TableHead>
                        <TableHead>Action</TableHead>
                    </TableRow>
                    </TableHeader>
                    <TableBody>
                    {donationLocations.map((location, index) => (
                        <TableRow key={index}>
                        <TableCell>{location.name}</TableCell>
                        <TableCell>{location.location}</TableCell>
                        <TableCell>{location.timings}</TableCell>
                        <TableCell>{location.contactDetails}</TableCell>
                        <TableCell>
                            <Button variant="outline" className="bg-primary/10 text-primary hover:bg-primary/20">
                            Book Appointment
                            </Button>
                        </TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
                </CardContent>
            </Card>
            </motion.div>
        </div>
        </div>
    )
    }

export default Donor

