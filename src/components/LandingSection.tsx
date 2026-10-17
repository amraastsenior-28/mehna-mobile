import React from 'react';
import { UserCheck, Building2, ShieldCheck, ArrowUpRight, Award, CheckCircle2 } from 'lucide-react';
import type { Language, PortalTab } from './Navbar';
import { ArchStaircaseArt } from './ArchStaircaseArt';

interface LandingSectionProps {
  language: Language;
  setActiveTab: (tab: PortalTab) => void;
}

export const LandingSection: React.FC<LandingSectionProps> = ({ language, setActiveTab }) => {
  const isAr = language === 'ar';

  return (
    <div className="space-y-16 py-8">
      {/* 
        Hero Section with Ghosted Brand Background (Step 2):
        - Container is relative with overflow: hidden
        - Thin line-art arch & staircase SVG layer placed with position: absolute, pointer-events: none, aria-hidden="true"
        - Opacity calibrated to 8% (between 5% and 10%)
        - Mirrored position via ltr:-right-20 rtl:-left-20 without flipping the internal staircase geometry
        - Highest text contrast preserved (WCAG AA compliant)
      */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0E3B33] via-[#14493F] to-[#0E3B33] text-white p-8 sm:p-14 lg:p-16 border border-[#C4824A]/30 shadow-card">
        
        {/* Decorative Ghosted Arch & Staircase Brand Vector Layer */}
        <div
          className="absolute -bottom-24 ltr:-right-16 rtl:-left-16 w-[420px] sm:w-[540px] lg:w-[600px] opacity-[0.08] pointer-events-none select-none z-0 transition-all"
          aria-hidden="true"
        >
          <ArchStaircaseArt className="w-full h-auto text-[#C4824A]" />
        </div>

        {/* Subtle Architectural Dot Matrix Texture */}
        <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#C4824A_1px,transparent_1px)] [background-size:24px_24px]"></div>

        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#C4824A]/20 border border-[#C4824A]/40 text-[#D99B68] text-xs font-bold uppercase tracking-wider">
            <Award className="w-3.5 h-3.5 text-[#C4824A]" />
            <span>{isAr ? 'مشروع تخرج نظم المعلومات الإدارية - الحرم الجامعي بأسوان' : 'BIS Graduation Project - South Valley Campus, Aswan'}</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black tracking-tight leading-tight font-arabic text-balance">
            {isAr ? 'مِـنَ الـتَّـدْرِيـبِ إِلَـى الـتَّـوْظِـيـف' : 'From Training to Employment'}
          </h1>

          <p className="text-lg sm:text-xl text-[#F4F0E6]/95 font-medium leading-relaxed max-w-3xl mx-auto text-balance">
            {isAr
              ? 'إن أزمة التشغيل في مصر ليست ندرة عامة في الوظائف، بل فجوة مهارية هيكلية تمثل 79.6% بين مخرجات التعليم واحتياجات السوق الحقيقية. مهنة هي منصة ثلاثية الأطراف للتعلم القائم على العمل (WBL) مستوحاة من النموذج الثنائي الألماني لحل هذا التناقض الجذري في محافظة أسوان.'
              : 'Egypt’s employment crisis is not an absolute scarcity of jobs, but a 79.6% structural skills gap between formal education and industry needs. MEHNA is a three-sided Work-Based Learning (WBL) marketplace adapted from the German Dual VET Model to resolve this friction in Aswan.'}
          </p>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-white/10 text-center">
            <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xs">
              <span className="block text-2xl sm:text-3xl font-extrabold text-[#C4824A]">79.6%</span>
              <span className="text-xs text-[#F4F0E6]/80 mt-1 block">
                {isAr ? 'نسبة المتعطلين من المؤهلات' : 'Educated Unemployed'}
              </span>
            </div>
            <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xs">
              <span className="block text-2xl sm:text-3xl font-extrabold text-[#C4824A]">33.8%</span>
              <span className="text-xs text-[#F4F0E6]/80 mt-1 block">
                {isAr ? 'معدل بطالة الإناث بالصعيد' : 'Female Regional Gap'}
              </span>
            </div>
            <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xs">
              <span className="block text-2xl sm:text-3xl font-extrabold text-[#C4824A]">4</span>
              <span className="text-xs text-[#F4F0E6]/80 mt-1 block">
                {isAr ? 'قطاعات تنموية بأسوان' : 'Aswan Growth Sectors'}
              </span>
            </div>
            <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xs">
              <span className="block text-2xl sm:text-3xl font-extrabold text-[#C4824A]">151/2020</span>
              <span className="text-xs text-[#F4F0E6]/80 mt-1 block">
                {isAr ? 'قانون حماية البيانات الشخصية' : 'Egypt Privacy Law'}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Three-Sided Marketplace Portals Overview with Rich Visual Card Headers (Canva Alignment) */}
      <section className="space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-3xl font-bold text-[#0E3B33] font-arabic">
            {isAr ? 'بوابات المنظومة الثلاثية المتكاملة' : 'The Three-Sided Ecosystem'}
          </h2>
          <p className="text-sm text-[#0E3B33]/70">
            {isAr
              ? 'تجمع منصة مهنة بين طالبي التدريب، والشركات والمؤسسات، وجهات الرقابة الحكومية في تدفق بيانات متسق ومحمي قانونياً.'
              : 'Connecting youth trainees, enterprise employers, and regulatory bodies inside a unified, legally compliant digital workflow.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Youth Learner Portal */}
          <div
            onClick={() => setActiveTab('youth')}
            className="group cursor-pointer rounded-3xl bg-white border border-[#0E3B33]/10 shadow-card shadow-card-hover hover:border-[#C4824A] transition-all flex flex-col justify-between overflow-hidden"
          >
            {/* Visual Header Image Container with Floating Badge */}
            <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-[#0E3B33]/5">
              <img
                src="/images/card-youth-portal.jpg"
                alt={isAr ? 'بوابة الشباب والمتدربين' : 'Youth Portal App'}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute top-3.5 end-3.5 w-11 h-11 rounded-2xl bg-white/95 backdrop-blur-md border border-[#0E3B33]/10 shadow-md flex items-center justify-center transition-transform group-hover:scale-110">
                <UserCheck className="w-5 h-5 text-[#C4824A]" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent pointer-events-none"></div>
            </div>

            <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <span className="text-xs font-bold text-[#C4824A] uppercase tracking-wider block">
                  {isAr ? 'الفئة المستهدفة: 15–22 سنة' : 'Target: Ages 15–22'}
                </span>
                <h3 className="text-2xl font-bold text-[#0E3B33] font-arabic group-hover:text-[#C4824A] transition-colors">
                  {isAr ? 'بوابة الشباب والمتدربين' : 'Youth Learner Portal'}
                </h3>
                <p className="text-sm text-[#0E3B33]/75 leading-relaxed pt-1">
                  {isAr
                    ? 'اكتشاف المهارات عبر نموذج KSAO لـ "غاري ديسلر"، مطابقة الفرص الذكية، التقديم بنقرة واحدة، ومتابعة المكافأة الشهرية المضمونة.'
                    : 'Discover KSAO competencies, explore matched WBL opportunities in Aswan, apply with one tap, and track verified monthly stipends.'}
                </p>
              </div>

              <div className="space-y-2 pt-3 border-t border-[#0E3B33]/5 text-xs text-[#0E3B33]/85">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{isAr ? 'رسم بياني راداري للمهارات الأربع' : 'KSAO 4-Factor Radar Chart'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{isAr ? 'سجل صرف المكافأة التدريبية' : 'Digital Stipend Ledger'}</span>
                </div>
              </div>

              <div className="pt-4 border-t border-[#0E3B33]/10 flex items-center justify-between font-bold text-sm text-[#0E3B33] group-hover:text-[#C4824A]">
                <span>{isAr ? 'تجربة بوابة الشباب' : 'Launch Youth View'}</span>
                <ArrowUpRight className="w-5 h-5 ltr:group-hover:translate-x-1 rtl:group-hover:-translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </div>
            </div>
          </div>

          {/* Card 2: Employer Console */}
          <div
            onClick={() => setActiveTab('employer')}
            className="group cursor-pointer rounded-3xl bg-white border border-[#0E3B33]/10 shadow-card shadow-card-hover hover:border-[#C4824A] transition-all flex flex-col justify-between overflow-hidden"
          >
            {/* Visual Header Image Container with Floating Badge */}
            <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-[#0E3B33]/5">
              <img
                src="/images/card-employer-console.jpg"
                alt={isAr ? 'منصة أصحاب الأعمال' : 'Employer Console'}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute top-3.5 end-3.5 w-11 h-11 rounded-2xl bg-white/95 backdrop-blur-md border border-[#0E3B33]/10 shadow-md flex items-center justify-center transition-transform group-hover:scale-110">
                <Building2 className="w-5 h-5 text-[#C4824A]" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent pointer-events-none"></div>
            </div>

            <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <span className="text-xs font-bold text-[#C4824A] uppercase tracking-wider block">
                  {isAr ? 'الشركات والمؤسسات الحرفية' : 'Enterprises & SMEs'}
                </span>
                <h3 className="text-2xl font-bold text-[#0E3B33] font-arabic group-hover:text-[#C4824A] transition-colors">
                  {isAr ? 'منصة أصحاب الأعمال' : 'Employer Console'}
                </h3>
                <p className="text-sm text-[#0E3B33]/75 leading-relaxed pt-1">
                  {isAr
                    ? 'نشر فرص التدريب العملي، فرز المتقدمين حسب خوارزمية التطابق، والتحكم المباشر في أوزان المعرفة والمهارات العملية والقدرات.'
                    : 'Post WBL vacancies, evaluate ranked applicants via the Dessler HRM algorithm, and adjust KSAO weighting live with interactive sliders.'}
                </p>
              </div>

              <div className="space-y-2 pt-3 border-t border-[#0E3B33]/5 text-xs text-[#0E3B33]/85">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{isAr ? 'محرك ضبط الأوزان الحسابية الفوري' : 'Live Weight Adjustment Sliders'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{isAr ? 'فرز تفصيلي لمكونات الملاءمة' : 'Detailed Person-Job Fit Breakdown'}</span>
                </div>
              </div>

              <div className="pt-4 border-t border-[#0E3B33]/10 flex items-center justify-between font-bold text-sm text-[#0E3B33] group-hover:text-[#C4824A]">
                <span>{isAr ? 'فتح منصة الشركات' : 'Launch Employer Console'}</span>
                <ArrowUpRight className="w-5 h-5 ltr:group-hover:translate-x-1 rtl:group-hover:-translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </div>
            </div>
          </div>

          {/* Card 3: Government B2G Dashboard */}
          <div
            onClick={() => setActiveTab('b2g')}
            className="group cursor-pointer rounded-3xl bg-white border border-[#0E3B33]/10 shadow-card shadow-card-hover hover:border-[#C4824A] transition-all flex flex-col justify-between overflow-hidden"
          >
            {/* Visual Header Image Container with Floating Badge */}
            <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-[#0E3B33]/5">
              <img
                src="/images/card-b2g-dashboard.jpg"
                alt={isAr ? 'لوحة الرقابة الحكومية' : 'B2G Oversight Dashboard'}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute top-3.5 end-3.5 w-11 h-11 rounded-2xl bg-white/95 backdrop-blur-md border border-[#0E3B33]/10 shadow-md flex items-center justify-center transition-transform group-hover:scale-110">
                <ShieldCheck className="w-5 h-5 text-[#C4824A]" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent pointer-events-none"></div>
            </div>

            <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <span className="text-xs font-bold text-[#C4824A] uppercase tracking-wider block">
                  {isAr ? 'الوزارات والجهات الرقابية' : 'B2G & Municipal Oversight'}
                </span>
                <h3 className="text-2xl font-bold text-[#0E3B33] font-arabic group-hover:text-[#C4824A] transition-colors">
                  {isAr ? 'لوحة الرقابة الحكومية' : 'B2G Governance Dashboard'}
                </h3>
                <p className="text-sm text-[#0E3B33]/75 leading-relaxed pt-1">
                  {isAr
                    ? 'متابعة مؤشرات الأداء الكلية، تدقيق الامتثال لقانون حماية البيانات 151/2020، ومراقبة مسارات مشاركة الإناث في أسوان.'
                    : 'Track macro labor indicators, audit Law 151/2020 consent registries, and verify regional female economic inclusion metrics.'}
                </p>
              </div>

              <div className="space-y-2 pt-3 border-t border-[#0E3B33]/5 text-xs text-[#0E3B33]/85">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{isAr ? 'رسوم بيانية لتوزيع القطاعات والنمو' : 'Sectoral & Monthly Growth Charts'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{isAr ? 'امتثال تام لمعايير حماية القُصّر' : 'Minors Consent Protection Audit'}</span>
                </div>
              </div>

              <div className="pt-4 border-t border-[#0E3B33]/10 flex items-center justify-between font-bold text-sm text-[#0E3B33] group-hover:text-[#C4824A]">
                <span>{isAr ? 'عرض لوحة الحوكمة' : 'Launch B2G Dashboard'}</span>
                <ArrowUpRight className="w-5 h-5 ltr:group-hover:translate-x-1 rtl:group-hover:-translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Theoretical Grounding & Strategic Pillars */}
      <section className="bg-[#E9E3D3]/60 rounded-3xl p-8 sm:p-10 border border-[#0E3B33]/10 shadow-card space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-2xl font-bold text-[#0E3B33] font-arabic">
              {isAr ? 'المرتكزات النظرية والمعايير القياسية' : 'Theoretical Foundations & Frameworks'}
            </h3>
            <p className="text-xs text-[#0E3B33]/70 mt-1">
              {isAr
                ? 'تم بناء منصة مهنة استناداً إلى أحدث أطر إدارة الموارد البشرية ونماذج التعليم والتدريب المزدوج الدولية.'
                : 'MEHNA is rigorously constructed upon verified HR selection science and international vocational dual models.'}
            </p>
          </div>
          <span className="px-3.5 py-1.5 rounded-full bg-[#0E3B33] text-white text-xs font-bold font-arabic">
            {isAr ? 'رؤية مصر 2030' : 'Egypt Vision 2030'}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl bg-white border border-[#0E3B33]/10 shadow-card shadow-card-hover space-y-2">
            <span className="text-xs font-bold text-[#C4824A]">{isAr ? 'النموذج الثنائي الألماني' : 'German Dual VET'}</span>
            <h4 className="font-bold text-[#0E3B33] text-sm">{isAr ? 'الحوكمة الثلاثية المشتركة' : 'Tripartite Governance'}</h4>
            <p className="text-xs text-[#0E3B33]/70 leading-relaxed">
              {isAr
                ? 'توزيع المسؤوليات بين الغرف التجارية (تدقيق وتأهيل)، والشركاء (تحديد الكفاءات والمكافآت)، والدولة (الإشراف القانوني).'
                : 'Balancing responsibilities between chambers, enterprise social partners, and municipal ministries.'}
            </p>
          </div>

          <div className="p-4 rounded-xl bg-white border border-[#0E3B33]/10 shadow-card shadow-card-hover space-y-2">
            <span className="text-xs font-bold text-[#C4824A]">{isAr ? 'نظرية غاري ديسلر' : 'Gary Dessler HRM'}</span>
            <h4 className="font-bold text-[#0E3B33] text-sm">{isAr ? 'تحليل الوظائف ومطابقة KSAO' : 'Job Analysis & KSAO Fit'}</h4>
            <p className="text-xs text-[#0E3B33]/70 leading-relaxed">
              {isAr
                ? 'قياس الملاءمة عبر المعارف، والمهارات العملية، والقدرات الذاتية، والخصائص السياقية كمعادلة خوارزمية مرنة.'
                : 'Algorithmic scoring across Knowledge, Practical Skills, Abilities, and Contextual KSAOs.'}
            </p>
          </div>

          <div className="p-4 rounded-xl bg-white border border-[#0E3B33]/10 shadow-card shadow-card-hover space-y-2">
            <span className="text-xs font-bold text-[#C4824A]">{isAr ? 'القانون 151 لسنة 2020' : 'Egypt Law 151/2020'}</span>
            <h4 className="font-bold text-[#0E3B33] text-sm">{isAr ? 'حماية البيانات وحوكمة القُصّر' : 'Data Privacy & Consent'}</h4>
            <p className="text-xs text-[#0E3B33]/70 leading-relaxed">
              {isAr
                ? 'تقليل جمع البيانات، والتسجيل المشفر لموافقات أولياء الأمور للفئات العمرية تحت سن 18 عاماً.'
                : 'Data minimization, explicit audit logs, and verified parental consent for youth under 18.'}
            </p>
          </div>

          <div className="p-4 rounded-xl bg-white border border-[#0E3B33]/10 shadow-card shadow-card-hover space-y-2">
            <span className="text-xs font-bold text-[#C4824A]">{isAr ? 'أهداف التنمية المستدامة' : 'UN SDGs Alignment'}</span>
            <h4 className="font-bold text-[#0E3B33] text-sm">{isAr ? 'أهداف 4، 5، 8، 10' : 'SDGs 4, 5, 8, 10'}</h4>
            <p className="text-xs text-[#0E3B33]/70 leading-relaxed">
              {isAr
                ? 'التعليم الجيد، المساواة بين الجنسين في الصعيد، العمل اللائق والنمو الاقتصادي، والحد من أوجه اللامساواة.'
                : 'Quality education, gender equity in Upper Egypt, decent work, and regional inequality reduction.'}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
