import type React from "react"
import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import type { Types } from "mongoose"
import axiosInstance from "@/util/axiosInstance"
import { motion } from "framer-motion"
import { useThemeStore } from "@/store/themeStore"

interface IDonationLocation {
    _id: string
    organisationId: Types.ObjectId
    name: string
    contactDetails: string
    location: string
    timings: string
    otherDetails?: string
    }

    const DonationLocations = () => {
    const [locations, setLocations] = useState<IDonationLocation[]>([])
    const [newLocation, setNewLocation] = useState({ name: "", contactDetails: "", location: "", timings: "" })
    const [editingLocation, setEditingLocation] = useState<IDonationLocation | null>(null)
    const { theme } = useThemeStore()

    useEffect(() => {
        fetchDonationLocations()
    }, [])

    const fetchDonationLocations = async () => {
        try {
        const { data } = await axiosInstance.get("/organisation/getDonationLocations")
        setLocations(data.data)
        } catch (error) {
        console.error("Error fetching donation locations:", error)
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewLocation({ ...newLocation, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
        await axiosInstance.post("/organisation/addDonationLocation", newLocation)
        setNewLocation({ name: "", contactDetails: "", location: "", timings: "" })
        await fetchDonationLocations()
        } catch (error) {
        console.error("Error adding donation location:", error)
        }
    }

    const handleDelete = async (locationId: string) => {
        try {
        await axiosInstance.delete("/organisation/deleteDonationLocation", {
            data: { locationId },
        })
        await fetchDonationLocations()
        } catch (error) {
        console.error("Error deleting donation location:", error)
        }
    }

    const handleEdit = (location: IDonationLocation) => {
        setEditingLocation(location)
    }

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!editingLocation) return

        try {
        await axiosInstance.patch("/organisation/updateDonationLocation", editingLocation)
        setEditingLocation(null)
        await fetchDonationLocations()
        } catch (error) {
        console.error("Error updating donation location:", error)
        }
    }

    return (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
        <Card
            className={`${theme === "light" ? "bg-white border-gray-200 shadow-sm" : "bg-base-200/50 backdrop-blur-sm border-primary/10"}`}
        >
            <CardHeader>
            <CardTitle className={theme === "light" ? "text-gray-800" : ""}>Donation Locations</CardTitle>
            </CardHeader>
            <CardContent>
            <form onSubmit={handleSubmit} className="mb-4 space-y-4">
                <Input
                name="name"
                placeholder="Name"
                value={newLocation.name}
                onChange={handleChange}
                className={theme === "light" ? "bg-gray-50 border-gray-300" : "bg-base-100"}
                />
                <Input
                name="contactDetails"
                placeholder="Contact Details"
                value={newLocation.contactDetails}
                onChange={handleChange}
                className={theme === "light" ? "bg-gray-50 border-gray-300" : "bg-base-100"}
                />
                <Input
                name="location"
                placeholder="Location"
                value={newLocation.location}
                onChange={handleChange}
                className={theme === "light" ? "bg-gray-50 border-gray-300" : "bg-base-100"}
                />
                <Input
                name="timings"
                placeholder="Timings"
                value={newLocation.timings}
                onChange={handleChange}
                className={theme === "light" ? "bg-gray-50 border-gray-300" : "bg-base-100"}
                />
                <Button
                type="submit"
                className={`w-full ${theme === "light" ? "bg-red-600 hover:bg-red-700 text-white" : "bg-primary text-primary-foreground hover:bg-primary/90"}`}
                >
                Add Location
                </Button>
            </form>
            <div className="space-y-4">
                {locations.map((loc) => (
                <Card key={loc._id} className={theme === "light" ? "bg-gray-50 border-gray-200" : "bg-base-100"}>
                    <CardContent className="pt-6">
                    {editingLocation && editingLocation._id === loc._id ? (
                        <form onSubmit={handleUpdate} className="space-y-2">
                        <Input
                            name="name"
                            value={editingLocation.name}
                            onChange={(e) => setEditingLocation({ ...editingLocation, name: e.target.value })}
                            className={theme === "light" ? "bg-white border-gray-300" : "bg-base-200"}
                        />
                        <Input
                            name="contactDetails"
                            value={editingLocation.contactDetails}
                            onChange={(e) => setEditingLocation({ ...editingLocation, contactDetails: e.target.value })}
                            className={theme === "light" ? "bg-white border-gray-300" : "bg-base-200"}
                        />
                        <Input
                            name="location"
                            value={editingLocation.location}
                            onChange={(e) => setEditingLocation({ ...editingLocation, location: e.target.value })}
                            className={theme === "light" ? "bg-white border-gray-300" : "bg-base-200"}
                        />
                        <Input
                            name="timings"
                            value={editingLocation.timings}
                            onChange={(e) => setEditingLocation({ ...editingLocation, timings: e.target.value })}
                            className={theme === "light" ? "bg-white border-gray-300" : "bg-base-200"}
                        />
                        <Button
                            type="submit"
                            className={`${theme === "light" ? "bg-red-600 hover:bg-red-700 text-white" : "bg-primary text-primary-foreground hover:bg-primary/90"}`}
                        >
                            Update
                        </Button>
                        <Button
                            type="button"
                            onClick={() => setEditingLocation(null)}
                            className={`${theme === "light" ? "bg-gray-200 text-gray-800 hover:bg-gray-300" : "bg-secondary text-secondary-foreground hover:bg-secondary/90"}`}
                        >
                            Cancel
                        </Button>
                        </form>
                    ) : (
                        <>
                        <h3 className={`font-bold ${theme === "light" ? "text-gray-800" : ""}`}>{loc.name}</h3>
                        <p className={theme === "light" ? "text-gray-600" : ""}>{loc.contactDetails}</p>
                        <p className={theme === "light" ? "text-gray-600" : ""}>{loc.location}</p>
                        <p className={theme === "light" ? "text-gray-600" : ""}>{loc.timings}</p>
                        <div className="mt-4 space-x-2">
                            <Button
                            onClick={() => handleEdit(loc)}
                            className={`${theme === "light" ? "bg-gray-200 text-gray-800 hover:bg-gray-300" : "bg-secondary text-secondary-foreground hover:bg-secondary/90"}`}
                            >
                            Edit
                            </Button>
                            <Button variant="destructive" onClick={() => handleDelete(loc._id)}>
                            Delete
                            </Button>
                        </div>
                        </>
                    )}
                    </CardContent>
                </Card>
                ))}
            </div>
            </CardContent>
        </Card>
        </motion.div>
    )
    }

export default DonationLocations

