import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Copy, Download, Plus, Trash2, Eye, ExternalLink, RefreshCw } from "lucide-react";
import Layout from "@/components/Layout";

interface FontCombination {
  id: string;
  heading: string;
  body: string;
  accent: string;
  tagline: string;
  category: string;
  createdAt: string;
}

export default function FontGenerator() {
  const [combinations, setCombinations] = useState<FontCombination[]>([
    {
      id: "1",
      heading: "Montserrat Bold",
      body: "Open Sans Regular",
      accent: "Playfair Display",
      tagline: "حلول تسويقية احترافية لمتجرك",
      category: "عصري",
      createdAt: "2026-04-26"
    },
    {
      id: "2",
      heading: "Poppins Bold",
      body: "Lato Regular",
      accent: "Raleway",
      tagline: "نمو متجرك يبدأ من هنا",
      category: "فخم",
      createdAt: "2026-04-25"
    }
  ]);

  const [showNewCombination, setShowNewCombination] = useState(false);
  const [newCombination, setNewCombination] = useState({
    heading: "Montserrat",
    body: "Open Sans",
    accent: "Playfair Display",
    tagline: "",
    category: "عصري"
  });

  const [copiedId, setCopiedId] = useState<string | null>(null);

  const fontJoyInfo = {
    name: "Fontjoy",
    icon: "🔤",
    desc: "مولد خطوط وعبارات تسويقية ذكي",
    url: "https://fontjoy.com",
    features: [
      "اقتراح خطوط متناسقة تلقائياً",
      "عبارات تسويقية احترافية",
      "اختبار الخطوط على النصوص",
      "تحميل الخطوط مباشرة"
    ],
    benefits: [
      "توفير الوقت في اختيار الخطوط",
      "تصاميم احترافية وجذابة",
      "تناسق بصري مثالي",
      "تحسين تجربة المستخدم"
    ]
  };

  const popularFonts = [
    { name: "Montserrat", category: "عناوين", style: "عصري وجريء" },
    { name: "Open Sans", category: "نصوص", style: "واضح وسهل القراءة" },
    { name: "Playfair Display", category: "عناوين فخمة", style: "فخم وأنيق" },
    { name: "Poppins", category: "عناوين", style: "حديث وودود" },
    { name: "Lato", category: "نصوص", style: "متوازن وقابل للقراءة" },
    { name: "Raleway", category: "عناوين", style: "أنيق وخفيف" },
    { name: "Roboto", category: "نصوص", style: "احترافي وحيادي" },
    { name: "Merriweather", category: "نصوص", style: "كلاسيكي وفخم" }
  ];

  const marketingPhrases = [
    "حلول تسويقية احترافية لمتجرك",
    "نمو متجرك يبدأ من هنا",
    "استراتيجيات تسويقية ذكية وفعالة",
    "من الصفر إلى النجاح",
    "دعك من القلق، نحن معك",
    "متجرك يستحق الأفضل",
    "تسويق ذكي، نتائج حقيقية",
    "خدمات تسويقية شاملة ومتكاملة",
    "نجاح متجرك أولويتنا",
    "استثمر في نمو متجرك اليوم"
  ];

  const handleAddCombination = () => {
    if (!newCombination.tagline.trim()) {
      alert("يرجى إدخال عبارة تسويقية");
      return;
    }

    const combination: FontCombination = {
      id: Date.now().toString(),
      ...newCombination,
      createdAt: new Date().toLocaleDateString("ar-SA")
    };

    setCombinations([combination, ...combinations]);
    setNewCombination({
      heading: "Montserrat",
      body: "Open Sans",
      accent: "Playfair Display",
      tagline: "",
      category: "عصري"
    });
    setShowNewCombination(false);
  };

  const handleDeleteCombination = (id: string) => {
    setCombinations(combinations.filter(c => c.id !== id));
  };

  const handleCopyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto p-6" style={{ direction: "rtl" }}>
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
            مولد الخطوط والعبارات التسويقية
          </h1>
          <p className="text-gray-400 text-lg">
            أنشئ مجموعات خطوط احترافية مع عبارات تسويقية جذابة
          </p>
        </div>

        {/* معلومات Fontjoy */}
        <Card className="bg-gradient-to-br from-green-900/20 to-blue-900/20 border-green-600/30 p-8 mb-8">
          <div className="flex items-start justify-between">
            <div>
              <div className="text-6xl mb-4">{fontJoyInfo.icon}</div>
              <h2 className="text-3xl font-bold text-green-400 mb-2">{fontJoyInfo.name}</h2>
              <p className="text-gray-400 text-lg mb-6">{fontJoyInfo.desc}</p>

              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-bold text-blue-400 mb-3">الميزات:</h3>
                  <ul className="space-y-2">
                    {fontJoyInfo.features.map((feature, i) => (
                      <li key={i} className="text-gray-300">✓ {feature}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="font-bold text-blue-400 mb-3">الفوائد:</h3>
                  <ul className="space-y-2">
                    {fontJoyInfo.benefits.map((benefit, i) => (
                      <li key={i} className="text-gray-300">✓ {benefit}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            <a
              href={fontJoyInfo.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-green-500 to-blue-500 text-black font-bold px-8 py-4 rounded-lg hover:opacity-90 transition whitespace-nowrap"
            >
              <span>فتح Fontjoy</span>
              <ExternalLink className="w-5 h-5" />
            </a>
          </div>
        </Card>

        {/* مجموعات الخطوط الحالية */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-green-400">مجموعات الخطوط المحفوظة</h2>
            <Button
              onClick={() => setShowNewCombination(true)}
              className="bg-gradient-to-r from-green-500 to-blue-500 text-black font-bold px-6 py-2"
            >
              <Plus className="w-5 h-5 ml-2" />
              مجموعة جديدة
            </Button>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {combinations.map(combo => (
              <Card
                key={combo.id}
                className="bg-gradient-to-br from-green-900/20 to-blue-900/20 border-green-600/30 p-6 hover:border-green-500/60 transition"
              >
                <div className="mb-4">
                  <div className="bg-black/50 p-4 rounded-lg mb-3">
                    <p style={{ fontFamily: "'Montserrat', sans-serif" }} className="text-2xl font-bold text-green-400 mb-2">
                      {combo.tagline}
                    </p>
                    <p className="text-xs text-gray-500">العنوان: {combo.heading}</p>
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">النص الأساسي:</span>
                      <span className="text-blue-400">{combo.body}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">الخط المميز:</span>
                      <span className="text-blue-400">{combo.accent}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">الفئة:</span>
                      <span className="text-green-400 font-semibold">{combo.category}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">التاريخ:</span>
                      <span className="text-gray-500">{combo.createdAt}</span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button
                    onClick={() => handleCopyToClipboard(combo.tagline, combo.id)}
                    size="sm"
                    className="bg-blue-600 hover:bg-blue-700 flex-1"
                  >
                    <Copy className="w-4 h-4 ml-2" />
                    {copiedId === combo.id ? "تم النسخ" : "نسخ"}
                  </Button>
                  <Button size="sm" className="bg-green-600 hover:bg-green-700">
                    <Download className="w-4 h-4" />
                  </Button>
                  <Button
                    onClick={() => handleDeleteCombination(combo.id)}
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

        {/* إضافة مجموعة جديدة */}
        {showNewCombination && (
          <Card className="bg-gradient-to-br from-green-900/20 to-blue-900/20 border-green-600/30 p-8 mb-8">
            <h2 className="text-2xl font-bold mb-6 text-green-400">إنشاء مجموعة خطوط جديدة</h2>
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-2">خط العنوان</label>
                  <select
                    value={newCombination.heading}
                    onChange={(e) => setNewCombination({ ...newCombination, heading: e.target.value })}
                    className="w-full bg-black/50 border border-green-600/30 text-white rounded-lg p-2"
                  >
                    {popularFonts.filter(f => f.category.includes("عنوان")).map((font, i) => (
                      <option key={i} value={font.name}>{font.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm text-gray-400 mb-2">خط النص الأساسي</label>
                  <select
                    value={newCombination.body}
                    onChange={(e) => setNewCombination({ ...newCombination, body: e.target.value })}
                    className="w-full bg-black/50 border border-green-600/30 text-white rounded-lg p-2"
                  >
                    {popularFonts.filter(f => f.category.includes("نصوص")).map((font, i) => (
                      <option key={i} value={font.name}>{font.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm text-gray-400 mb-2">الخط المميز</label>
                  <select
                    value={newCombination.accent}
                    onChange={(e) => setNewCombination({ ...newCombination, accent: e.target.value })}
                    className="w-full bg-black/50 border border-green-600/30 text-white rounded-lg p-2"
                  >
                    {popularFonts.map((font, i) => (
                      <option key={i} value={font.name}>{font.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm text-gray-400 mb-2">الفئة</label>
                  <select
                    value={newCombination.category}
                    onChange={(e) => setNewCombination({ ...newCombination, category: e.target.value })}
                    className="w-full bg-black/50 border border-green-600/30 text-white rounded-lg p-2"
                  >
                    <option value="عصري">عصري</option>
                    <option value="فخم">فخم</option>
                    <option value="احترافي">احترافي</option>
                    <option value="إبداعي">إبداعي</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-2">العبارة التسويقية</label>
                <div className="space-y-2 mb-3">
                  <textarea
                    placeholder="أدخل عبارة تسويقية جذابة"
                    value={newCombination.tagline}
                    onChange={(e) => setNewCombination({ ...newCombination, tagline: e.target.value })}
                    className="w-full bg-black/50 border border-green-600/30 text-white rounded-lg p-3 h-20"
                  />
                  <p className="text-xs text-gray-500">أو اختر من الاقتراحات:</p>
                  <div className="flex flex-wrap gap-2">
                    {marketingPhrases.slice(0, 5).map((phrase, i) => (
                      <button
                        key={i}
                        onClick={() => setNewCombination({ ...newCombination, tagline: phrase })}
                        className="text-xs bg-green-600/20 text-green-300 px-2 py-1 rounded hover:bg-green-600/40 transition"
                      >
                        {phrase}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <Button
                  onClick={handleAddCombination}
                  className="bg-green-600 hover:bg-green-700 text-white font-bold px-8 py-3"
                >
                  <Plus className="w-5 h-5 ml-2" />
                  إنشاء المجموعة
                </Button>
                <Button
                  onClick={() => setShowNewCombination(false)}
                  className="bg-gray-600 hover:bg-gray-700 text-white px-8 py-3"
                >
                  إلغاء
                </Button>
              </div>
            </div>
          </Card>
        )}

        {/* الخطوط الشهيرة */}
        <h2 className="text-2xl font-bold mb-6 text-green-400">الخطوط الشهيرة والموصى بها</h2>
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          {popularFonts.map((font, idx) => (
            <Card
              key={idx}
              className="bg-gradient-to-br from-green-900/20 to-blue-900/20 border-green-600/30 p-4 hover:border-green-500/60 transition"
            >
              <p className="text-sm font-bold text-green-400 mb-2">{font.name}</p>
              <p className="text-xs text-gray-400 mb-2">{font.category}</p>
              <p className="text-xs text-gray-500">{font.style}</p>
            </Card>
          ))}
        </div>

        {/* عبارات تسويقية */}
        <Card className="bg-gradient-to-br from-green-900/20 to-blue-900/20 border-green-600/30 p-8">
          <h2 className="text-2xl font-bold mb-6 text-green-400">عبارات تسويقية احترافية</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {marketingPhrases.map((phrase, idx) => (
              <div
                key={idx}
                className="bg-black/50 p-4 rounded-lg flex justify-between items-center hover:border-l-4 hover:border-green-500 transition"
              >
                <p className="text-white">{phrase}</p>
                <button
                  onClick={() => handleCopyToClipboard(phrase, `phrase-${idx}`)}
                  className="text-green-400 hover:text-green-300 transition"
                >
                  <Copy className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </Layout>
  );
}
