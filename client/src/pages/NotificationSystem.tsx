import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Bell, Send, Trash2, Eye, Settings, Plus, Clock, Users, MessageSquare } from "lucide-react";
import Layout from "@/components/Layout";

interface Notification {
  id: string;
  title: string;
  message: string;
  type: "عام" | "تسويق" | "تنبيه" | "تحديث";
  recipients: string;
  status: "مرسل" | "قيد الإرسال" | "مجدول";
  sentAt: string;
  readCount: number;
}

export default function NotificationSystem() {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      title: "عرض خاص جديد",
      message: "استمتع بخصم 30% على جميع الخدمات هذا الأسبوع",
      type: "تسويق",
      recipients: "5,234",
      status: "مرسل",
      sentAt: "2026-04-26",
      readCount: 3421
    },
    {
      id: "2",
      title: "تحديث النظام",
      message: "تم تحديث النظام بميزات جديدة",
      type: "تحديث",
      recipients: "8,500",
      status: "مرسل",
      sentAt: "2026-04-25",
      readCount: 7200
    }
  ]);

  const [showNewNotification, setShowNewNotification] = useState(false);
  const [newNotification, setNewNotification] = useState({
    title: "",
    message: "",
    type: "عام" as const,
    recipients: "الكل",
    scheduleTime: ""
  });

  const handleSendNotification = () => {
    if (!newNotification.title.trim() || !newNotification.message.trim()) {
      alert("يرجى ملء جميع الحقول");
      return;
    }

    const notification: Notification = {
      id: Date.now().toString(),
      ...newNotification,
      recipients: newNotification.recipients === "الكل" ? "جميع المستخدمين" : newNotification.recipients,
      status: newNotification.scheduleTime ? "مجدول" : "قيد الإرسال",
      sentAt: new Date().toLocaleDateString("ar-SA"),
      readCount: 0
    };

    setNotifications([notification, ...notifications]);
    setNewNotification({
      title: "",
      message: "",
      type: "عام",
      recipients: "الكل",
      scheduleTime: ""
    });
    setShowNewNotification(false);

    // محاكاة إرسال الإشعار
    setTimeout(() => {
      setNotifications(prev =>
        prev.map(n => n.id === notification.id ? { ...n, status: "مرسل" } : n)
      );
    }, 2000);
  };

  const handleDeleteNotification = (id: string) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "عام":
        return "bg-blue-600/20 text-blue-400 border-blue-600/30";
      case "تسويق":
        return "bg-purple-600/20 text-purple-400 border-purple-600/30";
      case "تنبيه":
        return "bg-red-600/20 text-red-400 border-red-600/30";
      case "تحديث":
        return "bg-green-600/20 text-green-400 border-green-600/30";
      default:
        return "bg-gray-600/20 text-gray-400 border-gray-600/30";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "مرسل":
        return "text-green-400";
      case "قيد الإرسال":
        return "text-yellow-400";
      case "مجدول":
        return "text-blue-400";
      default:
        return "text-gray-400";
    }
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto p-6" style={{ direction: "rtl" }}>
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
            نظام الإشعارات المتقدم
          </h1>
          <p className="text-gray-400 text-lg">
            إرسال إشعارات مخصصة وفعالة لعملائك
          </p>
        </div>

        {/* إحصائيات سريعة */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <Card className="bg-gradient-to-br from-yellow-900/20 to-orange-900/20 border-yellow-600/30 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">إجمالي الإشعارات</p>
                <p className="text-3xl font-bold text-yellow-400">{notifications.length}</p>
              </div>
              <Bell className="w-12 h-12 text-yellow-600/30" />
            </div>
          </Card>

          <Card className="bg-gradient-to-br from-green-900/20 to-emerald-900/20 border-green-600/30 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">معدل القراءة</p>
                <p className="text-3xl font-bold text-green-400">
                  {notifications.length > 0 
                    ? Math.round((notifications.reduce((a, b) => a + b.readCount, 0) / (notifications.length * 1000)) * 100)
                    : 0}%
                </p>
              </div>
              <Eye className="w-12 h-12 text-green-600/30" />
            </div>
          </Card>

          <Card className="bg-gradient-to-br from-blue-900/20 to-cyan-900/20 border-blue-600/30 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">المرسلة</p>
                <p className="text-3xl font-bold text-blue-400">
                  {notifications.filter(n => n.status === "مرسل").length}
                </p>
              </div>
              <Send className="w-12 h-12 text-blue-600/30" />
            </div>
          </Card>

          <Card className="bg-gradient-to-br from-purple-900/20 to-pink-900/20 border-purple-600/30 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">المجدولة</p>
                <p className="text-3xl font-bold text-purple-400">
                  {notifications.filter(n => n.status === "مجدول").length}
                </p>
              </div>
              <Clock className="w-12 h-12 text-purple-600/30" />
            </div>
          </Card>
        </div>

        {/* الإشعارات المرسلة */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-yellow-400">الإشعارات المرسلة</h2>
            <Button
              onClick={() => setShowNewNotification(true)}
              className="bg-gradient-to-r from-yellow-500 to-orange-500 text-black font-bold px-6 py-2"
            >
              <Plus className="w-5 h-5 ml-2" />
              إشعار جديد
            </Button>
          </div>

          <div className="space-y-4 mb-8">
            {notifications.map(notif => (
              <Card
                key={notif.id}
                className="bg-gradient-to-br from-yellow-900/20 to-orange-900/20 border-yellow-600/30 p-6 hover:border-yellow-500/60 transition"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-bold text-white">{notif.title}</h3>
                      <span className={`text-xs px-3 py-1 rounded-full border ${getTypeColor(notif.type)}`}>
                        {notif.type}
                      </span>
                    </div>
                    <p className="text-gray-400 mb-3">{notif.message}</p>
                    <div className="grid md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="text-gray-500">المستقبلون:</span>
                        <p className="text-yellow-400 font-semibold">{notif.recipients}</p>
                      </div>
                      <div>
                        <span className="text-gray-500">الحالة:</span>
                        <p className={`font-semibold ${getStatusColor(notif.status)}`}>{notif.status}</p>
                      </div>
                      <div>
                        <span className="text-gray-500">تاريخ الإرسال:</span>
                        <p className="text-gray-300">{notif.sentAt}</p>
                      </div>
                      <div>
                        <span className="text-gray-500">عدد القراءات:</span>
                        <p className="text-green-400 font-semibold">{notif.readCount}</p>
                      </div>
                    </div>
                  </div>
                  <Button
                    onClick={() => handleDeleteNotification(notif.id)}
                    size="sm"
                    className="bg-red-600 hover:bg-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* إنشاء إشعار جديد */}
        {showNewNotification && (
          <Card className="bg-gradient-to-br from-yellow-900/20 to-orange-900/20 border-yellow-600/30 p-8 mb-8">
            <h2 className="text-2xl font-bold mb-6 text-yellow-400">إنشاء إشعار جديد</h2>
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-2">عنوان الإشعار</label>
                  <Input
                    type="text"
                    placeholder="مثال: عرض خاص جديد"
                    value={newNotification.title}
                    onChange={(e) => setNewNotification({ ...newNotification, title: e.target.value })}
                    className="bg-black/50 border-yellow-600/30 text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">نوع الإشعار</label>
                  <select
                    value={newNotification.type}
                    onChange={(e) => setNewNotification({ ...newNotification, type: e.target.value as any })}
                    className="w-full bg-black/50 border border-yellow-600/30 text-white rounded-lg p-2"
                  >
                    <option value="عام">عام</option>
                    <option value="تسويق">تسويق</option>
                    <option value="تنبيه">تنبيه</option>
                    <option value="تحديث">تحديث</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-2">محتوى الإشعار</label>
                <textarea
                  placeholder="أدخل محتوى الإشعار"
                  value={newNotification.message}
                  onChange={(e) => setNewNotification({ ...newNotification, message: e.target.value })}
                  className="w-full bg-black/50 border border-yellow-600/30 text-white rounded-lg p-3 h-24"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-2">المستقبلون</label>
                  <select
                    value={newNotification.recipients}
                    onChange={(e) => setNewNotification({ ...newNotification, recipients: e.target.value })}
                    className="w-full bg-black/50 border border-yellow-600/30 text-white rounded-lg p-2"
                  >
                    <option value="الكل">جميع المستخدمين</option>
                    <option value="المشتركين">المشتركين فقط</option>
                    <option value="الجدد">المستخدمين الجدد</option>
                    <option value="النشطين">المستخدمين النشطين</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm text-gray-400 mb-2">جدولة الإرسال (اختياري)</label>
                  <Input
                    type="datetime-local"
                    value={newNotification.scheduleTime}
                    onChange={(e) => setNewNotification({ ...newNotification, scheduleTime: e.target.value })}
                    className="bg-black/50 border-yellow-600/30 text-white"
                  />
                </div>
              </div>

              <div className="flex gap-4">
                <Button
                  onClick={handleSendNotification}
                  className="bg-green-600 hover:bg-green-700 text-white font-bold px-8 py-3"
                >
                  <Send className="w-5 h-5 ml-2" />
                  إرسال الإشعار
                </Button>
                <Button
                  onClick={() => setShowNewNotification(false)}
                  className="bg-gray-600 hover:bg-gray-700 text-white px-8 py-3"
                >
                  إلغاء
                </Button>
              </div>
            </div>
          </Card>
        )}

        {/* نصائح الإشعارات */}
        <Card className="bg-gradient-to-br from-yellow-900/20 to-orange-900/20 border-yellow-600/30 p-8">
          <h2 className="text-2xl font-bold mb-6 text-yellow-400">نصائح لإرسال إشعارات فعالة</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <h3 className="font-bold text-orange-400 mb-3 flex items-center gap-2">
                <MessageSquare className="w-5 h-5" />
                المحتوى
              </h3>
              <ul className="space-y-2 text-gray-300 text-sm">
                <li>• اجعل العنوان قصير وجذاب</li>
                <li>• استخدم لغة واضحة وبسيطة</li>
                <li>• أضف دعوة للعمل واضحة</li>
                <li>• تجنب الرسائل الطويلة جداً</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-orange-400 mb-3 flex items-center gap-2">
                <Clock className="w-5 h-5" />
                التوقيت
              </h3>
              <ul className="space-y-2 text-gray-300 text-sm">
                <li>• أرسل في أوقات نشاط المستخدمين</li>
                <li>• تجنب الإرسال في ساعات متأخرة</li>
                <li>• اختبر أفضل أوقات الإرسال</li>
                <li>• جدول الإشعارات المهمة مسبقاً</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-orange-400 mb-3 flex items-center gap-2">
                <Users className="w-5 h-5" />
                التخصيص
              </h3>
              <ul className="space-y-2 text-gray-300 text-sm">
                <li>• خصص الرسائل حسب نوع المستخدم</li>
                <li>• استخدم أسماء المستخدمين</li>
                <li>• أرسل رسائل ذات صلة بنشاطهم</li>
                <li>• راقب معدل الاستجابة</li>
              </ul>
            </div>
          </div>
        </Card>
      </div>
    </Layout>
  );
}
