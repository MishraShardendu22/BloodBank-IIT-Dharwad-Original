import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import axiosInstance from "@/util/axiosInstance"
import { motion } from "framer-motion"
import { useThemeStore } from "@/store/themeStore"

interface IPatient {
    _id: string
    name: string
    email: string
    phoneNo?: string
    }

    const PatientManagement = () => {
    const [patients, setPatients] = useState<IPatient[]>([])
    const { theme } = useThemeStore()

    useEffect(() => {
        fetchPatients()
    }, [])

    const fetchPatients = async () => {
        try {
        const { data } = await axiosInstance.get("/admin/getPatients")
        setPatients(data.data)
        } catch (error) {
        console.error("Error fetching patients:", error)
        }
    }

    const handleDelete = async (patientId: string) => {
        try {
        await axiosInstance.delete("/admin/deletePatient", { data: { patientId } })
        await fetchPatients()
        } catch (error) {
        console.error("Error deleting patient:", error)
        }
    }

    return (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
        <Card
            className={`${theme === "light" ? "bg-white border-gray-200 shadow-sm" : "bg-base-200/50 backdrop-blur-sm border-primary/10"}`}
        >
            <CardHeader>
            <CardTitle className={theme === "light" ? "text-gray-800" : ""}>Patient Management</CardTitle>
            </CardHeader>
            <CardContent>
            <Table>
                <TableHeader>
                <TableRow className={theme === "light" ? "bg-gray-50 text-gray-500" : ""}>
                    <TableHead className="font-semibold">Name</TableHead>
                    <TableHead className="font-semibold">Email</TableHead>
                    <TableHead className="font-semibold">Phone</TableHead>
                    <TableHead className="font-semibold">Action</TableHead>
                </TableRow>
                </TableHeader>
                <TableBody>
                {patients.map((patient) => (
                    <TableRow key={patient._id} className={`hover:${theme === "light" ? "bg-gray-50 text-gray-600" : "bg-base-300/10"}`}>
                    <TableCell>{patient.name}</TableCell>
                    <TableCell>{patient.email}</TableCell>
                    <TableCell>{patient.phoneNo || "N/A"}</TableCell>
                    <TableCell>
                        <Button
                        variant="destructive"
                        onClick={() => handleDelete(patient._id)}
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

export default PatientManagement

