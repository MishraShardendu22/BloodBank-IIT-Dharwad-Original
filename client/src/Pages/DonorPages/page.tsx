"use client"

import { useEffect, useState } from "react"
import LogOut from "@/components/Logout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import type { Types } from "mongoose"
import axiosInstance from "@/util/axiosInstance"

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
        <div className="container p-4 mx-auto">
        <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold">Donor Dashboard</h1>
            <LogOut />
        </div>

        {donorInfo && (
            <Card className="mb-6">
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
        )}

        <Card className="mb-6">
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

        <Card>
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
                        <Button variant="outline">Book Appointment</Button>
                    </TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
            </CardContent>
        </Card>
        </div>
    )
    }

export default Donor

