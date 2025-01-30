import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import type { Types } from "mongoose"
import axiosInstance from "@/util/axiosInstance"

interface IInventory {
    _id: string
    OrganisationId: {
        _id: Types.ObjectId
        name: string
        email: string
        phoneNo: string
    }
    A_P: number
    A_M: number
    B_P: number
    B_M: number
    AB_P: number
    AB_M: number
    O_P: number
    O_M: number
    }

    const BloodAvailability = () => {
    const [bloodAvailable, setBloodAvailable] = useState<IInventory[]>([])

    useEffect(() => {
        fetchBloodAvailable()
    }, [])

    const fetchBloodAvailable = async () => {
        try {
            const { data } = await axiosInstance.get("/patient/bloodAvailable")
            setBloodAvailable(data.data)
        } catch (error) {
            console.error("Error fetching blood availability:", error)
        }
    }

    return (
        <Card>
        <CardHeader>
            <CardTitle>Blood Availability</CardTitle>
        </CardHeader>
        <CardContent>
            <Table>
            <TableHeader>
                <TableRow>
                <TableHead>Organisation</TableHead>
                <TableHead>A+</TableHead>
                <TableHead>A-</TableHead>
                <TableHead>B+</TableHead>
                <TableHead>B-</TableHead>
                <TableHead>AB+</TableHead>
                <TableHead>AB-</TableHead>
                <TableHead>O+</TableHead>
                <TableHead>O-</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {bloodAvailable.map((inventory) => (
                <TableRow key={inventory._id}>
                    <TableCell>{inventory.OrganisationId.name}</TableCell>
                    <TableCell>{inventory.A_P}</TableCell>
                    <TableCell>{inventory.A_M}</TableCell>
                    <TableCell>{inventory.B_P}</TableCell>
                    <TableCell>{inventory.B_M}</TableCell>
                    <TableCell>{inventory.AB_P}</TableCell>
                    <TableCell>{inventory.AB_M}</TableCell>
                    <TableCell>{inventory.O_P}</TableCell>
                    <TableCell>{inventory.O_M}</TableCell>
                </TableRow>
                ))}
            </TableBody>
            </Table>
        </CardContent>
        </Card>
    )
}

export default BloodAvailability

