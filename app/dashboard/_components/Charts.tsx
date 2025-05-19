"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A569BD"];

interface ChartsProps {
  weeklyComplaints: Array<{ name: string; value: number }>;
  pieData: Array<{ name: string; value: number }>;
  topCategories: Array<{ id: number; name: string; count: number }>;
}

export function DashboardCharts({
  weeklyComplaints,
  pieData,
  topCategories,
}: ChartsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-7">
      <Card className="col-span-7">
        <CardHeader>
          <CardTitle>Ibibazo bya buri munsi</CardTitle>
        </CardHeader>
        <CardContent className="pl-2">
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={weeklyComplaints}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis allowDecimals={false} />
              <Tooltip
                formatter={(value) => [`${value} ibibazo`, ""]}
                labelFormatter={(label) => `Umunsi: ${label}`}
              />
              <Bar dataKey="value" fill="#8884d8" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="col-span-7 lg:col-span-4">
        <CardHeader>
          <CardTitle>Ingano y'ibibazo</CardTitle>
          <CardDescription>
            Imitunganyirize y'ibibazo hakurikijwe aho bigeze
          </CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) =>
                  `${name}: ${(percent * 100).toFixed(0)}%`
                }
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {pieData.map((_, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip formatter={(value) => [`${value} ibibazo`, ""]} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="col-span-7 lg:col-span-3">
        <CardHeader className="pb-2">
          <CardTitle>Amatsinda y'ibibazo</CardTitle>
          <CardDescription>Amatsinda afite ibibazo byinshi</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Izina</TableHead>
                <TableHead className="text-right">Ingano</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {topCategories.map((category) => (
                <TableRow key={category.id}>
                  <TableCell>{category.name}</TableCell>
                  <TableCell className="text-right">
                    <Badge variant="outline">{category.count}</Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
