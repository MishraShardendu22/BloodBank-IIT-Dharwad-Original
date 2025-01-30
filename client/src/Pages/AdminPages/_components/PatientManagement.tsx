import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import axiosInstance from "@/util/axiosInstance"
import { motion } from "framer-motion"

interface IPatient {
    _id: string
    name: string
    email: string
    phoneNo?: string
    }

    const PatientManagement = () => {
    const [patients, setPatients] = useState<IPatient[]>([])

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
        <Card className="bg-base-200/50 backdrop-blur-sm border-primary/10">
            <CardHeader>
            <CardTitle>Patient Management</CardTitle>
            </CardHeader>
            <CardContent>
            <Table>
                <TableHeader>
                <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Action</TableHead>
                </TableRow>
                </TableHeader>
                <TableBody>
                {patients.map((patient) => (
                    <TableRow key={patient._id}>
                    <TableCell>{patient.name}</TableCell>
                    <TableCell>{patient.email}</TableCell>
                    <TableCell>{patient.phoneNo || "N/A"}</TableCell>
                    <TableCell>
                        <Button variant="destructive" onClick={() => handleDelete(patient._id)}>
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


