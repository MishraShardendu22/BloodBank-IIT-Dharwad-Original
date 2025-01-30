
import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import axiosInstance from "@/util/axiosInstance"
import { motion } from "framer-motion"

interface IAnalytics {
    donors: number
    patients: number
    organisations: number
    donationLocations: number
    bloodRequests: number
    }

    const Analytics = () => {
    const [analytics, setAnalytics] = useState<IAnalytics | null>(null)

    useEffect(() => {
        fetchAnalytics()
    }, [])

    const fetchAnalytics = async () => {
        try {
        const { data } = await axiosInstance.get("/admin/getAnalytics")
        setAnalytics(data.data)
        } catch (error) {
        console.error("Error fetching analytics:", error)
        }
    }

    if (!analytics) return <div>Loading...</div>

    return (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
        <Card className="bg-base-200/50 backdrop-blur-sm border-primary/10">
            <CardHeader>
            <CardTitle>Analytics Overview</CardTitle>
            </CardHeader>
            <CardContent>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
                <AnalyticItem title="Donors" value={analytics.donors} />
                <AnalyticItem title="Patients" value={analytics.patients} />
                <AnalyticItem title="Organizations" value={analytics.organisations} />
                <AnalyticItem title="Donation Locations" value={analytics.donationLocations} />
                <AnalyticItem title="Blood Requests" value={analytics.bloodRequests} />
            </div>
            </CardContent>
        </Card>
        </motion.div>
    )
    }

    const AnalyticItem = ({ title, value }: { title: string; value: number }) => (
    <div className="p-4 rounded-lg bg-base-100">
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-3xl font-bold text-primary">{value}</p>
    </div>
)

export default Analytics

