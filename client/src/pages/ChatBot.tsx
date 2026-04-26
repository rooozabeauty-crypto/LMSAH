import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Send, Plus, Trash2, Menu, X } from "lucide-react";
import { useState, useRef, useEffect } from "react";

const ROBOT_AVATAR = "https://d2xsxph8kpxj0f.cloudfront.net/310519663515036966/BCaYsJL3EqPnjYm7sbhATD/robot_avatar-LaDYgvNekHdDVzEMkkCJDV.webp";

interface Message {
  id: string;
  type: "user" | "bot";
  content: string;
  timestamp: Date;
}

interface Conversation {
  id: string;
  title: string;
  messages: Message[];
  createdAt: Date;
}

export default function ChatBot() {
  const { user, isAuthenticated } = useAuth();
  const [conversations, setConversations] = useState<Conversation[]>([
    {
      id: "1",
      title: "محادثة جديدة",
      messages: [
        {
          id: "1",
          type: "bot",
          content: "السلام عليكم ورحمة الله وبركاته! أنا مساعدك الذكي من لمسة رموز. كيف أساعدك اليوم في تطوير متجرك على منصة سلة؟",
          timestamp: new Date()
        }
      ],
      createdAt: new Date()
    }
  ]);
  
  const [currentConversationId, setCurrentConversationId] = useState("1");
  const [inputValue, setInputValue] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const currentConversation = conversations.find(c => c.id === currentConversationId);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [currentConversation?.messages]);

  const handleSendMessage = () => {
    if (!inputValue.trim() || !currentConversation) return;

    const newUserMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: inputValue,
      timestamp: new Date()
    };

    // Simulate bot response
    const botResponses: { [key: string]: string } = {
      "seo": "لتحسين محرك البحث (SEO)، أنصحك بـ:\n1. استخدام الكلمات المفتاحية المناسبة في عنوان المتجر والوصف\n2. إنشاء محتوى جودة عالية ومتوافق مع معايير جوجل\n3. بناء روابط خارجية من مواقع موثوقة\n4. تحسين سرعة تحميل متجرك\n5. استخدام الوسوم والفئات بشكل صحيح",
      "إعلانات": "لإنشاء حملات إعلانية فعالة:\n1. حدد جمهورك المستهدف بدقة\n2. اختر المنصات المناسبة (جوجل، فيسبوك، إنستغرام)\n3. ركز على الكلمات المفتاحية ذات التحويل العالي\n4. اختبر نسخ إعلانية مختلفة\n5. راقب الأداء وعدّل الإنفاق حسب النتائج",
      "محتوى": "نصائح لإنشاء محتوى جذاب:\n1. اعرف احتياجات عملائك\n2. أنشئ محتوى تعليمي ومفيد\n3. استخدم الصور والفيديوهات عالية الجودة\n4. اكتب بأسلوب واضح وبسيط\n5. حافظ على التناسق والانتظام في النشر",
      "متجر": "لبناء متجر إلكتروني ناجح:\n1. اختر اسم متجر احترافي وسهل التذكر\n2. صمم هوية بصرية قوية وفريدة\n3. نظم منتجاتك في فئات واضحة\n4. اكتب وصفات منتج جذابة وكاملة\n5. وفر خيارات دفع آمنة وسهلة",
      "default": "شكراً على سؤالك! أنا روبوت ذكي مدعوم بالذكاء الاصطناعي المتقدم وأنا هنا لمساعدتك في:\n✓ تحسين محرك البحث (SEO)\n✓ إنشاء حملات إعلانية\n✓ إدارة السوشل ميديا\n✓ إنشاء محتوى جذاب\n✓ بناء متجر إلكتروني\n✓ تحليل البيانات والتقارير\n✓ توليد التصاميم والصور\n✓ إنشاء الفيديوهات\n\nكيف يمكنني مساعدتك؟"
    };

    let botResponse = botResponses.default;
    const lowerInput = inputValue.toLowerCase();
    
    // محاكاة استدعاء الذكاء الاصطناعي المتقدم
    if (lowerInput.includes("seo") || lowerInput.includes("بحث")) {
      botResponse = botResponses.seo + "\n\n🤖 تم توليد هذه الاستشارة بواسطة الذكاء الاصطناعي المتقدم";
    } else if (lowerInput.includes("إعلان") || lowerInput.includes("ads")) {
      botResponse = botResponses.إعلانات + "\n\n🤖 تم توليد هذه الاستشارة بواسطة الذكاء الاصطناعي المتقدم";
    } else if (lowerInput.includes("محتوى") || lowerInput.includes("content")) {
      botResponse = botResponses.محتوى + "\n\n🤖 تم توليد هذه الاستشارة بواسطة الذكاء الاصطناعي المتقدم";
    } else if (lowerInput.includes("متجر") || lowerInput.includes("store")) {
      botResponse = botResponses.متجر + "\n\n🤖 تم توليد هذه الاستشارة بواسطة الذكاء الاصطناعي المتقدم";
    } else {
      botResponse = botResponses.default + "\n\n💡 جميع الاستشارات مدعومة بالذكاء الاصطناعي المتقدم";
    }

    const newBotMessage: Message = {
      id: (Date.now() + 1).toString(),
      type: "bot",
      content: botResponse,
      timestamp: new Date()
    };

    setConversations(prev => prev.map(conv => {
      if (conv.id === currentConversationId) {
        return {
          ...conv,
          messages: [...conv.messages, newUserMessage, newBotMessage]
        };
      }
      return conv;
    }));

    setInputValue("");
  };

  const createNewConversation = () => {
    const newId = Date.now().toString();
    const newConversation: Conversation = {
      id: newId,
      title: "محادثة جديدة",
      messages: [
        {
          id: "1",
          type: "bot",
          content: "السلام عليكم ورحمة الله وبركاته! كيف أساعدك اليوم؟",
          timestamp: new Date()
        }
      ],
      createdAt: new Date()
    };
    setConversations(prev => [newConversation, ...prev]);
    setCurrentConversationId(newId);
  };

  const deleteConversation = (id: string) => {
    const remaining = conversations.filter(c => c.id !== id);
    setConversations(remaining);
    if (currentConversationId === id && remaining.length > 0) {
      setCurrentConversationId(remaining[0].id);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <Card className="bg-gradient-to-br from-yellow-900/20 to-blue-900/20 border-yellow-600/30 p-8 text-center max-w-md">
          <h1 className="text-2xl font-bold mb-4 text-yellow-400">يجب تسجيل الدخول</h1>
          <p className="text-gray-400 mb-6">يرجى تسجيل الدخول للوصول إلى الروبوت الذكي</p>
          <Button className="bg-gradient-to-r from-yellow-500 to-blue-500 text-black font-bold w-full">
            تسجيل الدخول
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white" style={{ direction: "rtl" }}>
      <div className="flex h-screen">
        {/* Sidebar */}
        <div className={`${sidebarOpen ? "w-64" : "w-0"} transition-all duration-300 bg-gradient-to-b from-black to-blue-950/20 border-l border-yellow-600/20 overflow-hidden flex flex-col`}>
          <div className="p-4 border-b border-yellow-600/20">
            <Button 
              onClick={createNewConversation}
              className="w-full bg-gradient-to-r from-yellow-500 to-blue-500 text-black font-bold flex items-center justify-center gap-2"
            >
              <Plus className="w-4 h-4" />
              محادثة جديدة
            </Button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 space-y-2">
            {conversations.map(conv => (
              <div
                key={conv.id}
                className={`p-3 rounded-lg cursor-pointer transition flex justify-between items-center group ${
                  currentConversationId === conv.id
                    ? "bg-yellow-600/30 border border-yellow-500"
                    : "bg-blue-900/20 border border-blue-600/30 hover:bg-blue-900/40"
                }`}
                onClick={() => setCurrentConversationId(conv.id)}
              >
                <span className="text-sm truncate">{conv.title}</span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteConversation(conv.id);
                  }}
                  className="opacity-0 group-hover:opacity-100 transition"
                >
                  <Trash2 className="w-4 h-4 text-red-400" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <div className="bg-gradient-to-r from-black to-blue-950/20 border-b border-yellow-600/20 p-4 flex items-center justify-between">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="text-yellow-500 hover:text-yellow-400"
            >
              {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
            
            <div className="flex items-center gap-3">
              <img src={ROBOT_AVATAR} alt="الروبوت" className="w-10 h-10 rounded-full" />
              <div>
                <h1 className="font-bold text-yellow-400">الروبوت الذكي - AI Powered</h1>
                <p className="text-xs text-green-400">🤖 مدعوم بالذكاء الاصطناعي</p>
              </div>
            </div>

            <div className="text-right">
              <p className="text-sm text-gray-400">مرحباً {user?.name}</p>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {currentConversation?.messages.map(msg => (
              <div
                key={msg.id}
                className={`flex ${msg.type === "user" ? "justify-start" : "justify-end"}`}
              >
                <div
                  className={`max-w-xs lg:max-w-md px-4 py-3 rounded-lg ${
                    msg.type === "user"
                      ? "bg-blue-600/30 border border-blue-500/50 text-white"
                      : "bg-yellow-600/30 border border-yellow-500/50 text-white"
                  }`}
                >
                  <p className="whitespace-pre-wrap text-sm">{msg.content}</p>
                  <p className="text-xs text-gray-400 mt-1">
                    {msg.timestamp.toLocaleTimeString("ar-SA", { hour: "2-digit", minute: "2-digit" })}
                  </p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="bg-gradient-to-t from-black to-blue-950/20 border-t border-yellow-600/20 p-4">
            <div className="flex gap-3">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                placeholder="اكتب سؤالك هنا..."
                className="bg-blue-900/30 border-blue-600/30 text-white placeholder-gray-500 flex-1"
              />
              <Button
                onClick={handleSendMessage}
                className="bg-gradient-to-r from-yellow-500 to-blue-500 text-black font-bold px-6"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
            <p className="text-xs text-gray-500 mt-2 text-right">
              اسأل عن SEO، الإعلانات، المحتوى، المتجر، وأكثر!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
