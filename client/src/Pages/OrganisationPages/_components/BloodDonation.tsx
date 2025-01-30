import type React from "react"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import axiosInstance from "@/util/axiosInstance"
import { motion } from "framer-motion"

const BloodDonation = () => {
    const [donationData, setDonationData] = useState({ donorEmail: "", quantity: "" })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDonationData({ ...donationData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
        await axiosInstance.post("/organisation/addBloodDonated", donationData)
        setDonationData({ donorEmail: "", quantity: "" })
        alert("Blood donation added successfully")
        } catch (error) {
        console.error("Error adding blood donation:", error)
        }
    }

    return (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
        <Card className="bg-base-200/50 backdrop-blur-sm border-primary/10">
            <CardHeader>
            <CardTitle>Add Blood Donation</CardTitle>
            </CardHeader>
            <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                name="donorEmail"
                placeholder="Donor Email"
                value={donationData.donorEmail}
                onChange={handleChange}
                className="bg-base-100"
                />
                <Input
                name="quantity"
                placeholder="Quantity"
                value={donationData.quantity}
                onChange={handleChange}
                className="bg-base-100"
                />
                <Button type="submit" className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                Add Donation
                </Button>
            </form>
            </CardContent>
        </Card>
        </motion.div>
    )
}

export default BloodDonation

