import { useState, useEffect } from "react"
import LogOut from "@/components/Logout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import BloodAvailability from "./_components/BloodAvailability"
import PatientBloodRequests from "./_components/BloodRequests"
import type { Types } from "mongoose"
import axiosInstance from "@/util/axiosInstance"

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
        <div className="container p-4 mx-auto">
        <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold">Patient Dashboard</h1>
            <LogOut />
        </div>
        {patientInfo && (
            <Card className="mb-6">
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
        )}
        <Tabs defaultValue="availability" className="w-full">
            <TabsList>
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
        </div>
    )
}

export default Patient

