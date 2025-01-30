import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import axiosInstance from "@/util/axiosInstance"
import { motion } from "framer-motion"

    interface IDonor {
    _id: string
    name: string
    email: string
    phoneNo?: string
    }

    const DonorManagement = () => {
    const [donors, setDonors] = useState<IDonor[]>([])

    useEffect(() => {
        fetchDonors()
    }, [])

    const fetchDonors = async () => {
        try {
        const { data } = await axiosInstance.get("/admin/getDonors")
        setDonors(data.data)
        } catch (error) {
        console.error("Error fetching donors:", error)
        }
    }

    const handleDelete = async (donorId: string) => {
        try {
        await axiosInstance.delete("/admin/deleteDonor", { data: { donorId } })
        await fetchDonors()
        } catch (error) {
        console.error("Error deleting donor:", error)
        }
    }

    return (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
        <Card className="bg-base-200/50 backdrop-blur-sm border-primary/10">
            <CardHeader>
            <CardTitle>Donor Management</CardTitle>
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
                {donors.map((donor) => (
                    <TableRow key={donor._id}>
                    <TableCell>{donor.name}</TableCell>
                    <TableCell>{donor.email}</TableCell>
                    <TableCell>{donor.phoneNo || "N/A"}</TableCell>
                    <TableCell>
                        <Button variant="destructive" onClick={() => handleDelete(donor._id)}>
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

export default DonorManagement


