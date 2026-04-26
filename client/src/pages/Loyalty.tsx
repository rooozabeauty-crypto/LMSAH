import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Star, Award, Gift, TrendingUp } from "lucide-react";
import { useState } from "react";
import Layout from "@/components/Layout";

interface LoyaltyTier {
  id: string;
  name: string;
  minPoints: number;
  maxPoints: number;
  benefits: string[];
  reward: number;
  icon: React.ReactNode;
}

const tiers: LoyaltyTier[] = [
  {
    id: "1",
    name: "فضي",
    minPoints: 0,
    maxPoints: 999,
    benefits: [
      "خصم 5% على جميع المشتريات",
      "نقاط مكافأة على كل عملية شراء",
      "دعم أولوي"
    ],
    reward: 70,
    icon: <Star className="w-8 h-8" />
  },
  {
    id: "2",
    name: "ذهبي",
    minPoints: 1000,
    maxPoints: 4999,
    benefits: [
      "خصم 10% على جميع المشتريات",
      "نقاط مكافأة مضاعفة",
      "دعم VIP",
      "هدايا حصرية"
    ],
    reward: 150,
    icon: <Award className="w-8 h-8" />
  },
  {
    id: "3",
    name: "بلاتيني",
    minPoints: 5000,
    maxPoints: Infinity,
    benefits: [
      "خصم 15% على جميع المشتريات",
      "نقاط مكافأة ثلاثية",
      "دعم شخصي مخصص",
      "هدايا حصرية شهرية",
      "دعوات حصرية لأحداث خاصة"
    ],
    reward: 300,
    icon: <Gift className="w-8 h-8" />
  }
];

export default function Loyalty() {
  const { isAuthenticated } = useAuth();
  const [userPoints] = useState(2500);
  const [redeemedRewards, setRedeemedRewards] = useState(0);

  const currentTier = tiers.find(
    tier => userPoints >= tier.minPoints && userPoints <= tier.maxPoints
  ) || tiers[0];

  const nextTier = tiers[tiers.indexOf(currentTier) + 1];
  const pointsToNextTier = nextTier ? nextTier.minPoints - userPoints : 0;

  const handleRedeemReward = () => {
    setRedeemedRewards(prev => prev + 1);
  };

  if (!isAuthenticated) {
    return (
      <Layout>
        <div className="max-w-2xl mx-auto p-6">
          <Card className="bg-gradient-to-br from-yellow-900/20 to-blue-900/20 border-yellow-600/30 p-8 text-center">
            <h1 className="text-2xl font-bold mb-4 text-yellow-400">يجب تسجيل الدخول</h1>
            <p className="text-gray-400 mb-6">يرجى تسجيل الدخول للاستفادة من برنامج الولاء</p>
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
            برنامج ولاء العملاء
          </h1>
          <p className="text-gray-400 text-lg">
            اكسب نقاط على كل عملية شراء واستمتع بمزايا حصرية
          </p>
        </div>

        {/* Current Tier */}
        <Card className="bg-gradient-to-br from-yellow-900/20 to-blue-900/20 border-yellow-600/30 p-8 mb-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-2xl font-bold mb-4 text-yellow-400">مستواك الحالي</h2>
              <div className="flex items-center gap-4 mb-6">
                <div className="text-6xl text-yellow-500">{currentTier.icon}</div>
                <div>
                  <p className="text-3xl font-bold text-yellow-400">{currentTier.name}</p>
                  <p className="text-gray-400">{userPoints} نقطة</p>
                </div>
              </div>

              {nextTier && (
                <div>
                  <p className="text-gray-400 mb-2">نقاط للوصول للمستوى التالي</p>
                  <div className="bg-blue-900/30 rounded-full h-3 overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-yellow-500 to-blue-500 h-full transition-all"
                      style={{
                        width: `${((userPoints - currentTier.minPoints) / (nextTier.minPoints - currentTier.minPoints)) * 100}%`
                      }}
                    ></div>
                  </div>
                  <p className="text-sm text-gray-400 mt-2">{pointsToNextTier} نقطة متبقية</p>
                </div>
              )}
            </div>

            <div>
              <h3 className="text-xl font-bold mb-4 text-blue-400">مزايا المستوى</h3>
              <ul className="space-y-3">
                {currentTier.benefits.map((benefit, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="text-yellow-500 mt-1">✓</span>
                    <span className="text-gray-300">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Card>

        {/* All Tiers */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-6 text-yellow-400">مستويات الولاء</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {tiers.map(tier => (
              <Card
                key={tier.id}
                className={`bg-gradient-to-br border p-6 transition ${
                  tier.id === currentTier.id
                    ? "from-yellow-900/30 to-blue-900/30 border-yellow-500/60 ring-2 ring-yellow-500/30"
                    : "from-yellow-900/20 to-blue-900/20 border-yellow-600/30"
                }`}
              >
                <div className="text-4xl text-yellow-500 mb-3">{tier.icon}</div>
                <h3 className="text-2xl font-bold mb-2 text-yellow-400">{tier.name}</h3>
                <p className="text-sm text-gray-400 mb-4">
                  من {tier.minPoints} إلى {tier.maxPoints === Infinity ? "∞" : tier.maxPoints} نقطة
                </p>

                <div className="space-y-2 mb-6">
                  {tier.benefits.map((benefit, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-sm">
                      <span className="text-yellow-500">•</span>
                      <span className="text-gray-300">{benefit}</span>
                    </div>
                  ))}
                </div>

                <div className="bg-blue-900/30 rounded-lg p-3 text-center">
                  <p className="text-gray-400 text-xs mb-1">مكافأة شهرية</p>
                  <p className="text-2xl font-bold text-green-400">{tier.reward} ر.س</p>
                </div>

                {tier.id === currentTier.id && (
                  <div className="mt-4 text-center">
                    <span className="inline-block bg-green-600/30 text-green-400 px-3 py-1 rounded text-xs font-bold">
                      مستواك الحالي
                    </span>
                  </div>
                )}
              </Card>
            ))}
          </div>
        </div>

        {/* Rewards */}
        <Card className="bg-gradient-to-br from-blue-900/20 to-yellow-900/20 border-blue-600/30 p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6 text-blue-400">استبدل نقاطك بمكافآت</h2>
          <div className="grid md:grid-cols-4 gap-4">
            <Card className="bg-yellow-900/20 border-yellow-600/30 p-4 text-center">
              <p className="text-gray-400 text-sm mb-2">النقاط المتاحة</p>
              <p className="text-3xl font-bold text-yellow-400">{userPoints}</p>
            </Card>

            <Card className="bg-blue-900/20 border-blue-600/30 p-4 text-center">
              <p className="text-gray-400 text-sm mb-2">المكافآت المستبدلة</p>
              <p className="text-3xl font-bold text-blue-400">{redeemedRewards}</p>
            </Card>

            <Card className="bg-green-900/20 border-green-600/30 p-4 text-center">
              <p className="text-gray-400 text-sm mb-2">القيمة الإجمالية</p>
              <p className="text-3xl font-bold text-green-400">{redeemedRewards * 70} ر.س</p>
            </Card>

            <Card className="bg-purple-900/20 border-purple-600/30 p-4 text-center">
              <p className="text-gray-400 text-sm mb-2">نقاط متبقية</p>
              <p className="text-3xl font-bold text-purple-400">{userPoints - (redeemedRewards * 100)}</p>
            </Card>
          </div>

          <div className="mt-6">
            <Button
              onClick={handleRedeemReward}
              disabled={userPoints < 100}
              className="w-full bg-gradient-to-r from-yellow-500 to-blue-500 text-black font-bold py-3 disabled:opacity-50"
            >
              استبدل 100 نقطة بـ 70 ريال
            </Button>
          </div>
        </Card>

        {/* How to Earn */}
        <Card className="bg-gradient-to-br from-yellow-900/20 to-blue-900/20 border-yellow-600/30 p-8">
          <h2 className="text-2xl font-bold mb-6 text-yellow-400">كيف تكسب النقاط؟</h2>
          <div className="grid md:grid-cols-4 gap-6">
            <div>
              <div className="text-4xl font-bold text-yellow-400 mb-2">10</div>
              <h3 className="font-bold mb-2 text-yellow-400">نقطة لكل 100 ريال</h3>
              <p className="text-sm text-gray-300">على كل عملية شراء</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-yellow-400 mb-2">50</div>
              <h3 className="font-bold mb-2 text-yellow-400">نقطة إضافية</h3>
              <p className="text-sm text-gray-300">عند تحويل صديق</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-yellow-400 mb-2">100</div>
              <h3 className="font-bold mb-2 text-yellow-400">نقطة مكافأة</h3>
              <p className="text-sm text-gray-300">في عيد ميلادك</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-yellow-400 mb-2">200</div>
              <h3 className="font-bold mb-2 text-yellow-400">نقطة مكافأة</h3>
              <p className="text-sm text-gray-300">عند تقييم المنتجات</p>
            </div>
          </div>
        </Card>
      </div>
    </Layout>
  );
}
