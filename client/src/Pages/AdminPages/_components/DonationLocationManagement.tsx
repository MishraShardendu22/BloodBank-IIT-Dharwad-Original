import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import axiosInstance from "@/util/axiosInstance"
import { motion } from "framer-motion"

interface IDonationLocation {
    _id: string
    name: string
    contactDetails: string
    location: string
    timings: string
    organisationId: {
        name: string
    }
    }

    const DonationLocationManagement = () => {
    const [locations, setLocations] = useState<IDonationLocation[]>([])

    useEffect(() => {
        fetchDonationLocations()
    }, [])

    const fetchDonationLocations = async () => {
        try {
        const { data } = await axiosInstance.get("/admin/getDonationLocations")
        setLocations(data.data)
        } catch (error) {
        console.error("Error fetching donation locations:", error)
        }
    }

    const handleDelete = async (locationId: string) => {
        try {
        await axiosInstance.delete("/admin/deleteDonationLocation", { data: { donationLocationId: locationId } })
        await fetchDonationLocations()
        } catch (error) {
        console.error("Error deleting donation location:", error)
        }
    }

    return (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
        <Card className="bg-base-200/50 backdrop-blur-sm border-primary/10">
            <CardHeader>
            <CardTitle>Donation Location Management</CardTitle>
            </CardHeader>
            <CardContent>
            <Table>
                <TableHeader>
                <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Organization</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Timings</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Action</TableHead>
                </TableRow>
                </TableHeader>
                <TableBody>
                {locations.map((location) => (
                    <TableRow key={location._id}>
                    <TableCell>{location.name}</TableCell>
                    <TableCell>{location.organisationId.name}</TableCell>
                    <TableCell>{location.location}</TableCell>
                    <TableCell>{location.timings}</TableCell>
                    <TableCell>{location.contactDetails}</TableCell>
                    <TableCell>
                        <Button variant="destructive" onClick={() => handleDelete(location._id)}>
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

export default DonationLocationManagement


