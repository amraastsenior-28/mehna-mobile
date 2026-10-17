import React from 'react';
import { BrandLogo } from './BrandLogo';
import type { Language } from './Navbar';
import { ShieldAlert } from 'lucide-react';

interface FooterProps {
  language: Language;
}

export const Footer: React.FC<FooterProps> = ({ language }) => {
  const isAr = language === 'ar';

  return (
    <footer className="mt-20 border-t border-[#0E3B33]/15 bg-[#E9E3D3]/40 text-[#0E3B33] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <BrandLogo />

          {/* Academic & Strategic Badges */}
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="px-3 py-1 rounded-full bg-[#0E3B33] text-white font-semibold">
              {isAr ? 'الأكاديمية العربية - فرع أسوان (جنوب الوادي)' : 'AASTMT South Valley Campus'}
            </span>
            <span className="px-3 py-1 rounded-full bg-white border border-[#C4824A]/40 text-[#0E3B33] font-semibold">
              {isAr ? 'قسم نظم المعلومات الإدارية (BIS)' : 'Business Information Systems'}
            </span>
            <span className="px-3 py-1 rounded-full bg-[#C4824A] text-white font-semibold">
              {isAr ? 'رؤية مصر 2030' : 'Egypt Vision 2030'}
            </span>
          </div>
        </div>

        {/* Regulatory & Simulated Data Disclaimer Box */}
        <div className="p-4 rounded-2xl bg-white/80 border border-[#0E3B33]/10 text-xs space-y-2">
          <div className="flex items-center gap-2 font-bold text-[#0E3B33]">
            <ShieldAlert className="w-4 h-4 text-[#C4824A]" />
            <span>{isAr ? 'إخلاء مسؤولية علمي ونظامي (Phase 0 Simulated MVP)' : 'Scientific & Regulatory Notice'}</span>
          </div>
          <p className="text-gray-600 leading-relaxed">
            {isAr
              ? 'تنويه: جميع البيانات، ومؤشرات الأداء، وسجلات المتدربين، وحسابات المطابقة المعروضة في هذا الموقع التجريبي هي بيانات محاكاة مبنية على دراسة ميدانية لاقتصاد محافظة أسوان لأغراض مناقشة مشروع التخرج والتحقق الأولي (Phase 0). تم تصميم المعمارية البرمجية بالكامل للالتزام بقانون حماية البيانات الشخصية المصري رقم 151 لسنة 2020، وضوابط حفظ ومطابقة الكفاءات لنظرية الموارد البشرية لغاري ديسلر والنموذج الثنائي الألماني.'
              : 'Notice: All figures, metrics, candidate records, and matching calculations displayed in this prototype are simulated-data projections derived from Aswan regional field research for graduation presentation and validation (Phase 0). The architecture is engineered in strict compliance with Egypt Data Privacy Law 151/2020, Gary Dessler’s HRM Job Analysis framework, and the German Dual VET governance architecture.'}
          </p>
        </div>

        {/* Copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 pt-4 border-t border-[#0E3B33]/10 gap-2">
          <span>
            © 2026 {isAr ? 'مشروع تخرج مِـهْـنَـة (MEHNA). جميع الحقوق محفوظة.' : 'MEHNA Graduation Project. All rights reserved.'}
          </span>
          <span className="flex items-center gap-1">
            {isAr ? 'صُمم ونُفذ لخدمة شباب وتنمية أسوان' : 'Engineered for youth empowerment in Aswan'}
          </span>
        </div>
      </div>
    </footer>
  );
};
