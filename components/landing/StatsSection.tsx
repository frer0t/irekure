"use client";

import { BarChart3, CheckCircle, Clock } from "lucide-react";
import { useState } from "react";

interface StatsProps {
  initialCitizenReports?: number;
  initialResolved?: number;
  initialAvgResponseTime?: number;
}

export default function StatsSection({
  initialCitizenReports = 1234,
  initialResolved = 1087,
  initialAvgResponseTime = 72,
}: StatsProps) {
  const [stats] = useState({
    totalCitizenReports: initialCitizenReports,
    totalResolved: initialResolved,
    avgResponseTime: initialAvgResponseTime,
  });

  const statsItems = [
    {
      value: stats.totalCitizenReports.toLocaleString(),
      label: "Ibirego Byose",
      description: "Ibirego byatanzwe ku rubuga",
      icon: BarChart3,
      color: "from-blue-500 to-purple-600",
    },
    {
      value: stats.totalResolved.toLocaleString(),
      label: "Ibyakemutse",
      description: "Ibirego byakemuwe na Leta",
      icon: CheckCircle,
      color: "from-green-500 to-emerald-600",
    },
    {
      value: `${stats.avgResponseTime}h`,
      label: "Igihe cyo Gusubiza",
      description: "Impuzandengo y'igihe cyo gusubiza",
      icon: Clock,
      color: "from-amber-500 to-orange-600",
    },
  ];

  return (
    <section className="w-full py-14  ">
      <div className="flex flex-col items-center mb-12">
        <div className="p-3 rounded-full bg-primary/10 mb-4">
          <BarChart3 className="w-6 h-6 text-primary" />
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-center">Imibare</h2>
        <div className="w-20 h-1 bg-primary/30 rounded-full mt-4" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {statsItems.map((stat, index) => (
          <div
            key={index}
            className="relative flex flex-col items-center p-8 rounded-xl bg-gradient-to-br from-card/80 to-card border border-border/40 shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <div
              className={`absolute -z-10 inset-0 opacity-10 bg-gradient-to-br ${stat.color} rounded-xl blur-xl`}
            />

            <div
              className={`p-3 rounded-full mb-4 bg-gradient-to-r ${stat.color} text-white`}
            >
              <stat.icon className="w-6 h-6" />
            </div>

            <div
              className={`text-5xl font-bold mb-3 bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}
            >
              {stat.value}
            </div>

            <div className="text-xl font-medium mb-2">{stat.label}</div>

            <div className="text-sm text-foreground/70 text-center">
              {stat.description}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
