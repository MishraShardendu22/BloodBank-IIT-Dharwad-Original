import type React from "react"
import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { Types } from "mongoose"
import axiosInstance from "@/util/axiosInstance"
import { motion } from "framer-motion"

interface IBloodRequest {
    _id: string
    patientId: Types.ObjectId
    quantity: string
    type: "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-"
    completed: boolean
    createdAt: string
    }

    const PatientBloodRequests = () => {
    const [bloodRequests, setBloodRequests] = useState<IBloodRequest[]>([])
    const [newRequest, setNewRequest] = useState({ bloodGroup: "", units: "" })

    useEffect(() => {
        fetchBloodRequests()
    }, [])

    const fetchBloodRequests = async () => {
        try {
        const { data } = await axiosInstance.get("/patient/bloodRequests")
        setBloodRequests(data.data)
        } catch (error) {
        console.error("Error fetching blood requests:", error)
        }
    }

    const handleNewRequestChange = (field: string, value: string) => {
        setNewRequest({ ...newRequest, [field]: value })
    }

    const handleSubmitRequest = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
        await axiosInstance.post("/patient/bloodRequest", newRequest)
        setNewRequest({ bloodGroup: "", units: "" })
        await fetchBloodRequests()
        } catch (error) {
        console.error("Error submitting blood request:", error)
        }
    }

    const handleDeleteRequest = async (requestId: string) => {
        try {
        await axiosInstance.delete(`/patient/bloodRequest/${requestId}`)
        await fetchBloodRequests()
        } catch (error) {
        console.error("Error deleting blood request:", error)
        }
    }

    return (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
        <Card className="bg-base-200/50 backdrop-blur-sm border-primary/10">
            <CardHeader>
            <CardTitle>My Blood Requests</CardTitle>
            </CardHeader>
            <CardContent>
            <form onSubmit={handleSubmitRequest} className="mb-6 space-y-4">
                <div className="w-full">
                <Select
                    value={newRequest.bloodGroup}
                    onValueChange={(value) => handleNewRequestChange("bloodGroup", value)}
                >
                    <SelectTrigger className="w-full bg-base-100">
                    <SelectValue placeholder="Select blood group" />
                    </SelectTrigger>
                    <SelectContent className="bg-base-100">
                    {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((type) => (
                        <SelectItem key={type} value={type} className="hover:bg-base-200">
                        {type}
                        </SelectItem>
                    ))}
                    </SelectContent>
                </Select>
                </div>
                <Input
                type="number"
                placeholder="Units required"
                value={newRequest.units}
                onChange={(e) => handleNewRequestChange("units", e.target.value)}
                className="w-full bg-base-100"
                />
                <Button type="submit" className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                Submit Request
                </Button>
            </form>
            <Table>
                <TableHeader>
                <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Blood Type</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Action</TableHead>
                </TableRow>
                </TableHeader>
                <TableBody>
                {bloodRequests.map((request) => (
                    <TableRow key={request._id}>
                    <TableCell>{new Date(request.createdAt).toLocaleDateString()}</TableCell>
                    <TableCell>{request.type}</TableCell>
                    <TableCell>{request.quantity}</TableCell>
                    <TableCell>{request.completed ? "Completed" : "Pending"}</TableCell>
                    <TableCell>
                        {!request.completed && (
                        <Button variant="destructive" onClick={() => handleDeleteRequest(request._id)}>
                            Delete
                        </Button>
                        )}
                    </TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
            </CardContent>
        </Card>
        </motion.div>
    )
}

export default PatientBloodRequests

