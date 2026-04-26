import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Play, Download, Plus, Trash2, Eye, ExternalLink, Zap } from "lucide-react";
import Layout from "@/components/Layout";

interface Video {
  id: string;
  title: string;
  description: string;
  tool: string;
  duration: string;
  status: "جاهز" | "قيد المعالجة" | "خطأ";
  createdAt: string;
}

export default function VideoGenerator() {
  const [videos, setVideos] = useState<Video[]>([
    {
      id: "1",
      title: "إعلان المنتج الجديد",
      description: "فيديو ترويجي احترافي للمنتج الجديد",
      tool: "Runway ML",
      duration: "30 ثانية",
      status: "جاهز",
      createdAt: "2026-04-26"
    },
    {
      id: "2",
      title: "شرح الخدمة",
      description: "فيديو شرح تفصيلي للخدمة",
      tool: "CapCut",
      duration: "2 دقيقة",
      status: "جاهز",
      createdAt: "2026-04-25"
    }
  ]);

  const [showNewVideo, setShowNewVideo] = useState(false);
  const [newVideo, setNewVideo] = useState({
    title: "",
    description: "",
    tool: "Runway ML",
    duration: "30"
  });

  const videoTools = [
    {
      name: "Midjourney",
      icon: "🌌",
      desc: "مولد صور ذكي متقدم جداً - مثالي لإنشاء صور فنية عالية الجودة",
      url: "https://www.midjourney.com",
      features: [
        "صور احترافية بجودة عالية جداً",
        "أسلوب فني متقدم وفريد",
        "دقة عالية في التفاصيل",
        "قابل للتخصيص الكامل"
      ],
      useCases: ["الإعلانات", "المنتجات", "الخلفيات", "الفن"]
    },
    {
      name: "Runway ML",
      icon: "🎬",
      desc: "منصة إنتاج فيديو بالذكاء الاصطناعي - أداة قوية لإنشاء فيديوهات احترافية",
      url: "https://runwayml.com",
      features: [
        "فيديوهات ذكية من النصوص",
        "تأثيرات متقدمة وسلسة",
        "معالجة سريعة وفعالة",
        "جودة سينمائية احترافية"
      ],
      useCases: ["الإعلانات", "الشروحات", "المقدمات", "الانتقالات"]
    },
    {
      name: "CapCut",
      icon: "✂️",
      desc: "محرر فيديو قوي وسهل - أداة احترافية لتحرير وإنتاج الفيديوهات",
      url: "https://www.capcut.com",
      features: [
        "تحرير احترافي وسهل الاستخدام",
        "مؤثرات صوتية وموسيقى",
        "انتقالات سلسة وجميلة",
        "مكتبة ضخمة من المؤثرات"
      ],
      useCases: ["المقاطع القصيرة", "الشروحات", "الإعلانات", "المحتوى الاجتماعي"]
    }
  ];

  const handleAddVideo = () => {
    if (!newVideo.title.trim() || !newVideo.description.trim()) {
      alert("يرجى ملء جميع الحقول");
      return;
    }

    const video: Video = {
      id: Date.now().toString(),
      ...newVideo,
      duration: `${newVideo.duration} ثانية`,
      status: "قيد المعالجة",
      createdAt: new Date().toLocaleDateString("ar-SA")
    };

    setVideos([video, ...videos]);
    setNewVideo({
      title: "",
      description: "",
      tool: "Runway ML",
      duration: "30"
    });
    setShowNewVideo(false);

    // محاكاة معالجة الفيديو
    setTimeout(() => {
      setVideos(prev =>
        prev.map(v => v.id === video.id ? { ...v, status: "جاهز" } : v)
      );
    }, 3000);
  };

  const handleDeleteVideo = (id: string) => {
    setVideos(videos.filter(v => v.id !== id));
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto p-6" style={{ direction: "rtl" }}>
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            مولد الفيديوهات الذكي
          </h1>
          <p className="text-gray-400 text-lg">
            أنشئ فيديوهات احترافية باستخدام أفضل أدوات الذكاء الاصطناعي
          </p>
        </div>

        {/* الفيديوهات الحالية */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-purple-400">الفيديوهات المنتجة</h2>
            <Button
              onClick={() => setShowNewVideo(true)}
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold px-6 py-2"
            >
              <Plus className="w-5 h-5 ml-2" />
              فيديو جديد
            </Button>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {videos.map(video => (
              <Card
                key={video.id}
                className="bg-gradient-to-br from-purple-900/20 to-pink-900/20 border-purple-600/30 p-6 hover:border-purple-500/60 transition"
              >
                <div className="bg-black/50 h-40 rounded-lg mb-4 flex items-center justify-center">
                  <Play className="w-12 h-12 text-purple-400" />
                </div>
                <div className="space-y-2 mb-4">
                  <h3 className="text-lg font-bold text-white">{video.title}</h3>
                  <p className="text-gray-400 text-sm">{video.description}</p>
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>الأداة: <span className="text-purple-400">{video.tool}</span></span>
                    <span>المدة: {video.duration}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-400">التاريخ: {video.createdAt}</span>
                    <span className={`font-bold ${
                      video.status === "جاهز" ? "text-green-400" :
                      video.status === "قيد المعالجة" ? "text-yellow-400" :
                      "text-red-400"
                    }`}>
                      {video.status}
                    </span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" className="bg-purple-600 hover:bg-purple-700 flex-1">
                    <Eye className="w-4 h-4 ml-2" />
                    معاينة
                  </Button>
                  <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                    <Download className="w-4 h-4" />
                  </Button>
                  <Button
                    onClick={() => handleDeleteVideo(video.id)}
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

        {/* إضافة فيديو جديد */}
        {showNewVideo && (
          <Card className="bg-gradient-to-br from-purple-900/20 to-pink-900/20 border-purple-600/30 p-8 mb-8">
            <h2 className="text-2xl font-bold mb-6 text-purple-400">إنشاء فيديو جديد</h2>
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-2">عنوان الفيديو</label>
                  <Input
                    type="text"
                    placeholder="مثال: إعلان المنتج الجديد"
                    value={newVideo.title}
                    onChange={(e) => setNewVideo({ ...newVideo, title: e.target.value })}
                    className="bg-black/50 border-purple-600/30 text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">مدة الفيديو (ثانية)</label>
                  <Input
                    type="number"
                    placeholder="30"
                    value={newVideo.duration}
                    onChange={(e) => setNewVideo({ ...newVideo, duration: e.target.value })}
                    className="bg-black/50 border-purple-600/30 text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-2">وصف الفيديو</label>
                <textarea
                  placeholder="أدخل وصف الفيديو والمحتوى المطلوب"
                  value={newVideo.description}
                  onChange={(e) => setNewVideo({ ...newVideo, description: e.target.value })}
                  className="w-full bg-black/50 border border-purple-600/30 text-white rounded-lg p-3 h-24"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-2">اختر الأداة</label>
                <select
                  value={newVideo.tool}
                  onChange={(e) => setNewVideo({ ...newVideo, tool: e.target.value })}
                  className="w-full bg-black/50 border border-purple-600/30 text-white rounded-lg p-2"
                >
                  <option value="Midjourney">Midjourney - صور ذكية</option>
                  <option value="Runway ML">Runway ML - فيديوهات ذكية</option>
                  <option value="CapCut">CapCut - تحرير احترافي</option>
                </select>
              </div>

              <div className="flex gap-4">
                <Button
                  onClick={handleAddVideo}
                  className="bg-green-600 hover:bg-green-700 text-white font-bold px-8 py-3"
                >
                  <Zap className="w-5 h-5 ml-2" />
                  إنشاء الفيديو
                </Button>
                <Button
                  onClick={() => setShowNewVideo(false)}
                  className="bg-gray-600 hover:bg-gray-700 text-white px-8 py-3"
                >
                  إلغاء
                </Button>
              </div>
            </div>
          </Card>
        )}

        {/* أدوات الفيديو */}
        <h2 className="text-2xl font-bold mb-6 text-purple-400">أدوات الفيديو المتاحة</h2>
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {videoTools.map((tool, idx) => (
            <Card
              key={idx}
              className="bg-gradient-to-br from-purple-900/20 to-pink-900/20 border-purple-600/30 p-6 hover:border-purple-500/60 transition group"
            >
              <div className="text-5xl mb-3">{tool.icon}</div>
              <h3 className="text-xl font-bold text-purple-400 mb-2 group-hover:text-pink-400 transition">
                {tool.name}
              </h3>
              <p className="text-gray-400 text-sm mb-4">{tool.desc}</p>

              <div className="mb-4">
                <p className="text-xs text-gray-500 font-bold mb-2">الميزات:</p>
                <ul className="space-y-1">
                  {tool.features.map((feature, i) => (
                    <li key={i} className="text-xs text-gray-400">✓ {feature}</li>
                  ))}
                </ul>
              </div>

              <div className="mb-4 pb-4 border-b border-purple-600/30">
                <p className="text-xs text-gray-500 font-bold mb-2">الاستخدامات:</p>
                <div className="flex flex-wrap gap-1">
                  {tool.useCases.map((useCase, i) => (
                    <span key={i} className="text-xs bg-purple-600/20 text-purple-300 px-2 py-1 rounded">
                      {useCase}
                    </span>
                  ))}
                </div>
              </div>

              <a
                href={tool.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold px-4 py-2 rounded-lg hover:opacity-90 transition w-full justify-center"
              >
                <span>فتح الأداة</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </Card>
          ))}
        </div>

        {/* نصائح الاستخدام */}
        <Card className="bg-gradient-to-br from-purple-900/20 to-pink-900/20 border-purple-600/30 p-8">
          <h2 className="text-2xl font-bold mb-6 text-purple-400">نصائح لإنتاج فيديوهات احترافية</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <h3 className="font-bold text-pink-400 mb-3">Midjourney</h3>
              <ul className="space-y-2 text-gray-300 text-sm">
                <li>• استخدم أوصاف تفصيلية للحصول على أفضل النتائج</li>
                <li>• جرب أساليب فنية مختلفة</li>
                <li>• استخدم الكلمات الإنجليزية للدقة</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-pink-400 mb-3">Runway ML</h3>
              <ul className="space-y-2 text-gray-300 text-sm">
                <li>• اكتب نصوص واضحة ومختصرة</li>
                <li>• حدد نوع الفيديو المطلوب</li>
                <li>• راقب معدل المعالجة والجودة</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-pink-400 mb-3">CapCut</h3>
              <ul className="space-y-2 text-gray-300 text-sm">
                <li>• استخدم الانتقالات بحكمة</li>
                <li>• أضف موسيقى خلفية مناسبة</li>
                <li>• اختبر على أجهزة مختلفة</li>
              </ul>
            </div>
          </div>
        </Card>
      </div>
    </Layout>
  );
}
