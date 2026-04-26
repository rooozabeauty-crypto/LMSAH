import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Palette, Send, Download, Plus, Trash2, Eye, ExternalLink } from "lucide-react";
import Layout from "@/components/Layout";

interface Notification {
  id: string;
  title: string;
  message: string;
  color: string;
  template: string;
  tool: string;
  createdAt: string;
}

export default function NotificationDesigner() {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      title: "عرض حصري",
      message: "احصل على خصم 50% على جميع الخدمات",
      color: "#FFD700",
      template: "premium",
      tool: "Adobe Firefly",
      createdAt: "2026-04-26"
    },
    {
      id: "2",
      title: "منتج جديد",
      message: "تم إضافة خدمة جديدة لتحسين متجرك",
      color: "#1E90FF",
      template: "modern",
      tool: "Canva",
      createdAt: "2026-04-25"
    }
  ]);

  const [showNewNotification, setShowNewNotification] = useState(false);
  const [newNotif, setNewNotif] = useState({
    title: "",
    message: "",
    color: "#FFD700",
    template: "premium",
    tool: "Adobe Firefly"
  });

  const designTools = [
    {
      name: "Adobe Firefly",
      icon: "🎨",
      desc: "مولد صور ذكي بالذكاء الاصطناعي",
      url: "https://www.adobe.com/products/firefly.html",
      features: ["صور ذكية", "تحرير متقدم", "تأثيرات احترافية"]
    },
    {
      name: "Canva",
      icon: "🖼️",
      desc: "منصة تصميم سهلة وقوية",
      url: "https://www.canva.com",
      features: ["قوالب جاهزة", "تصاميم احترافية", "مكتبة ضخمة"]
    },
    {
      name: "Adobe Express",
      icon: "✨",
      desc: "أداة تصميم سريعة وفعالة",
      url: "https://www.adobe.com/express/",
      features: ["تصاميم سريعة", "قوالب مخصصة", "تأثيرات فورية"]
    },
    {
      name: "Figma",
      icon: "🎭",
      desc: "منصة تصميم تعاونية احترافية",
      url: "https://www.figma.com",
      features: ["تصميم متقدم", "تعاون فوري", "نماذج تفاعلية"]
    }
  ];

  const videoTools = [
    {
      name: "Midjourney",
      icon: "🌌",
      desc: "مولد صور ذكي متقدم جداً",
      url: "https://www.midjourney.com",
      features: ["صور احترافية", "أسلوب فني", "جودة عالية"]
    },
    {
      name: "Runway ML",
      icon: "🎬",
      desc: "منصة إنتاج فيديو بالذكاء الاصطناعي",
      url: "https://runwayml.com",
      features: ["فيديوهات ذكية", "تأثيرات متقدمة", "معالجة سريعة"]
    },
    {
      name: "CapCut",
      icon: "✂️",
      desc: "محرر فيديو قوي وسهل",
      url: "https://www.capcut.com",
      features: ["تحرير احترافي", "مؤثرات صوتية", "انتقالات سلسة"]
    }
  ];

  const fontTools = [
    {
      name: "Fontjoy",
      icon: "🔤",
      desc: "مولد خطوط وعبارات تسويقية ذكي",
      url: "https://fontjoy.com",
      features: ["خطوط متناسقة", "عبارات تسويقية", "اقتراحات ذكية"]
    }
  ];

  const handleAddNotification = () => {
    if (!newNotif.title.trim() || !newNotif.message.trim()) {
      alert("يرجى ملء جميع الحقول");
      return;
    }

    const notification: Notification = {
      id: Date.now().toString(),
      ...newNotif,
      createdAt: new Date().toLocaleDateString("ar-SA")
    };

    setNotifications([notification, ...notifications]);
    setNewNotif({
      title: "",
      message: "",
      color: "#FFD700",
      template: "premium",
      tool: "Adobe Firefly"
    });
    setShowNewNotification(false);
  };

  const handleDeleteNotification = (id: string) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto p-6" style={{ direction: "rtl" }}>
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-yellow-400 to-blue-400 bg-clip-text text-transparent">
            مصمم الإشعارات المتقدم
          </h1>
          <p className="text-gray-400 text-lg">
            صمم إشعارات احترافية متكاملة مع أفضل أدوات التصميم
          </p>
        </div>

        {/* الإشعارات الحالية */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-yellow-400">الإشعارات الحالية</h2>
            <Button
              onClick={() => setShowNewNotification(true)}
              className="bg-gradient-to-r from-yellow-500 to-blue-500 text-black font-bold px-6 py-2"
            >
              <Plus className="w-5 h-5 ml-2" />
              إشعار جديد
            </Button>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {notifications.map(notif => (
              <Card
                key={notif.id}
                className="bg-gradient-to-br from-yellow-900/20 to-blue-900/20 border-yellow-600/30 p-6 hover:border-yellow-500/60 transition"
              >
                <div
                  className="h-32 rounded-lg mb-4 flex items-center justify-center text-white text-2xl font-bold"
                  style={{ backgroundColor: notif.color }}
                >
                  {notif.title}
                </div>
                <div className="space-y-2 mb-4">
                  <p className="text-gray-400 text-sm">الرسالة:</p>
                  <p className="text-white">{notif.message}</p>
                  <p className="text-gray-400 text-sm">الأداة: <span className="text-yellow-400">{notif.tool}</span></p>
                  <p className="text-gray-400 text-sm">التاريخ: {notif.createdAt}</p>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" className="bg-blue-600 hover:bg-blue-700 flex-1">
                    <Eye className="w-4 h-4 ml-2" />
                    معاينة
                  </Button>
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

        {/* إضافة إشعار جديد */}
        {showNewNotification && (
          <Card className="bg-gradient-to-br from-yellow-900/20 to-blue-900/20 border-yellow-600/30 p-8 mb-8">
            <h2 className="text-2xl font-bold mb-6 text-yellow-400">إنشاء إشعار جديد</h2>
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-2">عنوان الإشعار</label>
                  <Input
                    type="text"
                    placeholder="مثال: عرض حصري"
                    value={newNotif.title}
                    onChange={(e) => setNewNotif({ ...newNotif, title: e.target.value })}
                    className="bg-black/50 border-yellow-600/30 text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">لون الإشعار</label>
                  <div className="flex gap-2">
                    <input
                      type="color"
                      value={newNotif.color}
                      onChange={(e) => setNewNotif({ ...newNotif, color: e.target.value })}
                      className="w-12 h-10 rounded cursor-pointer"
                    />
                    <Input
                      type="text"
                      value={newNotif.color}
                      onChange={(e) => setNewNotif({ ...newNotif, color: e.target.value })}
                      className="bg-black/50 border-yellow-600/30 text-white flex-1"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-2">رسالة الإشعار</label>
                <textarea
                  placeholder="أدخل رسالة الإشعار"
                  value={newNotif.message}
                  onChange={(e) => setNewNotif({ ...newNotif, message: e.target.value })}
                  className="w-full bg-black/50 border border-yellow-600/30 text-white rounded-lg p-3 h-24"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-2">اختر الأداة</label>
                  <select
                    value={newNotif.tool}
                    onChange={(e) => setNewNotif({ ...newNotif, tool: e.target.value })}
                    className="w-full bg-black/50 border border-yellow-600/30 text-white rounded-lg p-2"
                  >
                    <optgroup label="أدوات التصميم">
                      <option value="Adobe Firefly">Adobe Firefly</option>
                      <option value="Canva">Canva</option>
                      <option value="Adobe Express">Adobe Express</option>
                      <option value="Figma">Figma</option>
                    </optgroup>
                    <optgroup label="أدوات الفيديو">
                      <option value="Midjourney">Midjourney</option>
                      <option value="Runway ML">Runway ML</option>
                      <option value="CapCut">CapCut</option>
                    </optgroup>
                  </select>
                </div>

                <div>
                  <label className="block text-sm text-gray-400 mb-2">النموذج</label>
                  <select
                    value={newNotif.template}
                    onChange={(e) => setNewNotif({ ...newNotif, template: e.target.value })}
                    className="w-full bg-black/50 border border-yellow-600/30 text-white rounded-lg p-2"
                  >
                    <option value="premium">فخم</option>
                    <option value="modern">حديث</option>
                    <option value="simple">بسيط</option>
                    <option value="creative">إبداعي</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-4">
                <Button
                  onClick={handleAddNotification}
                  className="bg-green-600 hover:bg-green-700 text-white font-bold px-8 py-3"
                >
                  <Send className="w-5 h-5 ml-2" />
                  إنشاء الإشعار
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

        {/* أدوات التصميم */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-6 text-blue-400">أدوات التصميم المتقدمة</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {designTools.map((tool, idx) => (
              <Card
                key={idx}
                className="bg-gradient-to-br from-blue-900/20 to-yellow-900/20 border-blue-600/30 p-6 hover:border-blue-500/60 transition group cursor-pointer"
              >
                <div className="text-4xl mb-3">{tool.icon}</div>
                <h3 className="text-lg font-bold text-blue-400 mb-2 group-hover:text-yellow-400 transition">
                  {tool.name}
                </h3>
                <p className="text-gray-400 text-sm mb-3">{tool.desc}</p>
                <div className="space-y-1 mb-4">
                  {tool.features.map((feature, i) => (
                    <p key={i} className="text-xs text-gray-500">✓ {feature}</p>
                  ))}
                </div>
                <a
                  href={tool.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-yellow-500 hover:text-yellow-400 transition"
                >
                  <span className="text-sm">فتح الأداة</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </Card>
            ))}
          </div>
        </div>

        {/* أدوات الفيديو */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-6 text-purple-400">أدوات الفيديو المتقدمة</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {videoTools.map((tool, idx) => (
              <Card
                key={idx}
                className="bg-gradient-to-br from-purple-900/20 to-yellow-900/20 border-purple-600/30 p-6 hover:border-purple-500/60 transition group cursor-pointer"
              >
                <div className="text-4xl mb-3">{tool.icon}</div>
                <h3 className="text-lg font-bold text-purple-400 mb-2 group-hover:text-yellow-400 transition">
                  {tool.name}
                </h3>
                <p className="text-gray-400 text-sm mb-3">{tool.desc}</p>
                <div className="space-y-1 mb-4">
                  {tool.features.map((feature, i) => (
                    <p key={i} className="text-xs text-gray-500">✓ {feature}</p>
                  ))}
                </div>
                <a
                  href={tool.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-yellow-500 hover:text-yellow-400 transition"
                >
                  <span className="text-sm">فتح الأداة</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </Card>
            ))}
          </div>
        </div>

        {/* أدوات الخطوط */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-6 text-green-400">أدوات الخطوط والعبارات التسويقية</h2>
          <div className="grid md:grid-cols-1 gap-4">
            {fontTools.map((tool, idx) => (
              <Card
                key={idx}
                className="bg-gradient-to-br from-green-900/20 to-yellow-900/20 border-green-600/30 p-8 hover:border-green-500/60 transition group cursor-pointer"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="text-5xl mb-3">{tool.icon}</div>
                    <h3 className="text-2xl font-bold text-green-400 mb-2 group-hover:text-yellow-400 transition">
                      {tool.name}
                    </h3>
                    <p className="text-gray-400 text-lg mb-4">{tool.desc}</p>
                    <div className="space-y-2 mb-6">
                      {tool.features.map((feature, i) => (
                        <p key={i} className="text-gray-300">✓ {feature}</p>
                      ))}
                    </div>
                  </div>
                  <a
                    href={tool.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-green-500 to-yellow-500 text-black font-bold px-6 py-3 rounded-lg hover:opacity-90 transition"
                  >
                    <span>فتح الأداة</span>
                    <ExternalLink className="w-5 h-5" />
                  </a>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* نصائح الاستخدام */}
        <Card className="bg-gradient-to-br from-yellow-900/20 to-blue-900/20 border-yellow-600/30 p-8">
          <h2 className="text-2xl font-bold mb-6 text-yellow-400">نصائح الاستخدام الفعال</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-bold text-blue-400 mb-3">أدوات التصميم:</h3>
              <ul className="space-y-2 text-gray-300">
                <li>• استخدم Adobe Firefly للصور الذكية</li>
                <li>• Canva للتصاميم السريعة والاحترافية</li>
                <li>• Figma للتصاميم التعاونية المتقدمة</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-blue-400 mb-3">أدوات الفيديو:</h3>
              <ul className="space-y-2 text-gray-300">
                <li>• Midjourney للصور الفنية العالية الجودة</li>
                <li>• Runway ML لفيديوهات ذكية متقدمة</li>
                <li>• CapCut لتحرير الفيديو السريع</li>
              </ul>
            </div>
          </div>
        </Card>
      </div>
    </Layout>
  );
}
