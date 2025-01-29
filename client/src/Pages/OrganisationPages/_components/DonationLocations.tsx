import type React from "react"
import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import type { Types } from "mongoose"
import axiosInstance from "@/util/axiosInstance"

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
        <Card>
        <CardHeader>
            <CardTitle>Donation Locations</CardTitle>
        </CardHeader>
        <CardContent>
            <form onSubmit={handleSubmit} className="mb-4 space-y-4">
            <Input name="name" placeholder="Name" value={newLocation.name} onChange={handleChange} />
            <Input
                name="contactDetails"
                placeholder="Contact Details"
                value={newLocation.contactDetails}
                onChange={handleChange}
            />
            <Input name="location" placeholder="Location" value={newLocation.location} onChange={handleChange} />
            <Input name="timings" placeholder="Timings" value={newLocation.timings} onChange={handleChange} />
            <Button type="submit">Add Location</Button>
            </form>
            <div className="space-y-4">
            {locations.map((loc) => (
                <Card key={loc._id}>
                <CardContent>
                    {editingLocation && editingLocation._id === loc._id ? (
                    <form onSubmit={handleUpdate} className="space-y-2">
                        <Input
                        name="name"
                        value={editingLocation.name}
                        onChange={(e) => setEditingLocation({ ...editingLocation, name: e.target.value })}
                        />
                        <Input
                        name="contactDetails"
                        value={editingLocation.contactDetails}
                        onChange={(e) => setEditingLocation({ ...editingLocation, contactDetails: e.target.value })}
                        />
                        <Input
                        name="location"
                        value={editingLocation.location}
                        onChange={(e) => setEditingLocation({ ...editingLocation, location: e.target.value })}
                        />
                        <Input
                        name="timings"
                        value={editingLocation.timings}
                        onChange={(e) => setEditingLocation({ ...editingLocation, timings: e.target.value })}
                        />
                        <Button type="submit">Update</Button>
                        <Button type="button" onClick={() => setEditingLocation(null)}>
                        Cancel
                        </Button>
                    </form>
                    ) : (
                    <>
                        <h3 className="font-bold">{loc.name}</h3>
                        <p>{loc.contactDetails}</p>
                        <p>{loc.location}</p>
                        <p>{loc.timings}</p>
                        <Button onClick={() => handleEdit(loc)}>Edit</Button>
                        <Button variant="destructive" onClick={() => handleDelete(loc._id)}>
                        Delete
                        </Button>
                    </>
                    )}
                </CardContent>
                </Card>
            ))}
            </div>
        </CardContent>
        </Card>
    )
}

export default DonationLocations

