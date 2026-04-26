import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Gift, TrendingUp, Clock, CheckCircle } from "lucide-react";
import { useState } from "react";
import Layout from "@/components/Layout";

interface CashbackOffer {
  id: string;
  title: string;
  percentage: number;
  minPurchase: number;
  maxCashback: number;
  validDays: number;
  description: string;
  status: "active" | "expired" | "upcoming";
}

const offers: CashbackOffer[] = [
  {
    id: "1",
    title: "عرض الكاش باك 50 ريال",
    percentage: 5,
    minPurchase: 1000,
    maxCashback: 50,
    validDays: 14,
    description: "احصل على 50 ريال كاش باك عند شرائك بقيمة 1000 ريال فأكثر",
    status: "active"
  },
  {
    id: "2",
    title: "عرض الكاش باك 100 ريال",
    percentage: 8,
    minPurchase: 1500,
    maxCashback: 100,
    validDays: 14,
    description: "احصل على 100 ريال كاش باك عند شرائك بقيمة 1500 ريال فأكثر",
    status: "active"
  },
  {
    id: "3",
    title: "عرض الكاش باك 150 ريال",
    percentage: 10,
    minPurchase: 2000,
    maxCashback: 150,
    validDays: 14,
    description: "احصل على 150 ريال كاش باك عند شرائك بقيمة 2000 ريال فأكثر",
    status: "upcoming"
  }
];

export default function Cashback() {
  const { isAuthenticated } = useAuth();
  const [selectedOffer, setSelectedOffer] = useState<CashbackOffer | null>(null);
  const [claimedOffers, setClaimedOffers] = useState<string[]>([]);

  const handleClaimOffer = (offerId: string) => {
    if (!claimedOffers.includes(offerId)) {
      setClaimedOffers([...claimedOffers, offerId]);
    }
  };

  if (!isAuthenticated) {
    return (
      <Layout>
        <div className="max-w-2xl mx-auto p-6">
          <Card className="bg-gradient-to-br from-yellow-900/20 to-blue-900/20 border-yellow-600/30 p-8 text-center">
            <h1 className="text-2xl font-bold mb-4 text-yellow-400">يجب تسجيل الدخول</h1>
            <p className="text-gray-400 mb-6">يرجى تسجيل الدخول للاستفادة من عروض الكاش باك</p>
          </Card>
        </div>
      </Layout>
    );
  }

  const totalCashback = offers.reduce((sum, o) => sum + o.maxCashback, 0);
  const claimedCashback = claimedOffers.length * 50;

  return (
    <Layout>
      <div className="max-w-6xl mx-auto p-6" style={{ direction: "rtl" }}>
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-yellow-400 to-blue-400 bg-clip-text text-transparent">
            عروض الكاش باك
          </h1>
          <p className="text-gray-400 text-lg">
            احصل على كاش باك على كل عملية شراء وزيادة أرباحك
          </p>
        </div>

        {/* Statistics */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-yellow-900/20 to-blue-900/20 border-yellow-600/30 p-6 text-center">
            <Gift className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
            <p className="text-gray-400 text-sm mb-1">إجمالي العروض</p>
            <p className="text-3xl font-bold text-yellow-400">{offers.filter(o => o.status === "active").length}</p>
          </Card>

          <Card className="bg-gradient-to-br from-blue-900/20 to-yellow-900/20 border-blue-600/30 p-6 text-center">
            <TrendingUp className="w-8 h-8 text-blue-500 mx-auto mb-2" />
            <p className="text-gray-400 text-sm mb-1">أقصى كاش باك</p>
            <p className="text-3xl font-bold text-blue-400">{totalCashback} ر.س</p>
          </Card>

          <Card className="bg-gradient-to-br from-green-900/20 to-yellow-900/20 border-green-600/30 p-6 text-center">
            <CheckCircle className="w-8 h-8 text-green-500 mx-auto mb-2" />
            <p className="text-gray-400 text-sm mb-1">الكاش باك المكتسب</p>
            <p className="text-3xl font-bold text-green-400">{claimedCashback} ر.س</p>
          </Card>
        </div>

        {/* Offers Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {offers.map(offer => (
            <Card
              key={offer.id}
              className={`bg-gradient-to-br border p-6 cursor-pointer transition transform hover:scale-105 ${
                offer.status === "active"
                  ? "from-yellow-900/20 to-blue-900/20 border-yellow-600/30 hover:border-yellow-500/60"
                  : offer.status === "upcoming"
                  ? "from-purple-900/20 to-blue-900/20 border-purple-600/30 hover:border-purple-500/60"
                  : "from-gray-900/20 to-gray-900/20 border-gray-600/30 opacity-50"
              }`}
              onClick={() => setSelectedOffer(offer)}
            >
              <div className="mb-4">
                <div className="text-4xl font-bold text-yellow-400 mb-2">
                  {offer.percentage}%
                </div>
                <h3 className="text-xl font-bold mb-2 text-yellow-400">{offer.title}</h3>
                <p className="text-sm text-gray-400">{offer.description}</p>
              </div>

              <div className="space-y-2 mb-6 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">الحد الأدنى:</span>
                  <span className="text-blue-400 font-bold">{offer.minPurchase} ر.س</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">أقصى كاش باك:</span>
                  <span className="text-green-400 font-bold">{offer.maxCashback} ر.س</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">المدة:</span>
                  <span className="text-yellow-400 font-bold">{offer.validDays} يوم</span>
                </div>
              </div>

              <div className="flex items-center justify-between mb-4">
                <span className={`px-3 py-1 rounded text-xs font-bold ${
                  offer.status === "active"
                    ? "bg-green-600/30 text-green-400"
                    : offer.status === "upcoming"
                    ? "bg-purple-600/30 text-purple-400"
                    : "bg-gray-600/30 text-gray-400"
                }`}>
                  {offer.status === "active"
                    ? "نشط الآن"
                    : offer.status === "upcoming"
                    ? "قريباً"
                    : "منتهي"}
                </span>
                {claimedOffers.includes(offer.id) && (
                  <span className="text-green-400 text-xs">✓ مطالب به</span>
                )}
              </div>

              {offer.status === "active" && !claimedOffers.includes(offer.id) && (
                <Button
                  onClick={() => handleClaimOffer(offer.id)}
                  className="w-full bg-gradient-to-r from-yellow-500 to-blue-500 text-black font-bold"
                >
                  المطالبة بالعرض
                </Button>
              )}
            </Card>
          ))}
        </div>

        {/* How It Works */}
        <Card className="bg-gradient-to-br from-blue-900/20 to-yellow-900/20 border-blue-600/30 p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6 text-blue-400">كيف يعمل الكاش باك؟</h2>
          <div className="grid md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-400 mb-2">1</div>
              <h3 className="font-bold mb-2 text-yellow-400">اختر العرض</h3>
              <p className="text-sm text-gray-300">اختر أحد عروض الكاش باك المتاحة</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-400 mb-2">2</div>
              <h3 className="font-bold mb-2 text-yellow-400">قم بالشراء</h3>
              <p className="text-sm text-gray-300">قم بعملية شراء بالحد الأدنى المطلوب</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-400 mb-2">3</div>
              <h3 className="font-bold mb-2 text-yellow-400">انتظر 14 يوم</h3>
              <p className="text-sm text-gray-300">ينتظر التحقق من العملية لمدة 14 يوم</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-400 mb-2">4</div>
              <h3 className="font-bold mb-2 text-yellow-400">احصل على الكاش باك</h3>
              <p className="text-sm text-gray-300">استقبل الكاش باك في حسابك</p>
            </div>
          </div>
        </Card>

        {/* Terms */}
        <Card className="bg-gradient-to-br from-yellow-900/20 to-blue-900/20 border-yellow-600/30 p-6">
          <h2 className="text-xl font-bold mb-4 text-yellow-400">شروط وأحكام الكاش باك</h2>
          <ul className="space-y-2 text-sm text-gray-300">
            <li>• يجب أن تكون عملية الشراء من خلال المتجر المسجل</li>
            <li>• الكاش باك يُصرف بعد 14 يوم من تاريخ الشراء</li>
            <li>• لا يمكن الجمع بين عرضين في نفس الوقت</li>
            <li>• الكاش باك غير قابل للاسترجاع أو التحويل</li>
            <li>• يجب الالتزام بشروط الشراء والتسليم</li>
          </ul>
        </Card>
      </div>
    </Layout>
  );
}
