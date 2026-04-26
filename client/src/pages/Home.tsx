import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { getLoginUrl } from "@/const";
import { Menu, X, ChevronRight, Star, Zap, BarChart3, MessageSquare, Users, Sparkles } from "lucide-react";
import { useState } from "react";

const LOGO_COMPRESSED = "https://d2xsxph8kpxj0f.cloudfront.net/310519663515036966/BCaYsJL3EqPnjYm7sbhATD/lmsah_rmuz_logo-j4rEZnmr846UjdNdns3mgx.webp";
const LOGO_HORIZONTAL = "https://d2xsxph8kpxj0f.cloudfront.net/310519663515036966/BCaYsJL3EqPnjYm7sbhATD/lmsah_rmuz_logo_horizontal-UFXid6XhEFWt8LLytzh9FT.webp";
const HERO_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663515036966/BCaYsJL3EqPnjYm7sbhATD/hero_background-F6pAggruhrnu29Pm3n2L8o.webp";
const SERVICE_ICONS = "https://d2xsxph8kpxj0f.cloudfront.net/310519663515036966/BCaYsJL3EqPnjYm7sbhATD/service_icons_pack-DT2rzk5fFzKfHQXLd6Jxui.webp";
const ROBOT_AVATAR = "https://d2xsxph8kpxj0f.cloudfront.net/310519663515036966/BCaYsJL3EqPnjYm7sbhATD/robot_avatar-LaDYgvNekHdDVzEMkkCJDV.webp";

export default function Home() {
  const { user, loading, isAuthenticated, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const services = [
    {
      title: "تحسين محرك البحث",
      description: "ظهور أول في جوجل وزيادة الزيارات العضوية",
      icon: "🔍"
    },
    {
      title: "الحملات الإعلانية",
      description: "إنشاء وإدارة حملات إعلانية احترافية",
      icon: "🎯"
    },
    {
      title: "إدارة السوشل ميديا",
      description: "إدارة شاملة لجميع منصات التواصل الاجتماعي",
      icon: "📱"
    },
    {
      title: "إنشاء المحتوى",
      description: "محتوى احترافي وجذاب لعلامتك التجارية",
      icon: "✨"
    },
    {
      title: "المتجر الإلكتروني",
      description: "بناء متجر احترافي من الصفر مع هوية بصرية",
      icon: "🛍️"
    },
    {
      title: "التقارير والبيانات",
      description: "تقارير مفصلة تظهر نمو متجرك",
      icon: "📊"
    }
  ];

  const features = [
    {
      title: "روبوت ذكي بالعربية الخليجية",
      description: "مساعدك الذكي يتحدث باللهجة الخليجية ويقدم الحلول والاستراتيجيات",
      icon: <Sparkles className="w-8 h-8" />
    },
    {
      title: "أدوات إبداع متقدمة",
      description: "صمم وأنتج محتواك بنفسك باستخدام أدوات الذكاء الاصطناعي",
      icon: <Zap className="w-8 h-8" />
    },
    {
      title: "تتبع شامل للإعلانات",
      description: "راقب أداء إعلاناتك وحملاتك بتفصيل دقيق",
      icon: <BarChart3 className="w-8 h-8" />
    },
    {
      title: "إدارة السلات المتروكة",
      description: "استعد العملاء الذين تركوا منتجات في السلة",
      icon: <MessageSquare className="w-8 h-8" />
    },
    {
      title: "برنامج الولاء",
      description: "احتفظ بعملائك مع برنامج ولاء احترافي",
      icon: <Star className="w-8 h-8" />
    },
    {
      title: "إدارة الموردين",
      description: "تواصل مع أفضل الموردين المحليين والعالميين",
      icon: <Users className="w-8 h-8" />
    }
  ];

  const pricingPlans = [
    {
      name: "الأساسي",
      price: "299",
      features: ["5 خدمات أساسية", "دعم البريد الإلكتروني", "تقارير شهرية", "14 يوم تجريبي مجاني"]
    },
    {
      name: "الاحترافي",
      price: "1,499",
      features: ["جميع الخدمات", "دعم أولويتي", "تقارير أسبوعية", "روبوت ذكي", "14 يوم تجريبي مجاني"],
      highlighted: true
    },
    {
      name: "الفخم",
      price: "8,900",
      features: ["جميع الخدمات + المزيد", "دعم 24/7", "تقارير يومية", "مدير حساب شخصي", "14 يوم تجريبي مجاني"]
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white" style={{ direction: "rtl" }}>
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-lg border-b border-yellow-600/20">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <img src={LOGO_COMPRESSED} alt="لمسة رموز" className="h-12 w-12" />
          
          {/* Desktop Menu */}
          <div className="hidden md:flex gap-8 items-center">
            <a href="/services" className="hover:text-yellow-500 transition">الخدمات</a>
            <a href="/chatbot" className="hover:text-yellow-500 transition">الروبوت الذكي</a>
            <a href="#features" className="hover:text-yellow-500 transition">المميزات</a>
            <a href="#pricing" className="hover:text-yellow-500 transition">الأسعار</a>
            <a href="#contact" className="hover:text-yellow-500 transition">التواصل</a>
          </div>

          <div className="hidden md:flex gap-4">
            {isAuthenticated ? (
              <>
                <span className="text-yellow-500">{user?.name}</span>
                <Button 
                  onClick={logout}
                  className="bg-yellow-600 hover:bg-yellow-700 text-black"
                >
                  تسجيل الخروج
                </Button>
              </>
            ) : (
              <Button 
                onClick={() => window.location.href = getLoginUrl()}
                className="bg-gradient-to-r from-yellow-500 to-blue-500 hover:from-yellow-600 hover:to-blue-600 text-black font-bold"
              >
                تسجيل الدخول
              </Button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-black/95 border-t border-yellow-600/20 p-4 space-y-4">
            <a href="/services" className="block hover:text-yellow-500">الخدمات</a>
            <a href="/chatbot" className="block hover:text-yellow-500">الروبوت الذكي</a>
            <a href="#features" className="block hover:text-yellow-500">المميزات</a>
            <a href="#pricing" className="block hover:text-yellow-500">الأسعار</a>
            <a href="#contact" className="block hover:text-yellow-500">التواصل</a>
            {isAuthenticated ? (
              <Button 
                onClick={logout}
                className="w-full bg-yellow-600 hover:bg-yellow-700 text-black"
              >
                تسجيل الخروج
              </Button>
            ) : (
              <Button 
                onClick={() => window.location.href = getLoginUrl()}
                className="w-full bg-gradient-to-r from-yellow-500 to-blue-500 text-black font-bold"
              >
                تسجيل الدخول
              </Button>
            )}
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section 
        className="pt-32 pb-20 relative overflow-hidden"
        style={{
          backgroundImage: `url(${HERO_BG})`,
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}
      >
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-yellow-400 to-blue-400 bg-clip-text text-transparent">
                لمسة رموز
              </h1>
              <p className="text-xl text-gray-300">
                منصة متخصصة لتقديم خدمات تسويقية رقمية متكاملة لتجار منصة سلة
              </p>
              <p className="text-lg text-gray-400">
                روبوت ذكي بالعربية الخليجية يقدم لك جميع الحلول والاستراتيجيات لنمو متجرك
              </p>
              <div className="flex gap-4 pt-4">
                <Button 
                  onClick={() => window.location.href = getLoginUrl()}
                  className="bg-gradient-to-r from-yellow-500 to-blue-500 hover:from-yellow-600 hover:to-blue-600 text-black font-bold text-lg px-8 py-6"
                >
                  ابدأ الآن - 14 يوم مجاني
                  <ChevronRight className="w-5 h-5 mr-2" />
                </Button>
                <Button 
                  variant="outline"
                  className="border-yellow-500 text-yellow-500 hover:bg-yellow-500/10 text-lg px-8 py-6"
                >
                  تعرف على المزيد
                </Button>
              </div>
            </div>
            <div className="flex justify-center">
              <img src={ROBOT_AVATAR} alt="الروبوت الذكي" className="w-full max-w-md drop-shadow-2xl" />
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-gradient-to-b from-black to-blue-950/20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-4 bg-gradient-to-r from-yellow-400 to-blue-400 bg-clip-text text-transparent">
            خدماتنا المتكاملة
          </h2>
          <p className="text-center text-gray-400 mb-12 max-w-2xl mx-auto">
            مجموعة شاملة من الخدمات التسويقية الرقمية المتخصصة لتجار منصة سلة
          </p>
          
          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, idx) => (
              <Card 
                key={idx}
                className="bg-gradient-to-br from-yellow-900/20 to-blue-900/20 border-yellow-600/30 hover:border-yellow-500/60 transition p-6 group"
              >
                <div className="text-5xl mb-4">{service.icon}</div>
                <h3 className="text-xl font-bold mb-2 group-hover:text-yellow-400 transition">
                  {service.title}
                </h3>
                <p className="text-gray-400">{service.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-black">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-4 bg-gradient-to-r from-yellow-400 to-blue-400 bg-clip-text text-transparent">
            المميزات الرئيسية
          </h2>
          <p className="text-center text-gray-400 mb-12 max-w-2xl mx-auto">
            أدوات وميزات متقدمة تساعدك على إدارة متجرك بكفاءة عالية
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, idx) => (
              <Card 
                key={idx}
                className="bg-gradient-to-br from-blue-900/20 to-yellow-900/20 border-blue-600/30 hover:border-blue-500/60 transition p-6"
              >
                <div className="text-yellow-500 mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-gradient-to-b from-black to-blue-950/20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-4 bg-gradient-to-r from-yellow-400 to-blue-400 bg-clip-text text-transparent">
            خطط الاشتراك
          </h2>
          <p className="text-center text-gray-400 mb-12 max-w-2xl mx-auto">
            اختر الخطة المناسبة لاحتياجات متجرك - جميع الخطط تشمل 14 يوم تجريبي مجاني
          </p>
          
          <div className="grid md:grid-cols-3 gap-8">
            {pricingPlans.map((plan, idx) => (
              <Card 
                key={idx}
                className={`p-8 transition transform hover:scale-105 ${
                  plan.highlighted 
                    ? "bg-gradient-to-br from-yellow-600/30 to-blue-600/30 border-yellow-500 ring-2 ring-yellow-500/50" 
                    : "bg-gradient-to-br from-yellow-900/10 to-blue-900/10 border-yellow-600/30"
                }`}
              >
                {plan.highlighted && (
                  <div className="bg-gradient-to-r from-yellow-500 to-blue-500 text-black px-3 py-1 rounded-full text-sm font-bold w-fit mb-4">
                    الأكثر شهرة
                  </div>
                )}
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-yellow-400">{plan.price}</span>
                  <span className="text-gray-400"> ريال/شهر</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, fidx) => (
                    <li key={fidx} className="flex items-center gap-2 text-gray-300">
                      <span className="text-yellow-500">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button 
                  onClick={() => window.location.href = getLoginUrl()}
                  className={`w-full py-6 font-bold text-lg ${
                    plan.highlighted
                      ? "bg-gradient-to-r from-yellow-500 to-blue-500 hover:from-yellow-600 hover:to-blue-600 text-black"
                      : "bg-yellow-600 hover:bg-yellow-700 text-black"
                  }`}
                >
                  ابدأ الآن
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-black border-t border-yellow-600/20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-4 bg-gradient-to-r from-yellow-400 to-blue-400 bg-clip-text text-transparent">
            تواصل معنا
          </h2>
          <p className="text-center text-gray-400 mb-12">
            نحن هنا لمساعدتك في كل خطوة من خطوات رحلتك
          </p>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto">
            <Card className="bg-gradient-to-br from-yellow-900/20 to-blue-900/20 border-yellow-600/30 p-8 text-center">
              <div className="text-4xl mb-4">📧</div>
              <h3 className="text-xl font-bold mb-2">البريد الإلكتروني</h3>
              <p className="text-yellow-400 font-semibold">zoooz2426@gmail.com</p>
            </Card>
            
            <Card className="bg-gradient-to-br from-blue-900/20 to-yellow-900/20 border-blue-600/30 p-8 text-center">
              <div className="text-4xl mb-4">💬</div>
              <h3 className="text-xl font-bold mb-2">واتس آب</h3>
              <p className="text-blue-400 font-semibold">0508047159</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black/80 border-t border-yellow-600/20 py-8">
        <div className="container mx-auto px-4 text-center text-gray-400">
          <p>© 2026 لمسة رموز - جميع الحقوق محفوظة</p>
          <p className="mt-2 text-sm">متخصصون في خدمات التسويق الرقمي لتجار منصة سلة</p>
        </div>
      </footer>
    </div>
  );
}
