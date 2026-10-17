import React from 'react';
import {
  B2G_KPIS,
  SECTOR_PLACEMENTS,
  MONTHLY_PLACEMENTS,
} from '../data/mockData';
import type { Language } from './Navbar';
import {
  ShieldCheck,
  FileCheck,
  Users2,
  Sparkles,
  Scale,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  Legend,
} from 'recharts';

interface B2GDashboardProps {
  language: Language;
}

export const B2GDashboard: React.FC<B2GDashboardProps> = ({ language }) => {
  const isAr = language === 'ar';

  return (
    <div className="space-y-8 py-4">
      {/* Header */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#0E3B33] text-white shadow-card border border-[#C4824A]/30 space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C4824A]/20 border border-[#C4824A]/40 text-[#D99B68] text-xs font-bold uppercase tracking-wider mb-2">
              <ShieldCheck className="w-3.5 h-3.5 text-[#C4824A]" />
              <span>{isAr ? 'منظومة الحوكمة والرقابة الحكومية (B2G Portal)' : 'Government Regulatory Portal'}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black font-arabic">
              {isAr ? 'مرصد سوق العمل والتعلم المزدوج بمحافظة أسوان' : 'Aswan Labor Market & Dual VET Observatory'}
            </h2>
          </div>

          <div className="text-start sm:text-end bg-white/10 p-3 rounded-2xl border border-white/10 text-xs">
            <span className="text-[#D99B68] font-bold block">{isAr ? 'حالة الامتثال القانوني:' : 'Legal Compliance:'}</span>
            <span className="font-semibold">{isAr ? 'معتمد طبقاً للقانون 151 لسنة 2020' : 'Egypt Law 151/2020 Verified'}</span>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-[#F4F0E6]/85 max-w-4xl leading-relaxed">
          {isAr
            ? 'تتيح لوحة الرقابة الحكومية لوزارات التربية والتعليم، والتعليم العالي، والعمل، والتضامن الاجتماعي، والمحافظة متابعة المسارات التدريبية، والتحقق من التزام المنشآت بتسجيل عقود التدريب الرسمية، ومراقبة مؤشر إدماج الإناث لمواجهة الفجوة الهيكلية.'
            : 'Enabling ministries of Education, Labor, and Social Solidarity to audit dual training contracts, ensure minor protection compliance, and track female inclusion trends across Upper Egypt.'}
        </p>
      </div>

      {/* KPI Cards Grid with Green-Tinted Shadows */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* KPI 1 */}
        <div className="p-5 rounded-2xl bg-white border border-[#0E3B33]/10 shadow-card space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-500 uppercase">
              {isAr ? 'إجمالي المتدربين المسجلين' : 'Total Placements'}
            </span>
            <div className="w-8 h-8 rounded-lg bg-[#0E3B33]/5 text-[#0E3B33] flex items-center justify-center">
              <Users2 className="w-4 h-4 text-[#C4824A]" />
            </div>
          </div>
          <div className="text-3xl font-black text-[#0E3B33]">
            {B2G_KPIS.totalPlacements.toLocaleString()}
          </div>
          <span className="text-[11px] text-emerald-600 font-semibold block">
            ↑ 18.4% {isAr ? 'نمو مقارنة بالربع السابق' : 'vs last quarter'}
          </span>
        </div>

        {/* KPI 2 */}
        <div className="p-5 rounded-2xl bg-white border border-[#0E3B33]/10 shadow-card space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-500 uppercase">
              {isAr ? 'عقود WBL النشطة' : 'Active WBL Contracts'}
            </span>
            <div className="w-8 h-8 rounded-lg bg-[#0E3B33]/5 text-[#0E3B33] flex items-center justify-center">
              <FileCheck className="w-4 h-4 text-[#C4824A]" />
            </div>
          </div>
          <div className="text-3xl font-black text-[#0E3B33]">
            {B2G_KPIS.activeContracts.toLocaleString()}
          </div>
          <span className="text-[11px] text-gray-500 block">
            {isAr ? 'معتمدة لدى الشركاء الصناعيين' : 'Under active enterprise supervision'}
          </span>
        </div>

        {/* KPI 3 (Step 4 Requirement: Updated Female Participation Caption) */}
        <div className="p-5 rounded-2xl bg-white border border-[#0E3B33]/10 shadow-card space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-500 uppercase">
              {isAr ? 'معدل مشاركة الإناث' : 'Female Inclusion Rate'}
            </span>
            <div className="w-8 h-8 rounded-lg bg-[#0E3B33]/5 text-[#0E3B33] flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-[#C4824A]" />
            </div>
          </div>
          <div className="text-3xl font-black text-[#C4824A]">
            {B2G_KPIS.femaleParticipationRate}%
          </div>
          <p className="text-[11px] text-[#0E3B33]/80 leading-relaxed font-medium pt-1 border-t border-[#0E3B33]/5">
            {isAr ? (
              <>
                <span>نسبة مشاركة الإناث في التدريب المزدوج، مقارنة بمعدل البطالة الأنثوية </span>
                <span className="font-bold text-rose-700 bg-rose-50 px-1.5 py-0.5 rounded border border-rose-200">33.8%</span>
              </>
            ) : (
              <>
                <span>Female dual VET participation rate, compared to </span>
                <span className="font-bold text-rose-700 bg-rose-50 px-1.5 py-0.5 rounded border border-rose-200">33.8%</span>
                <span> female unemployment</span>
              </>
            )}
          </p>
        </div>

        {/* KPI 4 */}
        <div className="p-5 rounded-2xl bg-white border border-[#0E3B33]/10 shadow-card space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-500 uppercase">
              {isAr ? 'توثيق موافقات ولي الأمر' : 'Law 151/2020 Compliance'}
            </span>
            <div className="w-8 h-8 rounded-lg bg-[#0E3B33]/5 text-[#0E3B33] flex items-center justify-center">
              <ShieldCheck className="w-4 h-4 text-[#C4824A]" />
            </div>
          </div>
          <div className="text-3xl font-black text-emerald-600">
            {B2G_KPIS.consentComplianceRate}%
          </div>
          <span className="text-[11px] text-gray-500 block">
            {isAr ? 'تسجيل مشفر لموافقات القُصّر' : '100% digital consent audits logged'}
          </span>
        </div>
      </div>

      {/* Two Analytics Charts Grid (Step 4 Fix: Rotated/wrapped labels & clean Y-axis ticks) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chart 1: Sector Placements with Rotated, Non-overlapping X-Axis Labels */}
        <div className="p-6 rounded-3xl bg-white border border-[#0E3B33]/10 shadow-card space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-base text-[#0E3B33] font-arabic">
                {isAr ? 'توزيع المتدربين ومشاركة الإناث حسب القطاع' : 'Placements & Female Share by Sector'}
              </h3>
              <p className="text-xs text-gray-500 mt-0.5">
                {isAr ? 'مقارنة إجمالي الفرص بحصة الشابات في قطاعات أسوان' : 'Total placements vs. female cohort in Aswan'}
              </p>
            </div>
            <span className="text-xs font-bold text-[#C4824A] bg-[#F4F0E6] px-3 py-1 rounded-xl">
              {isAr ? 'بيانات محاكاة' : 'Simulated Data'}
            </span>
          </div>

          <div className="h-80 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={SECTOR_PLACEMENTS}
                margin={{ top: 15, right: 15, left: -10, bottom: 55 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f0efe9" vertical={false} />
                <XAxis
                  dataKey={isAr ? 'sectorAr' : 'sectorEn'}
                  tick={{ fill: '#0E3B33', fontSize: 10, fontWeight: 600 }}
                  interval={0}
                  angle={-22}
                  textAnchor="end"
                  height={65}
                  dx={-4}
                  dy={8}
                />
                <YAxis tick={{ fill: '#0E3B33', fontSize: 11 }} tickMargin={8} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0E3B33',
                    color: '#fff',
                    borderRadius: '12px',
                    fontSize: '12px',
                  }}
                />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '15px' }} />
                <Bar
                  name={isAr ? 'إجمالي الملتحقين' : 'Total Placements'}
                  dataKey="placements"
                  fill="#0E3B33"
                  radius={[6, 6, 0, 0]}
                />
                <Bar
                  name={isAr ? 'المتدربات الإناث' : 'Female Trainees'}
                  dataKey="femaleCount"
                  fill="#C4824A"
                  radius={[6, 6, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2: Monthly Trend with Generous Y-Axis Tick Offset */}
        <div className="p-6 rounded-3xl bg-white border border-[#0E3B33]/10 shadow-card space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-base text-[#0E3B33] font-arabic">
                {isAr ? 'المسار الزمني لتوسع التدريب المزدوج بأسوان' : 'Monthly Placement Growth Trajectory'}
              </h3>
              <p className="text-xs text-gray-500 mt-0.5">
                {isAr ? 'معدل النمو التراكمي لعقود التدريب خلال أشهر المشروع التجريبي' : 'Cumulative growth throughout MVP deployment'}
              </p>
            </div>
            <span className="text-xs font-bold text-[#0E3B33] bg-[#E9E3D3] px-3 py-1 rounded-xl">
              {isAr ? 'منحنى تصاعدي' : 'Upward Trend'}
            </span>
          </div>

          <div className="h-80 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={MONTHLY_PLACEMENTS}
                margin={{ top: 15, right: 25, left: 10, bottom: 20 }}
              >
                <defs>
                  <linearGradient id="placementGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#C4824A" stopOpacity={0.5} />
                    <stop offset="95%" stopColor="#C4824A" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0efe9" vertical={false} />
                <XAxis
                  dataKey={isAr ? 'monthAr' : 'monthEn'}
                  tick={{ fill: '#0E3B33', fontSize: 11 }}
                  dy={6}
                />
                <YAxis
                  tick={{ fill: '#0E3B33', fontSize: 11 }}
                  tickMargin={12}
                  width={45}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0E3B33',
                    color: '#fff',
                    borderRadius: '12px',
                    fontSize: '12px',
                  }}
                />
                <Area
                  type="monotone"
                  name={isAr ? 'عقود التدريب المنفذة' : 'Placements'}
                  dataKey="placements"
                  stroke="#C4824A"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#placementGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Tripartite German Dual VET Regulatory Audit Card */}
      <section className="p-6 rounded-3xl bg-[#E9E3D3]/70 border border-[#0E3B33]/15 shadow-card space-y-4">
        <div className="flex items-center gap-2">
          <Scale className="w-5 h-5 text-[#C4824A]" />
          <h3 className="font-bold text-base text-[#0E3B33] font-arabic">
            {isAr ? 'حوكمة أركان التدريب المهني المزدوج الثلاثية (German Dual VET Governance)' : 'Tripartite Governance Architecture Audit'}
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-2xl bg-white border border-[#0E3B33]/10 shadow-card space-y-1.5">
            <span className="font-bold text-[#C4824A] block">1. {isAr ? 'الغرف التجارية والصناعية' : 'Chambers of Commerce'}</span>
            <p className="text-gray-600 leading-relaxed">
              {isAr
                ? 'فحص واعتماد مقرات تدريب الشركات في مجمع بنبان ووادي النقرة وغرب سهيل، وتأهيل المشرفين الميدانيين.'
                : 'Auditing in-company training facilities and certifying enterprise technical instructors.'}
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-[#0E3B33]/10 shadow-card space-y-1.5">
            <span className="font-bold text-[#C4824A] block">2. {isAr ? 'الشركاء والجمعيات المهنية' : 'Social Partners & Unions'}</span>
            <p className="text-gray-600 leading-relaxed">
              {isAr
                ? 'تحديد الكفايات العملية لمهن الطاقة والزراعة والحرف، وضمان عدالة وانتظام صرف المكافأة الشهرية.'
                : 'Co-defining vocational competencies and establishing standardized trainee stipend baselines.'}
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-[#0E3B33]/10 shadow-card space-y-1.5">
            <span className="font-bold text-[#C4824A] block">3. {isAr ? 'الوزارات والجهات الحكومية' : 'Government & Ministries'}</span>
            <p className="text-gray-600 leading-relaxed">
              {isAr
                ? 'الإشراف على التعليم الفني المكمل، توفير الحماية القانونية، ومواءمة مخرجات المنظومة مع رؤية مصر 2030.'
                : 'Governing school-based theoretical curricula and enforcing national data protection protocols.'}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
