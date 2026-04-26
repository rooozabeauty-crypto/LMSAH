import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { getLoginUrl } from "@/const";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const LOGO_COMPRESSED = "https://d2xsxph8kpxj0f.cloudfront.net/310519663515036966/BCaYsJL3EqPnjYm7sbhATD/lmsah_rmuz_logo-j4rEZnmr846UjdNdns3mgx.webp";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const { user, isAuthenticated, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-black text-white" style={{ direction: "rtl" }}>
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-lg border-b border-yellow-600/20">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <a href="/" className="flex items-center gap-2">
            <img src={LOGO_COMPRESSED} alt="لمسة رموز" className="h-12 w-12" />
          </a>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex gap-6 items-center text-sm">
            <a href="/" className="hover:text-yellow-500 transition">الرئيسية</a>
            <a href="/services" className="hover:text-yellow-500 transition">الخدمات</a>
            <a href="/chatbot" className="hover:text-yellow-500 transition">الروبوت</a>
            <div className="relative group">
              <button className="hover:text-yellow-500 transition">الأدوات</button>
              <div className="absolute hidden group-hover:block bg-black/95 border border-yellow-600/30 rounded-lg py-2 w-40 z-50">
                <a href="/creative" className="block px-4 py-2 hover:text-yellow-500">الإبداع</a>
                <a href="/abandoned-carts" className="block px-4 py-2 hover:text-yellow-500">السلات المتروكة</a>
                <a href="/ad-tracking" className="block px-4 py-2 hover:text-yellow-500">تتبع الإعلانات</a>
                <a href="/cashback" className="block px-4 py-2 hover:text-yellow-500">الكاش باك</a>
                <a href="/loyalty" className="block px-4 py-2 hover:text-yellow-500">الولاء</a>
              </div>
            </div>
            <a href="/influencers" className="hover:text-yellow-500 transition">المؤثرين</a>
            <a href="/suppliers" className="hover:text-yellow-500 transition">الموردين</a>
            <a href="/support" className="hover:text-yellow-500 transition">الدعم</a>
            <a href="/plans" className="hover:text-yellow-500 transition font-bold text-yellow-400">خطط الاشتراك</a>
            <a href="/admin-dashboard" className="hover:text-yellow-500 transition">لوحة التحكم</a>
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
            <a href="/" className="block hover:text-yellow-500">الرئيسية</a>
            <a href="/services" className="block hover:text-yellow-500">الخدمات</a>
            <a href="/chatbot" className="block hover:text-yellow-500">الروبوت</a>
            <a href="/creative" className="block hover:text-yellow-500">الإبداع</a>
            <a href="/abandoned-carts" className="block hover:text-yellow-500">السلات المتروكة</a>
            <a href="/ad-tracking" className="block hover:text-yellow-500">تتبع الإعلانات</a>
            <a href="/cashback" className="block hover:text-yellow-500">الكاش باك</a>
            <a href="/loyalty" className="block hover:text-yellow-500">الولاء</a>
            <a href="/influencers" className="block hover:text-yellow-500">المؤثرين</a>
            <a href="/suppliers" className="block hover:text-yellow-500">الموردين</a>
            <a href="/support" className="block hover:text-yellow-500">الدعم</a>
            <a href="/plans" className="block hover:text-yellow-500 font-bold text-yellow-400">خطط الاشتراك</a>
            <a href="/admin-dashboard" className="hover:text-yellow-500 transition">لوحة التحكم</a>
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

      {/* Main Content */}
      <main className="pt-20">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-black/80 border-t border-yellow-600/20 py-8 mt-20">
        <div className="container mx-auto px-4 text-center text-gray-400">
          <p>© 2026 لمسة رموز - جميع الحقوق محفوظة</p>
          <p className="mt-2 text-sm">متخصصون في خدمات التسويق الرقمي لتجار منصة سلة</p>
        </div>
      </footer>
    </div>
  );
}
