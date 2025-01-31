import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import type { Types } from "mongoose"
import axiosInstance from "@/util/axiosInstance"
import { motion } from "framer-motion"
import { useThemeStore } from "@/store/themeStore"

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
    const { theme } = useThemeStore()

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
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
        <Card
            className={`${theme === "light" ? "bg-white border-gray-200 shadow-sm" : "bg-base-200/50 backdrop-blur-sm border-primary/10"}`}
        >
            <CardHeader>
            <CardTitle className={theme === "light" ? "text-gray-800" : ""}>Blood Availability</CardTitle>
            </CardHeader>
            <CardContent>
            <Table>
                <TableHeader>
                <TableRow className={theme === "light" ? "bg-gray-50 text-gray-600" : ""}>
                    <TableHead className="font-semibold">Organisation</TableHead>
                    <TableHead className="font-semibold">A+</TableHead>
                    <TableHead className="font-semibold">A-</TableHead>
                    <TableHead className="font-semibold">B+</TableHead>
                    <TableHead className="font-semibold">B-</TableHead>
                    <TableHead className="font-semibold">AB+</TableHead>
                    <TableHead className="font-semibold">AB-</TableHead>
                    <TableHead className="font-semibold">O+</TableHead>
                    <TableHead className="font-semibold">O-</TableHead>
                </TableRow>
                </TableHeader>
                <TableBody>
                {bloodAvailable.map((inventory) => (
                    <TableRow
                    key={inventory._id}
                    className={`hover:${theme === "light" ? "bg-gray-50 text-gray-500" : "bg-base-300/10"}`}
                    >
                    <TableCell className="font-medium">{inventory.OrganisationId.name}</TableCell>
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
        </motion.div>
    )
}

export default BloodAvailability

