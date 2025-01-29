import type React from "react"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

const BloodDonation = () => {
    const [donationData, setDonationData] = useState({ donorEmail: "", quantity: "" })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDonationData({ ...donationData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
        const response = await fetch("/organisation/addBloodDonated", {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify(donationData),
        })
        if (response.ok) {
            setDonationData({ donorEmail: "", quantity: "" })
            alert("Blood donation added successfully")
        }
        } catch (error) {
        console.error("Error adding blood donation:", error)
        }
    }

    return (
        <Card>
        <CardHeader>
            <CardTitle>Add Blood Donation</CardTitle>
        </CardHeader>
        <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
            <Input name="donorEmail" placeholder="Donor Email" value={donationData.donorEmail} onChange={handleChange} />
            <Input name="quantity" placeholder="Quantity" value={donationData.quantity} onChange={handleChange} />
            <Button type="submit">Add Donation</Button>
            </form>
        </CardContent>
        </Card>
    )
    }

export default BloodDonation

