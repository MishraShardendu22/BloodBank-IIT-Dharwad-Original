import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import axiosInstance from "@/util/axiosInstance"
import { motion } from "framer-motion"

interface IBloodRequest {
    _id: string
    patientId: {
        name: string
        email: string
        phoneNo?: string
    }
    quantity: string
    type: string
    completed: boolean
    createdAt: string
    }

    const BloodRequestManagement = () => {
    const [requests, setRequests] = useState<IBloodRequest[]>([])

    useEffect(() => {
        fetchBloodRequests()
    }, [])

    const fetchBloodRequests = async () => {
        try {
        const { data } = await axiosInstance.get("/admin/getBloodRequests")
        setRequests(data.data)
        } catch (error) {
        console.error("Error fetching blood requests:", error)
        }
    }

    const handleDelete = async (requestId: string) => {
        try {
        await axiosInstance.delete("/admin/deleteBloodRequest", { data: { bloodRequestId: requestId } })
        await fetchBloodRequests()
        } catch (error) {
        console.error("Error deleting blood request:", error)
        }
    }

    return (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
        <Card className="bg-base-200/50 backdrop-blur-sm border-primary/10">
            <CardHeader>
            <CardTitle>Blood Request Management</CardTitle>
            </CardHeader>
            <CardContent>
            <Table>
                <TableHeader>
                <TableRow>
                    <TableHead>Patient</TableHead>
                    <TableHead>Blood Type</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Action</TableHead>
                </TableRow>
                </TableHeader>
                <TableBody>
                {requests.map((request) => (
                    <TableRow key={request._id}>
                    <TableCell>{request.patientId.name}</TableCell>
                    <TableCell>{request.type}</TableCell>
                    <TableCell>{request.quantity}</TableCell>
                    <TableCell>{request.completed ? "Completed" : "Pending"}</TableCell>
                    <TableCell>{new Date(request.createdAt).toLocaleDateString()}</TableCell>
                    <TableCell>
                        <Button variant="destructive" onClick={() => handleDelete(request._id)}>
                        Delete
                        </Button>
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

export default BloodRequestManagement


