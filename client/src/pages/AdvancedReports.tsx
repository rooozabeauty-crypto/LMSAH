import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { BarChart3, TrendingUp, Users, ShoppingCart, Download, Filter, Calendar } from "lucide-react";
import Layout from "@/components/Layout";

interface Report {
  id: string;
  name: string;
  type: string;
  period: string;
  data: {
    totalRevenue: number;
    totalOrders: number;
    totalCustomers: number;
    conversionRate: number;
    averageOrderValue: number;
    growthRate: number;
  };
  createdAt: string;
}

export default function AdvancedReports() {
  const [reports, setReports] = useState<Report[]>([
    {
      id: "1",
      name: "تقرير المبيعات الشهري",
      type: "مبيعات",
      period: "أبريل 2026",
      data: {
        totalRevenue: 125000,
        totalOrders: 450,
        totalCustomers: 320,
        conversionRate: 3.2,
        averageOrderValue: 277.78,
        growthRate: 15.5
      },
      createdAt: "2026-04-26"
    },
    {
      id: "2",
      name: "تقرير الأداء الربع سنوي",
      type: "أداء",
      period: "Q2 2026",
      data: {
        totalRevenue: 380000,
        totalOrders: 1350,
        totalCustomers: 950,
        conversionRate: 3.5,
        averageOrderValue: 281.48,
        growthRate: 22.3
      },
      createdAt: "2026-04-25"
    }
  ]);

  const [selectedPeriod, setSelectedPeriod] = useState("شهري");
  const [selectedType, setSelectedType] = useState("الكل");

  const stats = [
    {
      label: "إجمالي الإيرادات",
      value: "505,000 ريال",
      icon: TrendingUp,
      color: "from-green-500 to-emerald-500",
      change: "+18.5%"
    },
    {
      label: "عدد الطلبات",
      value: "1,800",
      icon: ShoppingCart,
      color: "from-blue-500 to-cyan-500",
      change: "+12.3%"
    },
    {
      label: "عدد العملاء",
      value: "1,270",
      icon: Users,
      color: "from-purple-500 to-pink-500",
      change: "+8.7%"
    },
    {
      label: "معدل التحويل",
      value: "3.4%",
      icon: BarChart3,
      color: "from-orange-500 to-red-500",
      change: "+0.5%"
    }
  ];

  const downloadReport = (reportId: string) => {
    const report = reports.find(r => r.id === reportId);
    if (report) {
      alert(`تم تحميل التقرير: ${report.name}`);
    }
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto p-6" style={{ direction: "rtl" }}>
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
            التقارير والتحليلات المتقدمة
          </h1>
          <p className="text-gray-400 text-lg">
            تحليل شامل لأداء متجرك مع تقارير مفصلة
          </p>
        </div>

        {/* الإحصائيات الرئيسية */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <Card
                key={idx}
                className={`bg-gradient-to-br ${stat.color} bg-opacity-10 border-${stat.color.split("-")[1]}-600/30 p-6`}
              >
                <div className="flex items-center justify-between mb-4">
                  <Icon className="w-10 h-10 text-gray-400" />
                  <span className="text-green-400 text-sm font-semibold">{stat.change}</span>
                </div>
                <p className="text-gray-400 text-sm mb-2">{stat.label}</p>
                <p className="text-2xl font-bold text-white">{stat.value}</p>
              </Card>
            );
          })}
        </div>

        {/* الفلاتر */}
        <Card className="bg-gradient-to-br from-indigo-900/20 to-purple-900/20 border-indigo-600/30 p-6 mb-8">
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-indigo-400" />
              <select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="bg-black/50 border border-indigo-600/30 text-white rounded-lg p-2 text-sm"
              >
                <option value="يومي">يومي</option>
                <option value="أسبوعي">أسبوعي</option>
                <option value="شهري">شهري</option>
                <option value="سنوي">سنوي</option>
              </select>
            </div>

            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-indigo-400" />
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="bg-black/50 border border-indigo-600/30 text-white rounded-lg p-2 text-sm"
              >
                <option value="الكل">جميع التقارير</option>
                <option value="مبيعات">تقارير المبيعات</option>
                <option value="أداء">تقارير الأداء</option>
                <option value="عملاء">تقارير العملاء</option>
              </select>
            </div>

            <Button className="bg-indigo-600 hover:bg-indigo-700 text-white ml-auto">
              تطبيق الفلاتر
            </Button>
          </div>
        </Card>

        {/* التقارير */}
        <h2 className="text-2xl font-bold mb-6 text-indigo-400">التقارير المتاحة</h2>
        <div className="space-y-4 mb-8">
          {reports.map(report => (
            <Card
              key={report.id}
              className="bg-gradient-to-br from-indigo-900/20 to-purple-900/20 border-indigo-600/30 p-6 hover:border-indigo-500/60 transition"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-bold text-white">{report.name}</h3>
                    <span className="text-xs bg-indigo-600/20 text-indigo-300 px-3 py-1 rounded-full border border-indigo-600/30">
                      {report.type}
                    </span>
                  </div>
                  <p className="text-gray-400 text-sm mb-4">الفترة: {report.period}</p>

                  <div className="grid md:grid-cols-6 gap-4">
                    <div>
                      <p className="text-gray-500 text-xs">الإيرادات</p>
                      <p className="text-indigo-400 font-bold">{report.data.totalRevenue.toLocaleString()} ريال</p>
                    </div>
                    <div>
                      <p className="text-gray-500 text-xs">الطلبات</p>
                      <p className="text-indigo-400 font-bold">{report.data.totalOrders}</p>
                    </div>
                    <div>
                      <p className="text-gray-500 text-xs">العملاء</p>
                      <p className="text-indigo-400 font-bold">{report.data.totalCustomers}</p>
                    </div>
                    <div>
                      <p className="text-gray-500 text-xs">معدل التحويل</p>
                      <p className="text-indigo-400 font-bold">{report.data.conversionRate}%</p>
                    </div>
                    <div>
                      <p className="text-gray-500 text-xs">متوسط الطلب</p>
                      <p className="text-indigo-400 font-bold">{report.data.averageOrderValue.toFixed(2)} ريال</p>
                    </div>
                    <div>
                      <p className="text-gray-500 text-xs">معدل النمو</p>
                      <p className="text-green-400 font-bold">+{report.data.growthRate}%</p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <Button
                    onClick={() => downloadReport(report.id)}
                    className="bg-indigo-600 hover:bg-indigo-700 whitespace-nowrap"
                  >
                    <Download className="w-4 h-4 ml-2" />
                    تحميل
                  </Button>
                  <p className="text-xs text-gray-500 text-center">{report.createdAt}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* الرسوم البيانية والتحليلات */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="bg-gradient-to-br from-indigo-900/20 to-purple-900/20 border-indigo-600/30 p-6">
            <h3 className="text-lg font-bold text-indigo-400 mb-4">أداء المبيعات</h3>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-400 text-sm">أبريل</span>
                  <span className="text-indigo-400 font-semibold">125,000 ريال</span>
                </div>
                <div className="w-full bg-gray-700/30 rounded-full h-2">
                  <div className="bg-gradient-to-r from-indigo-500 to-purple-500 h-2 rounded-full" style={{ width: "85%" }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-400 text-sm">مارس</span>
                  <span className="text-indigo-400 font-semibold">108,000 ريال</span>
                </div>
                <div className="w-full bg-gray-700/30 rounded-full h-2">
                  <div className="bg-gradient-to-r from-indigo-500 to-purple-500 h-2 rounded-full" style={{ width: "73%" }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-400 text-sm">فبراير</span>
                  <span className="text-indigo-400 font-semibold">95,000 ريال</span>
                </div>
                <div className="w-full bg-gray-700/30 rounded-full h-2">
                  <div className="bg-gradient-to-r from-indigo-500 to-purple-500 h-2 rounded-full" style={{ width: "64%" }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-400 text-sm">يناير</span>
                  <span className="text-indigo-400 font-semibold">82,000 ريال</span>
                </div>
                <div className="w-full bg-gray-700/30 rounded-full h-2">
                  <div className="bg-gradient-to-r from-indigo-500 to-purple-500 h-2 rounded-full" style={{ width: "55%" }}></div>
                </div>
              </div>
            </div>
          </Card>

          <Card className="bg-gradient-to-br from-indigo-900/20 to-purple-900/20 border-indigo-600/30 p-6">
            <h3 className="text-lg font-bold text-indigo-400 mb-4">توزيع العملاء</h3>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-400 text-sm">عملاء جدد</span>
                  <span className="text-green-400 font-semibold">320 (25%)</span>
                </div>
                <div className="w-full bg-gray-700/30 rounded-full h-2">
                  <div className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full" style={{ width: "25%" }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-400 text-sm">عملاء متكررون</span>
                  <span className="text-blue-400 font-semibold">630 (50%)</span>
                </div>
                <div className="w-full bg-gray-700/30 rounded-full h-2">
                  <div className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2 rounded-full" style={{ width: "50%" }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-400 text-sm">عملاء نشطون</span>
                  <span className="text-purple-400 font-semibold">320 (25%)</span>
                </div>
                <div className="w-full bg-gray-700/30 rounded-full h-2">
                  <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full" style={{ width: "25%" }}></div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
