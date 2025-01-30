
import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import axiosInstance from "@/util/axiosInstance"
import { motion } from "framer-motion"

interface IOrganization {
    _id: string
    name: string
    email: string
    phoneNo?: string
    }

    const OrganizationManagement = () => {
    const [organizations, setOrganizations] = useState<IOrganization[]>([])

    useEffect(() => {
        fetchOrganizations()
    }, [])

    const fetchOrganizations = async () => {
        try {
        const { data } = await axiosInstance.get("/admin/getOrganisation")
        setOrganizations(data.data)
        } catch (error) {
        console.error("Error fetching organizations:", error)
        }
    }

    const handleDelete = async (organizationId: string) => {
        try {
        await axiosInstance.delete("/admin/deleteOrganisation", { data: { organisationId: organizationId } })
        await fetchOrganizations()
        } catch (error) {
        console.error("Error deleting organization:", error)
        }
    }

    return (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
        <Card className="bg-base-200/50 backdrop-blur-sm border-primary/10">
            <CardHeader>
            <CardTitle>Organization Management</CardTitle>
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
                {organizations.map((organization) => (
                    <TableRow key={organization._id}>
                    <TableCell>{organization.name}</TableCell>
                    <TableCell>{organization.email}</TableCell>
                    <TableCell>{organization.phoneNo || "N/A"}</TableCell>
                    <TableCell>
                        <Button variant="destructive" onClick={() => handleDelete(organization._id)}>
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

