import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Mail, Phone, MessageCircle, Clock, CheckCircle } from "lucide-react";
import { useState } from "react";
import Layout from "@/components/Layout";

interface SupportTicket {
  id: string;
  subject: string;
  message: string;
  status: "pending" | "in-progress" | "resolved";
  createdAt: Date;
}

export default function Support() {
  const { isAuthenticated, user } = useAuth();
  const [formData, setFormData] = useState({
    subject: "",
    message: "",
    email: user?.email || ""
  });
  const [tickets, setTickets] = useState<SupportTicket[]>([
    {
      id: "1",
      subject: "مشكلة في تسجيل الدخول",
      message: "لا أستطيع تسجيل الدخول إلى حسابي",
      status: "resolved",
      createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
    },
    {
      id: "2",
      subject: "استفسار عن الخدمات",
      message: "هل يمكنني الترقية من خطة إلى أخرى؟",
      status: "in-progress",
      createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000)
    }
  ]);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newTicket: SupportTicket = {
      id: Date.now().toString(),
      subject: formData.subject,
      message: formData.message,
      status: "pending",
      createdAt: new Date()
    };
    setTickets(prev => [newTicket, ...prev]);
    setFormData({ subject: "", message: "", email: user?.email || "" });
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "resolved":
        return "bg-green-600/20 border-green-600/30 text-green-400";
      case "in-progress":
        return "bg-yellow-600/20 border-yellow-600/30 text-yellow-400";
      case "pending":
        return "bg-blue-600/20 border-blue-600/30 text-blue-400";
      default:
        return "bg-gray-600/20 border-gray-600/30 text-gray-400";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "resolved":
        return <CheckCircle className="w-4 h-4" />;
      case "in-progress":
        return <Clock className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  if (!isAuthenticated) {
    return (
      <Layout>
        <div className="max-w-2xl mx-auto p-6">
          <Card className="bg-gradient-to-br from-yellow-900/20 to-blue-900/20 border-yellow-600/30 p-8 text-center">
            <h1 className="text-2xl font-bold mb-4 text-yellow-400">يجب تسجيل الدخول</h1>
            <p className="text-gray-400 mb-6">يرجى تسجيل الدخول للوصول إلى الدعم الفني</p>
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
            الدعم الفني
          </h1>
          <p className="text-gray-400 text-lg">
            نحن هنا لمساعدتك 24/7. تواصل معنا بأي استفسار أو مشكلة
          </p>
        </div>

        {/* Contact Methods */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card className="bg-gradient-to-br from-yellow-900/20 to-blue-900/20 border-yellow-600/30 p-6 text-center">
            <Mail className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">البريد الإلكتروني</h3>
            <p className="text-gray-400 mb-4">zoooz2426@gmail.com</p>
            <Button
              onClick={() => window.location.href = "mailto:zoooz2426@gmail.com"}
              className="w-full bg-yellow-600/50 hover:bg-yellow-600 text-white"
            >
              أرسل بريد
            </Button>
          </Card>

          <Card className="bg-gradient-to-br from-blue-900/20 to-yellow-900/20 border-blue-600/30 p-6 text-center">
            <Phone className="w-12 h-12 text-blue-500 mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">الاتصال المباشر</h3>
            <p className="text-gray-400 mb-4">0508047159</p>
            <Button
              onClick={() => window.open("tel:0508047159")}
              className="w-full bg-blue-600/50 hover:bg-blue-600 text-white"
            >
              اتصل بنا
            </Button>
          </Card>

          <Card className="bg-gradient-to-br from-green-900/20 to-yellow-900/20 border-green-600/30 p-6 text-center">
            <MessageCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">واتس آب</h3>
            <p className="text-gray-400 mb-4">0508047159</p>
            <Button
              onClick={() => window.open("https://wa.me/966508047159")}
              className="w-full bg-green-600/50 hover:bg-green-600 text-white"
            >
              راسل عبر واتس
            </Button>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Support Form */}
          <div>
            <h2 className="text-2xl font-bold mb-4 text-yellow-400">إرسال طلب دعم</h2>
            {submitted && (
              <Card className="bg-green-600/20 border-green-600/30 p-4 mb-4">
                <p className="text-green-400">تم إرسال طلبك بنجاح. سنرد عليك قريباً!</p>
              </Card>
            )}
            <Card className="bg-gradient-to-br from-yellow-900/20 to-blue-900/20 border-yellow-600/30 p-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold mb-2 text-yellow-400">
                    الموضوع
                  </label>
                  <Input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="اكتب موضوع الطلب"
                    className="bg-blue-900/30 border-blue-600/30 text-white"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2 text-yellow-400">
                    الرسالة
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="اكتب تفاصيل مشكلتك أو استفسارك"
                    rows={5}
                    className="w-full bg-blue-900/30 border border-blue-600/30 text-white rounded-lg p-3"
                    required
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-yellow-500 to-blue-500 text-black font-bold py-3"
                >
                  إرسال الطلب
                </Button>
              </form>
            </Card>
          </div>

          {/* Support Tickets */}
          <div>
            <h2 className="text-2xl font-bold mb-4 text-yellow-400">طلباتك</h2>
            <div className="space-y-4">
              {tickets.length > 0 ? (
                tickets.map(ticket => (
                  <Card
                    key={ticket.id}
                    className={`p-4 border ${getStatusColor(ticket.status)}`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-bold">{ticket.subject}</h3>
                      <div className="flex items-center gap-1">
                        {getStatusIcon(ticket.status)}
                        <span className="text-xs">
                          {ticket.status === "resolved"
                            ? "مغلق"
                            : ticket.status === "in-progress"
                            ? "قيد المعالجة"
                            : "قيد الانتظار"}
                        </span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-300 mb-2">{ticket.message}</p>
                    <p className="text-xs text-gray-500">
                      {ticket.createdAt.toLocaleDateString("ar-SA")}
                    </p>
                  </Card>
                ))
              ) : (
                <Card className="bg-blue-900/20 border-blue-600/30 p-4 text-center">
                  <p className="text-gray-400">لا توجد طلبات دعم حالياً</p>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
