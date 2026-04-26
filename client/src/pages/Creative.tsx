import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Palette, Video, Image, Sparkles } from "lucide-react";
import { useState } from "react";
import Layout from "@/components/Layout";

interface Tool {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  features: string[];
  status: "available" | "coming-soon";
}

const tools: Tool[] = [
  {
    id: "logo-designer",
    name: "مصمم الشعارات",
    description: "إنشاء شعارات احترافية بالذكاء الاصطناعي",
    icon: <Palette className="w-8 h-8" />,
    features: [
      "تصاميم احترافية فورية",
      "تخصيص الألوان والخطوط",
      "تحميل بصيغ متعددة",
      "تعديل غير محدود"
    ],
    status: "available"
  },
  {
    id: "video-creator",
    name: "منشئ الفيديوهات",
    description: "إنشاء فيديوهات تسويقية احترافية",
    icon: <Video className="w-8 h-8" />,
    features: [
      "قوالب جاهزة احترافية",
      "موسيقى وتأثيرات صوتية",
      "نصوص وحركات متقدمة",
      "تحميل بجودة عالية"
    ],
    status: "available"
  },
  {
    id: "image-editor",
    name: "محرر الصور",
    description: "تحرير وتحسين صور المنتجات",
    icon: <Image className="w-8 h-8" />,
    features: [
      "أدوات تحرير متقدمة",
      "فلاتر احترافية",
      "إزالة الخلفية تلقائياً",
      "تحسين الجودة بالذكاء الاصطناعي"
    ],
    status: "available"
  },
  {
    id: "ai-content",
    name: "مولد المحتوى بالذكاء الاصطناعي",
    description: "كتابة محتوى تسويقي احترافي",
    icon: <Sparkles className="w-8 h-8" />,
    features: [
      "كتابة نصوص تسويقية",
      "أوصاف منتجات جذابة",
      "منشورات السوشل ميديا",
      "رسائل بريدية احترافية"
    ],
    status: "coming-soon"
  }
];

export default function Creative() {
  const { isAuthenticated } = useAuth();
  const [selectedTool, setSelectedTool] = useState<Tool | null>(null);

  if (!isAuthenticated) {
    return (
      <Layout>
        <div className="max-w-2xl mx-auto p-6">
          <Card className="bg-gradient-to-br from-yellow-900/20 to-blue-900/20 border-yellow-600/30 p-8 text-center">
            <h1 className="text-2xl font-bold mb-4 text-yellow-400">يجب تسجيل الدخول</h1>
            <p className="text-gray-400 mb-6">يرجى تسجيل الدخول للوصول إلى أدوات الإبداع</p>
          </Card>
        </div>
      </Layout>
    );
  }

  if (selectedTool) {
    return (
      <Layout>
        <div className="max-w-4xl mx-auto p-6" style={{ direction: "rtl" }}>
          <button
            onClick={() => setSelectedTool(null)}
            className="mb-6 text-yellow-400 hover:text-yellow-300 flex items-center gap-2"
          >
            ← العودة
          </button>

          <div className="space-y-8">
            <div className="text-center">
              <div className="text-6xl mb-4 text-yellow-500">{selectedTool.icon}</div>
              <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-yellow-400 to-blue-400 bg-clip-text text-transparent">
                {selectedTool.name}
              </h1>
              <p className="text-gray-400 text-lg">{selectedTool.description}</p>
            </div>

            <Card className="bg-gradient-to-br from-yellow-900/20 to-blue-900/20 border-yellow-600/30 p-8">
              <h2 className="text-2xl font-bold mb-6 text-yellow-400">المميزات</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {selectedTool.features.map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <span className="text-yellow-500 mt-1">✓</span>
                    <span className="text-gray-300">{feature}</span>
                  </div>
                ))}
              </div>
            </Card>

            {selectedTool.status === "available" ? (
              <div className="space-y-4">
                <div className="bg-blue-900/30 border border-blue-600/30 rounded-lg p-6">
                  <h3 className="text-xl font-bold mb-4 text-blue-400">ابدأ الآن</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold mb-2 text-yellow-400">
                        اسم المشروع
                      </label>
                      <input
                        type="text"
                        placeholder="أدخل اسم مشروعك"
                        className="w-full bg-blue-900/30 border border-blue-600/30 text-white rounded-lg p-3"
                      />
                    </div>
                    <Button className="w-full bg-gradient-to-r from-yellow-500 to-blue-500 text-black font-bold py-3">
                      ابدأ التصميم الآن
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              <Card className="bg-yellow-600/20 border-yellow-600/30 p-6 text-center">
                <p className="text-yellow-400 font-bold">قريباً جداً!</p>
                <p className="text-gray-300 mt-2">هذه الأداة ستكون متاحة قريباً. ترقب الإطلاق!</p>
              </Card>
            )}
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-6xl mx-auto p-6" style={{ direction: "rtl" }}>
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-yellow-400 to-blue-400 bg-clip-text text-transparent">
            منصة الإبداع
          </h1>
          <p className="text-gray-400 text-lg">
            أدوات تصميم واحترافية بالذكاء الاصطناعي لإنشاء محتوى جذاب
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {tools.map(tool => (
            <Card
              key={tool.id}
              className="bg-gradient-to-br from-yellow-900/20 to-blue-900/20 border-yellow-600/30 hover:border-yellow-500/60 transition p-6 cursor-pointer group"
              onClick={() => setSelectedTool(tool)}
            >
              <div className="text-5xl mb-4 text-yellow-500 group-hover:text-yellow-400 transition">
                {tool.icon}
              </div>
              <h3 className="text-2xl font-bold mb-2 group-hover:text-yellow-400 transition">
                {tool.name}
              </h3>
              <p className="text-gray-400 mb-4">{tool.description}</p>

              <div className="space-y-2 mb-6">
                {tool.features.slice(0, 2).map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-sm text-gray-300">
                    <span className="text-yellow-500">•</span>
                    <span>{feature}</span>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">
                  {tool.features.length} مميزات
                </span>
                {tool.status === "coming-soon" ? (
                  <span className="text-xs bg-yellow-600/30 text-yellow-400 px-3 py-1 rounded">
                    قريباً
                  </span>
                ) : (
                  <span className="text-xs bg-green-600/30 text-green-400 px-3 py-1 rounded">
                    متاح الآن
                  </span>
                )}
              </div>
            </Card>
          ))}
        </div>

        <Card className="bg-gradient-to-br from-blue-900/20 to-yellow-900/20 border-blue-600/30 p-8 mt-12">
          <h2 className="text-2xl font-bold mb-4 text-blue-400">نصائح للحصول على أفضل النتائج</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <h3 className="font-bold mb-2 text-yellow-400">استخدم الألوان المناسبة</h3>
              <p className="text-sm text-gray-300">اختر ألوان تعكس هوية علامتك التجارية</p>
            </div>
            <div>
              <h3 className="font-bold mb-2 text-yellow-400">اجعل الرسالة واضحة</h3>
              <p className="text-sm text-gray-300">استخدم نصوص قصيرة وجذابة وسهلة الفهم</p>
            </div>
            <div>
              <h3 className="font-bold mb-2 text-yellow-400">اختبر على الأجهزة</h3>
              <p className="text-sm text-gray-300">تأكد من ظهور التصميم بشكل صحيح على جميع الأجهزة</p>
            </div>
          </div>
        </Card>
      </div>
    </Layout>
  );
}
