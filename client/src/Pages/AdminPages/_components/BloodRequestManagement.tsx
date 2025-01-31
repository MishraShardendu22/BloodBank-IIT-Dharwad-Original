import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import axiosInstance from "@/util/axiosInstance"
import { motion } from "framer-motion"
import { useThemeStore } from "@/store/themeStore"

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
    const { theme } = useThemeStore()

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
        <Card
            className={`${theme === "light" ? "bg-white border-gray-200 shadow-sm" : "bg-base-200/50 backdrop-blur-sm border-primary/10"}`}
        >
            <CardHeader>
            <CardTitle className={theme === "light" ? "text-gray-800" : ""}>Blood Request Management</CardTitle>
            </CardHeader>
            <CardContent>
            <Table>
                <TableHeader>
                <TableRow className={theme === "light" ? "bg-gray-50 text-gray-500" : ""}>
                    <TableHead className="font-semibold">Patient</TableHead>
                    <TableHead className="font-semibold">Blood Type</TableHead>
                    <TableHead className="font-semibold">Quantity</TableHead>
                    <TableHead className="font-semibold">Status</TableHead>
                    <TableHead className="font-semibold">Date</TableHead>
                    <TableHead className="font-semibold">Action</TableHead>
                </TableRow>
                </TableHeader>
                <TableBody>
                {requests.map((request) => (
                    <TableRow key={request._id} className={`hover:${theme === "light" ? "bg-gray-50 text-gray-600" : "bg-base-300/10"}`}>
                    <TableCell>{request.patientId.name}</TableCell>
                    <TableCell>{request.type}</TableCell>
                    <TableCell>{request.quantity}</TableCell>
                    <TableCell>{request.completed ? "Completed" : "Pending"}</TableCell>
                    <TableCell>{new Date(request.createdAt).toLocaleDateString()}</TableCell>
                    <TableCell>
                        <Button
                        variant="destructive"
                        onClick={() => handleDelete(request._id)}
                        className={theme === "light" ? "bg-red-600 hover:bg-red-700 text-white" : ""}
                        >
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

