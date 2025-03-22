"use client"

import { useEffect, useState } from "react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface MarketChartProps {
  marketId: string
}

// Update the MarketChart to remove utilization rate tab and focus on fixed rates
export function MarketChart({ marketId }: MarketChartProps) {
  const [chartData, setChartData] = useState<any[]>([])

  useEffect(() => {
    // In a real app, we would fetch this data based on the marketId
    // This is just sample data for demonstration
    const generateData = () => {
      const data = []
      const now = new Date()

      for (let i = 30; i >= 0; i--) {
        const date = new Date(now)
        date.setDate(date.getDate() - i)

        const lendingAPY = 3 + Math.random() * 0.5 // Less variation for fixed rates
        const borrowingAPY = 5 + Math.random() * 0.5 // Less variation for fixed rates
        const totalSupply = 1000000 + Math.random() * 200000 - 100000
        const totalBorrowed = 600000 + Math.random() * 100000 - 50000

        data.push({
          date: date.toLocaleDateString(),
          lendingAPY: lendingAPY.toFixed(2),
          borrowingAPY: borrowingAPY.toFixed(2),
          totalSupply: (totalSupply / 1000000).toFixed(2),
          totalBorrowed: (totalBorrowed / 1000000).toFixed(2),
        })
      }

      return data
    }

    setChartData(generateData())
  }, [marketId])

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="lendingAPY" stroke="#10b981" name="Lending APY (%)" />
        <Line type="monotone" dataKey="borrowingAPY" stroke="#6366f1" name="Borrowing APY (%)" />
      </LineChart>
    </ResponsiveContainer>
  )
}

