import { useState, useEffect } from "react"
import LogOut from "@/components/Logout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import InventoryManager from "./_components/InventoryManager"
import DonationLocations from "./_components/DonationLocations"
import OrganizationBloodRequests from "./_components/BloodRequests"
import BloodDonation from "./_components/BloodDonation"
import type { Types } from "mongoose"
import axiosInstance from "@/util/axiosInstance"


interface IOrganisation {
    _id: Types.ObjectId
    name: string
    email: string
    phoneNo: string
    }

    const Organisation = () => {
    const [orgData, setOrgData] = useState<IOrganisation | null>(null)

    useEffect(() => {
        fetchOrgData()
    }, [])

    const fetchOrgData = async () => {
        try {
            const { data } = await axiosInstance.get("/organisation/verifyOrganisation")
            setOrgData(data.data)
            } catch (error) {
                console.error("Error fetching organisation data:", error)
            }
    }

    return (
        <div className="container p-4 mx-auto">
        <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold">Organisation Dashboard</h1>
            <LogOut />
        </div>
        {orgData && (
            <Card className="mb-6">
            <CardHeader>
                <CardTitle>{orgData.name}</CardTitle>
            </CardHeader>
            <CardContent>
                <p>
                <strong>Email:</strong> {orgData.email}
                </p>
                <p>
                <strong>Phone:</strong> {orgData.phoneNo}
                </p>
            </CardContent>
            </Card>
        )}
        <Tabs defaultValue="inventory" className="w-full">
            <TabsList>
            <TabsTrigger value="inventory">Inventory</TabsTrigger>
            <TabsTrigger value="locations">Donation Locations</TabsTrigger>
            <TabsTrigger value="requests">Blood Requests</TabsTrigger>
            <TabsTrigger value="donation">Blood Donation</TabsTrigger>
            </TabsList>
            <TabsContent value="inventory">
            <InventoryManager />
            </TabsContent>
            <TabsContent value="locations">
            <DonationLocations />
            </TabsContent>
            <TabsContent value="requests">
            <OrganizationBloodRequests />
            </TabsContent>
            <TabsContent value="donation">
            <BloodDonation />
            </TabsContent>
        </Tabs>
        </div>
    )
}

export default Organisation

