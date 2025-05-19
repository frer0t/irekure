import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { FileBarChart, FileCheck, FileClock, FileSearch } from "lucide-react";

import { createClientServer } from "@/lib/supabase/server";
import { ApiResponse } from "@/types/api";
import { DashboardOverview } from "@/types/dashboard";
import { DashboardCharts } from "./_components/Charts";

const DashboardContent = async () => {
  const supabase = await createClientServer();
  let userData;
  let dashboardData;

  try {
    // Get user data
    const { data: authData, error: userError } = await supabase.auth.getUser();
    if (userError)
      throw new Error(`Failed to fetch user: ${userError.message}`);
    userData = authData.user;

    // Get dashboard data
    const { data, error } = await supabase.functions.invoke<
      ApiResponse<DashboardOverview>
    >("dashboard");

    if (error)
      throw new Error(`Failed to fetch dashboard data: ${error.message}`);
    if (!data) throw new Error("No dashboard data received");

    try {
      const parsedData = typeof data === "string" ? JSON.parse(data) : data;

      if (
        parsedData &&
        typeof parsedData === "object" &&
        "data" in parsedData
      ) {
        dashboardData = parsedData.data;
      } else {
        throw new Error("Invalid API response structure after parsing");
      }
    } catch (parseError) {
      console.error("Error parsing API response:", parseError);
      throw new Error(
        `Failed to parse dashboard data: ${
          parseError instanceof Error ? parseError.message : String(parseError)
        }`
      );
    }
  } catch (err) {
    console.error("Dashboard error:", err);
    throw new Error(
      `Failed to load dashboard content: ${
        err instanceof Error ? err.message : String(err)
      }`
    );
  }

  const {
    totalComplaints,
    submitted,
    reviewing,
    solved,
    submittedPercent,
    reviewingPercent,
    solvedPercent,
    weeklyComplaints,
    topCategories,
    pieData,
  } = dashboardData || {
    totalComplaints: 0,
    submitted: 0,
    reviewing: 0,
    solved: 0,
    submittedPercent: 0,
    reviewingPercent: 0,
    solvedPercent: 0,
    weeklyComplaints: [],
    topCategories: [],
    pieData: [],
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">
          Ikaze, {userData?.email || "User"}
        </h1>
      </div>

      <main className="space-y-4">
        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 space-y-4">
          <Card className="gap-2">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Ibibazo Byose
              </CardTitle>
              <FileBarChart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{totalComplaints}</div>
            </CardContent>
          </Card>

          <Card className="gap-2">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Byatanzwe</CardTitle>
              <FileSearch className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{submitted}</div>
              <div className="mt-2">
                <Progress value={submittedPercent} className="h-2" />
                <p className="text-xs text-muted-foreground mt-1">
                  {submittedPercent}% by'ibibazo byose
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="gap-2">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 ">
              <CardTitle className="text-sm font-medium">Birebwa</CardTitle>
              <FileClock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{reviewing}</div>
              <div className="mt-2">
                <Progress value={reviewingPercent} className="h-2" />
                <p className="text-xs text-muted-foreground mt-1">
                  {reviewingPercent}% by'ibibazo byose
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="gap-2 ">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 ">
              <CardTitle className="text-sm font-medium">Byakemutse</CardTitle>
              <FileCheck className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{solved}</div>
              <div className="mt-2">
                <Progress value={solvedPercent} className="h-2" />
                <p className="text-xs text-muted-foreground mt-1">
                  {solvedPercent}% by'ibibazo byose
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
        <DashboardCharts
          weeklyComplaints={weeklyComplaints}
          pieData={pieData}
          topCategories={topCategories}
        />
      </main>
    </div>
  );
};

export default DashboardContent;
