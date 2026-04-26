import { router, publicProcedure } from "../_core/trpc";
import { z } from "zod";
import { invokeLLM } from "../_core/llm";

export const aiRouter = router({
  /**
   * توليد استشارات تسويقية ذكية
   */
  generateMarketingConsultation: publicProcedure
    .input(z.object({
      topic: z.string().describe("موضوع الاستشارة (SEO, إعلانات، محتوى، إلخ)"),
      businessType: z.string().optional().describe("نوع النشاط التجاري"),
      details: z.string().optional().describe("تفاصيل إضافية"),
    }))
    .mutation(async ({ input }) => {
      const prompt = `أنت خبير تسويق رقمي متخصص في خدمات تجار منصة سلة.
      
الموضوع: ${input.topic}
${input.businessType ? `نوع النشاط: ${input.businessType}` : ""}
${input.details ? `التفاصيل: ${input.details}` : ""}

قدم استشارة احترافية وعملية بالعربية الخليجية تتضمن:
1. تحليل الوضع الحالي
2. أفضل الممارسات
3. خطوات عملية قابلة للتنفيذ
4. النتائج المتوقعة
5. نصائح إضافية

اجعل الرد مختصراً وسهل الفهم.`;

      try {
        const response = await invokeLLM({
          messages: [
            {
              role: "system",
              content: "أنت مساعد تسويق ذكي متخصص في خدمات تجار منصة سلة. قدم استشارات احترافية وعملية باللغة العربية الخليجية."
            },
            {
              role: "user",
              content: prompt
            }
          ]
        });

        const content = response.choices[0]?.message?.content || "";
        return {
          success: true,
          consultation: content,
          topic: input.topic,
          generatedAt: new Date()
        };
      } catch (error) {
        console.error("Error generating consultation:", error);
        return {
          success: false,
          consultation: "عذراً، حدث خطأ في توليد الاستشارة. يرجى المحاولة مرة أخرى.",
          error: String(error)
        };
      }
    }),

  /**
   * توليد نصوص تسويقية ذكية
   */
  generateMarketingContent: publicProcedure
    .input(z.object({
      type: z.enum(["product_description", "social_post", "email", "ad_copy", "blog_title"]),
      topic: z.string(),
      keywords: z.array(z.string()).optional(),
      tone: z.enum(["احترافي", "ودي", "جريء", "فاخر"]).optional(),
    }))
    .mutation(async ({ input }) => {
      const typeDescriptions = {
        product_description: "وصف منتج جذاب وفعال",
        social_post: "منشور سوشل ميديا",
        email: "بريد إلكتروني تسويقي",
        ad_copy: "نص إعلاني",
        blog_title: "عنوان مقالة بلوج"
      };

      const prompt = `أنت كاتب محتوى تسويقي متخصص.
      
اكتب ${typeDescriptions[input.type]} عن: ${input.topic}
${input.keywords ? `الكلمات المفتاحية: ${input.keywords.join(", ")}` : ""}
${input.tone ? `الأسلوب: ${input.tone}` : ""}

اجعل المحتوى:
- جذاب وفعال
- محسّن للتحويل
- بالعربية الخليجية
- مختصر وسهل الفهم`;

      try {
        const response = await invokeLLM({
          messages: [
            {
              role: "system",
              content: "أنت كاتب محتوى تسويقي محترف متخصص في التسويق الرقمي للمتاجر الإلكترونية."
            },
            {
              role: "user",
              content: prompt
            }
          ]
        });

        const content = response.choices[0]?.message?.content || "";
        return {
          success: true,
          content: content,
          type: input.type,
          generatedAt: new Date()
        };
      } catch (error) {
        console.error("Error generating content:", error);
        return {
          success: false,
          content: "عذراً، حدث خطأ في توليد المحتوى.",
          error: String(error)
        };
      }
    }),

  /**
   * توليد استراتيجيات تسويقية ذكية
   */
  generateMarketingStrategy: publicProcedure
    .input(z.object({
      businessName: z.string(),
      products: z.string(),
      targetAudience: z.string(),
      budget: z.string().optional(),
    }))
    .mutation(async ({ input }) => {
      const prompt = `أنت استراتيجي تسويق رقمي متخصص في منصة سلة.

اسم المتجر: ${input.businessName}
المنتجات: ${input.products}
الجمهور المستهدف: ${input.targetAudience}
${input.budget ? `الميزانية: ${input.budget}` : ""}

ضع استراتيجية تسويقية شاملة تتضمن:
1. تحليل السوق والمنافسين
2. قنوات التسويق الموصى بها
3. محتوى التسويق
4. الجدول الزمني
5. مؤشرات الأداء الرئيسية (KPIs)
6. الميزانية المقترحة

اجعل الاستراتيجية عملية وقابلة للتنفيذ.`;

      try {
        const response = await invokeLLM({
          messages: [
            {
              role: "system",
              content: "أنت استراتيجي تسويق رقمي متخصص في تطوير استراتيجيات تسويقية فعالة للمتاجر الإلكترونية على منصة سلة."
            },
            {
              role: "user",
              content: prompt
            }
          ]
        });

        const content = response.choices[0]?.message?.content || "";
        return {
          success: true,
          strategy: content,
          businessName: input.businessName,
          generatedAt: new Date()
        };
      } catch (error) {
        console.error("Error generating strategy:", error);
        return {
          success: false,
          strategy: "عذراً، حدث خطأ في توليد الاستراتيجية.",
          error: String(error)
        };
      }
    }),

  /**
   * توليد تقارير تحليلية ذكية
   */
  generateAnalyticsReport: publicProcedure
    .input(z.object({
      metrics: z.object({
        totalSales: z.number(),
        totalOrders: z.number(),
        totalCustomers: z.number(),
        conversionRate: z.number(),
        averageOrderValue: z.number(),
      }),
      period: z.string(),
    }))
    .mutation(async ({ input }) => {
      const prompt = `أنت محلل بيانات متخصص في التجارة الإلكترونية.

البيانات للفترة: ${input.period}
- إجمالي المبيعات: ${input.metrics.totalSales} ريال
- عدد الطلبات: ${input.metrics.totalOrders}
- عدد العملاء: ${input.metrics.totalCustomers}
- معدل التحويل: ${input.metrics.conversionRate}%
- متوسط قيمة الطلب: ${input.metrics.averageOrderValue} ريال

حلل هذه البيانات وقدم:
1. ملخص الأداء
2. النقاط الإيجابية
3. المجالات التي تحتاج تحسين
4. التوصيات العملية
5. الخطوات التالية

اجعل التقرير احترافياً وسهل الفهم.`;

      try {
        const response = await invokeLLM({
          messages: [
            {
              role: "system",
              content: "أنت محلل بيانات متخصص في تحليل أداء المتاجر الإلكترونية وتقديم توصيات محسّنة."
            },
            {
              role: "user",
              content: prompt
            }
          ]
        });

        const content = response.choices[0]?.message?.content || "";
        return {
          success: true,
          report: content,
          period: input.period,
          generatedAt: new Date()
        };
      } catch (error) {
        console.error("Error generating report:", error);
        return {
          success: false,
          report: "عذراً، حدث خطأ في توليد التقرير.",
          error: String(error)
        };
      }
    }),
});
