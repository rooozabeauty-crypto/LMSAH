import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import Layout from "@/components/Layout";

export default function Register() {
  const { isAuthenticated } = useAuth();
  const [formData, setFormData] = useState({
    fullName: "",
    storeName: "",
    email: "",
    phone: "",
    subscriptionType: "basic"
  });
  const [submitted, setSubmitted] = useState(false);

  if (isAuthenticated) {
    return (
      <Layout>
        <div className="max-w-2xl mx-auto p-6">
          <Card className="bg-gradient-to-br from-yellow-900/20 to-blue-900/20 border-yellow-600/30 p-8 text-center">
            <h1 className="text-2xl font-bold mb-4 text-yellow-400">أنت مسجل بالفعل</h1>
            <p className="text-gray-400">شكراً لك! بيانات حسابك مسجلة بالفعل في النظام.</p>
          </Card>
        </div>
      </Layout>
    );
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    console.log("Form submitted:", formData);
    setSubmitted(true);
    setTimeout(() => {
      setFormData({
        fullName: "",
        storeName: "",
        email: "",
        phone: "",
        subscriptionType: "basic"
      });
      setSubmitted(false);
    }, 3000);
  };

  return (
    <Layout>
      <div className="max-w-2xl mx-auto p-6" style={{ direction: "rtl" }}>
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-yellow-400 to-blue-400 bg-clip-text text-transparent">
            تسجيل متجرك
          </h1>
          <p className="text-gray-400 text-lg">
            سجل بيانات متجرك معنا واستمتع بـ 14 يوم تجريبي مجاني
          </p>
        </div>

        {submitted ? (
          <Card className="bg-gradient-to-br from-yellow-600/30 to-blue-600/30 border-yellow-500/50 p-8 text-center">
            <div className="text-6xl mb-4">✓</div>
            <h2 className="text-2xl font-bold mb-2 text-yellow-400">تم التسجيل بنجاح!</h2>
            <p className="text-gray-300 mb-4">
              شكراً لتسجيلك معنا. سيتم إرسال رسالة تأكيد إلى بريدك الإلكتروني قريباً.
            </p>
            <p className="text-sm text-gray-400">
              يمكنك الآن الاستمتاع بـ 14 يوم تجريبي مجاني لجميع الخدمات
            </p>
          </Card>
        ) : (
          <Card className="bg-gradient-to-br from-yellow-900/20 to-blue-900/20 border-yellow-600/30 p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold mb-2 text-yellow-400">
                    اسمك الكامل
                  </label>
                  <Input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="أحمد محمد"
                    className="bg-blue-900/30 border-blue-600/30 text-white"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2 text-yellow-400">
                    اسم متجرك
                  </label>
                  <Input
                    type="text"
                    name="storeName"
                    value={formData.storeName}
                    onChange={handleChange}
                    placeholder="متجري الرائع"
                    className="bg-blue-900/30 border-blue-600/30 text-white"
                    required
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold mb-2 text-yellow-400">
                    البريد الإلكتروني
                  </label>
                  <Input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    className="bg-blue-900/30 border-blue-600/30 text-white"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2 text-yellow-400">
                    رقم الهاتف
                  </label>
                  <Input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="0501234567"
                    className="bg-blue-900/30 border-blue-600/30 text-white"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2 text-yellow-400">
                  نوع الاشتراك
                </label>
                <select
                  name="subscriptionType"
                  value={formData.subscriptionType}
                  onChange={handleChange}
                  className="w-full bg-blue-900/30 border border-blue-600/30 text-white rounded-lg p-3"
                >
                  <option value="basic">الأساسي (299 ريال/شهر)</option>
                  <option value="professional">الاحترافي (1,499 ريال/شهر)</option>
                  <option value="premium">الفخم (8,900 ريال/شهر)</option>
                </select>
              </div>

              <div className="bg-blue-900/20 border border-blue-600/30 rounded-lg p-4">
                <p className="text-sm text-gray-300">
                  ✓ 14 يوم تجريبي مجاني لجميع الخدمات
                </p>
                <p className="text-sm text-gray-300 mt-2">
                  ✓ لا حاجة لإدخال بيانات الدفع الآن
                </p>
                <p className="text-sm text-gray-300 mt-2">
                  ✓ يمكنك الترقية أو الانتقال بين الخطط في أي وقت
                </p>
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-yellow-500 to-blue-500 text-black font-bold py-6 text-lg hover:from-yellow-600 hover:to-blue-600"
              >
                تسجيل الآن - 14 يوم مجاني
              </Button>

              <p className="text-center text-xs text-gray-500">
                بالتسجيل، أنت توافق على شروط الخدمة وسياسة الخصوصية
              </p>
            </form>
          </Card>
        )}
      </div>
    </Layout>
  );
}
