import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import axiosInstance from "@/util/axiosInstance"
import { motion } from "framer-motion"
import { useThemeStore } from "@/store/themeStore"

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
    const { theme } = useThemeStore()

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
        <Card
            className={`${theme === "light" ? "bg-white border-gray-200 shadow-sm" : "bg-base-200/50 backdrop-blur-sm border-primary/10"}`}
        >
            <CardHeader>
            <CardTitle className={theme === "light" ? "text-gray-800" : ""}>Donation Location Management</CardTitle>
            </CardHeader>
            <CardContent>
            <Table>
                <TableHeader>
                <TableRow className={theme === "light" ? "bg-gray-50 text-gray-500" : ""}>
                    <TableHead className="font-semibold">Name</TableHead>
                    <TableHead className="font-semibold">Organization</TableHead>
                    <TableHead className="font-semibold">Location</TableHead>
                    <TableHead className="font-semibold">Timings</TableHead>
                    <TableHead className="font-semibold">Contact</TableHead>
                    <TableHead className="font-semibold">Action</TableHead>
                </TableRow>
                </TableHeader>
                <TableBody>
                {locations.map((location) => (
                    <TableRow key={location._id} className={`hover:${theme === "light" ? "bg-gray-50 text-gray-600" : "bg-base-300/10"}`}>
                    <TableCell>{location.name}</TableCell>
                    <TableCell>{location.organisationId.name}</TableCell>
                    <TableCell>{location.location}</TableCell>
                    <TableCell>{location.timings}</TableCell>
                    <TableCell>{location.contactDetails}</TableCell>
                    <TableCell>
                        <Button
                        variant="destructive"
                        onClick={() => handleDelete(location._id)}
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

export default DonationLocationManagement

