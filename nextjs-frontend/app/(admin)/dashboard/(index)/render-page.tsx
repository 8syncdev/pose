"use client";

import * as React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import {
  Users,
  GraduationCap,
  BookOpen,
  TrendingUp,
  Activity,
  BarChart3,
  UserCheck,
  UserX,
} from "lucide-react";
import { getAllUsers } from "@/lib/actions/user/user.action";
import { getEnrollments } from "@/lib/actions/enrollment/enrollment.action";
import { UserDto } from "@/lib/actions/user/user.dto";
import { EnrollmentDto } from "@/lib/actions/enrollment/enrollment.dto";
import { cn } from "@/lib/utils";

// Enhanced theme with CSS variables
const chartTheme = {
  primary: {
    main: "hsl(var(--primary))",
    light: "hsl(var(--primary) / 0.8)",
    dark: "hsl(var(--primary) / 1.2)",
    gradient: ["hsl(var(--primary))", "hsl(var(--info))"],
  },
  success: {
    main: "hsl(var(--success))",
    light: "hsl(var(--success) / 0.8)",
    dark: "hsl(var(--success) / 1.2)",
    gradient: ["hsl(var(--success))", "hsl(var(--success) / 0.6)"],
  },
  warning: {
    main: "hsl(var(--warning))",
    light: "hsl(var(--warning) / 0.8)",
    dark: "hsl(var(--warning) / 1.2)",
    gradient: ["hsl(var(--warning))", "hsl(var(--warning) / 0.6)"],
  },
  info: {
    main: "hsl(var(--info))",
    light: "hsl(var(--info) / 0.8)",
    dark: "hsl(var(--info) / 1.2)",
    gradient: ["hsl(var(--info))", "hsl(var(--info) / 0.6)"],
  },
};

const chartConfig = {
  users: {
    label: "Người dùng",
    color: chartTheme.primary.main,
    gradient: chartTheme.primary.gradient,
    icon: Users,
  },
  enrollments: {
    label: "Đăng ký",
    color: chartTheme.success.main,
    gradient: chartTheme.success.gradient,
    icon: GraduationCap,
  },
  courses: {
    label: "Khóa học",
    color: chartTheme.warning.main,
    gradient: chartTheme.warning.gradient,
    icon: BookOpen,
  },
  active: {
    label: "Hoạt động",
    color: chartTheme.info.main,
    gradient: chartTheme.info.gradient,
    icon: Activity,
  },
};

// Enhanced hooks with more detailed analytics
const useUserStats = (users: UserDto[]) => {
  return React.useMemo(() => {
    const monthlyStats = users.reduce((acc: number[], user) => {
      const month = new Date(user.date_joined || "").getMonth();
      acc[month] = (acc[month] || 0) + 1;
      return acc;
    }, Array(12).fill(0));

    const activeUsers = users.filter((u) => u.is_active).length;
    const verifiedUsers = users.filter((u) => u.is_verified).length;
    const inactiveUsers = users.length - activeUsers;

    const userStatusData = [
      { name: "Đã xác thực", value: verifiedUsers },
      { name: "Chưa xác thực", value: users.length - verifiedUsers },
    ];

    const userActivityData = [
      { name: "Hoạt động", value: activeUsers },
      { name: "Không hoạt động", value: inactiveUsers },
    ];

    return {
      monthlyStats,
      activeUsers,
      verifiedUsers,
      inactiveUsers,
      totalUsers: users.length,
      userStatusData,
      userActivityData,
    };
  }, [users]);
};

const useEnrollmentStats = (enrollments: EnrollmentDto[]) => {
  return React.useMemo(() => {
    const statusStats = enrollments.reduce(
      (acc: Record<string, number>, enrollment) => {
        const status = enrollment.status;
        acc[status] = (acc[status] || 0) + 1;
        return acc;
      },
      {}
    );

    const monthlyStats = enrollments.reduce((acc: number[], enrollment) => {
      const month = new Date(enrollment.created_at).getMonth();
      acc[month] = (acc[month] || 0) + 1;
      return acc;
    }, Array(12).fill(0));

    const completionRate =
      (enrollments.filter((e) => e.status === "active").length /
        enrollments.length) *
      100;

    return {
      statusStats: Object.entries(statusStats).map(([name, value]) => ({
        name: name.charAt(0).toUpperCase() + name.slice(1),
        value,
        color:
          chartTheme[
            name === "active"
              ? "success"
              : name === "completed"
              ? "primary"
              : "warning"
          ].main,
      })),
      monthlyStats,
      totalEnrollments: enrollments.length,
      completionRate: Math.round(completionRate),
    };
  }, [enrollments]);
};

// Enhanced card component with hover effects and animations
const StatCard = ({
  title,
  value,
  icon: Icon,
  trend,
  className,
}: {
  title: string;
  value: number | string;
  icon: React.ElementType;
  trend?: { value: number; direction: "up" | "down" };
  className?: string;
}) => (
  <Card className={cn("hover-scale shadow-custom", className)}>
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
      <Icon className="h-4 w-4 text-muted-foreground" />
    </CardHeader>
    <CardContent>
      <div className="flex items-baseline space-x-2">
        <div className="text-2xl font-bold">{value}</div>
        {trend && (
          <span
            className={cn(
              "text-sm",
              trend.direction === "up"
                ? "text-[hsl(var(--success))]"
                : "text-[hsl(var(--danger))]"
            )}
          >
            {trend.direction === "up" ? "↑" : "↓"} {trend.value}%
          </span>
        )}
      </div>
    </CardContent>
  </Card>
);

// Enhanced chart components with better styling and animations
const UserGrowthChart = ({ data }: { data: number[] }) => (
  <Card className="col-span-4">
    <CardHeader>
      <CardTitle className="flex items-center gap-2">
        <Activity className="h-5 w-5" />
        Tăng trưởng người dùng
      </CardTitle>
      <CardDescription>
        Biểu đồ thể hiện số lượng người dùng mới theo tháng
      </CardDescription>
    </CardHeader>
    <CardContent className="pt-4">
      <ChartContainer className="aspect-[4/3]" config={chartConfig}>
        <ResponsiveContainer>
          <LineChart
            data={data.map((value, month) => ({
              month: `Tháng ${month + 1}`,
              users: value,
            }))}
          >
            <defs>
              <linearGradient id="userGrowth" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="hsl(var(--primary))"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="hsl(var(--primary))"
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis
              dataKey="month"
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
            />
            <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
            <Tooltip content={<ChartTooltipContent />} />
            <Line
              type="monotone"
              dataKey="users"
              stroke="hsl(var(--primary))"
              strokeWidth={3}
              dot={{ fill: "hsl(var(--primary))", strokeWidth: 2 }}
              activeDot={{ r: 8, fill: "hsl(var(--primary))" }}
              fill="url(#userGrowth)"
            />
          </LineChart>
        </ResponsiveContainer>
      </ChartContainer>
    </CardContent>
  </Card>
);

export default function DashboardPage() {
  const [users, setUsers] = React.useState<UserDto[]>([]);
  const [enrollments, setEnrollments] = React.useState<EnrollmentDto[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);

  const userStats = useUserStats(users);
  const enrollmentStats = useEnrollmentStats(enrollments);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const [usersRes, enrollmentsRes] = await Promise.all([
          getAllUsers(1, 100),
          getEnrollments(1, 100),
        ]);

        if (usersRes.success && usersRes.result) {
          setUsers(
            Array.isArray(usersRes.result) ? usersRes.result : [usersRes.result]
          );
        }

        if (enrollmentsRes.success && enrollmentsRes.result) {
          setEnrollments(
            Array.isArray(enrollmentsRes.result)
              ? enrollmentsRes.result
              : [enrollmentsRes.result]
          );
        }
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div className="flex-1 p-8 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[hsl(var(--primary))]"></div>
      </div>
    );
  }

  return (
    <div className="flex-1 space-y-6 p-4 md:p-8 pt-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-3xl font-bold tracking-tight text-gradient whitespace-nowrap">
          Tổng quan hệ thống
        </h2>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Activity className="h-4 w-4 animate-pulse" />
          Cập nhật thời gian thực
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="w-full justify-start gap-4 rounded-lg p-1 sm:w-auto glass-effect">
          <TabsTrigger value="overview" className="gap-2 animate-slide">
            <Activity className="h-4 w-4" />
            Tổng quan
          </TabsTrigger>
          <TabsTrigger value="analytics" className="gap-2 animate-slide">
            <BarChart3 className="h-4 w-4" />
            Phân tích chi tiết
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard
              title="Tổng người dùng"
              value={userStats.totalUsers}
              icon={Users}
              trend={{ value: 12, direction: "up" }}
            />
            <StatCard
              title="Người dùng đã xác thực"
              value={userStats.verifiedUsers}
              icon={UserCheck}
              trend={{ value: 8, direction: "up" }}
            />
            <StatCard
              title="Tổng đăng ký"
              value={enrollmentStats.totalEnrollments}
              icon={GraduationCap}
              trend={{ value: 15, direction: "up" }}
            />
            <StatCard
              title="Tỷ lệ hoàn thành"
              value={`${enrollmentStats.completionRate}%`}
              icon={TrendingUp}
              trend={{ value: 5, direction: "up" }}
            />
          </div>

          <div className="grid gap-4 md:grid-cols-7">
            <UserGrowthChart data={userStats.monthlyStats} />

            <Card className="col-span-3">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <GraduationCap className="h-5 w-5" />
                  Phân bố trạng thái đăng ký
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer className="aspect-square" config={chartConfig}>
                  <ResponsiveContainer>
                    <PieChart>
                      <defs>
                        {enrollmentStats.statusStats.map((entry, index) => (
                          <linearGradient
                            key={`gradient-${index}`}
                            id={`gradient-${index}`}
                            x1="0"
                            y1="0"
                            x2="0"
                            y2="1"
                          >
                            <stop
                              offset="0%"
                              stopColor={entry.color}
                              stopOpacity={0.8}
                            />
                            <stop
                              offset="100%"
                              stopColor={entry.color}
                              stopOpacity={0.3}
                            />
                          </linearGradient>
                        ))}
                      </defs>
                      <Pie
                        data={enrollmentStats.statusStats}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        innerRadius="60%"
                        outerRadius="80%"
                        paddingAngle={4}
                      >
                        {enrollmentStats.statusStats.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={`url(#gradient-${index})`}
                            stroke={entry.color}
                            strokeWidth={2}
                          />
                        ))}
                      </Pie>
                      <Tooltip content={<ChartTooltipContent />} />
                      <Legend content={<ChartLegendContent />} />
                    </PieChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Phân tích xu hướng
              </CardTitle>
              <CardDescription>
                So sánh tương quan giữa người dùng mới và đăng ký khóa học theo
                thời gian
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer className="aspect-[21/9]" config={chartConfig}>
                <ResponsiveContainer>
                  <BarChart
                    data={userStats.monthlyStats.map((users, month) => ({
                      month: `Tháng ${month + 1}`,
                      users,
                      enrollments: enrollmentStats.monthlyStats[month],
                    }))}
                  >
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="hsl(var(--border))"
                    />
                    <XAxis
                      dataKey="month"
                      stroke="hsl(var(--muted-foreground))"
                      fontSize={12}
                    />
                    <YAxis
                      stroke="hsl(var(--muted-foreground))"
                      fontSize={12}
                    />
                    <Tooltip content={<ChartTooltipContent />} />
                    <Legend content={<ChartLegendContent />} />
                    <Bar
                      dataKey="users"
                      name="Người dùng"
                      fill="hsl(var(--primary))"
                      radius={[4, 4, 0, 0]}
                    >
                      {userStats.monthlyStats.map((_, index) => (
                        <Cell key={`cell-${index}`} fill={`url(#userGrowth)`} />
                      ))}
                    </Bar>
                    <Bar
                      dataKey="enrollments"
                      name="Đăng ký"
                      fill="hsl(var(--success))"
                      radius={[4, 4, 0, 0]}
                    >
                      {enrollmentStats.monthlyStats.map((_, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={`hsl(var(--success) / ${index % 2 ? 0.6 : 1})`}
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
