import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    LineChart,
    Line,
    } from "recharts"
    import axiosInstance from "@/util/axiosInstance"
    import { motion } from "framer-motion"

    interface IAnalytics {
    donors: number
    patients: number
    organisations: number
    donationLocations: number
    bloodRequests: number
    }

    const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"]

    const Analytics = () => {
    const [analytics, setAnalytics] = useState<IAnalytics | null>(null)
    const [timeData, setTimeData] = useState<any[]>([])

    useEffect(() => {
        fetchAnalytics()
        generateMockTimeData()
    }, [])

    const fetchAnalytics = async () => {
        try {
        const { data } = await axiosInstance.get("/admin/getAnalytics")
        setAnalytics(data.data)
        } catch (error) {
        console.error("Error fetching analytics:", error)
        }
    }

    const generateMockTimeData = () => {
        const mockData = []
        for (let i = 0; i < 7; i++) {
        const date = new Date()
        date.setDate(date.getDate() - i)
        mockData.push({
            date: date.toISOString().split("T")[0],
            donations: Math.floor(Math.random() * 50) + 10,
            requests: Math.floor(Math.random() * 30) + 5,
        })
        }
        setTimeData(mockData.reverse())
    }

    if (!analytics) return <div>Loading...</div>

    const pieData = [
        { name: "Donors", value: analytics.donors },
        { name: "Patients", value: analytics.patients },
        { name: "Organizations", value: analytics.organisations },
        { name: "Donation Locations", value: analytics.donationLocations },
        { name: "Blood Requests", value: analytics.bloodRequests },
    ]

    return (
        <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="space-y-6"
        >
        <Card className="bg-base-200/50 backdrop-blur-sm border-primary/10">
            <CardHeader>
            <CardTitle>Analytics Overview</CardTitle>
            </CardHeader>
            <CardContent>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
                <AnalyticItem title="Donors" value={analytics.donors} />
                <AnalyticItem title="Patients" value={analytics.patients} />
                <AnalyticItem title="Organizations" value={analytics.organisations} />
                <AnalyticItem title="Donation Locations" value={analytics.donationLocations} />
                <AnalyticItem title="Blood Requests" value={analytics.bloodRequests} />
            </div>
            </CardContent>
        </Card>

        <Tabs defaultValue="distribution" className="w-full">
            <TabsList className="bg-base-200/50 backdrop-blur-sm">
            <TabsTrigger value="distribution">Distribution</TabsTrigger>
            <TabsTrigger value="comparison">Comparison</TabsTrigger>
            <TabsTrigger value="trend">Trend</TabsTrigger>
            </TabsList>
            <TabsContent value="distribution">
            <Card className="bg-base-200/50 backdrop-blur-sm border-primary/10">
                <CardHeader>
                <CardTitle>Distribution of Key Metrics</CardTitle>
                </CardHeader>
                <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                    <PieChart>
                    <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={150}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                        {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                    </PieChart>
                </ResponsiveContainer>
                </CardContent>
            </Card>
            </TabsContent>
            <TabsContent value="comparison">
            <Card className="bg-base-200/50 backdrop-blur-sm border-primary/10">
                <CardHeader>
                <CardTitle>Comparison of Key Metrics</CardTitle>
                </CardHeader>
                <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                    <BarChart data={pieData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="value" fill="#8884d8" />
                    </BarChart>
                </ResponsiveContainer>
                </CardContent>
            </Card>
            </TabsContent>
            <TabsContent value="trend">
            <Card className="bg-base-200/50 backdrop-blur-sm border-primary/10">
                <CardHeader>
                <CardTitle>Donation and Request Trends (Last 7 Days)</CardTitle>
                </CardHeader>
                <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                    <LineChart data={timeData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="donations" stroke="#8884d8" />
                    <Line type="monotone" dataKey="requests" stroke="#82ca9d" />
                    </LineChart>
                </ResponsiveContainer>
                </CardContent>
            </Card>
            </TabsContent>
        </Tabs>
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

