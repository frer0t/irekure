interface DashboardOverview {
  totalComplaints: number;
  submitted: number;
  reviewing: number;
  solved: number;
  submittedPercent: number;
  reviewingPercent: number;
  solvedPercent: number;
  weeklyComplaints: Array<{ name: string; value: number }>;
  pieData: Array<{ name: string; value: number }>;
  topCategories: Array<{ id: number; name: string; count: number }>;
}
export type { DashboardOverview };
