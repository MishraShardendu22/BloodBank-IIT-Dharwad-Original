"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import BloodAvailability from "./_components/BloodAvailability"
import PatientBloodRequests from "./_components/BloodRequests"
import type { Types } from "mongoose"
import axiosInstance from "@/util/axiosInstance"
import Navbar from "@/components/Navbar"
import { motion } from "framer-motion"

interface IPatient {
    _id: Types.ObjectId
    name: string
    email: string
    phoneNo?: string
    }

    const Patient = () => {
    const [patientInfo, setPatientInfo] = useState<IPatient | null>(null)

    useEffect(() => {
        fetchPatientInfo()
    }, [])

    const fetchPatientInfo = async () => {
        try {
        const { data } = await axiosInstance.get("/patient/verifyPatient")
        setPatientInfo(data.data)
        } catch (error) {
        console.error("Error fetching patient info:", error)
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-base-100 to-primary/20" data-theme="bloodsphere">
        <Navbar />
        <div className="container p-4 pt-16 mx-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
            <h1 className="text-3xl font-bold">Patient Dashboard</h1>
            </motion.div>
            {patientInfo && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                <Card className="mb-6 bg-base-200/50 backdrop-blur-sm border-primary/10">
                <CardHeader>
                    <CardTitle>Patient Information</CardTitle>
                </CardHeader>
                <CardContent>
                    <p>
                    <strong>Name:</strong> {patientInfo.name}
                    </p>
                    <p>
                    <strong>Email:</strong> {patientInfo.email}
                    </p>
                    {patientInfo.phoneNo && (
                    <p>
                        <strong>Phone:</strong> {patientInfo.phoneNo}
                    </p>
                    )}
                </CardContent>
                </Card>
            </motion.div>
            )}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <Tabs defaultValue="availability" className="w-full">
                <TabsList className="bg-base-200/50 backdrop-blur-sm">
                <TabsTrigger value="availability">Blood Availability</TabsTrigger>
                <TabsTrigger value="requests">Blood Requests</TabsTrigger>
                </TabsList>
                <TabsContent value="availability">
                <BloodAvailability />
                </TabsContent>
                <TabsContent value="requests">
                <PatientBloodRequests />
                </TabsContent>
            </Tabs>
            </motion.div>
        </div>
        </div>
    )
    }

export default Patient

