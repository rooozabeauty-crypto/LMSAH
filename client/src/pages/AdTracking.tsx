import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { BarChart3, TrendingUp, Eye, Zap } from "lucide-react";
import { useState } from "react";
import Layout from "@/components/Layout";

interface Campaign {
  id: string;
  name: string;
  platform: string;
  budget: number;
  spent: number;
  impressions: number;
  clicks: number;
  conversions: number;
  status: "active" | "paused" | "completed";
}

const campaigns: Campaign[] = [
  {
    id: "1",
    name: "حملة جوجل أدز",
    platform: "Google Ads",
    budget: 5000,
    spent: 3200,
    impressions: 45000,
    clicks: 1200,
    conversions: 85,
    status: "active"
  },
  {
    id: "2",
    name: "حملة فيسبوك",
    platform: "Facebook",
    budget: 3000,
    spent: 2100,
    impressions: 32000,
    clicks: 950,
    conversions: 62,
    status: "active"
  },
  {
    id: "3",
    name: "حملة إنستغرام",
    platform: "Instagram",
    budget: 2500,
    spent: 2500,
    impressions: 28000,
    clicks: 780,
    conversions: 48,
    status: "completed"
  }
];

export default function AdTracking() {
  const { isAuthenticated } = useAuth();
  const [campaignList] = useState<Campaign[]>(campaigns);

  const totalBudget = campaignList.reduce((sum, c) => sum + c.budget, 0);
  const totalSpent = campaignList.reduce((sum, c) => sum + c.spent, 0);
  const totalImpressions = campaignList.reduce((sum, c) => sum + c.impressions, 0);
  const totalClicks = campaignList.reduce((sum, c) => sum + c.clicks, 0);
  const totalConversions = campaignList.reduce((sum, c) => sum + c.conversions, 0);
  const avgCTR = totalImpressions > 0 ? ((totalClicks / totalImpressions) * 100).toFixed(2) : "0";
  const avgCPC = totalClicks > 0 ? (totalSpent / totalClicks).toFixed(2) : "0";
  const avgROI = totalSpent > 0 ? (((totalConversions * 100) / totalSpent) * 100).toFixed(2) : "0";

  if (!isAuthenticated) {
    return (
      <Layout>
        <div className="max-w-2xl mx-auto p-6">
          <Card className="bg-gradient-to-br from-yellow-900/20 to-blue-900/20 border-yellow-600/30 p-8 text-center">
            <h1 className="text-2xl font-bold mb-4 text-yellow-400">يجب تسجيل الدخول</h1>
            <p className="text-gray-400 mb-6">يرجى تسجيل الدخول للوصول إلى تتبع الإعلانات</p>
          </Card>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-6xl mx-auto p-6" style={{ direction: "rtl" }}>
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-yellow-400 to-blue-400 bg-clip-text text-transparent">
            تتبع الإعلانات
          </h1>
          <p className="text-gray-400 text-lg">
            راقب أداء حملاتك الإعلانية وقيس عائد الاستثمار
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-yellow-900/20 to-blue-900/20 border-yellow-600/30 p-6">
            <p className="text-gray-400 text-sm mb-2">إجمالي الميزانية</p>
            <p className="text-3xl font-bold text-yellow-400">{totalBudget.toLocaleString()} ر.س</p>
            <p className="text-xs text-gray-500 mt-2">تم إنفاق: {totalSpent.toLocaleString()} ر.س</p>
          </Card>

          <Card className="bg-gradient-to-br from-blue-900/20 to-yellow-900/20 border-blue-600/30 p-6">
            <p className="text-gray-400 text-sm mb-2">معدل النقر (CTR)</p>
            <p className="text-3xl font-bold text-blue-400">{avgCTR}%</p>
            <p className="text-xs text-gray-500 mt-2">نقرات: {totalClicks.toLocaleString()}</p>
          </Card>

          <Card className="bg-gradient-to-br from-green-900/20 to-yellow-900/20 border-green-600/30 p-6">
            <p className="text-gray-400 text-sm mb-2">عائد الاستثمار</p>
            <p className="text-3xl font-bold text-green-400">{avgROI}%</p>
            <p className="text-xs text-gray-500 mt-2">تحويلات: {totalConversions}</p>
          </Card>
        </div>

        {/* Performance Metrics */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <Card className="bg-gradient-to-br from-yellow-900/20 to-blue-900/20 border-yellow-600/30 p-4 text-center">
            <Eye className="w-6 h-6 text-yellow-500 mx-auto mb-2" />
            <p className="text-gray-400 text-xs mb-1">الظهورات</p>
            <p className="text-2xl font-bold text-yellow-400">{(totalImpressions / 1000).toFixed(0)}K</p>
          </Card>

          <Card className="bg-gradient-to-br from-blue-900/20 to-yellow-900/20 border-blue-600/30 p-4 text-center">
            <Zap className="w-6 h-6 text-blue-500 mx-auto mb-2" />
            <p className="text-gray-400 text-xs mb-1">النقرات</p>
            <p className="text-2xl font-bold text-blue-400">{(totalClicks / 1000).toFixed(1)}K</p>
          </Card>

          <Card className="bg-gradient-to-br from-green-900/20 to-yellow-900/20 border-green-600/30 p-4 text-center">
            <TrendingUp className="w-6 h-6 text-green-500 mx-auto mb-2" />
            <p className="text-gray-400 text-xs mb-1">التحويلات</p>
            <p className="text-2xl font-bold text-green-400">{totalConversions}</p>
          </Card>

          <Card className="bg-gradient-to-br from-purple-900/20 to-yellow-900/20 border-purple-600/30 p-4 text-center">
            <BarChart3 className="w-6 h-6 text-purple-500 mx-auto mb-2" />
            <p className="text-gray-400 text-xs mb-1">تكلفة النقرة</p>
            <p className="text-2xl font-bold text-purple-400">{avgCPC} ر.س</p>
          </Card>
        </div>

        {/* Campaigns Table */}
        <Card className="bg-gradient-to-br from-yellow-900/20 to-blue-900/20 border-yellow-600/30 p-6 overflow-x-auto">
          <h2 className="text-2xl font-bold mb-6 text-yellow-400">الحملات الإعلانية</h2>
          <table className="w-full text-right text-sm">
            <thead>
              <tr className="border-b border-yellow-600/30">
                <th className="pb-4 text-yellow-400 font-bold">اسم الحملة</th>
                <th className="pb-4 text-yellow-400 font-bold">المنصة</th>
                <th className="pb-4 text-yellow-400 font-bold">الميزانية</th>
                <th className="pb-4 text-yellow-400 font-bold">المصروف</th>
                <th className="pb-4 text-yellow-400 font-bold">الظهورات</th>
                <th className="pb-4 text-yellow-400 font-bold">النقرات</th>
                <th className="pb-4 text-yellow-400 font-bold">التحويلات</th>
                <th className="pb-4 text-yellow-400 font-bold">الحالة</th>
              </tr>
            </thead>
            <tbody>
              {campaignList.map(campaign => (
                <tr key={campaign.id} className="border-b border-yellow-600/20 hover:bg-yellow-900/10 transition">
                  <td className="py-4 font-bold">{campaign.name}</td>
                  <td className="py-4">{campaign.platform}</td>
                  <td className="py-4">{campaign.budget} ر.س</td>
                  <td className="py-4 text-yellow-400">{campaign.spent} ر.س</td>
                  <td className="py-4">{campaign.impressions.toLocaleString()}</td>
                  <td className="py-4">{campaign.clicks.toLocaleString()}</td>
                  <td className="py-4 font-bold text-green-400">{campaign.conversions}</td>
                  <td className="py-4">
                    <span className={`px-3 py-1 rounded text-xs font-bold ${
                      campaign.status === "active"
                        ? "bg-green-600/30 text-green-400"
                        : campaign.status === "paused"
                        ? "bg-yellow-600/30 text-yellow-400"
                        : "bg-gray-600/30 text-gray-400"
                    }`}>
                      {campaign.status === "active"
                        ? "نشطة"
                        : campaign.status === "paused"
                        ? "موقوفة"
                        : "مكتملة"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>

        {/* Recommendations */}
        <Card className="bg-gradient-to-br from-blue-900/20 to-yellow-900/20 border-blue-600/30 p-8 mt-8">
          <h2 className="text-2xl font-bold mb-6 text-blue-400">التوصيات</h2>
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <span className="text-yellow-500 text-2xl">1</span>
              <div>
                <h3 className="font-bold text-yellow-400">حسّن معدل النقر</h3>
                <p className="text-sm text-gray-300">جرب نصوص إعلانية مختلفة وصور جذابة</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <span className="text-yellow-500 text-2xl">2</span>
              <div>
                <h3 className="font-bold text-yellow-400">قلل تكلفة النقرة</h3>
                <p className="text-sm text-gray-300">استهدف كلمات مفتاحية أكثر تحديداً وأقل تنافساً</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <span className="text-yellow-500 text-2xl">3</span>
              <div>
                <h3 className="font-bold text-yellow-400">حسّن معدل التحويل</h3>
                <p className="text-sm text-gray-300">حسّن صفحات الهبوط وسهولة الشراء</p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </Layout>
  );
}
