import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ShoppingCart, Send, TrendingUp } from "lucide-react";
import { useState } from "react";
import Layout from "@/components/Layout";

interface AbandonedCart {
  id: string;
  customerName: string;
  email: string;
  items: number;
  totalValue: number;
  abandonedDate: Date;
  status: "pending" | "recovered" | "sent";
}

const carts: AbandonedCart[] = [
  {
    id: "1",
    customerName: "أحمد محمد",
    email: "ahmed@example.com",
    items: 3,
    totalValue: 450,
    abandonedDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    status: "pending"
  },
  {
    id: "2",
    customerName: "فاطمة علي",
    email: "fatima@example.com",
    items: 2,
    totalValue: 320,
    abandonedDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    status: "sent"
  },
  {
    id: "3",
    customerName: "محمود سالم",
    email: "mahmoud@example.com",
    items: 5,
    totalValue: 890,
    abandonedDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    status: "recovered"
  }
];

export default function AbandonedCarts() {
  const { isAuthenticated } = useAuth();
  const [cartList, setCartList] = useState<AbandonedCart[]>(carts);
  const [sentCarts, setSentCarts] = useState(0);

  const handleSendReminder = (cartId: string) => {
    setCartList(prev =>
      prev.map(cart =>
        cart.id === cartId ? { ...cart, status: "sent" as const } : cart
      )
    );
    setSentCarts(prev => prev + 1);
  };

  const totalAbandonedValue = cartList.reduce((sum, cart) => sum + cart.totalValue, 0);
  const recoveryRate = cartList.length > 0 ? (cartList.filter(c => c.status === "recovered").length / cartList.length) * 100 : 0;

  if (!isAuthenticated) {
    return (
      <Layout>
        <div className="max-w-2xl mx-auto p-6">
          <Card className="bg-gradient-to-br from-yellow-900/20 to-blue-900/20 border-yellow-600/30 p-8 text-center">
            <h1 className="text-2xl font-bold mb-4 text-yellow-400">يجب تسجيل الدخول</h1>
            <p className="text-gray-400 mb-6">يرجى تسجيل الدخول للوصول إلى إدارة السلات المتروكة</p>
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
            إدارة السلات المتروكة
          </h1>
          <p className="text-gray-400 text-lg">
            استرجع المبيعات المفقودة من خلال تذكيرات ذكية وتسويقية
          </p>
        </div>

        {/* Statistics */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-yellow-900/20 to-blue-900/20 border-yellow-600/30 p-6 text-center">
            <ShoppingCart className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
            <p className="text-gray-400 text-sm mb-1">السلات المتروكة</p>
            <p className="text-3xl font-bold text-yellow-400">{cartList.length}</p>
          </Card>

          <Card className="bg-gradient-to-br from-blue-900/20 to-yellow-900/20 border-blue-600/30 p-6 text-center">
            <TrendingUp className="w-8 h-8 text-blue-500 mx-auto mb-2" />
            <p className="text-gray-400 text-sm mb-1">القيمة الإجمالية</p>
            <p className="text-3xl font-bold text-blue-400">{totalAbandonedValue} ر.س</p>
          </Card>

          <Card className="bg-gradient-to-br from-green-900/20 to-yellow-900/20 border-green-600/30 p-6 text-center">
            <Send className="w-8 h-8 text-green-500 mx-auto mb-2" />
            <p className="text-gray-400 text-sm mb-1">التذكيرات المرسلة</p>
            <p className="text-3xl font-bold text-green-400">{sentCarts}</p>
          </Card>

          <Card className="bg-gradient-to-br from-purple-900/20 to-yellow-900/20 border-purple-600/30 p-6 text-center">
            <p className="text-gray-400 text-sm mb-1">معدل الاسترجاع</p>
            <p className="text-3xl font-bold text-purple-400">{recoveryRate.toFixed(0)}%</p>
          </Card>
        </div>

        {/* Carts Table */}
        <Card className="bg-gradient-to-br from-yellow-900/20 to-blue-900/20 border-yellow-600/30 p-6 overflow-x-auto">
          <h2 className="text-2xl font-bold mb-6 text-yellow-400">السلات المتروكة</h2>
          <table className="w-full text-right">
            <thead>
              <tr className="border-b border-yellow-600/30">
                <th className="pb-4 text-yellow-400 font-bold">اسم العميل</th>
                <th className="pb-4 text-yellow-400 font-bold">البريد الإلكتروني</th>
                <th className="pb-4 text-yellow-400 font-bold">عدد المنتجات</th>
                <th className="pb-4 text-yellow-400 font-bold">القيمة</th>
                <th className="pb-4 text-yellow-400 font-bold">التاريخ</th>
                <th className="pb-4 text-yellow-400 font-bold">الحالة</th>
                <th className="pb-4 text-yellow-400 font-bold">الإجراء</th>
              </tr>
            </thead>
            <tbody>
              {cartList.map(cart => (
                <tr key={cart.id} className="border-b border-yellow-600/20 hover:bg-yellow-900/10 transition">
                  <td className="py-4">{cart.customerName}</td>
                  <td className="py-4 text-sm text-gray-400">{cart.email}</td>
                  <td className="py-4">{cart.items}</td>
                  <td className="py-4 font-bold text-yellow-400">{cart.totalValue} ر.س</td>
                  <td className="py-4 text-sm text-gray-400">
                    {cart.abandonedDate.toLocaleDateString("ar-SA")}
                  </td>
                  <td className="py-4">
                    <span className={`px-3 py-1 rounded text-xs font-bold ${
                      cart.status === "recovered"
                        ? "bg-green-600/30 text-green-400"
                        : cart.status === "sent"
                        ? "bg-yellow-600/30 text-yellow-400"
                        : "bg-blue-600/30 text-blue-400"
                    }`}>
                      {cart.status === "recovered"
                        ? "تم الاسترجاع"
                        : cart.status === "sent"
                        ? "تم الإرسال"
                        : "قيد الانتظار"}
                    </span>
                  </td>
                  <td className="py-4">
                    {cart.status === "pending" && (
                      <Button
                        onClick={() => handleSendReminder(cart.id)}
                        className="bg-yellow-600/50 hover:bg-yellow-600 text-white text-xs py-1 px-3"
                      >
                        إرسال تذكير
                      </Button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>

        {/* Best Practices */}
        <Card className="bg-gradient-to-br from-blue-900/20 to-yellow-900/20 border-blue-600/30 p-8 mt-8">
          <h2 className="text-2xl font-bold mb-6 text-blue-400">نصائح لاسترجاع السلات المتروكة</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <h3 className="font-bold mb-2 text-yellow-400">أرسل تذكيراً فوري</h3>
              <p className="text-sm text-gray-300">أرسل تذكيراً خلال ساعة من ترك السلة</p>
            </div>
            <div>
              <h3 className="font-bold mb-2 text-yellow-400">قدم حافزاً</h3>
              <p className="text-sm text-gray-300">اعرض خصماً أو عرضاً خاصاً للعملاء</p>
            </div>
            <div>
              <h3 className="font-bold mb-2 text-yellow-400">شخصص الرسالة</h3>
              <p className="text-sm text-gray-300">استخدم اسم العميل والمنتجات المحددة</p>
            </div>
          </div>
        </Card>
      </div>
    </Layout>
  );
}
