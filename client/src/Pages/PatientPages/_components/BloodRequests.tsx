import type React from "react"
import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { Types } from "mongoose"

interface IBloodRequest {
    _id: string
    patientId: Types.ObjectId
    quantity: string
    type: "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-"
    completed: boolean
    createdAt: string
    }

    const PatientBloodRequests = () => {
    const [bloodRequests, setBloodRequests] = useState<IBloodRequest[]>([])
    const [newRequest, setNewRequest] = useState({ bloodGroup: "", units: "" })

    useEffect(() => {
        fetchBloodRequests()
    }, [])

    const fetchBloodRequests = async () => {
        try {
        const response = await fetch("/patient/bloodRequests")
        if (response.ok) {
            const data = await response.json()
            setBloodRequests(data.data)
        }
        } catch (error) {
        console.error("Error fetching blood requests:", error)
        }
    }

    const handleNewRequestChange = (field: string, value: string) => {
        setNewRequest({ ...newRequest, [field]: value })
    }

    const handleSubmitRequest = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
        const response = await fetch("/patient/bloodRequest", {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify(newRequest),
        })
        if (response.ok) {
            setNewRequest({ bloodGroup: "", units: "" })
            await fetchBloodRequests()
        }
        } catch (error) {
        console.error("Error submitting blood request:", error)
        }
    }

    const handleDeleteRequest = async (requestId: string) => {
        try {
        const response = await fetch(`/patient/bloodRequest/${requestId}`, {
            method: "DELETE",
        })
        if (response.ok) {
            await fetchBloodRequests()
        }
        } catch (error) {
        console.error("Error deleting blood request:", error)
        }
    }

    return (
        <Card>
        <CardHeader>
            <CardTitle>My Blood Requests</CardTitle>
        </CardHeader>
        <CardContent>
            <form onSubmit={handleSubmitRequest} className="mb-6 space-y-4">
            <Select onValueChange={(value) => handleNewRequestChange("bloodGroup", value)}>
                <SelectTrigger>
                <SelectValue placeholder="Select blood group" />
                </SelectTrigger>
                <SelectContent>
                {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((type) => (
                    <SelectItem key={type} value={type}>
                    {type}
                    </SelectItem>
                ))}
                </SelectContent>
            </Select>
            <Input
                type="number"
                placeholder="Units required"
                value={newRequest.units}
                onChange={(e) => handleNewRequestChange("units", e.target.value)}
            />
            <Button type="submit">Submit Request</Button>
            </form>
            <Table>
            <TableHeader>
                <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Blood Type</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Action</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {bloodRequests.map((request) => (
                <TableRow key={request._id}>
                    <TableCell>{new Date(request.createdAt).toLocaleDateString()}</TableCell>
                    <TableCell>{request.type}</TableCell>
                    <TableCell>{request.quantity}</TableCell>
                    <TableCell>{request.completed ? "Completed" : "Pending"}</TableCell>
                    <TableCell>
                    {!request.completed && (
                        <Button variant="destructive" onClick={() => handleDeleteRequest(request._id)}>
                        Delete
                        </Button>
                    )}
                    </TableCell>
                </TableRow>
                ))}
            </TableBody>
            </Table>
        </CardContent>
        </Card>
    )
}

export default PatientBloodRequests

