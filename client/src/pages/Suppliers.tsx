import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Phone, MessageCircle, MapPin, Search } from "lucide-react";
import { useState } from "react";
import Layout from "@/components/Layout";

interface Supplier {
  id: string;
  name: string;
  category: string;
  phone: string;
  whatsapp: string;
  location: string;
  products: string;
  rating: number;
}

const suppliers: Supplier[] = [
  {
    id: "1",
    name: "مصنع النجاح للملابس",
    category: "ملابس وأزياء",
    phone: "0501234567",
    whatsapp: "0501234567",
    location: "الرياض",
    products: "ملابس رجالي، نسائي، أطفال",
    rating: 4.8
  },
  {
    id: "2",
    name: "إلكترونيات الخليج",
    category: "إلكترونيات",
    phone: "0502345678",
    whatsapp: "0502345678",
    location: "جدة",
    products: "هواتف، أجهزة كمبيوتر، إكسسوارات",
    rating: 4.6
  },
  {
    id: "3",
    name: "مستحضرات العناية الطبيعية",
    category: "مستحضرات عناية",
    phone: "0503456789",
    whatsapp: "0503456789",
    location: "الدمام",
    products: "مستحضرات عناية بالبشرة، الشعر، الجسم",
    rating: 4.9
  },
  {
    id: "4",
    name: "الأثاث الفاخر",
    category: "أثاث وديكور",
    phone: "0504567890",
    whatsapp: "0504567890",
    location: "الرياض",
    products: "أثاث منزلي، ديكور، إضاءة",
    rating: 4.7
  },
  {
    id: "5",
    name: "مصنع الحلويات والمعجنات",
    category: "غذائي",
    phone: "0505678901",
    whatsapp: "0505678901",
    location: "مكة",
    products: "حلويات، معجنات، مخبوزات",
    rating: 4.9
  },
  {
    id: "6",
    name: "الرياضة والنشاط",
    category: "رياضة وأدوات",
    phone: "0506789012",
    whatsapp: "0506789012",
    location: "الرياض",
    products: "ملابس رياضية، أحذية، معدات",
    rating: 4.5
  }
];

export default function Suppliers() {
  const { isAuthenticated } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("الكل");

  const categories = ["الكل", "ملابس وأزياء", "إلكترونيات", "مستحضرات عناية", "أثاث وديكور", "غذائي", "رياضة وأدوات"];

  const filteredSuppliers = suppliers.filter(supplier => {
    const matchesSearch = supplier.name.includes(searchTerm) || supplier.products.includes(searchTerm);
    const matchesCategory = selectedCategory === "الكل" || supplier.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  if (!isAuthenticated) {
    return (
      <Layout>
        <div className="max-w-2xl mx-auto p-6">
          <Card className="bg-gradient-to-br from-yellow-900/20 to-blue-900/20 border-yellow-600/30 p-8 text-center">
            <h1 className="text-2xl font-bold mb-4 text-yellow-400">يجب تسجيل الدخول</h1>
            <p className="text-gray-400 mb-6">يرجى تسجيل الدخول للوصول إلى قائمة الموردين</p>
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
            شبكة الموردين
          </h1>
          <p className="text-gray-400 text-lg">
            تواصل مع أفضل الموردين المحليين والعالميين للمنتجات المختلفة
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-8 space-y-4">
          <div className="relative">
            <Search className="absolute right-4 top-3 text-gray-500 w-5 h-5" />
            <Input
              type="text"
              placeholder="ابحث عن مورد أو منتج..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-blue-900/30 border-blue-600/30 text-white placeholder-gray-500 pr-10"
            />
          </div>

          <div className="flex gap-2 overflow-x-auto pb-2">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg whitespace-nowrap transition ${
                  selectedCategory === category
                    ? "bg-gradient-to-r from-yellow-500 to-blue-500 text-black font-bold"
                    : "bg-blue-900/30 border border-blue-600/30 text-gray-300 hover:border-blue-500/60"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Suppliers Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSuppliers.map(supplier => (
            <Card
              key={supplier.id}
              className="bg-gradient-to-br from-yellow-900/20 to-blue-900/20 border-yellow-600/30 p-6 hover:border-yellow-500/60 transition"
            >
              <div className="mb-4">
                <h3 className="text-xl font-bold mb-2 text-yellow-400">{supplier.name}</h3>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-yellow-500">★</span>
                  <span className="text-sm text-gray-300">{supplier.rating} / 5</span>
                </div>
              </div>

              <div className="space-y-2 mb-4 text-sm text-gray-300">
                <div className="flex items-start gap-2">
                  <span className="text-blue-400 mt-1">📦</span>
                  <span>{supplier.products}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-blue-400" />
                  <span>{supplier.location}</span>
                </div>
              </div>

              <div className="space-y-2">
                <Button
                  onClick={() => window.open(`tel:${supplier.phone}`)}
                  className="w-full bg-blue-600/50 hover:bg-blue-600 text-white flex items-center justify-center gap-2"
                >
                  <Phone className="w-4 h-4" />
                  اتصال
                </Button>
                <Button
                  onClick={() => window.open(`https://wa.me/${supplier.whatsapp.replace(/[^0-9]/g, '')}`)}
                  className="w-full bg-green-600/50 hover:bg-green-600 text-white flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  واتس آب
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {filteredSuppliers.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">لم يتم العثور على موردين</p>
          </div>
        )}
      </div>
    </Layout>
  );
}
