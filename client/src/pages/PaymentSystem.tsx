import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { CreditCard, CheckCircle, AlertCircle, Plus, Trash2, DollarSign } from "lucide-react";
import Layout from "@/components/Layout";

interface Payment {
  id: string;
  amount: number;
  plan: string;
  date: string;
  status: "completed" | "pending" | "failed";
  transactionId: string;
}

interface Subscription {
  id: string;
  plan: string;
  price: number;
  features: string[];
  status: "active" | "inactive" | "expired";
  renewalDate: string;
}

export default function PaymentSystem() {
  const [payments, setPayments] = useState<Payment[]>([
    {
      id: "1",
      amount: 299,
      plan: "الخطة الأساسية",
      date: "2026-04-20",
      status: "completed",
      transactionId: "TXN-001-2026"
    },
    {
      id: "2",
      amount: 1499,
      plan: "الخطة الاحترافية",
      date: "2026-04-15",
      status: "completed",
      transactionId: "TXN-002-2026"
    }
  ]);

  const [subscriptions, setSubscriptions] = useState<Subscription[]>([
    {
      id: "1",
      plan: "الخطة الأساسية",
      price: 299,
      features: ["SEO أساسي", "إدارة السوشل ميديا", "تقارير شهرية"],
      status: "active",
      renewalDate: "2026-05-26"
    },
    {
      id: "2",
      plan: "الخطة الاحترافية",
      price: 1499,
      features: ["SEO متقدم", "إدارة شاملة", "تقارير أسبوعية", "دعم 24/7"],
      status: "active",
      renewalDate: "2026-05-15"
    }
  ]);

  const [showNewPayment, setShowNewPayment] = useState(false);
  const [cardNumber, setCardNumber] = useState("");
  const [cardHolder, setCardHolder] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [selectedPlan, setSelectedPlan] = useState("299");

  const handlePayment = () => {
    if (!cardNumber.trim() || !cardHolder.trim() || !expiryDate.trim() || !cvv.trim()) {
      alert("يرجى ملء جميع حقول البطاقة");
      return;
    }

    const newPayment: Payment = {
      id: Date.now().toString(),
      amount: parseInt(selectedPlan),
      plan: selectedPlan === "299" ? "الخطة الأساسية" : selectedPlan === "1499" ? "الخطة الاحترافية" : "الخطة المتقدمة",
      date: new Date().toLocaleDateString("ar-SA"),
      status: "completed",
      transactionId: `TXN-${Date.now()}`
    };

    setPayments([newPayment, ...payments]);
    setCardNumber("");
    setCardHolder("");
    setExpiryDate("");
    setCvv("");
    setShowNewPayment(false);
    alert("تم الدفع بنجاح!");
  };

  const handleCancelSubscription = (id: string) => {
    setSubscriptions(subscriptions.map(sub =>
      sub.id === id ? { ...sub, status: "inactive" as const } : sub
    ));
  };

  const totalRevenue = payments.filter(p => p.status === "completed").reduce((sum, p) => sum + p.amount, 0);
  const activeSubscriptions = subscriptions.filter(s => s.status === "active").length;

  return (
    <Layout>
      <div className="max-w-7xl mx-auto p-6" style={{ direction: "rtl" }}>
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-yellow-400 to-blue-400 bg-clip-text text-transparent">
            نظام الدفع والاشتراكات
          </h1>
          <p className="text-gray-400 text-lg">
            إدارة الدفعات والاشتراكات والفواتير
          </p>
        </div>

        {/* إحصائيات */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-yellow-900/20 to-blue-900/20 border-yellow-600/30 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm mb-2">إجمالي الإيرادات</p>
                <p className="text-3xl font-bold text-yellow-400">{totalRevenue.toLocaleString()} ر.س</p>
              </div>
              <DollarSign className="w-12 h-12 text-yellow-500 opacity-20" />
            </div>
          </Card>

          <Card className="bg-gradient-to-br from-green-900/20 to-yellow-900/20 border-green-600/30 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm mb-2">الاشتراكات النشطة</p>
                <p className="text-3xl font-bold text-green-400">{activeSubscriptions}</p>
              </div>
              <CheckCircle className="w-12 h-12 text-green-500 opacity-20" />
            </div>
          </Card>

          <Card className="bg-gradient-to-br from-blue-900/20 to-yellow-900/20 border-blue-600/30 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm mb-2">إجمالي الدفعات</p>
                <p className="text-3xl font-bold text-blue-400">{payments.length}</p>
              </div>
              <CreditCard className="w-12 h-12 text-blue-500 opacity-20" />
            </div>
          </Card>
        </div>

        {/* الاشتراكات النشطة */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4 text-yellow-400">الاشتراكات النشطة</h2>
          <div className="space-y-4">
            {subscriptions.map(sub => (
              <Card
                key={sub.id}
                className="bg-gradient-to-br from-yellow-900/20 to-blue-900/20 border-yellow-600/30 p-6"
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <h3 className="text-lg font-bold text-yellow-400">{sub.plan}</h3>
                      {sub.status === "active" ? (
                        <CheckCircle className="w-5 h-5 text-green-400" />
                      ) : (
                        <AlertCircle className="w-5 h-5 text-red-400" />
                      )}
                    </div>

                    <div className="grid md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <p className="text-gray-400 text-sm">السعر الشهري</p>
                        <p className="text-white font-bold text-xl">{sub.price} ر.س</p>
                      </div>
                      <div>
                        <p className="text-gray-400 text-sm">تاريخ التجديد</p>
                        <p className="text-white font-semibold">{sub.renewalDate}</p>
                      </div>
                    </div>

                    <div>
                      <p className="text-gray-400 text-sm mb-2">المميزات المتضمنة:</p>
                      <div className="flex flex-wrap gap-2">
                        {sub.features.map((feature, idx) => (
                          <span key={idx} className="bg-yellow-600/20 text-yellow-300 px-3 py-1 rounded-full text-sm">
                            ✓ {feature}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {sub.status === "active" && (
                    <Button
                      onClick={() => handleCancelSubscription(sub.id)}
                      className="bg-red-600 hover:bg-red-700 text-white ml-4"
                    >
                      إلغاء الاشتراك
                    </Button>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* سجل الدفعات */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4 text-blue-400">سجل الدفعات</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-yellow-600/30">
                  <th className="text-right p-3 text-yellow-400">رقم المعاملة</th>
                  <th className="text-right p-3 text-yellow-400">الخطة</th>
                  <th className="text-right p-3 text-yellow-400">المبلغ</th>
                  <th className="text-right p-3 text-yellow-400">التاريخ</th>
                  <th className="text-right p-3 text-yellow-400">الحالة</th>
                </tr>
              </thead>
              <tbody>
                {payments.map(payment => (
                  <tr key={payment.id} className="border-b border-yellow-600/20 hover:bg-yellow-900/10">
                    <td className="p-3 text-white">{payment.transactionId}</td>
                    <td className="p-3 text-gray-300">{payment.plan}</td>
                    <td className="p-3 text-yellow-400 font-bold">{payment.amount} ر.س</td>
                    <td className="p-3 text-gray-300">{payment.date}</td>
                    <td className="p-3">
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        payment.status === "completed" ? "bg-green-600/20 text-green-400" :
                        payment.status === "pending" ? "bg-yellow-600/20 text-yellow-400" :
                        "bg-red-600/20 text-red-400"
                      }`}>
                        {payment.status === "completed" ? "مكتملة" :
                         payment.status === "pending" ? "قيد الانتظار" : "فشلت"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* إضافة دفعة جديدة */}
        <div className="mb-8">
          {!showNewPayment ? (
            <Button
              onClick={() => setShowNewPayment(true)}
              className="bg-gradient-to-r from-yellow-500 to-blue-500 text-black font-bold px-8 py-3"
            >
              <Plus className="w-5 h-5 ml-2" />
              دفع جديد
            </Button>
          ) : (
            <Card className="bg-gradient-to-br from-yellow-900/20 to-blue-900/20 border-yellow-600/30 p-8">
              <h3 className="text-2xl font-bold mb-6 text-yellow-400">معلومات الدفع</h3>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm text-gray-400 mb-2">اختر الخطة</label>
                  <select
                    value={selectedPlan}
                    onChange={(e) => setSelectedPlan(e.target.value)}
                    className="w-full bg-black/50 border border-yellow-600/30 text-white rounded-lg p-3"
                  >
                    <option value="299">الخطة الأساسية - 299 ر.س</option>
                    <option value="1499">الخطة الاحترافية - 1,499 ر.س</option>
                    <option value="8900">الخطة المتقدمة - 8,900 ر.س</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm text-gray-400 mb-2">اسم صاحب البطاقة</label>
                  <Input
                    type="text"
                    placeholder="أدخل اسمك الكامل"
                    value={cardHolder}
                    onChange={(e) => setCardHolder(e.target.value)}
                    className="bg-black/50 border-yellow-600/30 text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-400 mb-2">رقم البطاقة</label>
                  <Input
                    type="text"
                    placeholder="1234 5678 9012 3456"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value.replace(/\D/g, '').slice(0, 16))}
                    className="bg-black/50 border-yellow-600/30 text-white"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">تاريخ الانتهاء</label>
                    <Input
                      type="text"
                      placeholder="MM/YY"
                      value={expiryDate}
                      onChange={(e) => setExpiryDate(e.target.value)}
                      className="bg-black/50 border-yellow-600/30 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">CVV</label>
                    <Input
                      type="text"
                      placeholder="123"
                      value={cvv}
                      onChange={(e) => setCvv(e.target.value.replace(/\D/g, '').slice(0, 3))}
                      className="bg-black/50 border-yellow-600/30 text-white"
                    />
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <Button
                  onClick={handlePayment}
                  className="bg-green-600 hover:bg-green-700 text-white font-bold px-8 py-3"
                >
                  تأكيد الدفع
                </Button>
                <Button
                  onClick={() => setShowNewPayment(false)}
                  className="bg-gray-600 hover:bg-gray-700 text-white px-8 py-3"
                >
                  إلغاء
                </Button>
              </div>
            </Card>
          )}
        </div>

        {/* نصائح الدفع الآمن */}
        <Card className="bg-gradient-to-br from-blue-900/20 to-yellow-900/20 border-blue-600/30 p-8">
          <h2 className="text-2xl font-bold mb-4 text-blue-400">نصائح الدفع الآمن</h2>
          <div className="space-y-3">
            <div className="flex gap-3">
              <span className="text-2xl flex-shrink-0">🔒</span>
              <div>
                <h3 className="font-bold text-yellow-400 mb-1">تشفير آمن</h3>
                <p className="text-gray-300 text-sm">جميع بيانات الدفع مشفرة بتقنية SSL 256-bit</p>
              </div>
            </div>
            <div className="flex gap-3">
              <span className="text-2xl flex-shrink-0">✅</span>
              <div>
                <h3 className="font-bold text-yellow-400 mb-1">التحقق ثنائي</h3>
                <p className="text-gray-300 text-sm">تحقق ثنائي من كل معاملة للأمان الإضافي</p>
              </div>
            </div>
            <div className="flex gap-3">
              <span className="text-2xl flex-shrink-0">📱</span>
              <div>
                <h3 className="font-bold text-yellow-400 mb-1">دعم متعدد</h3>
                <p className="text-gray-300 text-sm">ندعم جميع طرق الدفع الرئيسية والمحافظ الرقمية</p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </Layout>
  );
}
