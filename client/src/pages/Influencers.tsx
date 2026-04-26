import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Users, TrendingUp, MessageSquare, Award } from "lucide-react";
import { useState } from "react";
import Layout from "@/components/Layout";

interface Influencer {
  id: string;
  name: string;
  platform: string;
  followers: number;
  engagement: number;
  category: string;
  status: "available" | "collaborating" | "inactive";
}

const influencers: Influencer[] = [
  {
    id: "1",
    name: "أحمد الفاشن",
    platform: "إنستغرام",
    followers: 150000,
    engagement: 8.5,
    category: "الموضة والأزياء",
    status: "available"
  },
  {
    id: "2",
    name: "فاطمة الجمال",
    platform: "تيك توك",
    followers: 250000,
    engagement: 12.3,
    category: "مستحضرات الجمال",
    status: "collaborating"
  },
  {
    id: "3",
    name: "محمود التقنية",
    platform: "يوتيوب",
    followers: 500000,
    engagement: 6.8,
    category: "الإلكترونيات",
    status: "available"
  },
  {
    id: "4",
    name: "ليلى الطبخ",
    platform: "إنستغرام",
    followers: 180000,
    engagement: 10.2,
    category: "الغذائي",
    status: "available"
  }
];

export default function Influencers() {
  const { isAuthenticated } = useAuth();
  const [selectedInfluencer, setSelectedInfluencer] = useState<Influencer | null>(null);
  const [collaborations, setCollaborations] = useState(1);

  const handleCollaborate = (influencer: Influencer) => {
    setSelectedInfluencer(influencer);
  };

  const handleConfirmCollaboration = () => {
    if (selectedInfluencer) {
      setCollaborations(prev => prev + 1);
      setSelectedInfluencer(null);
    }
  };

  if (!isAuthenticated) {
    return (
      <Layout>
        <div className="max-w-2xl mx-auto p-6">
          <Card className="bg-gradient-to-br from-yellow-900/20 to-blue-900/20 border-yellow-600/30 p-8 text-center">
            <h1 className="text-2xl font-bold mb-4 text-yellow-400">يجب تسجيل الدخول</h1>
            <p className="text-gray-400 mb-6">يرجى تسجيل الدخول للوصول إلى شبكة المؤثرين</p>
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
            شبكة المؤثرين
          </h1>
          <p className="text-gray-400 text-lg">
            تعاون مع أفضل المؤثرين لتسويق منتجاتك بفعالية
          </p>
        </div>

        {/* Statistics */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-yellow-900/20 to-blue-900/20 border-yellow-600/30 p-6 text-center">
            <Users className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
            <p className="text-gray-400 text-sm mb-1">المؤثرين المتاحين</p>
            <p className="text-3xl font-bold text-yellow-400">{influencers.filter(i => i.status === "available").length}</p>
          </Card>

          <Card className="bg-gradient-to-br from-blue-900/20 to-yellow-900/20 border-blue-600/30 p-6 text-center">
            <Award className="w-8 h-8 text-blue-500 mx-auto mb-2" />
            <p className="text-gray-400 text-sm mb-1">التعاونات النشطة</p>
            <p className="text-3xl font-bold text-blue-400">{collaborations}</p>
          </Card>

          <Card className="bg-gradient-to-br from-green-900/20 to-yellow-900/20 border-green-600/30 p-6 text-center">
            <TrendingUp className="w-8 h-8 text-green-500 mx-auto mb-2" />
            <p className="text-gray-400 text-sm mb-1">إجمالي المتابعين</p>
            <p className="text-3xl font-bold text-green-400">{(influencers.reduce((sum, i) => sum + i.followers, 0) / 1000000).toFixed(1)}M</p>
          </Card>

          <Card className="bg-gradient-to-br from-purple-900/20 to-yellow-900/20 border-purple-600/30 p-6 text-center">
            <MessageSquare className="w-8 h-8 text-purple-500 mx-auto mb-2" />
            <p className="text-gray-400 text-sm mb-1">متوسط الانخراط</p>
            <p className="text-3xl font-bold text-purple-400">{(influencers.reduce((sum, i) => sum + i.engagement, 0) / influencers.length).toFixed(1)}%</p>
          </Card>
        </div>

        {/* Influencers Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {influencers.map(influencer => (
            <Card
              key={influencer.id}
              className="bg-gradient-to-br from-yellow-900/20 to-blue-900/20 border-yellow-600/30 p-6 hover:border-yellow-500/60 transition"
            >
              <div className="mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-blue-500 rounded-full mx-auto mb-4"></div>
                <h3 className="text-xl font-bold text-center mb-2 text-yellow-400">{influencer.name}</h3>
                <p className="text-center text-sm text-gray-400 mb-4">{influencer.category}</p>
              </div>

              <div className="space-y-2 mb-4 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">المنصة:</span>
                  <span className="text-yellow-400 font-bold">{influencer.platform}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">المتابعون:</span>
                  <span className="text-blue-400 font-bold">{(influencer.followers / 1000).toFixed(0)}K</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">الانخراط:</span>
                  <span className="text-green-400 font-bold">{influencer.engagement}%</span>
                </div>
              </div>

              <div className="mb-4">
                <span className={`px-3 py-1 rounded text-xs font-bold ${
                  influencer.status === "available"
                    ? "bg-green-600/30 text-green-400"
                    : influencer.status === "collaborating"
                    ? "bg-yellow-600/30 text-yellow-400"
                    : "bg-gray-600/30 text-gray-400"
                }`}>
                  {influencer.status === "available"
                    ? "متاح للتعاون"
                    : influencer.status === "collaborating"
                    ? "قيد التعاون"
                    : "غير نشط"}
                </span>
              </div>

              <Button
                onClick={() => handleCollaborate(influencer)}
                disabled={influencer.status !== "available"}
                className="w-full bg-gradient-to-r from-yellow-500 to-blue-500 text-black font-bold disabled:opacity-50"
              >
                {influencer.status === "available"
                  ? "طلب تعاون"
                  : influencer.status === "collaborating"
                  ? "قيد التعاون"
                  : "غير متاح"}
              </Button>
            </Card>
          ))}
        </div>

        {/* Collaboration Modal */}
        {selectedInfluencer && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
            <Card className="bg-gradient-to-br from-yellow-900/20 to-blue-900/20 border-yellow-600/30 p-8 max-w-md w-full">
              <h2 className="text-2xl font-bold mb-4 text-yellow-400">طلب تعاون</h2>
              <p className="text-gray-300 mb-6">
                هل تريد التعاون مع <span className="font-bold text-yellow-400">{selectedInfluencer.name}</span>؟
              </p>

              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-semibold mb-2 text-yellow-400">
                    نوع التعاون
                  </label>
                  <select className="w-full bg-blue-900/30 border border-blue-600/30 text-white rounded-lg p-3">
                    <option>منشور واحد</option>
                    <option>سلسلة منشورات</option>
                    <option>حملة شاملة</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2 text-yellow-400">
                    الميزانية المقترحة
                  </label>
                  <input
                    type="number"
                    placeholder="أدخل الميزانية"
                    className="w-full bg-blue-900/30 border border-blue-600/30 text-white rounded-lg p-3"
                  />
                </div>
              </div>

              <div className="flex gap-4">
                <Button
                  onClick={() => setSelectedInfluencer(null)}
                  className="flex-1 bg-gray-600/50 hover:bg-gray-600 text-white"
                >
                  إلغاء
                </Button>
                <Button
                  onClick={handleConfirmCollaboration}
                  className="flex-1 bg-gradient-to-r from-yellow-500 to-blue-500 text-black font-bold"
                >
                  تأكيد التعاون
                </Button>
              </div>
            </Card>
          </div>
        )}

        {/* Tips */}
        <Card className="bg-gradient-to-br from-blue-900/20 to-yellow-900/20 border-blue-600/30 p-8">
          <h2 className="text-2xl font-bold mb-6 text-blue-400">نصائح للتعاون الناجح</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <h3 className="font-bold mb-2 text-yellow-400">اختر المؤثر المناسب</h3>
              <p className="text-sm text-gray-300">اختر مؤثراً يتناسب مع جمهورك ومنتجاتك</p>
            </div>
            <div>
              <h3 className="font-bold mb-2 text-yellow-400">حدد أهدافاً واضحة</h3>
              <p className="text-sm text-gray-300">حدد أهدافاً قابلة للقياس للتعاون</p>
            </div>
            <div>
              <h3 className="font-bold mb-2 text-yellow-400">قيس النتائج</h3>
              <p className="text-sm text-gray-300">تابع الأداء وقيس عائد الاستثمار</p>
            </div>
          </div>
        </Card>
      </div>
    </Layout>
  );
}
