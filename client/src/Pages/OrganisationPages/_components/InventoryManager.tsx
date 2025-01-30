import type React from "react"
import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import axiosInstance from "@/util/axiosInstance"
import { motion } from "framer-motion"

interface IInventory {
    A_P: number
    A_M: number
    B_P: number
    B_M: number
    AB_P: number
    AB_M: number
    O_P: number
    O_M: number
    }

    const InventoryManager = () => {
    const [inventory, setInventory] = useState<IInventory>({
        A_P: 0,
        A_M: 0,
        B_P: 0,
        B_M: 0,
        AB_P: 0,
        AB_M: 0,
        O_P: 0,
        O_M: 0,
    })

    useEffect(() => {
        fetchInventory()
    }, [])

    const fetchInventory = async () => {
        try {
        const { data } = await axiosInstance.get("/organisation/getInventory")
        setInventory(data.data)
        } catch (error) {
        console.error("Error fetching inventory:", error)
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInventory({ ...inventory, [e.target.name]: Number.parseInt(e.target.value) })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
        await axiosInstance.patch("/organisation/updateInventory", inventory)
        await fetchInventory()
        } catch (error) {
        console.error("Error updating inventory:", error)
        }
    }

    return (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
        <Card className="bg-base-200/50 backdrop-blur-sm border-primary/10">
            <CardHeader>
            <CardTitle>Inventory Management</CardTitle>
            </CardHeader>
            <CardContent>
            <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
                {Object.entries(inventory).map(([key, value]) => (
                <div key={key}>
                    <label htmlFor={key} className="block text-sm font-medium text-gray-700">
                    {key}
                    </label>
                    <Input
                    type="number"
                    name={key}
                    id={key}
                    value={value}
                    onChange={handleChange}
                    min="0"
                    className="bg-base-100"
                    />
                </div>
                ))}
                <Button type="submit" className="col-span-2 bg-primary text-primary-foreground hover:bg-primary/90">
                Update Inventory
                </Button>
            </form>
            </CardContent>
        </Card>
        </motion.div>
    )
}

export default InventoryManager

