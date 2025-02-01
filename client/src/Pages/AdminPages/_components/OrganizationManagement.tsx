import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import axiosInstance from "@/util/axiosInstance"
import { motion } from "framer-motion"
import { useThemeStore } from "@/store/themeStore"
import { Building2, Mail, Phone, XCircle } from "lucide-react"
import { toast } from "react-hot-toast"

interface IOrganization {
    _id: string
    name: string
    email: string
    phoneNo?: string
    }

    const OrganizationManagement = () => {
    const [organizations, setOrganizations] = useState<IOrganization[]>([])
    const { theme } = useThemeStore()

    useEffect(() => {
        fetchOrganizations()
    }, [])

    const fetchOrganizations = async () => {
        try {
        const { data } = await axiosInstance.get("/admin/getOrganisation")
        setOrganizations(data.data)
        } catch (error) {
        console.error("Error fetching organizations:", error)
        toast.error("Failed to fetch organizations. Please try again.")
        }
    }

    const handleDelete = async (organizationId: string) => {
        try {
        await axiosInstance.delete("/admin/deleteOrganisation", { data: { organisationId: organizationId } })
        await fetchOrganizations()
        toast.success("Organization deleted successfully.")
        } catch (error) {
        console.error("Error deleting organization:", error)
        toast.error("Failed to delete organizations. Please try again.")
        }
    }

    return (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
        <Card
            className={`${
            theme === "light" ? "bg-white border-gray-200 shadow-sm" : "bg-base-200/50 backdrop-blur-sm border-primary/10"
            }`}
        >
            <CardHeader>
            <CardTitle className={`flex items-center ${theme === "light" ? "text-gray-800" : ""}`}>
                <Building2 className="w-6 h-6 mr-2 text-blue-500" />
                Organization Management
            </CardTitle>
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
                {organizations.map((organization) => (
                    <TableRow
                    key={organization._id}
                    className={`hover:${theme === "light" ? "bg-gray-50 text-gray-600" : "bg-base-300/10"}`}
                    >
                    <TableCell>
                        <div className="flex items-center">
                        <Building2 className="w-4 h-4 mr-2 text-gray-500" />
                        {organization.name}
                        </div>
                    </TableCell>
                    <TableCell>
                        <div className="flex items-center">
                        <Mail className="w-4 h-4 mr-2 text-gray-500" />
                        {organization.email}
                        </div>
                    </TableCell>
                    <TableCell>
                        <div className="flex items-center">
                        <Phone className="w-4 h-4 mr-2 text-gray-500" />
                        {organization.phoneNo || "N/A"}
                        </div>
                    </TableCell>
                    <TableCell>
                        <Button
                        variant="destructive"
                        onClick={() => handleDelete(organization._id)}
                        className={`${
                            theme === "light"
                            ? "bg-red-100 text-red-600 hover:bg-red-200 hover:text-red-700"
                            : "bg-destructive/20 text-destructive hover:bg-destructive/30"
                        }`}
                        >
                        <XCircle className="w-4 h-4 mr-2" />
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

export default OrganizationManagement

