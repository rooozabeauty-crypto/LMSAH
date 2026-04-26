import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  BarChart3, Users, ShoppingCart, TrendingUp, Settings, Bell,
  Lock, Eye, EyeOff, Save, X, Plus, Trash2, Edit2, Download
} from "lucide-react";
import Layout from "@/components/Layout";

interface DashboardStats {
  totalUsers: number;
  totalRevenue: number;
  activeSubscriptions: number;
  totalOrders: number;
}

interface AdminSettings {
  siteName: string;
  siteEmail: string;
  supportPhone: string;
  currency: string;
  timezone: string;
  language: string;
  maintenanceMode: boolean;
  emailNotifications: boolean;
  smsNotifications: boolean;
  twoFactorAuth: boolean;
}

export default function AdminDashboard() {
  const [stats] = useState<DashboardStats>({
    totalUsers: 1250,
    totalRevenue: 125000,
    activeSubscriptions: 450,
    totalOrders: 3200
  });

  const [settings, setSettings] = useState<AdminSettings>({
    siteName: "لمسة رموز",
    siteEmail: "info@lmsah-rmuz.com",
    supportPhone: "0508047159",
    currency: "SAR",
    timezone: "Asia/Riyadh",
    language: "ar",
    maintenanceMode: false,
    emailNotifications: true,
    smsNotifications: true,
    twoFactorAuth: true
  });

  const [editingSettings, setEditingSettings] = useState(false);
  const [tempSettings, setTempSettings] = useState(settings);
  const [showPassword, setShowPassword] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");

  const handleSaveSettings = () => {
    setSettings(tempSettings);
    setEditingSettings(false);
    alert("تم حفظ الإعدادات بنجاح!");
  };

  const handleResetSettings = () => {
    setTempSettings(settings);
    setEditingSettings(false);
  };

  const [users, setUsers] = useState([
    { id: 1, name: "أحمد محمد", email: "ahmed@example.com", plan: "احترافية", status: "نشط" },
    { id: 2, name: "فاطمة علي", email: "fatima@example.com", plan: "أساسية", status: "نشط" },
    { id: 3, name: "محمود سالم", email: "mahmoud@example.com", plan: "متقدمة", status: "معلق" }
  ]);

  const [newUser, setNewUser] = useState({ name: "", email: "", plan: "أساسية" });
  const [showAddUser, setShowAddUser] = useState(false);

  const handleAddUser = () => {
    if (!newUser.name.trim() || !newUser.email.trim()) return;
    setUsers([...users, { id: users.length + 1, ...newUser, status: "نشط" }]);
    setNewUser({ name: "", email: "", plan: "أساسية" });
    setShowAddUser(false);
  };

  const handleDeleteUser = (id: number) => {
    setUsers(users.filter(u => u.id !== id));
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto p-6" style={{ direction: "rtl" }}>
        {/* رأس لوحة التحكم */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-yellow-400 to-blue-400 bg-clip-text text-transparent">
            لوحة التحكم الإدارية
          </h1>
          <p className="text-gray-400 text-lg">
            إدارة الموقع والمستخدمين والإعدادات
          </p>
        </div>

        {/* التبويبات */}
        <div className="flex gap-4 mb-8 border-b border-yellow-600/30 pb-4">
          {[
            { id: "overview", label: "نظرة عامة", icon: "📊" },
            { id: "users", label: "المستخدمون", icon: "👥" },
            { id: "settings", label: "الإعدادات", icon: "⚙️" },
            { id: "reports", label: "التقارير", icon: "📈" }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-bold transition ${
                activeTab === tab.id
                  ? "bg-gradient-to-r from-yellow-500 to-blue-500 text-black"
                  : "text-gray-400 hover:text-yellow-400"
              }`}
            >
              <span>{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>

        {/* تبويب النظرة العامة */}
        {activeTab === "overview" && (
          <div>
            <div className="grid md:grid-cols-4 gap-6 mb-8">
              <Card className="bg-gradient-to-br from-yellow-900/20 to-blue-900/20 border-yellow-600/30 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm mb-2">إجمالي المستخدمين</p>
                    <p className="text-3xl font-bold text-yellow-400">{stats.totalUsers.toLocaleString()}</p>
                  </div>
                  <Users className="w-12 h-12 text-yellow-500 opacity-20" />
                </div>
              </Card>

              <Card className="bg-gradient-to-br from-green-900/20 to-yellow-900/20 border-green-600/30 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm mb-2">الإيرادات الكلية</p>
                    <p className="text-3xl font-bold text-green-400">{stats.totalRevenue.toLocaleString()} ر.س</p>
                  </div>
                  <TrendingUp className="w-12 h-12 text-green-500 opacity-20" />
                </div>
              </Card>

              <Card className="bg-gradient-to-br from-blue-900/20 to-yellow-900/20 border-blue-600/30 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm mb-2">الاشتراكات النشطة</p>
                    <p className="text-3xl font-bold text-blue-400">{stats.activeSubscriptions.toLocaleString()}</p>
                  </div>
                  <ShoppingCart className="w-12 h-12 text-blue-500 opacity-20" />
                </div>
              </Card>

              <Card className="bg-gradient-to-br from-purple-900/20 to-yellow-900/20 border-purple-600/30 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm mb-2">إجمالي الطلبات</p>
                    <p className="text-3xl font-bold text-purple-400">{stats.totalOrders.toLocaleString()}</p>
                  </div>
                  <BarChart3 className="w-12 h-12 text-purple-500 opacity-20" />
                </div>
              </Card>
            </div>

            {/* رسم بياني بسيط */}
            <Card className="bg-gradient-to-br from-yellow-900/20 to-blue-900/20 border-yellow-600/30 p-8 mb-8">
              <h2 className="text-2xl font-bold mb-6 text-yellow-400">الإيرادات الشهرية</h2>
              <div className="h-64 flex items-end gap-4">
                {[45, 52, 48, 61, 55, 67, 72, 68, 75, 82, 88, 95].map((value, idx) => (
                  <div key={idx} className="flex-1 flex flex-col items-center">
                    <div
                      className="w-full bg-gradient-to-t from-yellow-500 to-blue-500 rounded-t-lg transition hover:opacity-80"
                      style={{ height: `${(value / 100) * 200}px` }}
                    />
                    <p className="text-xs text-gray-400 mt-2">شهر {idx + 1}</p>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        )}

        {/* تبويب المستخدمين */}
        {activeTab === "users" && (
          <div>
            <div className="mb-6">
              {!showAddUser ? (
                <Button
                  onClick={() => setShowAddUser(true)}
                  className="bg-gradient-to-r from-yellow-500 to-blue-500 text-black font-bold px-8 py-3"
                >
                  <Plus className="w-5 h-5 ml-2" />
                  إضافة مستخدم جديد
                </Button>
              ) : (
                <Card className="bg-gradient-to-br from-yellow-900/20 to-blue-900/20 border-yellow-600/30 p-6 mb-6">
                  <div className="space-y-4">
                    <div className="grid md:grid-cols-3 gap-4">
                      <Input
                        type="text"
                        placeholder="الاسم"
                        value={newUser.name}
                        onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                        className="bg-black/50 border-yellow-600/30 text-white"
                      />
                      <Input
                        type="email"
                        placeholder="البريد الإلكتروني"
                        value={newUser.email}
                        onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                        className="bg-black/50 border-yellow-600/30 text-white"
                      />
                      <select
                        value={newUser.plan}
                        onChange={(e) => setNewUser({ ...newUser, plan: e.target.value })}
                        className="bg-black/50 border border-yellow-600/30 text-white rounded-lg p-2"
                      >
                        <option value="أساسية">أساسية</option>
                        <option value="احترافية">احترافية</option>
                        <option value="متقدمة">متقدمة</option>
                      </select>
                    </div>
                    <div className="flex gap-4">
                      <Button
                        onClick={handleAddUser}
                        className="bg-green-600 hover:bg-green-700 text-white"
                      >
                        إضافة
                      </Button>
                      <Button
                        onClick={() => setShowAddUser(false)}
                        className="bg-gray-600 hover:bg-gray-700 text-white"
                      >
                        إلغاء
                      </Button>
                    </div>
                  </div>
                </Card>
              )}
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-yellow-600/30">
                    <th className="text-right p-4 text-yellow-400">الاسم</th>
                    <th className="text-right p-4 text-yellow-400">البريد الإلكتروني</th>
                    <th className="text-right p-4 text-yellow-400">الخطة</th>
                    <th className="text-right p-4 text-yellow-400">الحالة</th>
                    <th className="text-right p-4 text-yellow-400">الإجراءات</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map(user => (
                    <tr key={user.id} className="border-b border-yellow-600/20 hover:bg-yellow-900/10">
                      <td className="p-4 text-white">{user.name}</td>
                      <td className="p-4 text-gray-300">{user.email}</td>
                      <td className="p-4 text-yellow-400 font-semibold">{user.plan}</td>
                      <td className="p-4">
                        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                          user.status === "نشط" ? "bg-green-600/20 text-green-400" : "bg-yellow-600/20 text-yellow-400"
                        }`}>
                          {user.status}
                        </span>
                      </td>
                      <td className="p-4 flex gap-2">
                        <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                          <Edit2 className="w-4 h-4" />
                        </Button>
                        <Button
                          onClick={() => handleDeleteUser(user.id)}
                          size="sm"
                          className="bg-red-600 hover:bg-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* تبويب الإعدادات */}
        {activeTab === "settings" && (
          <div>
            {!editingSettings ? (
              <Button
                onClick={() => {
                  setEditingSettings(true);
                  setTempSettings(settings);
                }}
                className="bg-gradient-to-r from-yellow-500 to-blue-500 text-black font-bold px-8 py-3 mb-8"
              >
                <Edit2 className="w-5 h-5 ml-2" />
                تعديل الإعدادات
              </Button>
            ) : (
              <Card className="bg-gradient-to-br from-yellow-900/20 to-blue-900/20 border-yellow-600/30 p-8 mb-8">
                <h2 className="text-2xl font-bold mb-6 text-yellow-400">تعديل الإعدادات</h2>

                <div className="space-y-6">
                  {/* معلومات الموقع */}
                  <div>
                    <h3 className="text-lg font-bold text-blue-400 mb-4">معلومات الموقع</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm text-gray-400 mb-2">اسم الموقع</label>
                        <Input
                          type="text"
                          value={tempSettings.siteName}
                          onChange={(e) => setTempSettings({ ...tempSettings, siteName: e.target.value })}
                          className="bg-black/50 border-yellow-600/30 text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-400 mb-2">البريد الإلكتروني</label>
                        <Input
                          type="email"
                          value={tempSettings.siteEmail}
                          onChange={(e) => setTempSettings({ ...tempSettings, siteEmail: e.target.value })}
                          className="bg-black/50 border-yellow-600/30 text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-400 mb-2">رقم الدعم</label>
                        <Input
                          type="tel"
                          value={tempSettings.supportPhone}
                          onChange={(e) => setTempSettings({ ...tempSettings, supportPhone: e.target.value })}
                          className="bg-black/50 border-yellow-600/30 text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-400 mb-2">العملة</label>
                        <select
                          value={tempSettings.currency}
                          onChange={(e) => setTempSettings({ ...tempSettings, currency: e.target.value })}
                          className="w-full bg-black/50 border border-yellow-600/30 text-white rounded-lg p-2"
                        >
                          <option value="SAR">الريال السعودي (SAR)</option>
                          <option value="USD">الدولار الأمريكي (USD)</option>
                          <option value="AED">الدرهم الإماراتي (AED)</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* الإعدادات الأمنية */}
                  <div>
                    <h3 className="text-lg font-bold text-blue-400 mb-4">الإعدادات الأمنية</h3>
                    <div className="space-y-4">
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={tempSettings.twoFactorAuth}
                          onChange={(e) => setTempSettings({ ...tempSettings, twoFactorAuth: e.target.checked })}
                          className="w-5 h-5"
                        />
                        <span className="text-white">تفعيل المصادقة الثنائية</span>
                      </label>
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={tempSettings.maintenanceMode}
                          onChange={(e) => setTempSettings({ ...tempSettings, maintenanceMode: e.target.checked })}
                          className="w-5 h-5"
                        />
                        <span className="text-white">وضع الصيانة</span>
                      </label>
                    </div>
                  </div>

                  {/* إشعارات */}
                  <div>
                    <h3 className="text-lg font-bold text-blue-400 mb-4">الإشعارات</h3>
                    <div className="space-y-4">
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={tempSettings.emailNotifications}
                          onChange={(e) => setTempSettings({ ...tempSettings, emailNotifications: e.target.checked })}
                          className="w-5 h-5"
                        />
                        <span className="text-white">إشعارات البريد الإلكتروني</span>
                      </label>
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={tempSettings.smsNotifications}
                          onChange={(e) => setTempSettings({ ...tempSettings, smsNotifications: e.target.checked })}
                          className="w-5 h-5"
                        />
                        <span className="text-white">إشعارات SMS</span>
                      </label>
                    </div>
                  </div>

                  {/* الأزرار */}
                  <div className="flex gap-4 pt-6 border-t border-yellow-600/30">
                    <Button
                      onClick={handleSaveSettings}
                      className="bg-green-600 hover:bg-green-700 text-white font-bold px-8 py-3"
                    >
                      <Save className="w-5 h-5 ml-2" />
                      حفظ التغييرات
                    </Button>
                    <Button
                      onClick={handleResetSettings}
                      className="bg-gray-600 hover:bg-gray-700 text-white px-8 py-3"
                    >
                      <X className="w-5 h-5 ml-2" />
                      إلغاء
                    </Button>
                  </div>
                </div>
              </Card>
            )}

            {/* عرض الإعدادات الحالية */}
            <Card className="bg-gradient-to-br from-yellow-900/20 to-blue-900/20 border-yellow-600/30 p-8">
              <h2 className="text-2xl font-bold mb-6 text-yellow-400">الإعدادات الحالية</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <p className="text-gray-400 text-sm mb-2">اسم الموقع</p>
                  <p className="text-white font-semibold text-lg">{settings.siteName}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm mb-2">البريد الإلكتروني</p>
                  <p className="text-white font-semibold text-lg">{settings.siteEmail}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm mb-2">رقم الدعم</p>
                  <p className="text-white font-semibold text-lg">{settings.supportPhone}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm mb-2">العملة</p>
                  <p className="text-white font-semibold text-lg">{settings.currency}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm mb-2">المصادقة الثنائية</p>
                  <p className={`font-semibold text-lg ${settings.twoFactorAuth ? "text-green-400" : "text-red-400"}`}>
                    {settings.twoFactorAuth ? "مفعلة" : "معطلة"}
                  </p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm mb-2">وضع الصيانة</p>
                  <p className={`font-semibold text-lg ${settings.maintenanceMode ? "text-yellow-400" : "text-green-400"}`}>
                    {settings.maintenanceMode ? "مفعل" : "معطل"}
                  </p>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* تبويب التقارير */}
        {activeTab === "reports" && (
          <div>
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="bg-gradient-to-br from-yellow-900/20 to-blue-900/20 border-yellow-600/30 p-8">
                <h3 className="text-xl font-bold text-yellow-400 mb-4">تقرير المبيعات</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-400">إجمالي المبيعات</span>
                    <span className="text-yellow-400 font-bold">125,000 ر.س</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">متوسط الطلب</span>
                    <span className="text-yellow-400 font-bold">39 ر.س</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">نسبة النمو</span>
                    <span className="text-green-400 font-bold">+25%</span>
                  </div>
                </div>
                <Button className="w-full mt-6 bg-yellow-600 hover:bg-yellow-700 text-white">
                  <Download className="w-4 h-4 ml-2" />
                  تحميل التقرير
                </Button>
              </Card>

              <Card className="bg-gradient-to-br from-blue-900/20 to-yellow-900/20 border-blue-600/30 p-8">
                <h3 className="text-xl font-bold text-blue-400 mb-4">تقرير المستخدمين</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-400">إجمالي المستخدمين</span>
                    <span className="text-blue-400 font-bold">1,250</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">مستخدمون جدد</span>
                    <span className="text-blue-400 font-bold">120</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">معدل الاحتفاظ</span>
                    <span className="text-green-400 font-bold">92%</span>
                  </div>
                </div>
                <Button className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white">
                  <Download className="w-4 h-4 ml-2" />
                  تحميل التقرير
                </Button>
              </Card>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
