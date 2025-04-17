
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  AreaChart,
  Area,
  Cell,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const monthlyData = [
  { name: "Jan", revenue: 4000, profit: 2400, customers: 2400 },
  { name: "Feb", revenue: 3000, profit: 1398, customers: 2210 },
  { name: "Mar", revenue: 2000, profit: 9800, customers: 2290 },
  { name: "Apr", revenue: 2780, profit: 3908, customers: 2000 },
  { name: "May", revenue: 1890, profit: 4800, customers: 2181 },
  { name: "Jun", revenue: 2390, profit: 3800, customers: 2500 },
  { name: "Jul", revenue: 3490, profit: 4300, customers: 2100 },
  { name: "Aug", revenue: 4000, profit: 2400, customers: 2400 },
  { name: "Sep", revenue: 3000, profit: 1398, customers: 2210 },
  { name: "Oct", revenue: 2000, profit: 9800, customers: 2290 },
  { name: "Nov", revenue: 2780, profit: 3908, customers: 2000 },
  { name: "Dec", revenue: 3490, profit: 4300, customers: 2100 },
];

const weeklyData = [
  { name: "Mon", revenue: 1000, profit: 400, customers: 400 },
  { name: "Tue", revenue: 1200, profit: 500, customers: 450 },
  { name: "Wed", revenue: 1400, profit: 600, customers: 500 },
  { name: "Thu", revenue: 1300, profit: 550, customers: 480 },
  { name: "Fri", revenue: 1500, profit: 700, customers: 520 },
  { name: "Sat", revenue: 1600, profit: 800, customers: 550 },
  { name: "Sun", revenue: 1200, profit: 500, customers: 450 },
];

const pieData = [
  { name: "Product A", value: 400 },
  { name: "Product B", value: 300 },
  { name: "Product C", value: 300 },
  { name: "Product D", value: 200 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const Charts = () => {
  const [period, setPeriod] = useState("monthly");
  const data = period === "monthly" ? monthlyData : weeklyData;

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Analytics Dashboard</h1>
        <p className="text-muted-foreground">
          Visualize your data with powerful, interactive charts.
        </p>
      </div>

      <Tabs defaultValue="line" className="space-y-6">
        <div className="flex justify-between items-center">
          <TabsList>
            <TabsTrigger value="line">Line</TabsTrigger>
            <TabsTrigger value="bar">Bar</TabsTrigger>
            <TabsTrigger value="area">Area</TabsTrigger>
            <TabsTrigger value="pie">Pie</TabsTrigger>
          </TabsList>

          <Tabs value={period} onValueChange={setPeriod}>
            <TabsList>
              <TabsTrigger value="weekly">Weekly</TabsTrigger>
              <TabsTrigger value="monthly">Monthly</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <TabsContent value="line" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Revenue & Profit Trends</CardTitle>
              <CardDescription>
                {period === "monthly" ? "Monthly" : "Weekly"} revenue and profit data
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="revenue" stroke="#8884d8" activeDot={{ r: 8 }} />
                  <Line type="monotone" dataKey="profit" stroke="#82ca9d" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="bar" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Revenue & Profit Comparison</CardTitle>
              <CardDescription>
                {period === "monthly" ? "Monthly" : "Weekly"} revenue and profit comparison
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="revenue" fill="#8884d8" />
                  <Bar dataKey="profit" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="area" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Customer Growth Trend</CardTitle>
              <CardDescription>
                {period === "monthly" ? "Monthly" : "Weekly"} customer acquisition data
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <AreaChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Area
                    type="monotone"
                    dataKey="customers"
                    stroke="#8884d8"
                    fill="#8884d8"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pie" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Product Distribution</CardTitle>
              <CardDescription>Sales distribution across product categories</CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center">
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
      </Tabs>
    </div>
  );
};

export default Charts;
